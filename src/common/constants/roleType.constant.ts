export enum Role {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER',
  SPECTATOR = 'SPECTATOR',
  COACH = 'COACH',
  REFEREE = 'REFEREE',
}

export enum Notification {
  PLAYER2TEAM = 'PLAYER2TEAM',
  TEAM2PLAYER = 'TEAM2PLAYER',
  REACTION = 'REACTION',
  TEAM2TOURNAMENT = 'TEAM2TOURNAMENT',
  TOURNAMENT2TEAM = 'TOURNAMENT2TEAM',
}

export enum TournamentState {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
  SEMIPUBLIC = 'SEMIPUBLIC',
}
export const ROLES_KEY = 'roles';
