const CommentRepository = require("../repositories/comments.repositories");

class CommentService {
    constructor() {
    this.CommentRepository = new CommentRepository();
    }

    getComment = async(nickname) => {
        const findAllComment = await this.CommentRepository.getComment({nickname});

        return findAllComment;
    }

    postComment = async({
        UserId,
        postId,
        nickname,
        comment,
        createdAt,
        updatedAt,
    }) => {
        const newComment =
        await this.CommentRepository.postComment({
            UserId,
            postId,
            nickname,
            comment,
            createdAt,
            updatedAt, 
        })

        return newComment;
    }

    putComment = async({commentId, UserId, comment}) => {
        const dup_comment = await this.CommentRepository.getCommentById(commentId);
        if(!dup_comment) {
            throw new Error("댓글이 존재하지 않습니다.");
        }
        // if(dup_comment.UserId !== UserId) {
        //     throw new Error("권한이 없습니다.");
        // }

        const updateComment = await this.CommentRepository.putComment(commentId,comment);

        return updateComment;
    }

    delComment = async(commentId, userId) => {
        console.log(commentId, userId)
        const comment = await this.CommentRepository.delComment(commentId, userId)
        
        return comment;
    }

}


module.exports = CommentService;