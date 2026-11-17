import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';

@Component({
  imports: [MainLayoutComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('plantarium');
}


