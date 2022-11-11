function getProducts() {
    $.ajax({
        url: APIURL+'/produtos',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': readCookie("token")
        },
        success: function (data) {
            if(data.produtos.length > 0) {
                data.produtos.forEach(function (produto) {
                    console.log(produto);
                    UinovoProduto(produto);
                });
            }
        },
        error: function (data) {
            alert('Erro ao carregar produtos');
        }
    });
}

function getDepartamentos() {
    $.ajax({
        url: APIURL+'/departamentos',
        type: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': readCookie("token")
        },
        success: function (data) {
            console.log(data);
            if(data.departamentos.length > 0) {
                data.departamentos.forEach(function (departamento) {
                    UinovoDepartamento(departamento);
                });
            }
        },
        error: function (data) {
            alert('Erro ao carregar departamentos');
        }
    });
}

function getProdutosPorDepartamento(id) {
    $.ajax({
        url: APIURL+'/produtos/'+id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            data.foreach(function (produto) {
                UinovoProduto(produto);
            });
        },
        error: function (data) {
            alert('Erro ao carregar produtos');
        }
    });
}

