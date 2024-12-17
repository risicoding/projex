import { drizzle } from 'drizzle-orm/neon-serverless'
import { project, boardColumn } from './schema' // Import your tables

const db = drizzle('url')

async function seed() {
  console.log('Starting seed...')
  console.log(process.env.DATABASE_URL)

  // Insert Projects
  const projects = await db
    .insert(project)
    .values([
      {
        orgId: 'org1',
        creatorId: 'user1',
        name: 'Project Alpha',
      },
      {
        orgId: 'org2',
        creatorId: 'user2',
        name: 'Project Beta',
      },
    ])
    .returning()

  console.log('Inserted Projects:', projects)

  // Insert Board Columns
  const boardColumns = await db
    .insert(boardColumn)
    .values([
      {
        name: 'To Do',
        projectId: projects[0].id, // Link to Project Alpha
      },
      {
        name: 'In Progress',
        projectId: projects[0].id, // Link to Project Alpha
      },
      {
        name: 'Done',
        projectId: projects[1].id, // Link to Project Beta
      },
    ])
    .returning()

  console.log('Inserted Board Columns:', boardColumns)

  console.log('Seed complete!')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
