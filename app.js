const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
app.use(morgan('common'));
app.use(cors());

const books = require('./books-data.js');

app.get('/books', (req, res) => {
	const { search = "", sort } = req.query;
	if (sort) {
		if (!['title', 'rank'].includes(sort)) {
			return res
				.status(400)
				.send('Sort must be one of title or rank');
		}
	}

	let results = books
		.filter(book => 
			book
				.title
				.toLowerCase()
				.includes(search.toLowerCase()));
		
		if (sort) {
			results
				.sort((a, b) => {
					return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
			});
		}
		res
			.json(results);
});


// sort function 
function sort(list) {
  for(let i = 2; i < list.length; i++){
    let j = i;
    while(j > 0 && list[j - 1] > list[j]){
      let temp = list[j];
      list[j] = list[j - 1];
      list[j - 1] = temp;
      j--;
    }
  }
  return list;
}

// returns an array
// list is ascending order 
// if list items = 2



//testing frequency drill - delete after
app.get('/frequency', (req, res) => {
  const { s } = req.query;

  if (!s) {
    return res
      .status(400)
      .send('Invalid request');
  }

  const counts = s
    .toLowerCase()
    .split('')
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

  const unique = Object.keys(counts).length;
  const average = s.length / unique;
  let highest = '';
  let highestVal = 0;

  Object.keys(counts).forEach(k => {
    if (counts[k] > highestVal) {
      highestVal = counts[k];
      highest = k;
    }
  });

  counts.unique = unique;
  counts.average = average;
  counts.highest = highest;
  res.json(counts);
});


module.exports = app;
