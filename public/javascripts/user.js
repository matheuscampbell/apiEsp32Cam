function getUser(){
    var token = readCookie("token");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", APIURL+"/getUserByToken", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            var user = JSON.parse(xhr.responseText)['user'];
            console.log(user);
            document.getElementById("userName").innerHTML = "Olá "+ user.name;
            //user image
            var userImage = document.getElementById("userImage");
            if(user.image){
                userImage.src = "/uploads/"+user.image;
            }else{
                uiModalUploadImage();
            }
            //user email
            var userEmail = document.getElementById("userEmail");
            userEmail.innerHTML = user.email;
            //save in local storage
            localStorage.setItem("user", JSON.stringify(user));

        }
    }
}

function uploadImage(){
    var token = readCookie("token");
    var file = document.getElementById("file").files[0];
    var data = new FormData();
    data.append('file', file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", APIURL+"/uploadUserImage", true);
    xhr.setRequestHeader('Authorization', token);
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var user = JSON.parse(xhr.responseText);
            //user image
            var userImage = document.getElementById("userImage");
            if(user.image){
                userImage.src = "/uploads/"+user.image;
            }
            //save in local storage
            localStorage.setItem("user", JSON.stringify(user));
        }else{
            alert("Falha ao enviar imagem");
        }
    }
}