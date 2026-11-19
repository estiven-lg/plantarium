import { Component, signal } from '@angular/core';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';
import { ToastContainer } from '@shared/components/toast-container/toast-container';

@Component({
  imports: [MainLayoutComponent, ToastContainer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('plantarium');
}


