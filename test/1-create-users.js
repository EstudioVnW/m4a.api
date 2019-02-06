process.env.NODE_ENV = 'test';

let { User } = require('../domain/entities');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
/*  beforeEach((done) => {
      User.destroy({ where: {}, truncate: true }, (err) => {
        done();
      })
  });
*/
  describe('/GET user', () => {
    it('it should GET all the users', (done) => {
      chai.request(server.app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should not POST a user without pages field', (done) => {
      let user = {
        "email": "dalivieiraa8@gmail.com",
        "username": "dali",
        "userProfile": "Volunteer",
        "interests": [58, 59, 60]
      }
      chai.request(server.app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.should.have.property('token');
          res.body.should.have.property('relationships');
          res.body.data.should.have.property('type').eql('User');
          res.body.data.should.have.property('attributes');
          res.body.relationships.should.have.property('interests');
          res.body.relationships.interests.should.be.a('array');
          done();
        });
    });
  });
});