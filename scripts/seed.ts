const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "Fantasy"},
        { name: "Mystery"},
        { name: "Zombie"},
        { name: "Apocalypic"},
        { name: "Cyberpunk"},
        { name: "Weird"},
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

main();