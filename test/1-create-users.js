var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../index');
var should = chai.should();
const expect = chai.expect;

describe('Create a new user', () => {

  let user = {
      "username": "dalinha2",
      "email": "dali11@gmial.com",
      "latlong": {
        "type": "Point",
        "coordinates": [
            39.807222,
            -76.984722
        ]
      },
      "userProfile": "Volunteer",
      "UsersInterests": [
          {
            "interestDescription": "Cooking",
            "interestType": "Skills"
          }
      ]
  }

  it('should create an user', (done) => {

    chai.request(server.app)
      .post('/users')
      .set('content-type', 'application/json')
      .send(user)
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('data');
          done();
        }
      });

  });

  it('should return an auth to current user', (done) => {
    chai.request(server.app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        "email": user.email
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('data');
          done();
        }
      });

  });

});