# PetNutriCare - Complete Application

A comprehensive pet nutrition and health management system with AI-powered meal planning.

## 🏗️ Project Structure

```
PetNutriCare Frontend Design (1)/
├── backend/                 # Node.js + TypeScript + MongoDB API
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── routes/         # Express routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # MongoDB database schema
│   │   └── seed.ts         # Sample data
│   ├── uploads/            # File uploads directory
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables
│   └── README.md           # Backend documentation
├── frontend/               # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   ├── styles/         # Global styles
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # App entry point
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.ts      # Vite configuration
│   ├── .env                # Frontend environment variables
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB Atlas connection string
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Backend will run on `http://localhost:3000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔧 Features

### Backend API
- **Authentication**: JWT-based auth with role management
- **Pet Management**: Complete CRUD for pet profiles
- **Medical Records**: Track vaccinations, checkups, treatments
- **AI Meal Plans**: Generate personalized nutrition plans
- **Progress Tracking**: Monitor weight, height, health metrics
- **File Uploads**: Support for images and documents
- **Admin Panel**: User management and system administration

### Frontend
- **Modern UI**: React + TypeScript + Tailwind CSS
- **Responsive Design**: Works on all devices
- **Authentication**: Login/register with JWT
- **Pet Profiles**: Create and manage pet information
- **Medical Records**: View and add medical history
- **Meal Planning**: AI-generated nutrition plans
- **Progress Tracking**: Visual health monitoring
- **Real-time Updates**: Live data synchronization

## 📊 Database Schema

The application uses MongoDB with the following collections:

- **users**: User accounts and profiles
- **animal_profiles**: Pet profiles and information
- **medical_records**: Veterinary records and health data
- **meal_plans**: Nutrition plans and feeding schedules
- **meal_items**: Individual food items in meal plans
- **progress_entries**: Health tracking and progress data
- **system_logs**: Application logs and monitoring

## 🔐 Authentication

The system supports three user roles:
- **USER**: Pet owners and caregivers
- **VETERINARIAN**: Veterinary professionals
- **ADMIN**: System administrators

## 🧪 Sample Data

The database is seeded with sample data:
- **Admin User**: `admin@petnutricare.com` (password: `admin123`)
- **Test User**: `test@example.com` (password: `admin123`)
- **Sample Animals**: Buddy (Golden Retriever) & Whiskers (Persian Cat)
- **Medical Records**: Annual checkup & rabies vaccination
- **Meal Plans**: Adult dog nutrition plan
- **Progress Entries**: Weight tracking data

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Animals
- `GET /api/animals` - Get all user's animals
- `POST /api/animals` - Create animal profile
- `GET /api/animals/:id` - Get specific animal

### Medical Records
- `GET /api/medical-records/animal/:animalId` - Get animal's records
- `POST /api/medical-records` - Create medical record

### Meal Plans
- `GET /api/meal-plans/animal/:animalId` - Get animal's meal plans
- `POST /api/meal-plans/animal/:animalId/generate-ai` - Generate AI meal plan

### Progress Tracking
- `GET /api/progress/animal/:animalId` - Get progress entries
- `POST /api/progress` - Create progress entry

### Admin (Admin role required)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get system statistics

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Start the server: `npm start`
4. Use PM2 or similar for process management

### Frontend Deployment
1. Update `VITE_API_URL` for production
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting service

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
JWT_SECRET="your-jwt-secret"
PORT=3000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)
```env
VITE_API_URL="http://localhost:3000"
VITE_APP_NAME="PetNutriCare"
VITE_APP_VERSION="1.0.0"
VITE_NODE_ENV="development"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the individual README files in `backend/` and `frontend/`
- Open an issue in the repository
- Contact the development team

---

**Happy coding! 🐾**
