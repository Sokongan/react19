import { hash } from "bcryptjs";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Create Permissions
  const permissions = [
    { type: "user.create" },
    { type: "user.view" },
    { type: "user.update" },
    { type: "user.delete" },
  ];

  const createdPermissions = await Promise.all(
    permissions.map((permission) => prisma.permission.create({ data: permission }))
  );

  const roleTypes = [
    { name: "admin" },
    { name: "user" },
  ];

  const createdRoleTypes = await Promise.all(
    roleTypes.map((roleType) => prisma.roleType.create({ data: roleType }))
  );
  const adminRole = await prisma.role.create({
    data: {
      permissions: {
        connect: createdPermissions.map((permission) => ({ id: permission.id }))
      },
      role_types: {
        connect: [{ id: createdRoleTypes[0].id }] // Assuming 'admin' is the first role type
      }
    }
  });

  const userRole = await prisma.role.create({
    data: {
      permissions: {
        connect: createdPermissions.filter(permission => permission.type === 'user.view').map((permission) => ({ id: permission.id }))
      },
      role_types: {
        connect: [{ id: createdRoleTypes[1].id }] // Assuming 'user' is the second role type
      }
    }
  });
  console.log(adminRole.id)
  console.log(userRole.id)
  // Create Users with connected roles
  const users = [
    {
      username: "admin",
      email: "admin@example.com",
      password: await hash("password", 10),
      first_name: "Admin",
      last_name: "Admin",
      middle_name: null,
      roles: {
        connect: [{ id: adminRole.id }]
      }
    },
    {
      username: "user",
      email: "user@example.com",
      password: await hash("password", 10),
      first_name: "User",
      last_name: "User",
      middle_name: null,
      roles: {
        connect: [{ id: userRole.id }]
      }
    }
  ];

  await Promise.all(users.map((user) => prisma.user.create({ data: user })));

  console.log("Seeding complete.");
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
