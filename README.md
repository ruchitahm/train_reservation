# Train Seat Reservation System

This is a train seat reservation system built with **React.js**, **Node.js**, **Express.js**, and **PostgreSQL**. The system allows users to reserve seats on a train with a priority to book seats in one row. If a row is full, nearby seats are booked.

## Features

- **User Login and Signup:** Users can register and log in to book tickets.
- **Seat Reservation:** A user can reserve up to 7 seats in one go. The system will prioritize booking seats in one row, and if not possible, nearby seats will be booked.
- **Seat Availability:** Once a seat is booked, it cannot be reserved by another user until the booking is canceled or reset.
- **Responsive Design:** The application is designed to be responsive across various devices and screen sizes.
- **Input Validation and Error Handling:** User inputs are sanitized and validated before storing in the database, with appropriate error messages displayed to the user.

## Tech Stack

- **Frontend:** React.js (using Create React App)
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ruchitahm/train_reservation
cd train_reservation
```

### 2. Install Dependencies
- Backend (Node.js + Express.js)
``` bash
cd server
npm install
```

- Frontend (React.js)
Navigate to the frontend directory and install the required dependencies:
```bash
cd frontend
npm install
```

### 3 Start the Backend
Run the backend server:
```bash
cd server
node index.js
```
The backend will be running on http://localhost:5000.

### 4 . Start the Frontend
Run the frontend server:
``bash
cd frontend
npm start
```

### Routes and API Documentation
Frontend Routes:
/login: User login page
/signup: User signup page

### Backend API Routes:
POST /api/auth/signup: Register a new user
POST /api/auth/login: Log in a user
GET /api/seats: Fetch available seats for reservation
POST /api/seats/reserve: Reserve seats for a user
DELETE /api/seats/cancel: Cancel a reservation

