import "dotenv/config";
import createDatabaseConnection from ".";
import * as schema from "./schema";
import { faker } from "@faker-js/faker";
import logger from "../utils/logger";

const { db, connection } = await createDatabaseConnection();

const USER_ID_1 = "1111";
const USER_ID_2 = "2222";
const STATES = [
  {
    title: "Done",
    color: "#9fd3c7",
  },
  {
    title: "Pending",
    color: "#dbd8e3",
  },
  {
    title: "Done",
    color: "#9fd3c7",
  },
  {
    title: "InProgress",
    color: "#79c2d0",
  },
  {
    title: "Scheduled",
    color: "#ff9a3c",
  },
  {
    title: "Unscheduled",
    color: "#263849",
  },
];
const CATEGORIES = [
  {
    title: "Homework",
  },
  {
    title: "Health and Wellness",
  },
  {
    title: "Home Maintenance",
  },
  {
    title: "Education",
  },
  {
    title: "Hobbies",
  },
  {
    title: "Creativity",
  },
  {
    title: "Daily Routine",
  },
];

async function createUsers(): Promise<void> {
  await db.insert(schema.users).values([
    {
      userId: USER_ID_1,
      theme: "DARK",
    },
    {
      userId: USER_ID_2,
      theme: "DARK",
    },
  ]);
}
async function createUsersStates(userId: string): Promise<void> {
  const randomNumber = faker.number.int({ min: 0, max: 4 });

  Array.from({ length: randomNumber }, async () => {
    await db.insert(schema.states).values({
      title: faker.word.noun(),
      color: faker.color.rgb(),
      userId,
    });
  });
}
async function createUsersCategories(userId: string): Promise<void> {
  const randomNumber = faker.number.int({ min: 0, max: 4 });

  Array.from({ length: randomNumber }, async () => {
    await db.insert(schema.categories).values({
      title: faker.commerce.department(),
      userId,
    });
  });
}

async function createStates(): Promise<void> {
  STATES.forEach(async (state) => {
    await db.insert(schema.states).values(state);
  });
}
async function createCategories(): Promise<void> {
  CATEGORIES.forEach(
    async (category) => await db.insert(schema.categories).values(category)
  );
}

async function createTask(
  userId: string,
  parentId: number | null
): Promise<number> {
  const randomId = faker.number.int({ min: 0, max: 999_999 });

  await db?.transaction(async (tx) => {
    const createdTask = await tx.insert(schema.tasks).values({
      id: randomId,
      parentId,
      title: faker.word.verb(),
      description: faker.finance.transactionDescription(),
      dueDate: faker.date.future({ years: 1 }),
      stateId: faker.number.int({ min: 1, max: 6 }),
      categoryId: faker.number.int({ min: 1, max: 7 }),
    });
    await tx
      .insert(schema.usersTasks)
      .values({ taskId: createdTask[0].insertId, userId });
  });

  return randomId;
}

async function createUsersTask(userId: string): Promise<void> {
  const randomNumber = faker.number.int({ min: 1, max: 10 });

  Array.from({ length: randomNumber }, async () => {
    const randomSubtasksNumber = faker.number.int({ min: 0, max: 5 });

    const parentId = await createTask(userId, null);

    Array.from({ length: randomSubtasksNumber }, async () => {
      await createTask(userId, parentId);
    });
  });
}

async function seed(): Promise<void> {
  await createStates();
  await createCategories();
  await createUsers();
  await createUsersStates(USER_ID_1);
  await createUsersStates(USER_ID_2);
  await createUsersCategories(USER_ID_1);
  await createUsersCategories(USER_ID_2);
  await createUsersTask(USER_ID_1);
  await createUsersTask(USER_ID_2);
}

// seed()
//   .then(() => {
//     console.info("Database seeded successfully");
//     setTimeout(() => {}, 1000);
//     connection.end();
//   })
//   .catch((error) => console.error(error));

try {
  await seed();
  logger.info("Database seeded successfully");
  setTimeout(() => connection.end(), 300);
} catch (error) {
  logger.error(error);
}
