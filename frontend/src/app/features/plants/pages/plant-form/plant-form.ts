import { Component, OnInit, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule, Sprout } from 'lucide-angular';
import { PlantsService } from '@features/plants/services/plants.service';
import { PlantFormSkeleton } from '@features/plants/components/plant-form-skeleton/plant-form-skeleton';
import { PlantDeleteModal } from '@features/plants/components/plant-delete-modal/plant-delete-modal';

@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
    PlantFormSkeleton,
    PlantDeleteModal,
  ],
  templateUrl: './plant-form.html',
})
export class PlantForm implements OnInit {
  readonly arrowLeftIcon = ArrowLeft;
  readonly plantsIcon = Sprout;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly plantsService = inject(PlantsService);
  private readonly router = inject(Router);
  

  showDeleteModal = signal<boolean>(false);
  isDeleting = signal<boolean>(false);

  id = input.required<string>();
  isSubmitting = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  // form structure with validation rules
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    scientificName: ['', [Validators.required]],
    description: ['', []],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    const plantId = this.id();

    // if plantId is not 'new', we are in edit mode, so we fetch the plant data and populate the form
    if (plantId && plantId !== 'new') {
      this.isLoading.set(true);
      this.plantsService.getById(plantId).subscribe({
        next: (plant) => {
          this.form.patchValue({
            name: plant.name ?? '',
            scientificName: plant.scientificName ?? '',
            description: plant.description ?? '',
            price: plant.price ?? 0,
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar la planta:', err);
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
    const plantId = this.id();

    let request$;
    console.log('Plant ID:', plantId);

    if (plantId == 'new') {
      // Modo Creación
      request$ = this.plantsService.create(payload);
    } else {
      // Modo Edición
      request$ = this.plantsService.update(plantId, payload);
    }

    request$.subscribe({
      next: () => this.router.navigate(['/plants']),
      error: () => this.isSubmitting.set(false),
    });
  }

  onConfirmDelete(): void {
    const plantId = this.id();
    if (!plantId) return;

    this.isDeleting.set(true);

    this.plantsService.delete(plantId).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.showDeleteModal.set(false);
        this.router.navigate(['/plants']);
      },
      error: () => {
        this.isDeleting.set(false);
        this.showDeleteModal.set(false);
      },
    });
  }
}
