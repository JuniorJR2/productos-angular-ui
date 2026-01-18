import { Routes } from '@angular/router';
import { ProductoListComponent } from './components/producto-list/producto-list';
import { ProductoFormComponents } from './components/producto-form/producto-form';

export const routes: Routes = [
  { path: 'productos', component: ProductoListComponent },
  { path: 'agregar', component: ProductoFormComponents },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
];
