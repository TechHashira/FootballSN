export interface ITeamProperties {
  teamId?: string;
  team_name?: string;
  goals?: number;
}

export interface IMatchProperties {
  teams: ITeamProperties[];
}
