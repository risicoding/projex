import { pgTable, varchar, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const project = pgTable('user', {
  id: serial('id').primaryKey(),
  orgId: varchar().notNull(),
  creatorId: varchar().notNull(),
  createdAt: timestamp().defaultNow(),
  name: text().notNull(),
})

export const boardItem = pgTable('boardItem', {
  id: serial('id').primaryKey(),
  name: varchar().notNull(),
  projectId: integer().references(() => project.id),
  parentId: integer().default(0),
})
