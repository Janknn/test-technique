const crypto = require('crypto');
const fs = require('fs');

const data = [];

const validations = ['ARC', 'PLB', 'STR', 'ENV', 'BC', 'MOX'];
const delais = [10, 10, 10, 5, 15, 3];
const date = Date.now() - 2 * 30 * 24 * 60 * 60 * 1000; // - 2 mois

function shuffle(arr) {
  const rnd = new Map();
  arr.forEach(item => rnd.set(item, Math.random()));
  return arr.sort((i1, i2) => rnd.get(i1) - rnd.get(i2));
}

for (let i = 0; i < 5e2; i++) {
  const documentId = crypto.randomBytes(24).toString('hex');
  const timestamp = date + Math.floor(30 * 60 * 60 * 1000 * Math.random());
  for (let j = 0; j < validations.length; j++) {
    const prevs = shuffle(validations.slice(0, Math.max(0, j)));
    data.push({
      id: crypto.randomBytes(24).toString('hex'),
      documentId,
      validation: validations[j],
      timeLimit: delais[j] + Math.floor(-2 + 4 * Math.random()),
      previous: prevs.slice(0, prevs.length * .99 * Math.random()),
      at: new Date(timestamp + Math.floor(5 * 60 * 60 * 1000 * Math.random())),
      done: Math.random() < .33
    });
  }
}

fs.writeFileSync('./data.json', JSON.stringify(shuffle(data).slice(0, data.length * .5), null, 2));