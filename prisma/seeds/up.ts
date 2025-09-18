import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function main() {
  try {
    // Create admin user if it doesn't exist
    const adminEmail = 'admin@test.com';
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword('000000');

      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          emailVerified: true,
          fullName: 'super admin',
          password: hashedPassword, // Use environment variables for passwords
          role: 'ADMIN',
          profileStatus: 'ACTIVE',
          gender: 'MALE',
          dob: new Date('2020-06-04'),
          mobileNumber: '+910000000000',
          mobileNumberVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log(`Created admin user: ${admin.email}`);
    } else {
      console.log('Admin user already exists, skipping creation');
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
