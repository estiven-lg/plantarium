import { Service, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

@Service()
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private nextId = 0;

  show(message: string, type: ToastType = 'info', durationMs = 3000) {
    const toast: Toast = {
      id: this.nextId++,
      type,
      message,
    };
    this._toasts.update((toasts) => [...toasts, toast]);

    setTimeout(() => {
      this._toasts.update((toasts) => toasts.filter((t) => t.id !== toast.id));
    }, durationMs);
  }

  success(message: string, durationMs = 3500): void {
    this.show(message, 'success', durationMs);
  }

  error(message: string, durationMs = 4500): void {
    this.show(message, 'error', durationMs);
  }

  warning(message: string, durationMs = 4000): void {
    this.show(message, 'warning', durationMs);
  }

  info(message: string, durationMs = 3500): void {
    this.show(message, 'info', durationMs);
  }

  dismiss(id: number): void {
    this._toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
