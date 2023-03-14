const LikeRepository = require("../repositories/likes.repositories");
const { Posts, Users, Likes } = require("../models");
const { sequelize } = require("../models");
const {Op} = require("sequelize");

class LikeService {
    constructor() {
        this.LikeRepository = new LikeRepository();
    }

    async getLike(userId) {
        const likedPostIds = await this.LikeRepository.findByUserId(userId);

        const parseLikePostsModel = (likes) => {
            return likes.map((like) => {
                let obj = {};

                for (const [k ,v] of Object.entries(like)) {
                    if(k.split(".").length > 1) {
                        const key = k.split(".")[1];
                        obj[key] = v;
                    }else obj[k] = v;
                }
                return obj;
            });
        };

        const posts = await Posts.findAll({
            attributes: [
                "postId",
                "userId",
                "title",
                "createdAt",
                "updatedAt",
                [sequelize.fn("COUNT", sequelize.col("Likes.PostId")), "likes"],
            ],
            include: [
                {
                    model: Likes,
                    attributes: [],
                    required: true,
                    where: { [Op.and]: [{UserId: userId}]},
                },
            ],
            where: {postId: likedPostIds},
            group: ["Posts.postId"],
            order: [["createdAt", "DESC"]],
            raw: true,
        }).then((likes) => parseLikePostsModel(likes));

        return posts;
    }


    changeLike = async(postId, userId) => {
        
        const isExistPost = await Posts.findByPk(postId);
        if(!isExistPost) {
            throw new Error("게시글이 존재하지 않습니다.")
        }

        return isExistPost;
    }
}

module.exports = LikeService;