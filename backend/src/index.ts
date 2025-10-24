import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Fallback in-memory storage for when database is unavailable
const fallbackUsers: Array<{
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}> = [];

// Check database connection
let dbConnected = false;
prisma.$connect()
  .then(() => {
    dbConnected = true;
    console.log('✅ Database connected successfully');
  })
  .catch((error) => {
    console.log('⚠️ Database connection failed, using fallback storage:', error.message);
    dbConnected = false;
    
    // Add some sample users to fallback storage
    fallbackUsers.push({
      id: 'user-1',
      email: 'admin@petnutricare.com',
      password: '$2a$12$UR7Yv1ZWP6DPMuusunAvCu3R28W.X8BpkKGUVHiOpdxBkuMZ7/A6O', // admin123
      firstName: 'Admin',
      lastName: 'User',
      role: 'VETERINARIAN',
      createdAt: new Date().toISOString()
    });
    
    fallbackUsers.push({
      id: 'user-2',
      email: 'owner@petnutricare.com',
      password: '$2a$12$UR7Yv1ZWP6DPMuusunAvCu3R28W.X8BpkKGUVHiOpdxBkuMZ7/A6O', // owner123
      firstName: 'Pet',
      lastName: 'Owner',
      role: 'USER',
      createdAt: new Date().toISOString()
    });
    
    console.log('📝 Fallback data initialized with', fallbackUsers.length, 'users');
  });

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(cors({
  origin: process.env['FRONTEND_URL'] || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    message: 'PetNutriCare Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development',
    uptime: process.uptime()
  });
});

// API routes
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    message: 'PetNutriCare Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'] || 'development',
    uptime: process.uptime()
  });
});

// Simple session storage for demo (in production, use proper JWT)
const sessions: Map<string, string> = new Map();

// Basic auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    let user;
    
    if (dbConnected) {
      // Try database first
      try {
        user = await prisma.user.findUnique({
          where: { email }
        });
        
        if (user) {
          // Check password
          const isValidPassword = await bcrypt.compare(password, user.password);
          
          if (!isValidPassword) {
            return res.status(401).json({ 
              success: false,
              message: 'Invalid credentials' 
            });
          }

          // Check if user is active
          if (!user.isActive) {
            return res.status(401).json({ 
              success: false,
              message: 'Account is deactivated' 
            });
          }
        }
      } catch (dbError) {
        console.log('Database error, falling back to in-memory storage');
        dbConnected = false;
      }
    }
    
    // Fallback to in-memory storage
    if (!user) {
      user = fallbackUsers.find(u => u.email === email);
      
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
      }
      
      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
      }
    }

    // Create session token
    const token = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    sessions.set(token, user.id);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required' 
      });
    }

    // Check if user already exists
    let existingUser;
    
    if (dbConnected) {
      try {
        existingUser = await prisma.user.findUnique({
          where: { email }
        });
      } catch (dbError) {
        console.log('Database error, falling back to in-memory storage');
        dbConnected = false;
      }
    }
    
    // Check fallback storage
    if (!existingUser) {
      existingUser = fallbackUsers.find(u => u.email === email);
    }
    
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    if (dbConnected) {
      try {
        // Create new user in database
        const newUser = await prisma.user.create({
          data: {
            id: new ObjectId().toString(),
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: role || 'USER', // Default to USER if no role specified
            isActive: true
          }
        });
        
        // Create session token
        const token = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        sessions.set(token, newUser.id);
        
        res.status(201).json({
          success: true,
          message: 'User created successfully',
          data: {
            token,
            user: {
              id: newUser.id,
              email: newUser.email,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              role: newUser.role
            }
          }
        });
        return;
      } catch (dbError) {
        console.log('Database error, falling back to in-memory storage');
        dbConnected = false;
      }
    }
    
    // Fallback: Create user in memory
    const newUser = {
      id: 'user-' + Date.now(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'USER',
      createdAt: new Date().toISOString()
    };
    
    fallbackUsers.push(newUser);
    
    // Create session token
    const token = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    sessions.set(token, newUser.id);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
});

app.get('/api/auth/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    const token = authHeader.substring(7);
    
    // Get user ID from session
    const userId = sessions.get(token);
    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
    
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
});

// Logout endpoint
app.post('/api/auth/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided' 
      });
    }

    const token = authHeader.substring(7);
    
    // Remove session
    sessions.delete(token);
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
});

// Animals routes
app.get('/api/animals', async (_req, res) => {
  try {
    // Mock animals data for testing
    const animals = [
      {
        id: 'animal-1',
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        weight: 25.5,
        healthConditions: ['None'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'animal-2',
        name: 'Whiskers',
        species: 'Cat',
        breed: 'Persian',
        age: 2,
        weight: 4.2,
        healthConditions: ['None'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    res.json({ animals });
  } catch (error) {
    console.error('Get animals error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/animals', async (req, res) => {
  try {
    const { name, species, breed, age, weight, healthConditions } = req.body;
    
    // Mock animal creation for testing
    const animal = {
      id: 'animal-' + Date.now(),
      name: name || 'New Pet',
      species: species || 'Unknown',
      breed: breed || 'Mixed',
      age: parseInt(age) || 1,
      weight: parseFloat(weight) || 5.0,
      healthConditions: healthConditions || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    res.status(201).json({ animal });
  } catch (error) {
    console.error('Create animal error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PetNutriCare Backend API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api/*`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
