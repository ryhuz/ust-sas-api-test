# UST School Administration Systems API Test

**Node Version**
```
v15.4.0
```

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

### Test
```
/healthcheck
```
#### method: `GET`
#### expected response: `200 OK`


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
       "classCode": "S1-A",
       "name": "S1 ACACA"
    },
    "subject": {
       "subjectCode": 141414,
       "name": "Science"
    },
       "teacher": {
       "name": 234,
       "email": "teacher234@gmail.com"
    }
 }
 ```
 #### expected response: `204 NO CONTENT`


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
