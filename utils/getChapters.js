function getSouthAmericaChapters(jsonData) {
  const southAmericaData = jsonData.filter((item) => item.id === 4);
  const southAmericaChapters = southAmericaData.flatMap(
    (item) => item.chapters
  );
  return southAmericaChapters;
}

function getNorthAmericaChapters(jsonData) {
  const northAmericaData = jsonData.filter((item) => item.id === 5);
  const northAmericaChapters = northAmericaData.flatMap(
    (item) => item.chapters
  );
  return northAmericaChapters;
}

function getEuropeChapters(jsonData) {
  const europeData = jsonData.filter((item) => item.id === 2);
  const europeChapters = europeData.flatMap((item) => item.chapters);
  return europeChapters;
}

function getAsiaChapters(jsonData) {
  const asiaData = jsonData.filter((item) => item.id === 3);
  const asiaChapters = asiaData.flatMap((item) => item.chapters);
  return asiaChapters;
}

function getAlgeriaChapters(jsonData) {
  const flatArray = jsonData.flatMap((item) => item.chapters);
  const algeriaChapters = flatArray.filter((item) => item.country === "DZ");
  return algeriaChapters;
}

function getAfricaChapters(jsonData) {
  const africaData = jsonData.filter((item) => item.id === 1);
  const africaChapters = africaData.flatMap((item) => item.chapters);
  return africaChapters;
}

module.exports = {
  getSouthAmericaChapters,
  getNorthAmericaChapters,
  getEuropeChapters,
  getAsiaChapters,
  getAlgeriaChapters,
  getAfricaChapters,
};
