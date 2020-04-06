const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');


describe('NYT Server', () => {
	it('should return a list of NYT books from GET /books', () => {
		return supertest(app)
		.get('/books')
		.expect(200)
		.expect('Content-Type', /json/)
	});

	// what's the dif betwen supertest(app) and request(app) - can they be used interchangeably?

	it('should return an array', () => {
		return supertest(app)
			.get('/books')
			.then(res => {
				expect(res.body).to.be.an('array')
			})
	})

	it('should return a 400 if /books returns 0 books', () => {
		return supertest(app)
			.get('/books')
			.then(res => {
				expect(res.body).to.have.lengthOf.at.least(1);
			})
	});


	it('a book should have a rank and title', () => {
		return supertest(app)
			.get('/books')
			.then(res => {
				const book = res.body[0];
				expect(book).to.include.all.keys('rank', 'title')
			})
	});


	it('should return a 400 if /books returns 0 books', () => {
		return supertest(app)
			.get('/books')
			.then(res => {
				expect(res.body).to.not.have.lengthOf(0)
				expect(400)
			})
	});

})

describe('sort drill', () => {
	it('')
})




describe('frequency drill', () => {
	it('')
})
