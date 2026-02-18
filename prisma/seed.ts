import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { PrismaClient } from 'src/generated/prisma/client';

dotenv.config();
// Support prefixed env vars the same way as the app (LOCAL_/DEV_/PROD_)
const nodeEnv = (process.env.NODE_ENV || 'local').toLowerCase();
const prefixMap: Record<string, string> = { local: 'LOCAL', dev: 'DEV', prod: 'PROD' };
const prefix = prefixMap[nodeEnv] || 'LOCAL';

function getEnv(key: string, fallback?: string) {
  return process.env[`${prefix}_${key}`] ?? process.env[key] ?? fallback;
}

const adapter = new PrismaPg({
  connectionString: getEnv('DATABASE_URL', process.env.DATABASE_URL)!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  const email = getEnv('SEED_USER_EMAIL', 'admin@example.com') || 'admin@example.com';
  const password = getEnv('SEED_USER_PASSWORD', 'Admin@123456') || 'Admin@123456';
  const firstName = getEnv('SEED_USER_FIRST_NAME', 'Admin') || 'Admin';
  const lastName = getEnv('SEED_USER_LAST_NAME', 'User') || 'User';

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`User with email ${email} already exists. Skipping seed.`);
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      hashPassword: hashedPassword, // keep field name aligned with your Prisma schema
    },
  });

  console.log('Seed completed successfully!');
  console.log(`Created user: ${user.email}`);
}

main()
  .catch((error) => {
    console.error('Error during seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
