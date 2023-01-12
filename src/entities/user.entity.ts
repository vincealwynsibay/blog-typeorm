import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	Relation,
} from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	firstName: string;

	@Column({ length: 100 })
	lastName: string;

	@OneToMany(() => Post, (post) => post.author)
	posts: Relation<Post[]>;

	@ManyToMany(() => Post, (post) => post.upvotes)
	upvotedPosts: Relation<Post[]>;
}
