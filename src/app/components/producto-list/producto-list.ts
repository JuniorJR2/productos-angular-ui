import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})
export class ProductoListComponent implements OnInit {
  //1.- Guarda lo que manda Java
  productos: Producto[] = [];

  //2.- Inyecta el servicio
  constructor(private productoService: ProductoService) {}

  //3.- Se ejecuta al abrir la pagina
  ngOnInit(): void {
    this.listarProducto();
  }

  //4.- Llamada al ticket  (Observable)
  listarProducto() {
    this.productoService.listarProducto().subscribe({
      next: (data) => {
        this.productos = data; //Si va bien, guardamos los datos
        console.log(this.productos);
      },
      error: (err) => {
        console.error('Error al conectar con java', err);
      },
    });
  }

  eliminar(id: number | undefined) {
    if (id !== undefined && confirm('Estas seguro de eliminar')) {
      this.productoService.borrarProducto(id).subscribe({
        next: (data) => {
          this.listarProducto();
          console.log('Producto elimnado con id: ', id);
        },
        error: (err) => console.error('Error al eliminar', err),
      });
    } else {
      console.error('No se puede eliminar un producto sin ID');
    }
  }
}
