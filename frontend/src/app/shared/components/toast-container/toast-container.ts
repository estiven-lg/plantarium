// src/app/shared/components/toast-container/toast-container.ts
import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '@core/services/toast.service';
import { LucideAngularModule, CircleCheck, CircleX, TriangleAlert, Info, X } from 'lucide-angular';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [LucideAngularModule],
  styleUrl: './toast-container.css',
  template: `
    <!-- Contenedor fijo en la esquina inferior derecha -->
    <div
      class="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 w-full max-w-sm pointer-events-none animate-"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          animate.enter="animate-toast-in"
          animate.leave="animate-toast-out"
          class="pointer-events-auto flex items-center gap-3 p-4 rounded-xl bg-surface border shadow-lg transition-all"
          [class]="getBorderClass(toast.type)"
        >
          <lucide-icon
            [img]="getIcon(toast.type)"
            class="w-5 h-5 shrink-0"
            [class]="getColorClass(toast.type)"
          ></lucide-icon>

          <p class="text-sm font-medium flex-1 text-text">{{ toast.message }}</p>

          <button
            type="button"
            (click)="toastService.dismiss(toast.id)"
            class="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Cerrar notificación"
          >
            <lucide-icon [img]="closeIcon" class="w-4 h-4"></lucide-icon>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastContainer {
  readonly toastService = inject(ToastService);
  readonly closeIcon = X;

  getIcon(type: ToastType) {
    const icons = {
      success: CircleCheck,
      error: CircleX,
      warning: TriangleAlert,
      info: Info,
    };
    return icons[type];
  }

  getColorClass(type: ToastType): string {
    const colors = {
      success: 'text-primary',
      error: 'text-red-500',
      warning: 'text-amber-500',
      info: 'text-sky-500',
    };
    return colors[type];
  }

  getBorderClass(type: ToastType): string {
    const borders = {
      success: 'border-primary/40',
      error: 'border-red-500/40',
      warning: 'border-amber-500/40',
      info: 'border-sky-500/40',
    };
    return borders[type];
  }
}
