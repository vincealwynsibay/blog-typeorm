import { Post } from "./entities/post.entity";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

export const myDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "vincealwyn.",
	database: "blog",
	entities: [User, Post],
	logging: true,
	synchronize: true,
	migrations: [],
	subscribers: [],
});
