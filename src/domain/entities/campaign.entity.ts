import { CampaignStatus } from '@shared/const/status-campaign';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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
