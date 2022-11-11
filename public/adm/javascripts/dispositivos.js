
$(document).ready(function(){
    getProdutos();
    getDepartamentos();
    getLojas();
    getDispositivos();
});


function htmlDispositivo(dispositivo){
    var html = `
                                        <tr>
                                            <td>${dispositivo.id}</td>
                                            <td>${dispositivo.mac}</td>
                                            <td>${dispositivo.departamento}</td>
                                            <td>${dispositivo.produto}</td>
                                            <td>${dispositivo.loja}</td>
                                            <td><button class="btn btn-danger" onclick="deleteDispositivo(${dispositivo.id})">Delete</button></td>
                                        </tr>`;
    return html;
}


function getDispositivos(){
    $.ajax({
        url: APIURL+'/getDispositivos',
        type: 'GET',
        success: function(result) {
            if(result.status == 200){
                var dispositivos = result.dispositivos;
                var html = '';
                dispositivos.forEach(dispositivo => {
                    html += htmlDispositivo(dispositivo);
                });
                $('#dispositivos').html(html);
            }else{
                alert(result.message);
            }
        }
    });
}


function deleteDispositivo(id){
    $.ajax({
        url: APIURL+'/deleteDispositivo/'+id,
        type: 'DELETE',
        success: function(result) {
            if(result.status == 200){
                alert(result.message);
                location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}

function novoDispositivo(){
    var mac = $('#mac').val();
    var loja = $('#loja').val();
    var departamento = $('#departamento').val();
    var produto = $('#produto').val();
    $.ajax({
        url: APIURL+'/addDispositivo',
        type: 'POST',
        data: {mac:mac, loja:loja, departamento:departamento, produto:produto},
        success: function(result) {
            if(result.status == 200){
                alert(result.message);
                location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}
function getProdutos(){
    $.ajax({
        url: APIURL+'/allprodutos',
        type: 'GET',
        success: function(result) {
            if(result.status == 200){
                var produtos = result.produtos;
                var html = '<option value="0">Nenhum</option>';
                produtos.forEach(produto => {
                    html += '<option value="'+produto.id+'">'+produto.name+'</option>';
                });
                $('#produto').html(html);
            }else{
                alert(result.message);
            }
        }
    });
}

function getDepartamentos(){
    $.ajax({
        url: APIURL+'/alldepartamentos',
        type: 'GET',
        success: function(result) {
            if(result.status == 200){
                var departamentos = result.departamentos;
                var html = '';
                departamentos.forEach(departamento => {
                    html += '<option value="'+departamento.id+'">'+departamento.name+'</option>';
                });
                $('#departamento').html(html);
            }else{
                alert(result.message);
            }
        }
    });
}

function getLojas(){
    $.ajax({
        url: APIURL+'/getLojas',
        type: 'GET',
        success: function(result) {
            if(result.status == 200){
                var lojas = result.lojas;
                var html = '';
                lojas.forEach(loja => {
                    html += '<option value="'+loja.id+'">'+loja.nome+'</option>';
                });
                $('#loja').html(html);
            }else{
                alert(result.message);
            }
        }
    });
}

function connDispositivo(){
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b']
    })
        .then(device => {
            console.log("connecting to " + device.name);
            // Attempts to connect to remote GATT Server.
            return device.gatt.connect();
        alert("Conectado ao dispositivo, aguarde...");
        })
        .then(server => {
            // Getting Service…
            return server.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
        })
        .then(service => {
            // Getting Characteristic…
            return service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8");
        })
        .then(characteristic => {
            // Reading value
            return characteristic.readValue();
        })
        .then(value => {
            console.log(`Value is ${value.getUint8(0)}`);
            $('#mac').val(value.getUint8(0));
        })
        .catch(error => { alert("Erro ao conectar.") });
}