import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { item } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  itemProductData: undefined | item;
  updateMessage: undefined | string;
  constructor(
    private route: ActivatedRoute,
    private productService: ItemService,
    private router: Router
  ) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.productService.getProduct(productId).subscribe((result) => {
        console.warn(result);
        this.itemProductData = result;
      });
  }
  productUpdate(data: item) {
    if(this.itemProductData)
    {
      data.id = this.itemProductData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateMessage = 'Product data is updated';
      }
    });
    setTimeout(() => {
      this.updateMessage = undefined;
      this.router.navigate(['/dashboard']);
    }, 3000);
    
  }
}
