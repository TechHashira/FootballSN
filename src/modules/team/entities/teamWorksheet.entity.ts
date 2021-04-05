import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContractWorksheetEntity } from './contract_worksheet.entity';
import { TeamEntity } from './team.entity';

@Entity({ name: 'team_worksheet' })
export class TeamWorksheetEntity {
  @PrimaryGeneratedColumn('uuid')
  team_worksheet_id: string;

  @OneToOne(() => TeamEntity)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;

  @OneToMany(
    () => ContractWorksheetEntity,
    (contract_worksheet) => contract_worksheet.team_worksheet,
  )
  @JoinColumn({ name: 'contract_worksheet_id' })
  contract_worksheets: ContractWorksheetEntity[];
}
