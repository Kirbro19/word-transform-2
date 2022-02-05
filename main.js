const axios = require("axios");
const jsdom = require("jsdom");

const searchWord = "ночь";
const wordCase = "Предложный";

const query = encodeURIComponent(searchWord);

console.log(`https://ru.wiktionary.org/wiki/${query}`);

axios.get(`https://ru.wiktionary.org/wiki/${query}`).then((response) => {
  // console.log("Response", response.data);
  const dom = new jsdom.JSDOM(response.data);
  // console.log("DOM", dom);
  const table = dom.window.document.querySelector(".morfotable.ru");
  console.log("Table", table);

  const cases = {
    Именительный: 2,
    Родительный: 3,
    Дательный: 4,
    Винительный: 5,
    Творительный: 6,
    Предложный: 7,
  };
  console.log(`tr:nth-child(${cases[wordCase]})`);
  const word = table
    .querySelector(`tr:nth-child(${cases[wordCase]})`)
    .querySelector("td:nth-child(2)").textContent;
  console.log("Word", word);
});
