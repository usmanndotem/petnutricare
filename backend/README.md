# PetNutriCare Backend API

A comprehensive backend API for pet nutrition and health management system built with Node.js, TypeScript, Express, Prisma, and MongoDB Atlas.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 🐕 **Animal Profile Management** - Complete CRUD operations for pet profiles
- 🏥 **Medical Records** - Track vaccinations, checkups, treatments, and more
- 🍽️ **AI-Powered Meal Plans** - Generate personalized nutrition plans
- 📊 **Progress Tracking** - Monitor weight, height, and health metrics
- 👨‍⚕️ **Admin Panel** - User management and system administration
- 📁 **File Uploads** - Support for images and document attachments
- 🔒 **Security** - Rate limiting, CORS, helmet, and input validation

## Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: JWT
- **File Upload**: Multer
- **Image Processing**: Sharp
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- MongoDB Atlas account
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist your IP address or use `0.0.0.0/0` for development
5. Get your connection string from the "Connect" button

### 4. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# MongoDB Atlas Configuration
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/petnutricare_db?retryWrites=true&w=majority"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=3000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

### 5. Database Setup

Generate Prisma client and push schema to MongoDB:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### 6. Start the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user

### Animal Profiles
- `GET /api/animals` - Get all user's animals
- `GET /api/animals/:id` - Get specific animal
- `POST /api/animals` - Create new animal profile
- `PUT /api/animals/:id` - Update animal profile
- `DELETE /api/animals/:id` - Delete animal profile
- `POST /api/animals/:id/upload-image` - Upload animal image

### Medical Records
- `GET /api/medical-records/animal/:animalId` - Get animal's medical records
- `GET /api/medical-records/:id` - Get specific medical record
- `POST /api/medical-records` - Create medical record
- `PUT /api/medical-records/:id` - Update medical record
- `DELETE /api/medical-records/:id` - Delete medical record
- `POST /api/medical-records/:id/attachments` - Upload attachments

### Meal Plans
- `GET /api/meal-plans/animal/:animalId` - Get animal's meal plans
- `GET /api/meal-plans/:id` - Get specific meal plan
- `POST /api/meal-plans` - Create meal plan
- `PUT /api/meal-plans/:id` - Update meal plan
- `DELETE /api/meal-plans/:id` - Delete meal plan
- `POST /api/meal-plans/animal/:animalId/generate-ai` - Generate AI meal plan
- `POST /api/meal-plans/:id/items` - Add meal item
- `PUT /api/meal-plans/items/:itemId` - Update meal item
- `DELETE /api/meal-plans/items/:itemId` - Delete meal item

### Progress Tracking
- `GET /api/progress/animal/:animalId` - Get animal's progress entries
- `GET /api/progress/animal/:animalId/analytics` - Get progress analytics
- `GET /api/progress/:id` - Get specific progress entry
- `POST /api/progress` - Create progress entry
- `PUT /api/progress/:id` - Update progress entry
- `DELETE /api/progress/:id` - Delete progress entry
- `POST /api/progress/:id/photos` - Upload progress photos

### Admin (Admin role required)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get specific user
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/toggle-status` - Toggle user status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/animals` - Get all animals
- `GET /api/admin/logs` - Get system logs

## Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm test            # Run tests
```

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Prisma schema for MongoDB models
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── authController.ts
│   │   ├── animalController.ts
│   │   ├── medicalRecordController.ts
│   │   ├── mealPlanController.ts
│   │   ├── progressController.ts
│   │   └── adminController.ts
│   ├── routes/                # API route definitions
│   │   ├── authRoutes.ts
│   │   ├── animalRoutes.ts
│   │   ├── medicalRecordRoutes.ts
│   │   ├── mealPlanRoutes.ts
│   │   ├── progressRoutes.ts
│   │   └── adminRoutes.ts
│   ├── services/              # Business logic
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── mealPlanService.ts
│   │   ├── progressService.ts
│   │   └── aiService.ts
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── utils/                 # Utility functions
│   │   └── fileUtils.ts
│   └── index.ts               # Application entry point
├── uploads/                   # File upload directory
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Docker configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Database Schema

The application uses MongoDB with the following main collections:

- **users** - User accounts and profiles
- **animal_profiles** - Pet profiles and information
- **medical_records** - Veterinary records and health data
- **meal_plans** - Nutrition plans and feeding schedules
- **meal_items** - Individual food items in meal plans
- **progress_entries** - Health tracking and progress data
- **system_logs** - Application logs and monitoring

## Security Features

- JWT-based authentication
- Role-based access control (USER, ADMIN, VETERINARIAN)
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- CORS protection
- Helmet for security headers
- Input validation and sanitization
- File upload restrictions

## Development

### Adding New Features

1. Create/update Prisma schema in `prisma/schema.prisma`
2. Generate Prisma client: `npm run db:generate`
3. Push schema changes: `npm run db:push`
4. Create controller, service, and route files
5. Add validation rules
6. Test endpoints

### Environment Variables

All sensitive configuration should be stored in environment variables. See `.env.example` for required variables.

## Deployment

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in production mode
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

1. Set `NODE_ENV=production`
2. Update database URL for production MongoDB Atlas cluster
3. Set secure JWT secret
4. Configure CORS for production frontend URL
5. Run `npm run build`
6. Start with `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.
