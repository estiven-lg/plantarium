import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-fruit-card-skeleton',
  styles: ``,
  template: `
    <article class="p-4 rounded-xl h-24 bg-surface border border-primary/20 animate-pulse">
      <div class="h-full w-full flex items-center gap-4">
        <div class="h-full aspect-square rounded-lg bg-primary/15 shrink-0"></div>

        <div class="flex-1 space-y-2">
          <div class="h-5 bg-primary/15 rounded-md w-1/2"></div>
          <div class="space-y-1">
            <div class="h-2.5 bg-primary/10 rounded w-full"></div>
            <div class="h-2.5 bg-primary/10 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </article>
  `,
})
export class FruitCardSkeleton {}
