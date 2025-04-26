# 🎵 MusicMood Backend

This is the backend server for **MusicMood**, a mood-tracking and melody-generating application.  
It manages user authentication, mood recording, and serves the data needed for generating music based on user moods.

---

## 🛠️ Tech Stack
- **Node.js** (runtime)
- **Express.js** (server framework)
- **MongoDB** (database)
- **React.js** (frontend library)

---

## 📦 Set up Instructions

### 📥 1. Clone the Repository

```bash
git clone https://github.com/your-username/musicmood-backend.git
cd musicmood-backend
```

### 📦 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed.  
Then install the backend dependencies:

```bash
npm install
```

---

### ⚙️ 3. Create Environment Variables

Create a `.env` file in the root of the project with the following structure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENTID=your_google_client_id
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

> Replace the placeholder values with your actual credentials.

---

### 🚀 4. Run the Server

Start the development server with:

```bash
nodemon server.js or node server.js
```

By default, the server will run on [http://localhost:5000](http://localhost:5000).

