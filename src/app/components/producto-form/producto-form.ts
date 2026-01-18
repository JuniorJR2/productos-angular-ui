import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css',
})
export class ProductoFormComponents {
  productoForm: FormGroup;

  isEdit: boolean = false;
  idActual?: number;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute, //Para leer la URL
  ) {
    //Definir formulario y validaciones
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.idActual = id;
      this.productoService.listarProductoById(id).subscribe((data) => {
        this.productoForm.patchValue(data); // Rellena el form con lo que hay en Java
      });
    }
  }

  guardar() {
    if (this.productoForm.valid) {
      const nuevoProducto = this.productoForm.value;

      if (this.isEdit && this.idActual) {
        // LLAMADA AL PUT
        this.productoService.actualizarProducto(this.idActual, nuevoProducto).subscribe({
          next: () => this.router.navigate(['/']),
        });
      } else {
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
}
