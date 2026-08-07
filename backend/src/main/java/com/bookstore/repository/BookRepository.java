package com.bookstore.repository;

import com.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE " +
           "(:query IS NULL OR :query = '' OR LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:genre IS NULL OR :genre = '' OR LOWER(b.genre) = LOWER(:genre))")
    List<Book> searchAndFilterBooks(@Param("query") String query, @Param("genre") String genre);

    @Query("SELECT DISTINCT b.genre FROM Book b WHERE b.genre IS NOT NULL")
    List<String> findDistinctGenres();
}
