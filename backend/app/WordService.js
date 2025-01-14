const wordRepository = require("./WordRepository");

const getAllWords = () => {
  return wordRepository.findAll();
};

const createWord = (title, meaning, example, level) => {
  const word = { id: words.length + 1, title, meaning, example, level };
  wordRepository.save(word);
  return word;
};

const getWordById = (id) => {
  const word = wordRepository.findById(id);
  if (!word) throw new Error("Word Not Found");
  return word;
};
const updateWord = (title, meaning, example, level) => {
  const word = {};
};

module.exports = { getAllWords, createWord, getWordById };
