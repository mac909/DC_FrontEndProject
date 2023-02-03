// To redirect the login page to the homepage.
const reDirect = document.getElementById("buttonclick").onclick = () => {
    location.href = "../homepage/homepage.html"
} 

// To change the text of the button from submit to LogIn.
document.querySelector('#buttonclick').value = 'LogIn';

// To remove the disabled button just fill out both username and password text bars.
input = () => {
    let button = document.getElementById('buttonclick');
    let text = document.getElementById('bar1');
    let password = document.getElementById('bar2');
    if (text.value && password.value != '') {
        button.disabled = false;
    } else {
        button.disabled =true;
    }
}
