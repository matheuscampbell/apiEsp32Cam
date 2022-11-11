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
    var file = document.getElementById("upfoto");
    if(file == null){
        alert("Insira uma imagem");
        return;
    }
    file = file.files[0];
    var dataf = new FormData();
    dataf.append('imageFile', file);

    $.ajax({
        url: APIURL + '/uploadUserImage',
        type: 'POST',
        dataType: 'json',
        data: dataf,
        processData: false,
        contentType: false,
        headers:{
            "Authorization":token
        },
        success: function (data) {
            console.log(data);
            if (data.status == 200) {
                var userImage = document.getElementById("userImage");
                if(data.image){
                    userImage.src = "/uploads/"+data.image;
                }
                location.reload();
            } else {
                alert("Imagem Não aceita");
            }
        },
        error: function (data) {
            alert("Erro ao adicionar imagem");
        }
    });



}