import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Dropping database...');

  // Ensure a clean slate by deleting all records
  await prisma.boardItem.deleteMany({});
  await prisma.boardColumn.deleteMany({});
  await prisma.project.deleteMany({});

  console.log('Seeding database...');

  // Define default columns
  const DEFAULT_KANBAN_COLUMNS = [
    { name: 'Backlog', slug: 'backlog' },
    { name: 'To Do', slug: 'to-do' },
    { name: 'In Progress', slug: 'in-progress' },
    { name: 'Done', slug: 'done' },
  ];

  // Helper function to generate random items
  function generateBoardItems(columnSlug: string, itemCount: number) {
    const items = [];
    for (let i = 0; i <= itemCount; i++) {
      items.push({
        name: `${columnSlug} Item ${i + 1}`,
        position: i,
      });
    }
    return items;
  }

  // Create a sample project with columns and items
  const project = await prisma.project.create({
    data: {
      name: 'Sample Project',
      orgId: 'org_123',
      creatorId: 'user_123',
      columns: {
        create: DEFAULT_KANBAN_COLUMNS.map((column) => ({
          name: column.name,
          slug: column.slug,
          items: {
            create: generateBoardItems(column.slug, Math.floor(Math.random() * 5) + 1), // Generate 1-5 items per column
          },
        })),
      },
    },
  });

  console.log('Seeded Project:', project);
}

main()
  .then(() => {
    console.log('Database seeding completed!');
    return prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    prisma.$disconnect();
    process.exit(1);
  });
