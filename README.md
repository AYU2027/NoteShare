# NoteShare - A Full-Stack Note-Sharing Application

NoteShare is a modern, full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. It provides a clean and intuitive user experience with a focus on speed, simplicity, and seamless collaboration.

---

## 💻 Demo & Screenshot

Below is a preview of the application's homepage and dashboard.

<p align="center">
  <img alt="Screenshot of the NoteShare Application" src="./notes-app-forntend/src/assets/picture.png" width="80%">
</p>

> **Note:** For the image to display correctly on GitHub, ensure the `picture.png` file exists in the `notes-app-frontend/src/assets/` folder of your repository. If it doesn't work, uploading the image to GitHub and using its raw URL is a reliable alternative.

---

## ✨ Features

- **Secure User Authentication:** JWT (JSON Web Token) based registration and login.
- **Full Note Management (CRUD):** Users can easily create, read, update, and delete their notes.
- **Note Sharing System:** Securely share notes with any other registered user via username.
- **Organized Workspace:** Separate, dedicated pages for "My Notes" and "Shared With Me."
- **Live Client-Side Search:** Instantly filter notes by title or content.
- **Professional UI/UX:** A modern interface with a beautiful "Aurora" theme, toast notifications, and a responsive design.

---

## 🛠️ Tech Stack

| Category     | Technology                                             |
| :----------- | :----------------------------------------------------- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, React Router |
| **Backend**  | Node.js, Express.js, TypeScript, JWT, Bcrypt.js        |
| **Database** | MongoDB Atlas, Mongoose                                |
| **Tooling**  | Axios, Git, GitHub, Prettier                           |

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)
- A **MongoDB Atlas** account for the database. You will need a connection string.

---

## 🚀 Setup and Installation

Follow these steps to get your local development environment set up.

### 1. Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd notes-app-backend
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

3.  **Create your environment file:**
    Create a new file named `.env` in the `notes-app-backend` root directory. Add the following content, replacing the placeholders with your actual credentials.

    ```env
    # MongoDB Atlas connection string (replace your-username, <password>, and your-db-name)
    MONGO_URI=mongodb+srv://your-username:<password>@cluster0.xxxxx.mongodb.net/your-db-name?retryWrites=true&w=majority

    # A long, random, and secret string for signing JWT tokens
    JWT_SECRET=your-very-strong-and-secret-key-for-jwt

    # The port the server will run on
    PORT=5001
    ```

### 2. Frontend Setup

1.  **Navigate to the frontend directory** (from the project's root folder):

    ```bash
    cd notes-app-frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

---

## ▶️ Running the Application

To run the application, you will need **two separate terminal windows** open simultaneously.

### Terminal 1: Start the Backend Server

```bash
# Navigate to the backend folder
cd notes-app-backend

# Start the server
npm run dev
```

### Terminal 2: Start the Frontend Development Server

```bash
# Navigate to the frontend folder
cd notes-app-frontend

# Start the development server
npm run dev
```
