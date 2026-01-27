import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoDTO } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  //url de la api creada en java
  private api = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  //Metodo para obtener lista de productos
  listarProducto(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(this.api);
  }

  //metodo para crear productos
  crearProducto(producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.post<ProductoDTO>(this.api, producto);
  }

  listarProductoById(id: number): Observable<ProductoDTO> {
    return this.http.get<ProductoDTO>(`${this.api}/${id}`);
  }

  borrarProducto(id: number): Observable<any> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  actualizarProducto(id: number, producto: ProductoDTO): Observable<ProductoDTO> {
    // Combinamos la URL con el ID y enviamos el objeto producto
    return this.http.put<ProductoDTO>(`${this.api}/${id}`, producto);
  }
}
