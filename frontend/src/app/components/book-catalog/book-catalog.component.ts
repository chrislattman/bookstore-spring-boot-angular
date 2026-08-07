import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, BookCardComponent],
  template: `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search & Filter Header Bar -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        <!-- Search Input -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange()"
            placeholder="Search by book title or author..."
            class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all" />
        </div>

        <!-- Genre Pill Filter -->
        <div class="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <button
            *ngFor="let genre of genres"
            (click)="selectGenre(genre)"
            [class]="selectedGenre === genre 
              ? 'bg-indigo-600 text-white font-semibold' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-colors">
            {{ genre }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="flex flex-col items-center justify-center py-16 space-y-3">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        <p class="text-slate-500 text-sm">Fetching catalog books...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="hasError && !isLoading" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center my-6">
        <p class="font-medium">Failed to load catalog.</p>
        <p class="text-xs mt-1 text-red-600">Please make sure the backend Spring Boot service is up and running.</p>
        <button (click)="fetchBooks()" class="mt-3 px-4 py-1.5 bg-red-600 text-white text-xs rounded-lg font-medium hover:bg-red-700">Retry</button>
      </div>

      <!-- Empty State -->
      <div *ngIf="!isLoading && !hasError && books.length === 0" class="text-center py-16 bg-white rounded-2xl border border-slate-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="mt-2 text-sm font-semibold text-slate-900">No books found</h3>
        <p class="mt-1 text-xs text-slate-500">Try clearing your search or changing the genre filter.</p>
      </div>

      <!-- Books Grid -->
      <div *ngIf="!isLoading && !hasError && books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <app-book-card *ngFor="let book of books" [book]="book"></app-book-card>
      </div>
    </section>
  `
})
export class BookCatalogComponent implements OnInit {
  books: Book[] = [];
  genres: string[] = ['All'];
  selectedGenre: string = 'All';
  searchQuery: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;
  private searchDebounceTimeout: any;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchBooks();
  }

  fetchGenres(): void {
    this.bookService.getGenres().subscribe({
      next: (data) => {
        this.genres = ['All', ...data];
      },
      error: (err) => console.error('Error fetching genres:', err)
    });
  }

  fetchBooks(): void {
    this.isLoading = true;
    this.hasError = false;

    this.bookService.getBooks(this.searchQuery, this.selectedGenre).subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }

  selectGenre(genre: string): void {
    this.selectedGenre = genre;
    this.fetchBooks();
  }

  onSearchChange(): void {
    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout);
    }
    this.searchDebounceTimeout = setTimeout(() => {
      this.fetchBooks();
    }, 300);
  }
}
