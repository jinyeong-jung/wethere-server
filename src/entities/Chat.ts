import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  Column
} from "typeorm";
import Message from "./Message";
import Couple from "./Couple";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.chat, { cascade: true })
  messages: Message[];

  @Column({ type: "integer" })
  coupleId: number;

  @OneToOne(type => Couple, couple => couple.chat)
  couple: Couple;

  @CreateDateColumn()
  createdAt: string;
}

export default Chat;
