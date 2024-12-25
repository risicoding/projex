'use server';

import { getProjects } from '../utils/GetProjects';

export const GetProjectsAction = async () => {
  const res = await getProjects();
  return res;
};
