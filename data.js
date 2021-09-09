const bootcampers = [
  "Ayaan",
  "Daniel",
  "Claire",
  "Elly",
  "Emanuel",
  "Filipe",
  "Himesh",
  "James",
  "Juweyriya",
  "Lizard",
  "Mitchell",
  "Mohit",
  "Nasra",
  "Siddharth",
  "Tom L",
  "Tom M",
  "Joy",
  "Valerio",
  "Waseem",
  "Yrral",
];

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

console.log(shuffle(bootcampers));

let dateObject = "2021-08-23";

let date = dateObject;
let score = 21;
let roundLeaderboard = shuffle(bootcampers).map((person) => {
  score--;
  return { name: person, score: score, date: date, energiser: "Gartic" };
});
console.log(roundLeaderboard);
module.exports = roundLeaderboard;
