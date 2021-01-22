CREATE TABLE Teachers (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);
SELECT "Teachers table created";

CREATE TABLE Students (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);
SELECT "Students table created";

CREATE TABLE Subjects (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    subjectCode varchar(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (subjectCode)
);
SELECT "Subjects table created";

CREATE TABLE Classes (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    classCode varchar(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (classCode)
);
SELECT "Classes table created";

CREATE TABLE ClassRegister (
    studentId int NOT NULL,
    classId int NOT NULL,
    FOREIGN KEY (studentId) REFERENCES Students(id),
    FOREIGN KEY (classId) REFERENCES Classes(id),
    CONSTRAINT PK_ClassesSubjects UNIQUE (studentId,classId)
);
SELECT "ClassRegister junction table created";

CREATE TABLE Lessons (
    lessonId int NOT NULL AUTO_INCREMENT,
    subjectId int NOT NULL,
    classId int NOT NULL,
    PRIMARY KEY (lessonId),
    FOREIGN KEY (subjectId) REFERENCES Subjects(id),
    FOREIGN KEY (classId) REFERENCES Classes(id),
    CONSTRAINT PK_ClassesSubjects UNIQUE (subjectId,classId)
);
SELECT "Lesson junction table created";

CREATE TABLE TeacherLessons (
    lessonId int NOT NULL,
    teacherId int NOT NULL,
    FOREIGN KEY (teacherId) REFERENCES Teachers(id),
    FOREIGN KEY (lessonId) REFERENCES Lessons(lessonId),
    CONSTRAINT PK_TCS PRIMARY KEY (teacherId,lessonId)
);
SELECT "TeachersTeaching junction table created";
