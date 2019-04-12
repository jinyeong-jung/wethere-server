import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity()
class Feed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "text", nullable: true })
  feedPicture: string;

  @CreateDateColumn()
  createdAt: string;
}

export default Feed;
