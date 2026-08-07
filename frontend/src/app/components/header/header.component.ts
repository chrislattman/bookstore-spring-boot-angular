import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-indigo-900 text-white shadow-md sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="bg-indigo-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span class="font-bold text-xl tracking-tight">BookVerse</span>
        </div>

        <!-- Cart Button -->
        <button
          (click)="cartService.toggleCart()"
          class="relative p-2 rounded-full hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-900 focus:ring-white"
          aria-label="Shopping Cart">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <span
            *ngIf="(totalCount$ | async) as count"
            class="absolute -top-1 -right-1 bg-amber-500 text-slate-900 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-900">
            {{ count }}
          </span>
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  totalCount$!: Observable<number>;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.totalCount$ = this.cartService.getTotalCount();
  }
}
