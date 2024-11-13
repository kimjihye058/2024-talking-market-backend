require('dotenv').config();  // dotenv 패키지 로드

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());  // JSON 파싱을 위한 미들웨어

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // .env에서 읽어온 값
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패: ' + err.stack);
    return;
  }
  console.log('MySQL 연결 성공');
});

// 서버 종료 시 MySQL 연결 종료
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('MySQL 연결 종료 실패: ' + err.stack);
    } else {
      console.log('MySQL 연결 종료');
    }
    process.exit();
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중`);
});
