document.getElementById('login-btn').addEventListener('click',()=>{
    // get the username---
    const usernameId = document.getElementById('username');
    const username = usernameId.value;
    console.log(username);

    // get pasward---
    const passwardId = document.getElementById('password');
    const passward = passwardId.value;
    console.log(passward);



    // match usename and passward
    if (username == "admin" && passward == "admin123") {
        alert('Login successful');
        window.location.assign('home.html');
    }
    else {
        alert('Invalid info.');
        return;
    }
})
