$(document).ready(function () {
    getUsers();
});



function getUsers(){
    $.ajax({
        url: APIURL + '/users',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var clientes = data.usuarios;
            if(clientes){
                var html = '';
                clientes.forEach(function (user) {
                    html += htmlUser(user);
                });
                $('#clientes').html(html);
            }
        },
        error: function (data) {
            alert("Erro ao obter usuarios");
        }
    })
}

function htmlUser(user){
    var html = `
    <tr>
                                    <td style="cursor:pointer" onclick="location.href='/adm/cliente.html?id=${user.id}'"><img class="rounded-circle me-2" width="30" height="30"
                                             src="${user.image}">${user.name}
                                    </td>
                                    <td>${user.loja??"Não Cadastrado"}</td>
                                    <td>${user.email}</td>
                                </tr>`;
    return html;
}


