import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";
import { genderType } from "../types/types";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  username: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  nickname: string;

  @Column({ type: "text", enum: ["MALE", "FEMALE"], default: "MALE" })
  gender: genderType;

  @Column({ type: "text", nullable: true })
  birth: string;

  @Column({
    type: "text",
    enum: [
      "HAPPY",
      "DEPRESSED",
      "MAD",
      "ENERGIZED",
      "UNCERTAIN",
      "PEACEFUL",
      "CONFUSED"
    ],
    default: "HAPPY",
    nullable: true
  })
  status: string;

  @Column({ type: "text", nullable: true })
  profilePhoto: string;

  @Column({ type: "double precision", nullable: true, default: 0 })
  lastLat: number;

  @Column({ type: "double precision", nullable: true, default: 0 })
  lastLng: number;

  @CreateDateColumn()
  createdAt: string;
}

export default User;
