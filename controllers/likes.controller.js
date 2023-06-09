const LikeService = require("../services/likes.services");
const Likes = require("../models").Likes;

class LikeController {
    constructor() {
        this.LikeService = new LikeService();
    }

    getLike = async(req, res, next) => {
        const {userId} = res.locals.user;
        try{
            const posts =  await this.LikeService.getLike(userId);

            return res.status(200).json({posts: posts});
        }catch(error) {
            console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
            return res.status(400).json({
            errorMessage: "좋아요 게시글 조회에 실패하였습니다.",
            });
        }

    }

    changeLike = async(req, res, next) => {
        const {postId} = req.params;
        const {userId} = res.locals.user;
    try{
        const isLike = await this.LikeService.changeLike(postId, userId);

        if (!isLike) {
              await Likes.create({ PostId: postId, UserId: userId });
              return res.status(200).json({ message: '게시글의 좋아요를 등록하였습니다.' });
            } else {
              await Likes.destroy({where: { PostId: postId, UserId: userId }});
              return res.status(200).json({ message: '게시글의 좋아요를 취소하였습니다.' });
            }
    }catch(error) {
        console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
        return res.status(400).json({
        errorMessage: '게시글 좋아요에 실패하였습니다.',
    });
    }
}
}



module.exports = LikeController