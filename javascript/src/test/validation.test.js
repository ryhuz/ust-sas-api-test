import { request } from "express";

import fieldsAreValid from '../util/validationUtil';

describe("Field validations", () => {
  test("it should accept full entries", () => {
    const full = {
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
    const expectedResult = undefined;
    expect(fieldsAreValid(full)).toEqual(expectedResult);
  });

  test("it should not accept missing entries", () => {
    const students = [
      {
        "name": "Student one",
        "email": "student1@gmail.com"
      },
      {
        "name": "Student two",
        "email": "student2@gmail.com"
      }
    ];
    const classes = {
      "classCode": "P1-1",
      "name": "P1 One"
    };
    const subject = {
      "subjectCode": "Eng",
      "name": "Englishhhhhh"
    };
    const teacher = {
      "name": "Teacher One",
      "email": "teacher1@gmail.com"
    }

    expect(fieldsAreValid({ students, class: classes, subject }))
      .toEqual(expect.stringContaining("Teacher"));

    expect(fieldsAreValid({ students, class: classes, teacher }))
      .toEqual(expect.stringContaining("Subject"));

    expect(fieldsAreValid({ class: classes, subject, teacher }))
      .toEqual(expect.stringContaining("Student"));

    expect(fieldsAreValid({ students, teacher, subject }))
      .toEqual(expect.stringContaining("Class"));

    expect(fieldsAreValid({ students }))
      .toEqual(expect.stringContaining("Teacher Subject Class"));

    expect(fieldsAreValid({ subject }))
      .toEqual(expect.stringContaining("Teacher Students Class"));

    expect(fieldsAreValid({ teacher }))
      .toEqual(expect.stringContaining("Students Subject Class"));

    expect(fieldsAreValid({ classes }))
      .toEqual(expect.stringContaining("Teacher Students Subject"));
  });

  test("it should not accept empty fields", () => {
    const missingEmail = [
      {
        "students": [
          {
            "name": "Student One",
            "email": ""
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
      },
      {
        "students": [
          {
            "name": "Student One",
            "email": "student1@gmail.com"
          },
          {
            "name": "Student two",
            "email": ""
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
      },
      {
        "students": [
          {
            "name": "Student One",
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
          "email": ""
        }
      },
    ]

    const missingName = [
      {
        "students": [
          {
            "name": "",
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
      },
      {
        "students": [
          {
            "name": "Student one",
            "email": "student1@gmail.com"
          },
          {
            "name": "",
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
      },
      {
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
          "name": ""
        },
        "subject": {
          "subjectCode": "Eng",
          "name": "Englishhhhhh"
        },
        "teacher": {
          "name": "Teacher One",
          "email": "teacher1@gmail.com"
        }
      },
      {
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
          "name": ""
        },
        "teacher": {
          "name": "Teacher One",
          "email": "teacher1@gmail.com"
        }
      },
      {
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
          "name": "",
          "email": "teacher1@gmail.com"
        }
      },
      {
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
        "class": {
          "classCode": "P1-1",
          "name": ""
        },
        "subject": {
          "subjectCode": "Eng",
          "name": ""
        },
        "teacher": {
          "name": "",
          "email": "teacher1@gmail.com"
        }
      }
    ]

    const missingUnique = [
      {
        "students": [
          {
            "name": "Student one",
            "email": ""
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
      },
      {
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
      },
      {
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
          "classCode": "",
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
      },
      {
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
          "subjectCode": "",
          "name": "Englishhhhhh"
        },
        "teacher": {
          "name": "Teacher One",
          "email": "teacher1@gmail.com"
        }
      },
      {
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
          "email": ""
        }
      },
      {
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
        "class": {
          "classCode": "P1-1",
          "name": ""
        },
        "subject": {
          "subjectCode": "Eng",
          "name": "Englishhhhhh"
        },
        "teacher": {
          "name": "Teacher One",
          "email": ""
        }
      }
    ]

    const expectedError = "Empty fields in:"
    for (let testItem of missingEmail) {
      expect(fieldsAreValid(testItem))
        .toEqual(expect.stringContaining(expectedError));
    }
    for (let testItem of missingName) {
      expect(fieldsAreValid(testItem))
        .toEqual(expect.stringContaining(expectedError));
    }
    for (let testItem of missingUnique) {
      expect(fieldsAreValid(testItem))
        .toEqual(expect.stringContaining(expectedError));
    }

  });
});
