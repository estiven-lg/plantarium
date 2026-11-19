import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-fruit-form-skeleton',
  styles: ``,
  template: `
    <div
      class="max-w-xl space-y-5 bg-surface p-6 rounded-xl border border-primary/20 animate-pulse"
    >
      <!-- Cabecera: botón regresar + título -->
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-primary/15 shrink-0"></div>
        <div class="h-7 w-36 rounded-md bg-primary/15"></div>
      </div>

      <!-- Campo: Nombre común -->
      <div class="space-y-1.5">
        <div class="h-4 w-28 rounded bg-primary/10"></div>
        <div class="h-10 w-full rounded-lg bg-background border border-primary/20"></div>
      </div>

      <!-- Campo: Nombre científico -->
      <div class="space-y-1.5">
        <div class="h-4 w-32 rounded bg-primary/10"></div>
        <div class="h-10 w-full rounded-lg bg-background border border-primary/20"></div>
      </div>

      <!-- Campo: Descripción (textarea) -->
      <div class="space-y-1.5">
        <div class="h-4 w-24 rounded bg-primary/10"></div>
        <div class="h-20 w-full rounded-lg bg-background border border-primary/20"></div>
      </div>

      <!-- Campo: Precio -->
      <div class="space-y-1.5">
        <div class="h-4 w-16 rounded bg-primary/10"></div>
        <div class="h-10 w-full rounded-lg bg-background border border-primary/20"></div>
      </div>

      <!-- Campo: Stock -->
      <div class="space-y-1.5">
        <div class="h-4 w-16 rounded bg-primary/10"></div>
        <div class="h-10 w-full rounded-lg bg-background border border-primary/20"></div>
      </div>

      <!-- Botones de acción (Cancelar + Guardar Fruta) -->
      <div class="flex justify-end gap-3 pt-4">
        <div class="h-10 w-24 rounded-lg bg-primary/10"></div>
        <div class="h-10 w-36 rounded-lg bg-primary/20"></div>
      </div>
    </div>
  `,
})
export class FruitFormSkeleton {}
