import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from "typeorm";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;
}

export default Chat;
