export function validateEmail(email) {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email);
}

export function validatePassword(password) {
  const minimumNumber = 6;
  return password.length >= minimumNumber;
}
