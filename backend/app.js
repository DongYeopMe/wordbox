// express 불러오기
const express = require("express");
// express 인스턴스 생성
const app = express();
// 포트 정보
const port = 8080;
//service
const wordService = require("./WordService");

app.use(express.json()); // JSON 요청 본문 파싱

// 라우트 설정
//모든 단어들 조회
app.get("api/words", (req, res) => {
  res.json(wordService.getAllWords());
});

app.post("api/create", (req, res) => {
  const { title, meaning, example, level } = req.body;
  const word = postService.createPost(title, meaning, example, level);
  res.status(201).json(word);
});

app.put("api/update", (req, res) => {
  const { title, meaning, example, level } = req.body;
  const word = postService;
});

// 서버 실행
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
