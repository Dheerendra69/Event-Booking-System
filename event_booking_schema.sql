/*
-- Query: select * from users
LIMIT 0, 1000

-- Date: 2025-07-14 09:46
*/
/*
-- Query: select * from users
LIMIT 0, 1000

-- Date: 2025-07-14 09:46
*/

-- Create USERS table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'organiser') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: 1234, hashed using bcrypt)
INSERT INTO users (name, email, password, role) 
VALUES (
    'admin', 
    'admin1@gmail.com', 
    '$2b$10$oxQP9iCVZlsUhMKSeDaJ0ur9qaLnU/ievKCFQLaSprn/rh8sNywGi', 
    'admin'
);

-- Create EVENTS table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date DATE,
    location VARCHAR(255),
    capacity INT,
    banner_image_url TEXT,
    thumbnail_url TEXT,
    start_time TIME,
    end_time TIME,
    category VARCHAR(100),
    organizer_name VARCHAR(255),
    organizer_email VARCHAR(255),
    venue_details TEXT,
    is_online BOOLEAN,
    meeting_link TEXT,
    price DECIMAL(10, 2),
    tags TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create BOOKINGS table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    number_of_people INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);
