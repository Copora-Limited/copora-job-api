import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class JobListing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  applicationNo: string;

  @Column({ type: 'varchar', nullable: true })
  jobTitle: string;

  @Column({ type: 'varchar', nullable: true })
  employmentType: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  group: string;

  @Column({ type: 'varchar', nullable: true })
  createdBy: string;

  @Column({ nullable: true, type: 'timestamp' })
  createdAt: Date;
}
