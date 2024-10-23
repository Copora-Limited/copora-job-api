import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class JobListing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  applicationNo: string;

  @Column({ nullable: true })
  jobTitle: string;

  @Column({ nullable: true })
  employmentType: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  group: string;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true, type: 'timestamp' })
  createdAt: Date;
}
