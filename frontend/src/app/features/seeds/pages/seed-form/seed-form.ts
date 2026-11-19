import { Component, OnInit, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArrowLeft, Bean, LucideAngularModule } from 'lucide-angular';
import { SeedsService } from '@features/seeds/services/seeds.service';
import { SeedFormSkeleton } from '@features/seeds/components/seed-form-skeleton/seed-form-skeleton';
import { SeedDeleteModal } from '@features/seeds/components/seed-delete-modal/seed-delete-modal';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-seed-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
    SeedFormSkeleton,
    SeedDeleteModal,
  ],
  templateUrl: './seed-form.html',
})
export class SeedForm implements OnInit {
  readonly arrowLeftIcon = ArrowLeft;
  readonly seedIcon = Bean;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly seedsService = inject(SeedsService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  showDeleteModal = signal<boolean>(false);
  isDeleting = signal<boolean>(false);

  id = input.required<string>();
  isSubmitting = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // form structure with validation rules
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', []],
  });

  ngOnInit(): void {
    const seedId = this.id();

    // if seedId is not 'new', we are in edit mode, so we fetch the seed data and populate the form
    if (seedId && seedId !== 'new') {
      this.isLoading.set(true);
      this.seedsService.getById(seedId).subscribe({
        next: (seed) => {
          this.form.patchValue({
            name: seed.name ?? '',
            description: seed.description ?? '',
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar la semilla:', err);
          this.isLoading.set(false);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const payload = this.form.getRawValue();
    const seedId = this.id();

    let request$;

    if (seedId === 'new') {
      // Modo Creación
      request$ = this.seedsService.create(payload);
    } else {
      // Modo Edición
      request$ = this.seedsService.update(seedId, payload);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/seeds']);
        this.toast.success('Semilla guardada exitosamente');
      },
      error: () => {
        this.isSubmitting.set(false);
        this.toast.error('Error al guardar la semilla. Por favor, inténtalo de nuevo.');
      },
    });
  }

  onConfirmDelete(): void {
    const seedId = this.id();
    if (!seedId) return;

    this.isDeleting.set(true);

    this.seedsService.delete(seedId).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.showDeleteModal.set(false);
        this.toast.success('Semilla eliminada exitosamente');
        this.router.navigate(['/seeds']);
      },
      error: () => {
        this.isDeleting.set(false);
        this.showDeleteModal.set(false);
        this.toast.error('Error al eliminar la semilla. Por favor, inténtalo de nuevo.');
      },
    });
  }
}
