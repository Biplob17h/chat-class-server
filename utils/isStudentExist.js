const isStudentExist = (email, oldStudentArray) => {
  for (let i = 0; i < oldStudentArray.length; i++) {
    // Check if the email matches
    if (oldStudentArray[i].email === email) {
      // If a student with the same email is found, return true
      return true;
    }
  }
  // If no student with the same email is found, return false
  return false;
};

export default isStudentExist
