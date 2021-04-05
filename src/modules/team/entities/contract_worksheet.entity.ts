import { ContractEntity } from 'src/modules/contract/entities';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamWorksheetEntity } from './teamWorksheet.entity';

@Entity({ name: 'contract_worksheet' })
export class ContractWorksheetEntity {
  @PrimaryGeneratedColumn('uuid')
  contract_worksheet_id: string;

  @ManyToOne(
    () => TeamWorksheetEntity,
    (team_worksheet) => team_worksheet.contract_worksheets,
  )
  @JoinColumn({ name: 'team_worksheet_id' })
  team_worksheet: TeamWorksheetEntity;

  @OneToMany(() => ContractEntity, (contract) => contract.contract_worksheet)
  contracts: ContractEntity[];
}
