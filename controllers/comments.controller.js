const CommentService = require("../services/comments.services");


class CommentController {
    constructor() {
        this.CommentService = new CommentService();
    }

    getComment = async (req, res, next) => {
        const {nickname} = res.locals.user;

        const comments = await this.CommentService.getComment(nickname);

        res.status(200).json({ comments : comments});
    }

    postComment = async (req, res, next) => {
        const {userId, nickname} = res.locals.user;
        const {postId} = req.params;
        const {comment} = req.body;

        const now = new Date();
        const created_Comment = await this.CommentService.postComment({
            UserId : userId,
            postId : postId,
            nickname,
            comment,
            createdAt : now,
            updatedAt : now,
    });

    res.status(200).json({comments: created_Comment});
    }
    
    putComment = async (req, res, next) => {
        const {commentId} =req.params;
        const {userId} = res.locals.user;
        const {comment} =req.body;
        
    try{
        const change_comments = await this.CommentService.putComment({
            commentId,
            UserId:userId,
            comment,
        });

        res.status(200).json({
            comments: change_comments,
            Message: "댓글을 수정하였습니다."
        })
    }catch(error) {
        next(error);
    }
    }

    delComment = async(req, res, next) => {
        const {commentId} = req.params;
        const {userId} = res.locals.user;
        
        const destroy_comment = await this.CommentService.delComment(
            commentId,
            userId,
    );

    res.status(200).json({
        comments: destroy_comment,
        Message: "댓글을 삭제하였습니다."
    })
    }
}

module.exports = CommentController;