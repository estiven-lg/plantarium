import { Component, input, output } from '@angular/core';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  imports: [LucideAngularModule],
  selector: 'app-seed-delete-modal',
  styles: ``,
  templateUrl: './seed-delete-modal.html',
})
export class SeedDeleteModal {
  title = input.required<string>();
  message = input.required<string>();
  confirmText = input<string>('Eliminar');
  isLoading = input<boolean>(false);

  confirmAction = output<void>();
  cancelAction = output<void>();

  readonly alertIcon = TriangleAlert;
}
