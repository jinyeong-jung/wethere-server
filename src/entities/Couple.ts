import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";
import User from "./User";
import Chat from "./Chat";
import Place from "./Place";
import CoupleVerification from "./CoupleVerification";
import Feed from "./Feed";

@Entity()
class Couple extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  @JoinColumn()
  @OneToOne(type => User, user => user.coupleForPartnerOne)
  partnerOne: User;

  @JoinColumn()
  @OneToOne(type => User, user => user.coupleForPartnerTwo, { nullable: true })
  partnerTwo: User;

  @Column({ type: "text", nullable: true })
  firstDate: string;

  @OneToOne(type => Chat, chat => chat.couple)
  chat: Chat;

  @OneToMany(type => Place, place => place.couple)
  places: Place[];

  @OneToMany(type => Feed, feed => feed.couple)
  feeds: Feed[];

  @JoinColumn()
  @OneToOne(
    type => CoupleVerification,
    coupleVerification => coupleVerification.couple
  )
  coupleVerification: CoupleVerification;

  @CreateDateColumn()
  createdAt: string;
}

export default Couple;
