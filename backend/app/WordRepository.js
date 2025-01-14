let words = []; // 메모리 내 저장소

const save = (word) => {
  words.push(word);
};
const findAll = () => {
  return words;
};
const findById = (id) => {
  return words.find((w) => w.id === id);
};

module.exports = { findAll, save, findById };
