import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css',
})
export class ProductoFormComponents {
  productoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    //Definir formulario y validaciones
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
    });
  }

  guardar() {
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;
      this.productoService.crearProducto(nuevoProducto).subscribe({
        next: (res) => {
          console.log('Producto guardado', res);
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error al guardar:', err),
      });
    }
  }
}
