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

    updatePost = async(postId, userId, title, content) => {
        // console.log("--------",postId)
        const post = await this.PostRepository.getPostById(postId);
        // console.log("========",post)

        if (!post) {
            throw new Error("게시글이 존재하지 않습니다.");
        }
        if (post.userId !== userId) {
            throw new Error("권한이 없습니다.");
        }

        const updatePost = await this.PostRepository.updatePost(postId, title, content);

        return updatePost;
    };

    deletePost = async(postId, userId) => {
        console.log("============",postId, userId)
        const post = await this.PostRepository.deletePost(postId, userId)

        return post;
    }
}

module.exports = PostService;