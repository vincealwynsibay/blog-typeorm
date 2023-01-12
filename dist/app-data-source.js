"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const post_entity_1 = require("./entities/post.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
exports.myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "vincealwyn.",
    database: "blog",
    entities: [user_entity_1.User, post_entity_1.Post],
    logging: true,
    synchronize: true,
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=app-data-source.js.map