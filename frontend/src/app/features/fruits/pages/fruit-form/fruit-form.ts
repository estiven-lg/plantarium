import { Component, OnInit, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArrowLeft, Citrus, LucideAngularModule } from 'lucide-angular';
import { FruitsService } from '@features/fruits/services/fruits.service';
import { FruitFormSkeleton } from '@features/fruits/components/fruit-form-skeleton/fruit-form-skeleton';
import { FruitDeleteModal } from '@features/fruits/components/fruit-delete-modal/fruit-delete-modal';

@Component({
  selector: 'app-fruit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
    FruitFormSkeleton,
    FruitDeleteModal,
  ],
  templateUrl: './fruit-form.html',
})
export class FruitForm implements OnInit {
  readonly arrowLeftIcon = ArrowLeft;
  readonly fruitIcon = Citrus;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly fruitsService = inject(FruitsService);
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
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    const fruitId = this.id();

    // if fruitId is not 'new', we are in edit mode, so we fetch the fruit data and populate the form
    if (fruitId && fruitId !== 'new') {
      this.isLoading.set(true);
      this.fruitsService.getById(fruitId).subscribe({
        next: (fruit) => {
          this.form.patchValue({
            name: fruit.name ?? '',
            scientificName: fruit.scientificName ?? '',
            description: fruit.description ?? '',
            price: fruit.price ?? 0,
            stock: fruit.stock ?? 0,
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar la fruta:', err);
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

    const formValues = this.form.getRawValue();
    const fruitId = this.id();

    let request$;

    if (fruitId === 'new') {
      // Modo Creación: CreateFruitDto (name, scientificName, description, price)
      request$ = this.fruitsService.create({
        name: formValues.name,
        scientificName: formValues.scientificName,
        description: formValues.description,
        price: formValues.price,
      });
    } else {
      // Modo Edición: UpdateFruitDto (price, stock)
      request$ = this.fruitsService.update(fruitId, {
        price: formValues.price,
        stock: formValues.stock,
      });
    }

    request$.subscribe({
      next: () => this.router.navigate(['/fruits']),
      error: () => this.isSubmitting.set(false),
    });
  }

  onConfirmDelete(): void {
    const fruitId = this.id();
    if (!fruitId) return;

    this.isDeleting.set(true);

    this.fruitsService.delete(fruitId).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.showDeleteModal.set(false);
        this.router.navigate(['/fruits']);
      },
      error: () => {
        this.isDeleting.set(false);
        this.showDeleteModal.set(false);
      },
    });
  }
}
