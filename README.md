# StudyHive 🧠✨  
An Online Group Study Platform for Collaborative Learning

## 📖 Project Overview

**StudyHive** is a full-stack web application designed to promote collaborative learning among students. Users can create, submit, and evaluate assignments in a friendly, interactive environment. It supports grading by peers and helps track assignment performance — making study sessions more engaging and productive.

## 🚀 Features

### 👤 Authentication
- Email/Password & Google login via Firebase
- JWT-based token authorization for secure access

### 📚 Assignment Management
- Create new assignments
- Submit responses with file links
- Evaluate others’ submissions (peer grading)
- View feedback and marks

### 🌗 UI & UX
- Theme toggling: Light/Dark mode
- Responsive design for all screen sizes
- Real-time feedback via toast and alerts

### 🔍 Utilities
- Search assignments by title
- Filter assignments by difficulty level (`easy`, `medium`, `hard`)

### 📄 Pages
**Public:**
- Home (with banner, feature showcase, and FAQ)

**Private:**
- All Assignments
- My Assignments
- Pending Reviews

## 🛠️ Tech Stack

**Frontend:**
- React
- React Router DOM
- Tailwind CSS + DaisyUI
- Firebase Authentication
- Axios
- SweetAlert2
- Lottie React
- React Toastify
- React Simple Typewriter
- React Icons

**Backend:**
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT)
- dotenv & CORS

## 🧰 Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/studyhive.git
   cd studyhive

2. **Frontend setup:**
cd client
npm install
npm run dev

2. **Backend setup:**
cd server
npm install
nodemon start


🌐 Live Site
🔗 [Visit StudyHive](https://studyhive-896d8.web.app/)