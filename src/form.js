var USERNAME_MAX = 8;
var USERNAME_MIN = 2;

function validate(){
  this.clearAlert();
  var flag1 = this.checkUsername();
  if(!flag1){
    this.addAlert();
    return false;
  }
  return true;
  /*
  var username = document.form_login.field_username.value;
  var password = document.form_login.field_password.value;
  if(username === ''){
    //window.alert('no userneme');
    this.addAlert();
    return false;
  }
  if(password === ''){
    //window.alert('no password');
    this.addAlert();
    return false;
  }
  return true;
  */
}

function checkUsername(){
  var username = document.form_login.field_username.value;
  var length = username.length;
  if (length < USERNAME_MIN || USERNAME_MAX < length){
    return false;
  } else {
    return true;
  }
}

function addAlert(){
  var addObj = document.createElement("div");
  addObj.setAttribute("id", "alert_txt");
  addObj.innerHTML = '<p>add</p>';
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