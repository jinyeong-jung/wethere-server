import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne
} from "typeorm";
import User from "./User";
import Chat from "./Chat";
import Place from "./Place";

@Entity()
class Couple extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => User, user => user.coupleForPartnerOne)
  partnerOne: User;

  @OneToMany(type => User, user => user.coupleForPartnerTwo)
  partnerTwo: User;

  @Column({ type: "text", nullable: true })
  firstDate: string;

  @OneToOne(type => Chat, chat => chat.couple)
  chat: Chat;

  @OneToMany(type => Place, place => place.couple)
  places: Place[];

  @CreateDateColumn()
  createdAt: string;
}

export default Couple;
