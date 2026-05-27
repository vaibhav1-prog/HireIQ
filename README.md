# HireIQ

HireIQ is a full-stack MERN job portal that allows employers to post jobs and candidates to apply with resume uploads.

## Live Demo

- Live Website: https://hire-iq-livid.vercel.app
- GitHub Repository: https://github.com/vaibhav1-prog/HireIQ

## Features

- Role-based Authentication
- Job Posting & Management
- Job Search & Applications
- Resume Upload Support
- Protected Routes
- Responsive UI

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary

## Installation

### Clone Repository

```bash
git clone https://github.com/vaibhav1-prog/HireIQ.git
cd HireIQ
```

### Backend Setup

```bash
cd backend
npm install
npm start/ npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend `.env`

```env
PORT=4000
DB_URL=your_mongodb_url
JWT_SECRET_KEY=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:4000/api/v1
```

## Author

Vaibhav Baishkhiyar

- GitHub: https://github.com/vaibhav1-prog
- LinkedIn: https://www.linkedin.com/in/vaibhav-baishkhiyar108/