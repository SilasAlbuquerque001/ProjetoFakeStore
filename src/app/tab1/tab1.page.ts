import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonLoading } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonLoading, CommonModule],
})
export class Tab1Page implements OnInit {
  products: Product[] = [];
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.isLoading = true;
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      this.products = await response.json();
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      this.isLoading = false;
    }
  }

  viewProduct(product: Product) {
    this.router.navigate(['/tabs/tab2'], { state: { product } });
  }
}

