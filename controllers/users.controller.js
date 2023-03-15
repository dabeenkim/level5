const UserService = require('../services/users.services');

class UserController {
  constructor() {
    this.UserService = new UserService();
  }

  signupUser = async (req, res, next) => {
    const { nickname, password, confirm } = req.body;
    const signup = await this.UserService.signupUser({
      nickname,
      password,
      confirm,
    });

    res.status(200).json({ signup, Message: '회원가입에 성공하였습니다.' });
  };

  loginUser = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      console.log('============', nickname, password);

      const token = await this.UserService.tokenUser({ nickname, password });
      console.log(token);

      res.cookie('authorization', `Bearer ${token}`);
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
    }
  };
}

module.exports = UserController;
