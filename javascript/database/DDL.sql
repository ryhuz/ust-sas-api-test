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
    subjectName varchar(255) NOT NULL,
    subjectCode varchar(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (subjectCode)
);
SELECT "Subjects table created";
CREATE TABLE Classes (
    id int NOT NULL AUTO_INCREMENT,
    className varchar(255) NOT NULL,
    classCode varchar(10) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (classCode)
);
SELECT "Classes junction table created";
CREATE TABLE StudentClasses (
    studentId int NOT NULL,
    classId int NOT NULL,
    UNIQUE (studentId),
    FOREIGN KEY (studentId) REFERENCES Students(id),
    FOREIGN KEY (classId) REFERENCES Classes(id),
    CONSTRAINT PK_StudentClasses PRIMARY KEY (studentId,classId)
);
SELECT "StudentClasses junction table created";
CREATE TABLE ClassesSubjects (
    classSubjectIndex int NOT NULL AUTO_INCREMENT,
    subjectId int NOT NULL,
    classId int NOT NULL,
    PRIMARY KEY (classSubjectIndex),
    FOREIGN KEY (subjectId) REFERENCES Subjects(id),
    FOREIGN KEY (classId) REFERENCES Classes(id),
    CONSTRAINT PK_ClassesSubjects UNIQUE (subjectId,classId)
);
SELECT "ClassesSubjects junction table created";
CREATE TABLE TeachersTeaching (
    teacherId int NOT NULL,
    classSubjectId int NOT NULL,
    UNIQUE (classSubjectId),
    FOREIGN KEY (teacherId) REFERENCES Teachers(id),
    FOREIGN KEY (classSubjectId) REFERENCES ClassesSubjects(classSubjectIndex),
    CONSTRAINT PK_TCS PRIMARY KEY (teacherId,classSubjectId)
);
SELECT "TeachersTeaching junction table created";
