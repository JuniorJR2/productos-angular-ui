import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  //url de la api creada en java
  private api = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  //Metodo para obtener lista de productos
  listarProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.api);
  }

  //metodo para crear productos
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.api, producto);
  }

  listarProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.api}/${id}`);
  }

  borrarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    // Combinamos la URL con el ID y enviamos el objeto producto
    return this.http.put<Producto>(`${this.api}/${id}`, producto);
  }
}
