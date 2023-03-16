const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./routes/users.js');
const postsRouter = require('./routes/posts.js');
const commentsRouter = require('./routes/comments.js');
const likesRouter = require('./routes/likes.js');

const app = express();
const PORT = 3016;

const accessLogStream = require('./src/config/log');

//앱세팅
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  //출력포맷을 정해줄 수 있다.
  //npm홈페이지에서 morgan검색하면 여러가지가잇다.
  //저장하고싶은 메소드만도 사용가능 예) :method
  morgan('common', { stream: accessLogStream })
);
app.use(morgan('dev'));
app.use('/', usersRouter);
app.use('/posts', [postsRouter, commentsRouter]);
app.use('/like', likesRouter);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});

// const crypto = require('crypto');

// const password = 'abc23';

// const hashed = crypto
//   .createHmac('sha256', 'env.PRIVATE_KEY')
//   .update(password)
//   .digest('hex');

// console.log(hashed);
// console.log(hashed);

// const bcrypt = require('bcrypt');

// // 비밀번호 해시 생성 예시
// const password = 'myPassword123';
// const saltRounds = 10;

// bcrypt.hash(password, saltRounds, (err, hash) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(hash); // 해시 출력
// });
