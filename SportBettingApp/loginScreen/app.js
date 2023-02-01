const reDirect = document.getElementById("button").onclick = function () {
    location.href = "../homepage/homepage.html"
} 

{/* <a href="../homepage/homepage.html"> */}

function input() {
    let button = document.getElementById('button');
    let text = document.getElementById('bar1');
    let password = document.getElementById('bar2');
    if (text.value && password.value != '') {
        button.disabled = false;
    } else {
        button.disabled =true;
    }
}