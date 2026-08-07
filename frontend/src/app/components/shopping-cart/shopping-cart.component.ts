import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Cart Slide-Over Backdrop -->
    <div
      *ngIf="isOpen$ | async"
      (click)="cartService.closeCart()"
      class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity">
    </div>

    <!-- Slide-Over Drawer Container -->
    <div
      *ngIf="isOpen$ | async"
      class="fixed inset-y-0 right-0 max-w-full flex z-50">
      <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col">
        <!-- Drawer Header -->
        <div class="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 class="text-lg font-bold">Shopping Cart</h2>
          </div>
          <button
            (click)="cartService.closeCart()"
            class="text-slate-400 hover:text-white p-1 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Drawer Body -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div *ngIf="checkoutSuccess" class="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center space-y-2">
            <div class="text-3xl">🎉</div>
            <h4 class="font-bold">Order Placed Successfully!</h4>
            <p class="text-xs">Thank you for your simulated purchase.</p>
          </div>

          <div *ngIf="(cartItems$ | async)?.length === 0 && !checkoutSuccess" class="text-center py-16 space-y-3">
            <div class="bg-slate-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <p class="text-slate-600 font-medium text-sm">Your cart is currently empty.</p>
          </div>

          <!-- Items List -->
          <div *ngFor="let item of cartItems$ | async" class="flex space-x-4 p-3 bg-slate-50 rounded-xl border border-slate-100 items-center">
            <img [src]="item.book.coverImageUrl" [alt]="item.book.title" class="w-16 h-20 object-cover rounded-lg bg-slate-200" />
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-slate-800 text-sm truncate">{{ item.book.title }}</h4>
              <p class="text-xs text-slate-500 mb-2">\${{ item.book.price.toFixed(2) }} each</p>
              
              <!-- Quantity Controls -->
              <div class="flex items-center space-x-2">
                <button
                  (click)="cartService.updateQuantity(item.book.id, item.quantity - 1)"
                  class="w-6 h-6 bg-white border border-slate-200 rounded text-slate-600 text-xs font-bold hover:bg-slate-100 flex items-center justify-center">
                  -
                </button>
                <span class="text-xs font-semibold px-2 text-slate-800">{{ item.quantity }}</span>
                <button
                  (click)="cartService.updateQuantity(item.book.id, item.quantity + 1)"
                  class="w-6 h-6 bg-white border border-slate-200 rounded text-slate-600 text-xs font-bold hover:bg-slate-100 flex items-center justify-center">
                  +
                </button>
              </div>
            </div>

            <!-- Item Total & Delete -->
            <div class="text-right flex flex-col justify-between h-full py-1">
              <span class="font-bold text-sm text-slate-900">\${{ (item.book.price * item.quantity).toFixed(2) }}</span>
              <button
                (click)="cartService.removeFromCart(item.book.id)"
                class="text-xs text-rose-500 hover:text-rose-700 font-medium mt-2">
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div *ngIf="((cartItems$ | async)?.length ?? 0) > 0" class="p-6 bg-slate-50 border-t border-slate-100 space-y-4">
          <div class="space-y-1.5 text-sm">
            <div class="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>\${{ (totalPrice$ | async)?.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span class="text-emerald-600 font-medium">FREE</span>
            </div>
            <div class="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span>\${{ (totalPrice$ | async)?.toFixed(2) }}</span>
            </div>
          </div>

          <button
            (click)="checkout()"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors text-sm">
            Simulate Checkout
          </button>
        </div>
      </div>
    </div>
  `
})
export class ShoppingCartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;
  isOpen$!: Observable<boolean>;
  checkoutSuccess: boolean = false;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.totalPrice$ = this.cartService.getTotalPrice();
    this.isOpen$ = this.cartService.isCartOpen$;
  }

  checkout(): void {
    this.checkoutSuccess = true;
    this.cartService.clearCart();
    setTimeout(() => {
      this.checkoutSuccess = false;
    }, 5000);
  }
}
