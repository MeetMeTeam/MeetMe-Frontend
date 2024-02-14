export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
};

export const validateResetPwForm = ({ mail }) => {
  return validateMail(mail);
};

export const validateRegisterForm = ({ mail, password, username }) => {
  return (
    validateMail(mail) &&
    validatePassword(password) &&
    validateUsername(username)
  );
};

export const validatePassword = (password) => {
  return password.length > 5;
};

export const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};

export const validateUsername = (username) => {
  return username.length > 2 && username.length < 16;
};

export const validateDisplayName = (username) => {
  return username.length > 5 && username.length < 16;
};
