// To redirect the login page to the homepage.

// To change the text of the button from submit to LogIn.
// document.querySelector("#buttonclick").value = "LogIn";

// To remove the disabled button just fill out both username and password text bars.
input = () => {
  let button = document.getElementById("buttonclick");
  let link = document.getElementById("linkHome");
  let text = document.getElementById("bar1");
  let password = document.getElementById("bar2");
  if (text.value && password.value != "") {
    button.disabled = false;
    link.setAttribute("style", "'pointer-events: all;'");
  } else {
    button.disabled = true;
    link.setAttribute("style", "'pointer-events: none;'");
  }
};
