import { Component, input, output } from '@angular/core';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule],
  selector: 'app-plant-delete-modal',
  styles: ``,
  templateUrl: './plant-delete-modal.html',
})
export class PlantDeleteModal {

  title = input.required<string>();
  message = input.required<string>();
  confirmText = input<string>('Eliminar');
  isLoading = input<boolean>(false);


  confirmAction = output<void>();
  cancelAction = output<void>();

  readonly alertIcon = TriangleAlert;
}
