export const updateWorkload = (teacher, workload, allSubjects) => {
  /* Create teacher entry in workload */
  workload[teacher.name] = [];
  let currTeacher = workload[teacher.name];

  teacher.Lessons.forEach(lesson => {
      /* Check if subject is already listed in teacher's load */
      let currSubject = allSubjects.find(s => s.id === lesson.SubjectId);
      let currSubjectIdx = currTeacher.findIndex(sub => sub.subjectCode === currSubject.subjectCode);

      /* Update load of subject */
      if (currSubjectIdx > -1) {
          currTeacher[currSubjectIdx].numberOfClasses++;
      } else {
          currTeacher.push({
              subjectCode: currSubject.subjectCode,
              subjectName: currSubject.subjectName,
              numberOfClasses: 1,
          })
      }
  })
}

export const updateName = async (itemFromBody, itemFromQuery) => {
    if (itemFromBody !== itemFromQuery) {
        itemFromQuery.name = itemFromBody.name;
        await itemFromQuery.save();
    }
    return itemFromQuery;
}
