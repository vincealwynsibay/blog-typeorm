import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("text")
	title: string;

	@Column("text")
	content: string;

	@OneToMany(() => User, (user) => user.posts)
	author: User[];

	@ManyToMany(() => User, (user) => user.upvotedPosts)
	upvotes: User[];
}
