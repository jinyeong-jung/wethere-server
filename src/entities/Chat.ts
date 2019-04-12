import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne
} from "typeorm";
import Message from "./Message";
import Couple from "./Couple";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @OneToOne(type => Couple, couple => couple.chat)
  couple: Couple;

  @CreateDateColumn()
  createdAt: string;
}

export default Chat;
