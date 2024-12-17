import { create } from 'zustand'
import { Project } from '../types/project'
import { v4 as uuidv4 } from 'uuid'

interface ProjectStore {
  projects: Project[]
  initializeProject: (projects: Project[]) => void
  addProjects: (project: { name: string }) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],

  initializeProject: (payload: Project[]) =>
    set(() => ({
      projects: [...payload],
    })),

  addProjects: (project) =>
    set(({ projects }) => ({
      projects: [
        ...projects,
        {
          ...project,
          id: projects[projects.length - 1].id + 1,
          orgId: uuidv4(),
        },
      ],
    })),
}))
