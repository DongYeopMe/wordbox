const cardStubList = [
  {
    id: 1,
    title: "기초 영어 단어",
    count: 10,
    language: "ENGLISH",
    owner: { id: 1, username: "testuser" },
    isStudying: true,
    isInMyDirectory: true,
    isMe: true,
  },
  {
    id: 2,
    title: "토익 빈출 단어",
    count: 15,
    language: "ENGLISH",
    owner: { id: 2, username: "jenny" },
    isStudying: false,
    isInMyDirectory: false,
    isMe: false,
  },
  {
    id: 3,
    title: "일본어 초급 회화",
    count: 8,
    language: "JAPANESE",
    owner: { id: 3, username: "sakura" },
    isStudying: true,
    isInMyDirectory: true,
    isMe: false,
  },
  {
    id: 4,
    title: "중급 영어 표현",
    count: 20,
    language: "ENGLISH",
    owner: { id: 1, username: "testuser" },
    isStudying: false,
    isInMyDirectory: true,
    isMe: true,
  },
  {
    id: 5,
    title: "프랑스어 단어",
    count: 12,
    language: "FRENCH",
    owner: { id: 4, username: "louis" },
    isStudying: false,
    isInMyDirectory: false,
    isMe: false,
  },
  {
    id: 6,
    title: "한국어 관용어",
    count: 18,
    language: "KOREAN",
    owner: { id: 5, username: "kim" },
    isStudying: true,
    isInMyDirectory: true,
    isMe: false,
  },
  {
    id: 7,
    title: "중국어 기초 단어",
    count: 9,
    language: "CHINESE",
    owner: { id: 6, username: "lihua" },
    isStudying: false,
    isInMyDirectory: false,
    isMe: false,
  },
  {
    id: 8,
    title: "고급 영어 작문",
    count: 22,
    language: "ENGLISH",
    owner: { id: 1, username: "testuser" },
    isStudying: true,
    isInMyDirectory: true,
    isMe: true,
  },
  {
    id: 9,
    title: "비즈니스 일본어",
    count: 14,
    language: "JAPANESE",
    owner: { id: 3, username: "sakura" },
    isStudying: false,
    isInMyDirectory: false,
    isMe: false,
  },
  {
    id: 10,
    title: "토플 어휘 모음",
    count: 30,
    language: "ENGLISH",
    owner: { id: 7, username: "michael" },
    isStudying: false,
    isInMyDirectory: false,
    isMe: false,
  },
  // ✅ 새로 추가된 3개
  {
    id: 11,
    title: "일상 영어 표현",
    count: 11,
    language: "ENGLISH",
    owner: { id: 2, username: "jenny" },
    isStudying: false,
    isInMyDirectory: true,
    isMe: false,
  },
  {
    id: 12,
    title: "JLPT N4 문법",
    count: 17,
    language: "JAPANESE",
    owner: { id: 3, username: "sakura" },
    isStudying: false,
    isInMyDirectory: true,
    isMe: false,
  },
  {
    id: 13,
    title: "독일어 인사말",
    count: 6,
    language: "GERMAN",
    owner: { id: 9, username: "hans" },
    isStudying: false,
    isInMyDirectory: true,
    isMe: false,
  },
];

export default cardStubList;
