import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import Chat from "./Chat";
import User from "./User";
import Couple from "./Couple";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @Column({ type: "integer" })
  userId: number;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  @Column({ type: "integer" })
  coupleId: number;

  @ManyToOne(type => Couple, couple => couple.messages)
  couple: Couple;

  @CreateDateColumn()
  createdAt: string;
}

export default Message;
