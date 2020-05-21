class Student {
  constructor(name, email) {
    const homeworkResults = [];
    const studentName = name;
    const studentEmail = email;

    this.getName = () => {
      return studentName;
    }

    this.getEmail = () => {
      return studentEmail;
    }

    this.getHomeworkResults = () => {
      return homeworkResults;
    }

    this.addHomeworkResults = (topic, success) => {
      const result = {
        'topic': topic,
        'success': success
      }
      homeworkResults.push(result);
    }
  }
}

class FrontendLab {
  constructor(students, failedLimit) {
    let failedHomeworksLimit = failedLimit;
    const studentsList = students.map(student => new Student(student.name, student.email));

    this.printStudentsList = () => studentsList.forEach(student => {
      let studentInfo = `name: ${student.getName()}, email: ${student.getEmail()}`;
      console.log(studentInfo);
      console.log(student.getHomeworkResults());
    });

    this.addHomeworkResults = (allWorks) => {
      allWorks['results'].forEach(work => {
        studentsList.forEach(student => {
          if (student.getEmail() === work['email']) {
            student.addHomeworkResults(allWorks['topic'], work['success']);
          }
        })
      })
    }

    this.printStudentsEligibleForTest = () => {
      let eligibleStudent = [];
      studentsList.forEach(student => {
        let failed = student.getHomeworkResults().reduce((total, cur) => {
          if (cur['success'] === false) {
            total += 1;
          }
          return total;
        }, 0);
        if (failed <= failedHomeworksLimit) {
          return eligibleStudent.push(student);
        }
      });
      eligibleStudent.forEach(student => {
        let studentInfo = `name: ${student.getName()}, email: ${student.getEmail()}`;
        console.log(studentInfo);
      })
    }
  }
}