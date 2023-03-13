const {Users} = require("../models");


class UserRepository extends Users {
    constructor() {
        super();
    }

    
    signupUser = async({
        nickname,
        password,
        confirm,
    }) => {
        const signup = new Users({ nickname, password});
        await signup.save();

        return signup;
    } 
    

    loginUser = async({
        nickname,
        password,
    }) => {
        const user = await Users.findOne({where: {nickname}});

        if(!user || password !== user.password){
            throw new Error("닉네임 또는 패스워드를 확인해주세요.")
        }

        return user;
    }
     
}


module.exports = UserRepository;