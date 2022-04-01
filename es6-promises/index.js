const takeAChance = require('./take-a-chance');

var result = takeAChance('Brian');

result.then(value => {
  console.log(value);
}).catch(err => {
  console.error(err.message);
});
