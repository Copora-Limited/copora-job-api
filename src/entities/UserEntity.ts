import { UserRole, AccountStatus, OnboardingStatus } from '../constants';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Application } from './ApplicationEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({nullable: true})
  phoneNumber: string;

  @Column()
  password: string;

  @Column({nullable: true})
  profilePicture: string;

  @Column({default: 0})
  onboardingStep: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: OnboardingStatus.InvitationSent,
  })
  onboardingStatus: OnboardingStatus;

  @Column({
    type: 'boolean',  
    default: false,
  })
  resetPassword: boolean;

  @Column({ type: 'varchar', nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;

  @Column({ type: 'varchar', nullable: true })
  twoFactorToken: string;

  @Column({ type: 'timestamp', nullable: true })
  twoFactorExpires: Date;

  @Column({ type: 'boolean', default: false })
  twoFactorEnabled: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  accountStatus: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column()
  createdBy: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  verificationToken: string;

  @Column({ type: 'varchar', unique: true })
  applicationNo: string;

  @Column({
    type: 'varchar',
    default: UserRole.Applicant,
  })
  role: UserRole;
  
}
