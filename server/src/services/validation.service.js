function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

function isValidUser(user) {
  return user.email && user.password;
}

function isCredentialValid(user) {
  return user.email && user.password;
}

module.exports = { isValidUser, validateEmail, isCredentialValid };
