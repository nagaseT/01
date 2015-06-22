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
  unallowedCharacters: new RegExp("[^a-zA-Z-\+!@]", "g"),
  numberErrorMessage: 'ERROR : passwordは6文字以上24文字以下です。',
  typeErrorMessage: 'ERROR : passwordに使用できるのは英大小字, -, +, !, @ のみです。'
};

window.addEventListener('load', function(e) {
  var $login = document.getElementById('login');

  $login.addEventListener('submit', function(e){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log(username, password);

    var params = {username: username, password: password};
    console.log(params);
    var results = validation(params);
    console.log(results);



    if (results.length !== 0) {
      e.preventDefault();
      var $errors = document.getElementById('errors');

      while($errors.firstChild) {
        $errors.removeChild($errors.firstChild);
      }

      var length = results.length;
      for (var i = 0; i < length; i++) {
        var $strong = document.createElement('strong');
        $strong.textContent = results[i];  // <strong>username is empty</strong>

        var $li = document.createElement('li'); // <li></li>
        $li.appendChild($strong);

        $errors.appendChild($li);
      }
    }
  });

  function validation(params) {
    var messages = [];

    var username = params.username;
    var usernameLength = username.length;
    if (usernameLength < USERNAME_CHECK.minStr || USERNAME_CHECK.maxStr < usernameLength) {
      messages.push(USERNAME_CHECK.numberErrorMessage);
    }
    var usernameMatching = username.match(USERNAME_CHECK.unallowedCharacters);
    if (usernameMatching){
      messages.push(USERNAME_CHECK.typeErrorMessage);
    }

    var password = params.password;
    var passwordLength = password.length;
    if (passwordLength < PASSWORD_CHECK.minStr || PASSWORD_CHECK.maxStr < passwordLength) {
      messages.push(PASSWORD_CHECK.numberErrorMessage);
    }
    var passwordMatching = password.match(PASSWORD_CHECK.unallowedCharacters);
    if (passwordMatching){
      messages.push(PASSWORD_CHECK.typeErrorMessage);
    }

    return messages;
  }


});

