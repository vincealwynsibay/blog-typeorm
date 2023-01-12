"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const user_entity_1 = require("./entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
const app_data_source_1 = require("./app-data-source");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Database connection established");
})
    .catch((err) => {
    console.error("Error during connection", err);
});
const userRepository = app_data_source_1.myDataSource.getRepository(user_entity_1.User);
const postRepository = app_data_source_1.myDataSource.getRepository(post_entity_1.Post);
app.post("/register", async (req, res) => {
    const { firstName, lastName } = req.body;
    const user = userRepository.create({
        firstName,
        lastName,
    });
    const result = await userRepository.save(user);
    return result;
});
app.get("/users", async (req, res) => {
    const users = await userRepository.find();
    return users;
});
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await userRepository.findBy({ id: parseInt(id) });
    return user;
});
app.post("/posts", async (req, res) => {
    const { title, content, authorId } = req.body;
    const post = await postRepository.create({
        title,
        content,
        author: authorId,
    });
    const result = await postRepository.save(post);
    return result;
});
app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const post = await postRepository.findOne({
        where: { id: parseInt(id) },
        relations: { author: true },
    });
    return post;
});
app.post("/posts/:id", async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const post = await postRepository.findOneBy({ id: parseInt(id) });
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
//# sourceMappingURL=app.js.map