import express from "express";
import "dotenv/config";
import { User } from "./entities/user.entity";
import { Post } from "./entities/post.entity";
import { myDataSource } from "./app-data-source";

const app = express();
app.use(express.json());

myDataSource
	.initialize()
	.then(() => {
		console.log("Database connection established");
	})
	.catch((err) => {
		console.error("Error during connection", err);
	});

const userRepository = myDataSource.getRepository(User);
const postRepository = myDataSource.getRepository(Post);

app.post("/register", async (req, res) => {
	const { firstName, lastName } = req.body;

	// const user = User.create({
	// 	firstName,
	// 	lastName,
	// });
	// await user.save();

	const user = userRepository.create({
		firstName,
		lastName,
	});

	const result = await userRepository.save(user);

	return result;
});

app.get("/users", async (req, res) => {
	// const users = await User.find();
	const users = await userRepository.find();
	return users;
});

app.get("/users/:id", async (req, res) => {
	const { id } = req.params;

	// const user = await User.findBy({ id: parseInt(id) });
	const user = await userRepository.findBy({ id: parseInt(id) });
	return user;
});

app.post("/posts", async (req, res) => {
	const { title, content, authorId } = req.body;
	// const post = await Post.create({ title, content, author: authorId });
	// await post.save();

	const post: Post = await postRepository.create({
		title,
		content,
		author: authorId,
	});
	const result = await postRepository.save(post);

	return result;
});

app.get("/posts/:id", async (req, res) => {
	const { id } = req.params;
	// const post = await Post.findOne({
	// 	where: { id: parseInt(id) },
	// 	relations: { author: true },
	// });
	const post = await postRepository.findOne({
		where: { id: parseInt(id) },
		relations: { author: true },
	});
	return post;
});

app.post("/posts/:id", async (req, res) => {
	const { title, content } = req.body;
	const { id } = req.params;

	const post: any = await postRepository.findOneBy({ id: parseInt(id) });

	if (!post) {
		throw new Error("Post Not Found");
	}

	Object.assign(post, { title, content });

	const result = await postRepository.save(post);

	return result;
});

app.listen(5000, () => {
	console.log("Server is running on http://localhost:5000/");
});
