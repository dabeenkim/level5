//winston을 가져오는대신 쓸것들만 가져와서 사용하면 winston. 하지않아도됌
const { createLogger, transports, format } = require('winston');
//또 이번엔 format에서 쓸것들만 가져와서 사용한다.
const { combine, timestamp, label, simple, colorize, printf } = format;

const printFormat =
  //출력포맷을 결정
  //app.js의 logger.error('안녕하세요');값을 message로 가져온다
  printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
  });

//원래 포맷에 들어있던값들을 따로 빼와서 선언해준뒤 선언해준 변수를 집어넣음
const printLogFormat = {
  file: combine(
    label({
      label: '윈스턴재밋당',
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:dd',
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: 'access.log',
    dirname: './logs',
    //하위레벨은 상위레벨값까지 출력이된다.
    level: 'info',
    //combine으로 여러가지 출력값을 던져줄수잇다.
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: 'info',
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(opts.console);
}

module.exports = logger;
