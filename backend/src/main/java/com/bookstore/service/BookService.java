package com.bookstore.service;

import com.bookstore.model.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks(String query, String genre) {
        if ((query == null || query.isBlank()) && (genre == null || genre.isBlank())) {
            return bookRepository.findAll();
        }
        return bookRepository.searchAndFilterBooks(query, genre);
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public List<String> getAllGenres() {
        return bookRepository.findDistinctGenres();
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
}
