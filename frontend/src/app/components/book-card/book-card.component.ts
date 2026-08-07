import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 flex flex-col h-full overflow-hidden">
      <!-- Book Image & Badge -->
      <div class="relative bg-slate-100 h-52 overflow-hidden group">
        <img
          [src]="book.coverImageUrl"
          [alt]="book.title"
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          (error)="onImageError($event)" />
        <span class="absolute top-3 right-3 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-200">
          {{ book.genre }}
        </span>
      </div>

      <!-- Book Content -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center space-x-1 text-amber-500 text-sm mb-1">
            <span>★</span>
            <span class="font-medium text-slate-700">{{ book.rating }}</span>
          </div>
          <h3 class="font-bold text-slate-800 text-lg line-clamp-1 mb-1" [title]="book.title">
            {{ book.title }}
          </h3>
          <p class="text-sm text-slate-500 mb-3 font-medium">By {{ book.author }}</p>
          <p class="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {{ book.description }}
          </p>
        </div>

        <!-- Footer Price & Action -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span class="text-xs text-slate-400 block">Price</span>
            <span class="text-xl font-bold text-slate-900">\${{ book.price.toFixed(2) }}</span>
          </div>

          <button
            (click)="addToCart()"
            class="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-1 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.book);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400';
  }
}
