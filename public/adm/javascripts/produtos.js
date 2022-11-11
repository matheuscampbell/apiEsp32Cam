$(document).ready(function () {
    getProdutos();
    getDepartamentos();
});

async function novoProduto() {
    var nome = document.getElementById("nome").value;
    var departamento = document.getElementById("departamento").value;
    var preco = document.getElementById("preco").value;
    var imagem = document.getElementById("imagemproduto");
    if(nome == "" || departamento == "" || preco == "" || imagem == ""){
        alert("Preencha todos os campos");
        return;
    } else{
        var formData = new FormData();
        formData.append('nome', nome);
        formData.append('departamento', departamento);
        formData.append('preco', preco);
        formData.append('imageFile', imagem.files[0]);

        $.ajax({
            url: APIURL + '/addproduto',
            type: 'POST',
            dataType: 'json',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log(data);
                if (data.status == 200) {
                    alert("Produto adicionado com sucesso");
                    location.reload();
                } else {
                    alert("Erro ao adicionar produto");
                }
            },
            error: function (data) {
                alert("Erro ao adicionar produto");
            }
        });

    }
}

async function convertFileElementImageToBase64(element) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(element.files[0]);
    });
}

function getProdutos() {
    $.ajax({
        url: APIURL + '/allprodutos',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var produtos = data.produtos;
            if (produtos) {
                var html = '';
                produtos.forEach(function (produto) {
                    html += htmlProduto(produto);
                });
                $('#produtos').html(html);
            }
        },
        error: function (data) {
            alert("Erro ao obter produtos");
        }
    });
}

function htmlProduto(produto) {
    var html = `
        <tr>
            <td><img class="rounded-circle me-2" width="30" height="30"
            src="/images/${produto.image}">${produto.name}</td>
            <td>${produto.departamento}</td>
            <td>R$ ${produto.price}</td>
            <td><button class="btn btn-danger" onclick="deleteProduto('${produto.id}')">Excluir</button></td>
        </tr>`;
    return html;
}

function novoDepartamento() {
    var nome = document.getElementById("depNome").value;
    if(nome == ""){
        alert("Preencha o campo");
        return;
    }
    else{
        $.ajax({
            url: APIURL + '/adddepartamento',
            type: 'POST',
            dataType: 'json',
            data: {
                nome: nome
            },
            success: function (data) {
                console.log(data);
                if (data.status == 200) {
                    alert("Departamento adicionado com sucesso");
                    location.reload();
                } else {
                    alert("Erro ao adicionar departamento");
                }
            },
            error: function (data) {
                alert("Erro ao adicionar departamento");
            }
        });
    }
}


function getDepartamentos() {
    $.ajax({
        url: APIURL+'/alldepartamentos',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var selectd = '';
            console.log(data.departamentos);
            if(data.departamentos.length > 0) {
                data.departamentos.forEach(function (departamento) {
                    selectd += `<option value="${departamento.id}">${departamento.name}</option>`;
                });
            }
            console.log(selectd);
            $('#departamento').html(selectd);
        },
        error: function (data) {
            alert('Erro ao carregar departamentos');
        }
    });
}

function deleteProduto(id) {
    $.ajax({
        url: APIURL + '/deleteproduto/'+id,
        type: 'DELETE',
        dataType: 'json',
        data: {
            id: id
        },
        success: function (data) {
            console.log(data);
            if (data.status == 200) {
                alert("Produto excluido com sucesso");
                location.reload();
            } else {
                alert("Erro ao excluir produto");
            }
        },
        error: function (data) {
            alert("Erro ao excluir produto");
        }
    });
}