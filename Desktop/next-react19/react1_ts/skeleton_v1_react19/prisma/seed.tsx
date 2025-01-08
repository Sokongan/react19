import { hash } from "bcryptjs";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const createPermission = await prisma.permission.create({
    data: { type: 'create_user' },
  });

  const readPermission = await prisma.permission.create({
    data: { type: 'read_user' },
  });

  const updatePermission = await prisma.permission.create({
    data: { type: 'update_user' },
  });

  const deletePermission = await prisma.permission.create({
    data: { type: 'delete_user' },
  });

  // Create roles and assign permissions
  const adminRole = await prisma.role.create({
    data: {
      type: 'admin',
      permissions: {
        connect: [
          { id: createPermission.id },
          { id: readPermission.id },
          { id: updatePermission.id },
          { id: deletePermission.id },
        ],
      },
    },
  });

  const userRole = await prisma.role.create({
    data: {
      type: 'user',
      permissions: {
        connect: [
          { id: readPermission.id },
        ],
      },
    },
  });

  // Create a sample user
  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: await hash('password',10), // Ensure this is hashed in real scenarios
      first_name: 'Admin',
      last_name: 'Admin',
      active: true,
      roles:{ 
        connect: [
        { id: adminRole.id },
      ],},
    },
  });

  await prisma.user.create({
    data: {
      username: 'user',
      email: 'user@example.com',
      password: await hash('password',10), // Ensure this is hashed in real scenarios
      first_name: 'User',
      last_name: 'User',
      active: true,
      roles: {
        connect: [
          { id: userRole.id },
        ],
      },
    },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
