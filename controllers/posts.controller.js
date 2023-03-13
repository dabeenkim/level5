const PostService = require("../services/posts.services");

//클래스를 정의
class PostController {
    //클래스의 생성자 메서드. 클래스의 새인스턴스가 생성될때 호출된다.
    constructor() {
    //인스턴스가 생성되게되면 인스턴스의 속성PostService()에 할당한다.
    this.PostService = new PostService();
    }

    getPosts = async (req, res, next) => {
        //이줄은 getPosts 메서드를 호출한다.PostService 메서드에 대한
        //인수로 빈 객체를 전달한다.
        const posts = await this.PostService.getPosts({});

        res.status(200).json({ post: posts});
    };

    getOnesPost = async (req, res, next) => {
        const {postId} = req.params;
        const posts = await this.PostService.getOnesPost(postId);

        res.status(200).json({post: posts});
    };

    createPost = async(req, res, next) => {
    // try{
        const {userId, nickname} = res.locals.user;
        const {title, content} = req.body;
        console.log(userId)

        if(!userId || !nickname || !title || !content) {
            throw error("필수입력값이 비어있습니다.");
        }
        const now = new Date();
        const posts = await this.PostService.createPost({
            UserId:userId,
            nickname,
            title,
            content,
            createdAt: now,
            updatedAt: now,
        });

        res.status(200).json({posts: posts});
    // }catch(error) {
    //     res.json({error: "값이 들어오지않은"})
    // }
}

    putPost = async(req, res, next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;
        const { title, content } = req.body;

        res.status(200).json({message: "게시글을 수정하였습니다." });
    };

    deletePost = async(req, res ,next) => {
        const { postId } = req.params;
        const { userId } = res.locals.user;

        res.statue(200).json({ Message: "게시글을 삭제하였습니다."})
    }
}


module.exports = PostController;