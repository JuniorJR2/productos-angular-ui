import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoDTO } from '../../models/producto';

@Component({
  selector: 'app-producto-detalle',
  imports: [RouterLink],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css',
})
export class ProductoDetalle implements OnInit {
  //<- Implementar OnInit
  producto?: ProductoDTO;
  mensajeError: string = '';
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
  ) {}

  //Se ejecuta al cargar el compoenten
  ngOnInit(): void {
    //Se lee el id desde la url
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //Si el id existe, llamamos la logica
    if (id) {
      this.prodIndividual(id);
    }
  }

  prodIndividual(id: number) {
    this.productoService.listarProductoById(id).subscribe({
      next: (data) => {
        this.producto = data; //Si va bien, guardamos los datos
        console.log('Producto Cargado:', this.producto);
      },
      error: (err) => {
        console.error('Error al conectar con java', err);
        this.mensajeError = err.error;
      },
    });
  }
}
