export const validateUser = ({ username, email, password, confirmPassword }) => {
  if (!username || username.length < 3) {
    return { valid: false, message: "Användarnamn måste vara minst 3 tecken långt" };
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: "Ogiltig e-postadress" };
    }
  }

  if (!password || password.length < 4) {
    return { valid: false, message: "Lösenordet måste vara minst 4 tecken långt" };
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    return { valid: false, message: "Lösenorden matchar inte" };
  }

  return { valid: true };
};

export const validateLogin = ({ username, password }) => {
  if (!username) {
    return { valid: false, message: "Användare finns inte" };
  }

  if (!username || username.length < 3) {
    return { valid: false, message: "Användarnamn måste vara minst 3 tecken långt" };
  }
  if (!password || password.length < 4) {
    return { valid: false, message: "Lösenordet måste vara minst 4 tecken långt" };
  }
  return { valid: true };
};
