window.addEventListener('load', function (e) {
  //#region variables
  let userName = document.querySelector("input[name='userName']");

  let span = document.querySelector('span');
  let login = document.querySelector("input[type='button']");
  let myForm = document.querySelector('form');
  let selected = document.querySelector('select');
  let userValue = '';
  let selectValue = selected.value;
  //#endregion
  //click subnit to go to next page
  login.addEventListener('click', function (e) {
    userValue = validation(userName, span);
    if (userValue) {
      localStorage.clear();
      localStorage.setItem('userName', userValue);
      localStorage.setItem('selectValue', selectValue);
      myForm.submit();
      userName.value = '';
    } else {
      e.preventDefault();
    }
  });
  //error border disapear and change to sucess border
  userName.addEventListener('keydown', (e) => {
    span.style.display = 'none';
    userName.classList.remove('red');
  });
  //select game level
  selected.addEventListener('change', (e) => {
    selectValue = selected.value;
  });
});

//validation on user name
function validation(userName, span) {
  if (userName.value === '' || userName.value == null) {
    span.style.display = 'block';
    userName.focus();
    userName.classList.add('red');
    return false;
  } else {
    span.style.display = 'none';
    userName.classList.remove('red');
    return userName.value;
  }
}
