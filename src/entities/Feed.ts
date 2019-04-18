import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import User from "./User";
import Comment from "./Comment";
import Place from "./Place";
import Couple from "./Couple";

@Entity()
class Feed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Couple, couple => couple.feeds)
  couple: Couple;

  @ManyToOne(type => User, user => user.feeds)
  user: User;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "text", nullable: true })
  feedPicture: string;

  @OneToMany(type => Comment, comment => comment.feed)
  comments: Comment[];

  @ManyToOne(type => Place, place => place.feeds)
  place: Place;

  @CreateDateColumn()
  createdAt: string;
}

export default Feed;
