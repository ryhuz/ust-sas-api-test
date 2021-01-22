const hasEmptyFields = (field, type = "") => {
  if (Array.isArray(field)) {
    for (let student of field) {
      for (let item in student) {
        let check = `${student[item]}`;
        if (check === "") {
          if (type) {
            return `${type} ${item[0].toUpperCase()}${item.slice(1)}`;
          } else { return true };
        }
      }
    }
  } else {
    for (let item in field) {
      let check = `${field[item]}`;
      if (check === "") {
        if (type) {
          return `${type} ${item[0].toUpperCase()}${item.slice(1)}`;
        } else { return true };
      }
    }
  }
  return false;
}

const fieldsAreValid = (fields) => {
  let { teacher, students, subject } = fields;
  let toClass = fields.class;

  let error = "";

  /* Check request body has all require parameters */
  if (!teacher || !students || !subject || !toClass) {
    error = `${!teacher ? "Teacher " : ""}${!students ? "Students " : ""}${!subject ? "Subject " : ""}${!toClass ? "Class" : ""}`;
    return `Missing items: ${error.trim()}`;
  }

  /* Check if any fields are empty */
  if (hasEmptyFields(teacher) || hasEmptyFields(students) || hasEmptyFields(subject) || hasEmptyFields(toClass)) {
    error = `${hasEmptyFields(teacher, "Teacher") ? "Teacher " : ""}${hasEmptyFields(students, "Student") ? "Students " : ""}${hasEmptyFields(subject, "Subject ") ? "Subject " : ""}${hasEmptyFields(toClass, "Class") ? "Class" : ""}`;
    return `Empty fields in: ${error.trim()}`;
  }
  return;
}

export default fieldsAreValid;
