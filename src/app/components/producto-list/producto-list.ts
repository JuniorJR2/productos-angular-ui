import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { RouterLink } from '@angular/router';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ProductoResumen } from '../../models/producto-resumen';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})
export class ProductoListComponent implements OnInit {
  //1.- Guarda lo que manda Java
  productos: ProductoDTO[] = [];
  productoResumen: ProductoResumen[] = [];

  buscadorControl = new FormControl('');
  buscadorResumen = new FormControl('');

  precioMin = new FormControl('');
  precioMax = new FormControl('');

  titulo: string = 'Todos los Productos';
  mensajeErro: string = '';

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
        this.titulo = 'Todos los Productos';
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

  alBuscar() {
    //1.- capturamos el valor directo del control
    const nombre = this.buscadorControl.value || '';

    //2.- Validacion
    if (nombre && nombre.length > 0) {
      this.productoService.buscarProductoByInicial(nombre).subscribe({
        next: (data) => {
          this.productos = data; //Se remplaza la lista con los resultados de la busqueda
        },
        error: (err) => console.error('Error en el buscador', err),
      });
    } else {
      //3.-Si borro todo, volvemos a listar todos los productos
      this.listarProducto();
    }
  }

  buscarByPrecio() {
    const min = this.precioMin.value || 0;
    const max = this.precioMax.value || 0;

    if (max > min) {
      this.productoService.productoPrecioMinMax(Number(min), Number(max)).subscribe({
        next: (data) => {
          this.productos = data;
          this.mensajeErro = '';
        },
        error: (err) => {
          console.error('erro en el buscador por precio', err);
          this.mensajeErro = err.error;
        },
      });
    } else {
      this.mensajeErro = 'El precion minimo no puede ser mayor al precio maximo';
      console.error(this.mensajeErro);
    }
  }

  buscarPremium() {
    this.productoService.productosPremium().subscribe({
      next: (data) => {
        this.productos = data;
        this.titulo = 'Productos PREMIUM';
      },
      error: (err) => console.log('Error al buscar productos premium', err),
    });
  }

  buscarResumen() {
    const termino = this.buscadorResumen.value || '';
    this.productoService.obtenerResumen(termino).subscribe({
      next: (data) => {
        this.productoResumen = data;
        console.log('Lista de resumen de productos', data);
      },
      error: (err) => console.error('Error en la busqueda', err),
    });
  }
}
