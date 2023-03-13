const UserRepository = require("../repositories/users.repositories");
const JWT = require("jsonwebtoken");


class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }

    signupUser = async({
        nickname,
        password,
        confirm,
    }) => {
        const signup = await this.UserRepository.signupUser({
            nickname,
            password,
            confirm,
        })
        return signup;
    }

    
    tokenUser = async({
        nickname,
        password
    }) => {
        const user = await this.UserRepository.loginUser({
            nickname,
            password,
        })
        const token = JWT.sign(
            {userId: user.userId}, "customized_secret_key"
        )
        return token;
    }
}


module.exports = UserService;