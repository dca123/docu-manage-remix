import type { Licensee, User } from "@prisma/client";
import {
  PrismaClient,
  Incorporation,
  Periodicity,
  Status,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const licensees: Licensee[] = [];
  const users: User[] = [];

  for (let i = 0; i < 5; i++) {
    const licensee = await createLicensee();
    licensees.push(licensee);
  }

  for (let i = 0; i < 5; i++) {
    const user = await createUser();
    users.push(user);
  }

  for (let i = 0; i < 10; i++) {
    await createDocument(
      faker.helpers.arrayElement(licensees),
      faker.helpers.arrayElement(users)
    );
  }
}

async function createLicensee() {
  return await prisma.licensee.create({
    data: {
      name: faker.company.name(),
      incorporation: faker.helpers.arrayElement(Object.values(Incorporation)),
    },
  });
}

async function createUser() {
  return await prisma.user.create({
    data: {
      email: faker.internet.email(),
      passwordHash:
        "$2a$12$WgNM9MfgWqay.R3NeoAiiucqr9pEwjGTZ6NiiXr7/c7/QhcdnzYK.",
    },
  });
}

async function createDocument(licensee: Licensee, user: User) {
  return await prisma.document.create({
    data: {
      periodicity: faker.helpers.arrayElement(Object.values(Periodicity)),
      serial: faker.date.past(),
      licenseeId: licensee.id,
      status: faker.helpers.arrayElement(Object.values(Status)),
      userId: user.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
