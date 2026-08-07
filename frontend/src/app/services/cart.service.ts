import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  public isCartOpen$: Observable<boolean> = this.isCartOpenSubject.asObservable();

  constructor() {}

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(book: Book, quantity: number = 1): void {
    const currentItems = [...this.cartItems];
    const index = currentItems.findIndex(item => item.book.id === book.id);

    if (index > -1) {
      currentItems[index] = {
        ...currentItems[index],
        quantity: currentItems[index].quantity + quantity
      };
    } else {
      currentItems.push({ book, quantity });
    }

    this.cartItemsSubject.next(currentItems);
  }

  removeFromCart(bookId: number): void {
    const updated = this.cartItems.filter(item => item.book.id !== bookId);
    this.cartItemsSubject.next(updated);
  }

  updateQuantity(bookId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(bookId);
      return;
    }

    const updated = this.cartItems.map(item => {
      if (item.book.id === bookId) {
        return { ...item, quantity };
      }
      return item;
    });

    this.cartItemsSubject.next(updated);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotalCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  getTotalPrice(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0))
    );
  }

  toggleCart(): void {
    this.isCartOpenSubject.next(!this.isCartOpenSubject.value);
  }

  openCart(): void {
    this.isCartOpenSubject.next(true);
  }

  closeCart(): void {
    this.isCartOpenSubject.next(false);
  }
}
