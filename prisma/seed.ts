import {
  PrismaClient,
  Incorporation,
  Licensee,
  Periodicity,
  Status,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const licensees: Licensee[] = [];

  for (let i = 0; i < 5; i++) {
    const licensee = await createLicensee();
    licensees.push(licensee);
  }

  for (let i = 0; i < 10; i++) {
    await createDocument(faker.helpers.arrayElement(licensees));
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

async function createDocument(licensee: Licensee) {
  return await prisma.document.create({
    data: {
      periodicity: faker.helpers.arrayElement(Object.values(Periodicity)),
      serial: faker.date.past(),
      licenseeId: licensee.id,
      status: faker.helpers.arrayElement(Object.values(Status)),
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
