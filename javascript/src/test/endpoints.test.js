import App from '../app';
const request = require('supertest');

test('should return workload object', async () => {
  await request(App).get('/api/reports/workload')
    .expect(200)
})

test('should return 204 on register', async () => {
  let body = {
    "students": [
      {
        "name": "Student one",
        "email": "student1@gmail.com"
      },
      {
        "name": "Student two",
        "email": "student2@gmail.com"
      }
    ],
    "class": {
      "classCode": "P1-1",
      "name": "P1 One"
    },
    "subject": {
      "subjectCode": "Eng",
      "name": "Englishhhhhh"
    },
    "teacher": {
      "name": "Teacher One",
      "email": "teacher1@gmail.com"
    }
  }

  await request(App).post('/api/register')
    .send(body)
    .expect(204)
})

describe("should return 400 ->", () => {
  test('on missing items', async () => {
    let body = {
      "students": [
        {
          "name": "Student one",
          "email": "student1@gmail.com"
        },
        {
          "name": "Student two",
          "email": "student2@gmail.com"
        }
      ],
      "subject": {
        "subjectCode": "Eng",
        "name": "Englishhhhhh"
      },
      "teacher": {
        "name": "Teacher One",
        "email": "teacher1@gmail.com"
      }
    }
    await request(App).post('/api/register')
      .send(body)
      .expect(400)
  });

  test('on empty fields', async () => {
    let body = {
      "students": [
        {
          "name": "Student one",
          "email": "student1@gmail.com"
        },
        {
          "name": "Student two",
          "email": ""
        }
      ],
      "subject": {
        "subjectCode": "Eng",
        "name": "Englishhhhhh"
      },
      "teacher": {
        "name": "Teacher One",
        "email": "teacher1@gmail.com"
      }
    }
    await request(App).post('/api/register')
      .send(body)
      .expect(400)
  });
});
