# PetNutriCare Frontend

A modern React frontend for PetNutriCare - Pet nutrition and health management system.

## Features

- 🎨 **Modern UI** - Built with React, TypeScript, and Tailwind CSS
- 🔐 **Authentication** - JWT-based authentication with backend API
- 🐕 **Pet Management** - Complete pet profile management
- 🏥 **Medical Records** - Track vaccinations, checkups, and treatments
- 🍽️ **AI Meal Plans** - AI-powered nutrition planning
- 📊 **Progress Tracking** - Monitor pet health and growth
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React hooks
- **HTTP Client**: Fetch API with custom service layer
- **Authentication**: JWT tokens

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=PetNutriCare
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── figma/          # Figma-specific components
│   │   ├── ApiTest.tsx     # API connection test
│   │   ├── CreateProfile.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Header.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MealPlan.tsx
│   │   └── ViewProfiles.tsx
│   ├── services/           # API services
│   │   └── api.ts          # Main API service
│   ├── styles/             # Global styles
│   │   └── globals.css
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## API Integration

The frontend communicates with the backend API through the `ApiService` class located in `src/services/api.ts`. This service handles:

- Authentication (login, register, profile)
- Animal management
- Medical records
- Meal plans
- Progress tracking

## Development

### Adding New Components

1. Create your component in `src/components/`
2. Import and use in your pages
3. Follow the existing naming conventions

### API Calls

Use the `ApiService` for all backend communication:

```typescript
import { ApiService } from '../services/api';

// Example: Get animals
const animals = await ApiService.getAnimals();
```

### Styling

The project uses Tailwind CSS for styling. Follow the existing design patterns and color scheme:

- Primary: `#7ED9B9` (mint green)
- Secondary: `#5EC7E8` (sky blue)
- Dark: `#2A4B7C` (navy blue)

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

3. Update the `VITE_API_URL` environment variable for production

## Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is licensed under the MIT License.
