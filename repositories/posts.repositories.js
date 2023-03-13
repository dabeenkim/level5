const {Posts, Users, Comments, Likes} = require("../models");

class PostRepository extends Posts {
    constructor() {
        super();
    }

    getPosts = async() => {
        const posts = await Posts.findAll({
            attributes: ["postId", "UserId", "nickname","title", "createdAt", "updatedAt"],
            order : [["createdAt", "DESC"]],
        });

        return posts;
    };

    getOnesPost = async(postId) => {
        const posts = await Posts.findOne({
            attributes: ["postId", "UserId", "title", "content", "createdAt", "updatedAt"],
            where: { postId },
        });

        return posts;
    };

    createPost = async({
        UserId,
        nickname,
        title,
        content,
        createdAt,
        updatedAt,
    }) => {
        const posts = await Posts.create({
        UserId,
        nickname,
        title,
        content,
        createdAt,
        updatedAt,
        });

        return posts;
    };
}


module.exports = PostRepository;

