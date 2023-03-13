const {Posts, Users, Comments, Likes} = require("../models");
const {Op} = require("sequelize");

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

    async getPostById(postId) {
        return await Posts.findOne({ where: {postId:postId.postId}});
    }

    async updatePost(postId, title, content) {
        const [numRows, updatePost] = await Posts.update(
            {title, content},
            { where: {PostId: postId}, returning: true}
        );

        // console.log(numRows)
        // if(numRows !== 1) {
        //     throw new Error("게시글을 수정하지못했습니다.");
        // };
        //return updatePost[0];
        return updatePost;
    }

    async deletePost(postId, userId) {
        // console.log("postId=",postId, "userId=",userId);
        const post = await PostRepository.destroy({
          where: {
            [Op.and]: [{ postId }, { userId }]
          }
        });
        console.log(post);
        return post;
      }
      
}


module.exports = PostRepository;

