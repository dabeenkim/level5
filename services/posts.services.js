const PostRepository = require("../repositories/posts.repositories");

class PostService {
    constructor() {
    this.PostRepository = new PostRepository();
    }

    getPosts = async({}) => {
        const findAllPost = await this.PostRepository.getPosts({});

        return findAllPost;
    };

    getOnesPost = async(postId) => {
        const findAllPost = await this.PostRepository.getOnesPost(postId);

        return findAllPost;
    };

    createPost = async({
        UserId,
        nickname,
        title,
        content,
        createdAt,
        updatedAt,
    }) => {
        const  posts = 
        await this.PostRepository.createPost({
            UserId,
            nickname,
            title,
            content,
            createdAt,
            updatedAt, 
        });

        return posts;
    }
}

module.exports = PostService;