import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "postgres",
	password: process.env.PG_PASSWORD,
	database: "blog",
	entities: ["src/entity/*.js"],
	logging: true,
	synchronize: true,
});
