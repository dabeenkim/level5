
const { Likes, Posts } = require('../models');

class LikeRepository {
  constructor() {
    this.Likes = Likes;
    
  }
    findByUserId = async (userId) => {
      const likes = await Likes.findAll({
        where: { UserId: userId },
        attributes: ['PostId'],
      });
      return likes.map((like) => like.PostId);
    };
  
    changeLike = async (postId, userId) => {
        const post = await Posts.findByPk(postId);
        if (!post) {
          throw new Error("게시글이 존재하지 않습니다.");
        }
      
        const isLike = await this.Likes.findOne({
          where: {
            PostId: postId,
            UserId: userId,
          },
        });
      
        if (!isLike) {
          await this.Likes.create({ PostId: postId, UserId: userId });
          await Posts.increment("likeCount", { where: { id: postId } });
          return "게시글 좋아요를 성공하였습니다.";
        } else {
          await this.Likes.destroy({
            where: { PostId: postId, UserId: userId },
          });
          await Posts.decrement("likeCount", { where: { id: postId } });
          return '게시글의 좋아요를 취소하였습니다.';
        }
      };


      // putlike = async (postId, userId) => {
      //   console.log(postId, userId);
      
      //   let isLike = await this.Likes.findOne({
      //     where: {
      //       PostId: postId,
      //       UserId: userId,
      //     },
      //   });
      
      //   if (!isLike) {
      //     await this.Likes.create({ PostId: postId, UserId: userId });
      
      //     // 해당 게시글의 likeCount + 1
      //     const post = await Posts.findByPk(postId);
      //     const likeCount = post.likeCount + 1;
      //     await Posts.update({ likeCount }, { where: { id: postId } });
          
      
      //     return likeCount;
      //   } else {
      //     await this.Likes.destroy({
      //       where: { PostId: postId, UserId: userId },
      //     });
      
      //     // 해당 게시글의 likeCount - 1
      //     const post = await Posts.findByPk(postId);
      //     const likeCount = post.likeCount - 1;
      //     await Posts.update({ likeCount }, { where: { id: postId } });
      
      //     return likeCount;
      //   }
      // };
}

module.exports = LikeRepository;
