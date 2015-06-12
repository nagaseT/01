var USERNAME_CHECK = {
      tagName: 'username',
			maxStr: 8,
			minStr: 2,
			unallowedCharacters: new RegExp("[^a-z-]", "g"),
			numberErrorMessage: 'ERROR : <h1>alert("xss")</h1>usernameは2文字以上8文字以下です。',
			typeErrorMessage: 'ERROR : usernameに使用できるのは英小文字と - のみです。'
		};
var PASSWORD_CHECK = {
      tagName: 'password',
			maxStr: 24,
			minStr: 6,
			unallowedCharacters: new RegExp("[^a-zA-Z-+!@]", "g"),
			numberErrorMessage: 'ERROR : passwordは6文字以上24文字以下です。',
			typeErrorMessage: 'ERROR : passwordに使用できるのは英大小字, -, +, !, @ のみです。'
		};

var loginForm = document.getElementById("form_login");
console.log(loginForm);
loginForm.addEventListener('submit', checkInput);

function checkInput(ev){
  console.log(ev);
  clearAlert();

  var checkParams = [USERNAME_CHECK, PASSWORD_CHECK];
  for (var i = 0; i < checkParams.length; i++) {
    checkParams[i].inputStr = document.form_login[checkParams[i].tagName].value;
    var checkResult = validate(checkParams[i]);
    if(!checkResult.result){
      addAlert(checkResult.errorMessage);
      ev.preventDefault();
    }   
  }
}

function validate(params){
  var length = params.inputStr.length;
  if (length < params.minStr || params.maxStr < length){
    return {result: false, errorMessage: params.numberErrorMessage};
  }

  var matchingResult = params.inputStr.match(params.unallowedCharacters);
  if (matchingResult){
  	return {result: false, errorMessage: params.typeErrorMessage};
	}

	return {result: true, errorMessage: ''};
}

function addAlert(errorMessage){
  var addP = document.createElement("p");
  addP.textContent = errorMessage;
  var addObj = document.createElement("div");
  addObj.setAttribute("id", "alert_txt");
  addObj.appendChild(addP);
  var parentObj = document.getElementById("alert_area");
  parentObj.appendChild(addObj);
}

function clearAlert(){
  var parentObj = document.getElementById("alert_area");
  var clearObj = document.getElementById("alert_txt");
  if (clearObj) {
    parentObj.removeChild(clearObj);
  }
}