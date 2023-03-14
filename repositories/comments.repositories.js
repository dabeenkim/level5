const {Users, Comments, Posts, Likes} = require("../models");
const {Op} = require("sequelize");

class CommentRepository extends Comments {
    constructor() {
        super();
    }

    getComment = async({nickname}) => {
        const comments = await Comments.findAll({
            attributes: ["commentId", "UserId", "nickname","comment", "createdAt", "updatedAt"],
            where: {nickname},
            order : [["createdAt", "DESC"]],
        });
        console.log(comments)

        return comments;
    };
    
    postComment = async({
        UserId,
        postId,
        nickname,
        comment,
        createdAt,
        updatedAt,
    }) => {
        const createComment = await Comments.create({
            UserId,
            postId,
            nickname,
            comment,
            createdAt,
            updatedAt,
        });

        return createComment
    }

    getCommentById = async(commentId) => {
        return await Comments.findOne({ where: {commentId}});
    }

    putComment = async(commentId,comment) => {
        console.log(commentId, comment)
        const [putComment] = await Comments.update(
            {comment},
            {where: {commentId}, returning: true}
        )

        return putComment;
    };

    delComment =  async(commentId, userId) => {
        const comment = await CommentRepository.destroy({
            where: {
                [Op.and]: [{commentId}, {UserId:userId}]
            }
        });

        return comment;
    }

    
}

module.exports = CommentRepository;