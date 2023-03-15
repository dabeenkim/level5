const { Users } = require('../models');

class UserRepository extends Users {
  constructor() {
    super();
  }

  signupUser = async ({ nickname, password: hash }) => {
    const signup = new Users({ nickname, password: hash });
    await signup.save();

    return signup;
  };

  loginUser = async ({ nickname }) => {
    const user = await Users.findOne({ where: { nickname } });

    return user;
  };
}

module.exports = UserRepository;
