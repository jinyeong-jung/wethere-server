import bcrypt from "bcrypt";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  OneToOne
} from "typeorm";
import { genderType, loginProvider } from "../types/types";
import Feed from "./Feed";
import Couple from "./Couple";
import Comment from "./Comment";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  username: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({
    type: "text",
    enum: ["LOCAL", "FACEBOOK", "GOOGLE", "KAKAO", "NAVER"],
    default: "LOCAL"
  })
  loginProvider: loginProvider;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text", nullable: true })
  facebookId: string;

  @Column({ type: "text", nullable: true })
  googleId: string;

  @Column({ type: "text", nullable: true })
  kakaoId: string;

  @Column({ type: "text", nullable: true })
  naverId: string;

  @Column({ type: "text", nullable: true, default: "새로 태어난 자" })
  nickname: string;

  @Column({
    type: "text",
    enum: ["MALE", "FEMALE"],
    default: "MALE",
    nullable: true
  })
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

  @OneToMany(type => Feed, feed => feed.user)
  feeds: Feed[];

  @Column({ type: "integer", nullable: true })
  coupleForPartnerOneId: number;

  @OneToOne(type => Couple, couple => couple.partnerOne)
  coupleForPartnerOne: Couple;

  @Column({ type: "integer", nullable: true })
  coupleForPartnerTwoId: number;

  @OneToOne(type => Couple, couple => couple.partnerTwo)
  coupleForPartnerTwo: Couple;

  @OneToMany(type => Comment, comment => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
