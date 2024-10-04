import { Component, NgModule, OnInit } from '@angular/core';
import { ItemService } from "../services/item.service";
import { item } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports:[CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
 itemList : undefined | item[]
 deleteMessage: undefined | string;
 //isAuthenticated: undefined | boolean;

  constructor(private itemService: ItemService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
  }

  deleteProduct(id: number) {
    console.warn('test id', id);
    this.itemService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = 'Product is deleted';
        this.loadItems();
      }
    });
    setTimeout(() => {
      this.deleteMessage = undefined;
    }, 3000);
  }

  loadItems(): void {
    this.itemService.itemList().subscribe((result)=>
    {
      console.warn(result)
      this.itemList = result
    })
  }
  
  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated():boolean{
    return this.authService.isAuthenticated();
  }
  
}