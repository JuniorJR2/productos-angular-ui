import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductoListComponent } from './components/producto-list/producto-list';
import { ProductoFormComponents } from './components/producto-form/producto-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('front-productos');
}
