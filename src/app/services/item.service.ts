import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { item } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}
  itemList() {
    return this.http.get<item[]>('http://localhost:3000/products');
  }

  additionProduct(data: item) {
    return this.http.post('http://localhost:3000/products', data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<item>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: item) {
    return this.http.put<item>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
}
