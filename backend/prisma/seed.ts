import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  // Check if admin user already exists
  let adminUser = await prisma.user.findUnique({
    where: { email: 'admin@petnutricare.com' }
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        id: new ObjectId().toString(),
        email: 'admin@petnutricare.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isActive: true
      }
    });
  }

  console.log('✅ Admin user created:', adminUser.email);

  // Create test user
  let testUser = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  });

  if (!testUser) {
    testUser = await prisma.user.create({
      data: {
        id: new ObjectId().toString(),
        email: 'test@example.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        role: 'USER',
        isActive: true
      }
    });
  }

  console.log('✅ Test user created:', testUser.email);

  // Create sample animal profiles
  const dogProfile = await prisma.animalProfile.create({
    data: {
      id: new ObjectId().toString(),
      name: 'Buddy',
      species: 'DOG',
      breed: 'Golden Retriever',
      age: 3,
      weight: 65.5,
      gender: 'MALE',
      color: 'Golden',
      description: 'Friendly and energetic golden retriever',
      userId: testUser.id
    }
  });

  const catProfile = await prisma.animalProfile.create({
    data: {
      id: new ObjectId().toString(),
      name: 'Whiskers',
      species: 'CAT',
      breed: 'Persian',
      age: 2,
      weight: 8.2,
      gender: 'FEMALE',
      color: 'White',
      description: 'Calm and affectionate Persian cat',
      userId: testUser.id
    }
  });

  console.log('✅ Sample animal profiles created');

  // Create sample medical records
  await prisma.medicalRecord.create({
    data: {
      id: new ObjectId().toString(),
      title: 'Annual Checkup',
      description: 'Routine annual health examination',
      type: 'CHECKUP',
      date: new Date('2024-01-15'),
      veterinarian: 'Dr. Smith',
      notes: 'All vital signs normal, vaccinations up to date',
      userId: testUser.id,
      animalId: dogProfile.id
    }
  });

  await prisma.medicalRecord.create({
    data: {
      id: new ObjectId().toString(),
      title: 'Rabies Vaccination',
      description: 'Annual rabies vaccination',
      type: 'VACCINATION',
      date: new Date('2024-01-15'),
      veterinarian: 'Dr. Smith',
      notes: 'Rabies vaccine administered, next due in 1 year',
      userId: testUser.id,
      animalId: dogProfile.id
    }
  });

  console.log('✅ Sample medical records created');

  // Create sample meal plans
  const mealPlan = await prisma.mealPlan.create({
    data: {
      id: new ObjectId().toString(),
      title: 'Adult Dog Nutrition Plan',
      description: 'Balanced nutrition plan for adult golden retriever',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'ACTIVE',
      aiGenerated: false,
      rationale: 'High-quality protein diet with appropriate caloric content for active adult dog',
      userId: testUser.id,
      animalId: dogProfile.id,
      mealItems: {
        create: [
          {
            id: new ObjectId().toString(),
            name: 'High-Quality Dry Food',
            description: 'Premium dog kibble',
            quantity: '2-3 cups',
            frequency: 'twice daily',
            timeOfDay: 'morning and evening',
            notes: 'Adult formula'
          },
          {
            id: new ObjectId().toString(),
            name: 'Fresh Water',
            description: 'Clean, fresh water',
            quantity: 'unlimited',
            frequency: 'always available',
            timeOfDay: 'anytime',
            notes: 'Change water daily'
          }
        ]
      }
    }
  });

  console.log('✅ Sample meal plan created');

  // Create sample progress entries
  await prisma.progressEntry.create({
    data: {
      id: new ObjectId().toString(),
      weight: 65.5,
      height: 24.0,
      notes: 'Regular checkup - weight stable',
      date: new Date('2024-01-15'),
      userId: testUser.id,
      animalId: dogProfile.id
    }
  });

  await prisma.progressEntry.create({
    data: {
      id: new ObjectId().toString(),
      weight: 65.2,
      height: 24.0,
      notes: 'Monthly weight check - slight decrease',
      date: new Date('2024-02-15'),
      userId: testUser.id,
      animalId: dogProfile.id
    }
  });

  console.log('✅ Sample progress entries created');

  // Create system log entry
  await prisma.systemLog.create({
    data: {
      id: new ObjectId().toString(),
      level: 'INFO',
      message: 'Database seeded successfully',
      metadata: {
        seededAt: new Date().toISOString(),
        usersCreated: 2,
        animalsCreated: 2,
        recordsCreated: 2,
        mealPlansCreated: 1,
        progressEntriesCreated: 2
      }
    }
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📋 Sample Data Summary:');
  console.log('- Admin User: admin@petnutricare.com (password: admin123)');
  console.log('- Test User: test@example.com (password: admin123)');
  console.log('- 2 Animal Profiles (Buddy the dog, Whiskers the cat)');
  console.log('- 2 Medical Records');
  console.log('- 1 Meal Plan with 2 items');
  console.log('- 2 Progress Entries');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
