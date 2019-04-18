import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import User from "./User";
import Feed from "./Feed";

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  feedId: number;

  @ManyToOne(type => Feed, feed => feed.comments)
  feed: Feed;

  @Column({ type: "text" })
  text: string;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @CreateDateColumn()
  createdAt: string;
}

export default Comment;
