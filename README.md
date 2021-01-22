# UST School Administration Systems API Test

**Node Version**
```
v15.4.0
```

## Unit Tests
Tests are run using `jest` and `supertest`

```
npm test
```

### Test suites
- validation tests
   1. Should accept full entries
   1. Should not accept missing entries
   1. Should not accept empty fields
- endpoint tests
   1. GET `/workload` should return 200
   1. POST `/register` should return 204 with full body information
   1. POST `/register` should 400 if body is missing items
   1. POST `/register` should return 400 if body has empty fields

## Initialising the API server
- Install dependencies
```
npm install
```
- Start server
```
npm start
```
This will start a docker container, and migrate the database from /database/DDL.sql

<br>

## API Docuemntation

All reqeusts should be made to this base URL:
```
http://localhost:3000/api
```

---

### Test
```
/healthcheck
```
#### method: `GET`
#### expected response: `200 OK`

---

### Registering A New Lesson With Teachers, Students, Classes, and Subject
```
/register
```
#### method: `POST`
#### required payload: 
1. teacher
    * name
    * email
1. students (array of)
    * name
    * email
1. subject
    * name
    * subjectCode
1. class
    * name
    * classCode

If any of the items already exist as their unique identifier, but name fields are different, it will be updated to that provided in the request.

*All fields must be provided.*
      
##### Example body:
 ```
 {
   "students": [
     {
       "name": "Student A",
       "email": "studentA@gmail.com"
     },
     {
       "name": "Student B",
       "email": "studentB@gmail.com"
     }],
    "class": {
       "classCode": "P1-1",
       "name": "P1 AA"
    },
    "subject": {
       "subjectCode": SCI,
       "name": "Science"
    },
       "teacher": {
       "name": Teacher 1,
       "email": "teacher1@gmail.com"
    }
 }
 ```
 #### expected response: `204 NO CONTENT`

---

### Retrieving Overall Workload
```
/reports/workload
```
 * method: GET
 * expected response: 200 
```
    {
      "Teacher 1": [
        {
          "subjectCode": "ENG",
          "subjectName": "English",
          "numberOfClasses": 1,
        },        
        {
          "subjectCode": "MATH",
          "subjectName": "Mathematics",
          "numberOfClasses": 3,
        },
      ],
      "Teacher 2": [
        {
          "subjectCode": "ENG",
          "subjectName": "English",
          "numberOfClasses": 2,
        },
      ],
    }
```
