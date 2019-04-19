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
import Message from "./Message";

@Entity()
class Couple extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  @Column({ type: "integer" })
  partnerOneId: number;

  @JoinColumn()
  @OneToOne(type => User, user => user.coupleForPartnerOne)
  partnerOne: User;

  @Column({ type: "integer", nullable: true })
  partnerTwoId: number;

  @JoinColumn()
  @OneToOne(type => User, user => user.coupleForPartnerTwo, { nullable: true })
  partnerTwo: User;

  @Column({ type: "text", nullable: true })
  firstDate: string;

  @JoinColumn()
  @OneToOne(type => Chat, chat => chat.couple)
  chat: Chat;

  @OneToMany(type => Message, message => message.couple)
  messages: Message[];

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
