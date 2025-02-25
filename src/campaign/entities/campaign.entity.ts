import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'enum', enum: CampaignStatus, default: CampaignStatus.ACTIVE })
  status: CampaignStatus;

  @Column()
  category: string;
}
