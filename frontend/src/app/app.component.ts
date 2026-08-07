import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BookCatalogComponent } from './components/book-catalog/book-catalog.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BookCatalogComponent, ShoppingCartComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-slate-50">
      <app-header></app-header>
      
      <!-- Hero Banner -->
      <section class="bg-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-indigo-800">
        <div class="max-w-7xl mx-auto text-center space-y-3">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">Discover Your Next Great Read</h1>
          <p class="text-indigo-200 text-sm sm:text-base max-w-2xl mx-auto">
            Browse through our curated collection of technical books, sci-fi sagas, timeless classics, and bestseller non-fiction.
          </p>
        </div>
      </section>

      <main class="flex-1">
        <app-book-catalog></app-book-catalog>
      </main>

      <app-shopping-cart></app-shopping-cart>

      <!-- Footer -->
      <footer class="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <div class="max-w-7xl mx-auto px-4">
          <p>&copy; 2026 Bookstore Application. Built with Spring Boot, Angular, and MySQL in Docker.</p>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {}
