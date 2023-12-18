

const request = require("supertest")("http://localhost:8080/api");
const expect = require("chai").expect;

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require("../app/models/course.model");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
var should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Courses', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     Book.remove({}, (err) => { 
    //        done();           
    //     });        
    // });
/*

  * Test the /GET route
  */
  describe('/GET /api/courses', () => {
      it('it should GET all the courses', (done) => {
        chai.request(server)
            .get('/api/courses')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  // res.body.length.should.be.eql(0);
              done();
            });
      });
  });


  describe("POST /courses", function () {
    it("Should create a test course ", async function () {

      let course = {
                title: "Test - This is the second course",
                description: "This is a course description",
                instructor: "This is a course instructor",
                duration: "This is a course duration",
                price: 101.101,
              };

      const response = await request
        .post("/courses")
        .send(course);
      expect(response.status).to.eql(200);
  
      // const attributes = response.body.data.attributes;
      // expect(attributes).to.include.keys("kilometers", "miles", "nautical_miles");
      // expect(attributes.kilometers).to.eql(8692.066508240026);
      // expect(attributes.miles).to.eql(5397.239853492001);
      // expect(attributes.nautical_miles).to.eql(4690.070954910584);
    });
  });


  describe("POST /enrollemnt", function () {
    it("Should create test enrollment", async function () {

      let enrollment = {
                student_name: "Test - Student Name",
                course_id: "657f02fab841db38dc2157bf",
                enrollment_date: "2023-12-18",
              };

      const response = await request
        .post("/enrollment")
        .send(enrollment);
      expect(response.status).to.eql(200);
    });
  });
});