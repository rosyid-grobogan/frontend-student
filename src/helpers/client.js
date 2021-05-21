import fetch from 'unfetch';

export const getAllStudents = () => fetch('/students');

export const addNewStudent = (student) =>
  fetch('/students', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(student),
  });
