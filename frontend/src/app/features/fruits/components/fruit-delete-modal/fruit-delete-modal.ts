import { Component, input, output } from '@angular/core';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule],
  selector: 'app-fruit-delete-modal',
  styles: ``,
  templateUrl: './fruit-delete-modal.html',
})
export class FruitDeleteModal {
  title = input.required<string>();
  message = input.required<string>();
  confirmText = input<string>('Eliminar');
  isLoading = input<boolean>(false);

  confirmAction = output<void>();
  cancelAction = output<void>();

  readonly alertIcon = TriangleAlert;
}
