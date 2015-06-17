var USERNAME_CHECK = {
      maxStr: 8,
      minStr: 2,
      unallowedCharacters: new RegExp("[^a-z-]", "g"),
      numberErrorMessage: 'ERROR : usernameは2文字以上8文字以下です。',
      typeErrorMessage: 'ERROR : usernameに使用できるのは英小文字と - のみです。'
    };
var PASSWORD_CHECK = {
      maxStr: 24,
      minStr: 6,
      unallowedCharacters: new RegExp("[^a-zA-Z-+!@]", "g"),
      numberErrorMessage: 'ERROR : passwordは6文字以上24文字以下です。',
      typeErrorMessage: 'ERROR : passwordに使用できるのは英大小字, -, +, !, @ のみです。'
    };

var loginForm = document.getElementById("form_login");
loginForm.addEventListener('submit', onSubmit);

function onSubmit(ev){
  clearAlert();
  var inputValues = getInputData();
  var errorMessages = checkInput(inputValues);
  if (Object.keys(errorMessages).length !== 0){
    showAlert(errorMessages);
    ev.preventDefault();
    return;
  }
}

function getInputData(){
  var username = document.form_login.username.value;
  var password = document.form_login.password.value;
  return {username: username, password: password};
}

function checkInput(values){
  var messages = {};
  var checkUsernameResults = validate(values.username, USERNAME_CHECK);
  if (checkUsernameResults.length !== 0){
    messages.username = checkUsernameResults;
  }
  var checkPasswordResults = validate(values.password, PASSWORD_CHECK);
  if (checkPasswordResults.length !== 0){
    messages.password = checkPasswordResults;
  }
  return messages;
}

function validate(value, params){
  var ary = [];
  var length = value.length;
  if (length < params.minStr || params.maxStr < length){
    ary.push(params.numberErrorMessage);
  }
  var matchingResult = value.match(params.unallowedCharacters);
  if (matchingResult){
    ary.push(params.typeErrorMessage);
  }
  return ary;
}

function showAlert(errorMessages){
  var addObj = document.createElement("div");
  addObj.setAttribute("id", "alert_txt");

  for (key in errorMessages) {
    var messages = errorMessages[key];
    var length = messages.length;
    for (var i = 0; i < length; i++) {
      var pObj = document.createElement("p");
      pObj.textContent = messages[i];
      addObj.appendChild(pObj);
    }
  }

  var parentObj = document.getElementById("alert_area");
  parentObj.appendChild(addObj);
}

function clearAlert(){
  var parentObj = document.getElementById("alert_area");
  var clearObj = document.getElementById("alert_txt");
  if (clearObj){
    parentObj.removeChild(clearObj);
  }
}