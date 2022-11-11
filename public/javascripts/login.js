function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var data = {
        "email": email,
        "password": password
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", APIURL+"/login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let token = JSON.parse(xhr.responseText).token;
            createCookie("token", token, 10);
            alert("Login efetuado com sucesso!");
            window.location.href = "/";
        }else if(xhr.readyState == 4){
            alert("Falha ao logar");
        }
    }
}

function register(){
    var name = document.getElementById("namec").value;
    var email = document.getElementById("emailc").value;
    var password = document.getElementById("passwordc").value;
    if(password.length == 0 || email.length == 0 || name.length == 0){
        alert("Preencha todos os campos");
        return;
    }
    var data = {
        "name": name,
        "email": email,
        "password": password
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", APIURL+"/register", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            window.location.href = "/";
            alert("Usuário cadastrado com sucesso!");
        }else if(xhr.readyState == 4){
            alert("Falha ao logar");
        }
    }
}

function logout(){
    eraseCookie("token");
    window.location.href = "/";
}