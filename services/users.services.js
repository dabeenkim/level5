const UserRepository = require('../repositories/users.repositories');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  signupUser = async ({ nickname, password, confirm }) => {
    if (password !== confirm) {
      throw new Error('비밀번호가 다릅니다.');
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const signup = await this.UserRepository.signupUser({
      nickname,
      password: hash,
    });

    return signup;
  };

  tokenUser = async ({ nickname, password }) => {
    const user = await this.UserRepository.loginUser({ nickname });

    const token = JWT.sign({ userId: user.userId }, 'env.SECRET_KEY');

    const check_password = await bcrypt.compare(password, user.password);

    return { token, check_password };
  };
}

module.exports = UserService;
