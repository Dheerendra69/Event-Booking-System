# 🎉 Event Booking Platform

Event Booking is a full-stack MERN web application that allows users to browse, book, and manage events effortlessly. The platform supports user authentication, event exploration, and booking management, providing a seamless experience for both event organizers and attendees.

### 🔐 Hero Page
![Hero Page](./website-demo/Hero-Page.jpeg)
---
---


### 🌐 Live Site  
👉 [Visit the Event Booking App](https://event-bookin.netlify.app/)

---

## 🚀 Features

- 🔐 User **Signup/Login** functionality with JWT-based authentication
- 📅 Browse through a list of upcoming and ongoing **events**
- 📥 Book your desired event with a single click
- 🧾 View and manage your **booked events**
- ✨ Smooth and responsive **UI/UX** using React and Tailwind CSS
- ⚙️ RESTful API integration for managing users and events

---

## 🛠️ Tech Stack

### 💻 Frontend
- **React.js**
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Netlify** for deployment

### 🧠 Backend
- **Node.js** & **Express.js**
- **JWT** for secure authentication
- **CORS**, **dotenv**, and other helpful middleware
- **Render** for backend deployment

### 🗄️ Database
- **MySQL** hosted on **Aiven Console**
- **Sequelize ORM** (if used) or **mysql2** library

---

## 📂 Project Structure

```bash
Event-Booking-System-
|---server ( our backend )
|---src
|-------api
|-------components
|-------context
|-------pages
|-------routes
|-------utils
|-------App.css
|-------App.jsx
|-------index.css
|-------index.js

# To run in it your local environment 
cd Event-Booking-System
npm install
npm run dev
# open new terminal inside current directory
cd server
# create a .env file
# inside it write your variables
PORT=4000
JWT_SECRET=YOUR_JWT_SECRET
DB_HOST=YOUR_DB_HOAT
DB_PORT=YOUR_DB_PORT
DB_USER=YOUE_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME

#then open terminal

npm install

```

