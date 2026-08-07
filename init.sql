CREATE DATABASE IF NOT EXISTS bookstore_db;
USE bookstore_db;

CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(50),
    price DOUBLE NOT NULL,
    genre VARCHAR(100),
    description TEXT,
    cover_image_url VARCHAR(500),
    rating DOUBLE,
    stock INT
);

INSERT INTO books (title, author, isbn, price, genre, description, cover_image_url, rating, stock) VALUES
('Clean Code', 'Robert C. Martin', '9780132350884', 39.99, 'Technology', 'Even bad code can function. But if code isn''t clean, it can bring a development organization to its knees.', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400', 4.8, 15),
('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', '9780201616224', 42.50, 'Technology', 'Topics range from personal responsibility and career development to architectural techniques for keeping code flexible.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400', 4.9, 12),
('Designing Data-Intensive Applications', 'Martin Kleppmann', '9781449373320', 49.99, 'Technology', 'An indispensable guide for software engineers and architects evaluating technologies for processing and storing data.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', 4.9, 20),
('Dune', 'Frank Herbert', '9780441172719', 18.99, 'Sci-Fi', 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400', 4.7, 25),
('Project Hail Mary', 'Andy Weir', '9780593135204', 22.00, 'Sci-Fi', 'A lone astronaut must save the earth from disaster in this incredible new adventure from the author of The Martian.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400', 4.8, 18),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 12.99, 'Classic', 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan in 1920s Long Island.', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400', 4.5, 30),
('1984', 'George Orwell', '9780451524935', 14.50, 'Dystopian', 'A chilling prophecy about the future and a totalitarian world controlled by Big Brother.', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400', 4.8, 22),
('Atomic Habits', 'James Clear', '9780735211292', 24.99, 'Self-Help', 'An easy and proven way to build good habits and break bad ones through tiny changes.', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400', 4.9, 40),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '9780062316097', 26.50, 'History', 'Explore how Homo sapiens conquered the world through biology, history, and science.', 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=400', 4.7, 14);
