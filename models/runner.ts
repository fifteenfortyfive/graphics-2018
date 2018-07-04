import { Team } from './team';

export interface Runner {
  name: string;
  team: Team;
  twitter: string;
  twitch: string;
  avatar_url: string;
}
