$(document).ready(function () {
    getCliente();
    getClienteReconhecimentos();
    getDepartamentos();
    getProdutosCliente();
});

function getCliente() {
    var id = getGETParameter('id');
    $.ajax({
        url: APIURL + '/users/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var cliente = data.user;
            if (cliente) {
                $('#nome').html(cliente.name);
                $('#email').html(cliente.email);
                $('#loja').html(cliente.loja);
                $('#clienteImg').attr('src', '/images/'+cliente.image);
            }
        },
        error: function (data) {
            alert("Erro ao obter usuario");
        }
    });
}

function getClienteReconhecimentos() {
    var id = getGETParameter('id');
    $.ajax({
        url: APIURL + '/reconhecimentoscliente/' + id ,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var reconhecimentos = data.reconhecimentos;
            if (reconhecimentos) {
                var html = '';
                reconhecimentos.forEach(function (reconhecimento) {
                    html += htmlReconhecimento(reconhecimento);
                });
                $('#reconhecimentos').html(html);
            }
        },
        error: function (data) {
            alert("Erro ao obter reconhecimentos");
        }
    });
}

function htmlReconhecimento(reconhecimento) {
    var html = `
    <tr>
        <td>${reconhecimento.id}<img class="rounded-circle me-2" width="30" height="30" src="/images/${reconhecimento.image}"></td>
        <td>${reconhecimento.loja}</td>
        <td>${reconhecimento.departamento}</td>
        <td>${reconhecimento.produto}</td>
    </tr>`;
    return html;
}

function getDepartamentos() {
    var id = getGETParameter('id');
    $.ajax({
        url: APIURL + '/interessesdepartamentoscliente/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var departamentos = data.interesses;
            if (departamentos) {
                var html = '';
                departamentos.forEach(function (departamento) {
                    html += htmlDepartamento(departamento);
                });
                $('#departamento').html(html);
            }
        },
        error: function (data) {
            alert("Erro ao obter departamentos");
        }
    });
}

function htmlDepartamento(departamento) {
    var html = `
        <tr>
            <td>${departamento.name}</td>
            </tr>
    `;
    return html;
}

function getProdutosCliente(){
    var id = getGETParameter('id');
    $.ajax({
        url: APIURL + '/interessesprodutoscliente/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var produtos = data.interesses;
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
            <td><img src="/images/${produto.image}" class="rounded-circle me-2" width="30" height="30"></td>
            <td>${produto.name}</td>
            </tr>
    `;
    return html;
}