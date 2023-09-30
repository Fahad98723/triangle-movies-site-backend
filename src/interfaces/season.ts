import { Episode } from './episode';

export type Season = {
  number: number; // Season number
  episodes?: Episode[]; // Array of episode objects
  zipfile?: [];
};
