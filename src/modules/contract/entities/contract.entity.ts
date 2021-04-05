import { ContractState } from 'src/common/constants/contractState.constant';
import { PlayerEntity } from 'src/modules/player/entities';
import { ContractWorksheetEntity } from 'src/modules/team/entities/contract_worksheet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'contract' })
export class ContractEntity {
  @PrimaryGeneratedColumn('uuid')
  contractId: string;

  @Column({ type: 'enum', enum: ContractState, default: ContractState.Free })
  contract_state: ContractState;

  @OneToOne(() => PlayerEntity)
  @JoinColumn({ name: 'playerId' })
  player: PlayerEntity;

  @ManyToOne(
    () => ContractWorksheetEntity,
    (contract_worksheet) => contract_worksheet.contracts,
  )
  @JoinColumn({ name: 'contract_worksheet_id' })
  contract_worksheet: ContractWorksheetEntity;

  @Column({ default: null, nullable: true })
  contract_worksheet_id?: string;
}
