import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToOne
} from "typeorm";
import Couple from "./Couple";

@Entity()
class CoupleVerification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  @OneToOne(type => Couple, couple => couple.coupleVerification)
  couple: Couple;

  @CreateDateColumn()
  createdAt: string;

  @BeforeInsert()
  createKey(): void {
    this.key = Math.floor(Math.random() * 1000000).toString();
  }
}

export default CoupleVerification;
