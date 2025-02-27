import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum CampaignStatus {
  ACTIVE = 'ativa',
  PAUSED = 'pausada',
  EXPIRED = 'expirada',
}

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deleteadAt?: Date | null;

  @Column()
  startDate: Date;

  @Column()
  endDate?: Date;

  @Column({ type: 'enum', enum: CampaignStatus })
  status: CampaignStatus;

  @Column()
  category: string;
}
