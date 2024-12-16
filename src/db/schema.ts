import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  serial,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const project = pgTable("user", {
  id: serial("id").primaryKey(),
  orgId: varchar().notNull(),
  creatorId: varchar().notNull(),
  createdAt: timestamp().defaultNow(),
  name: text().notNull(),
});

export const projectRelations = relations(project, ({ many }) => ({
  boardColumns: many(boardColumn),
}));

export const boardColumn = pgTable("boardColumn", {
  id: serial("id").primaryKey(),
  name: text(),
  projectId: integer().references(()=>project.id)
});

export const boardColumnRelations = relations(boardColumn, ({ one }) => ({
  project: one(project, {
    fields: [boardColumn.projectId],
    references: [project.id],
  }),
}));
