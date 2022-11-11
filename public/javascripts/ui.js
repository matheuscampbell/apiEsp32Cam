function UinovoProduto(product) {
    var html = `<div class="col col-lg-3 col-md-4 col-sm-6 col-6" style="padding: 0 2px;padding-bottom: 4px;">
                    <div class="card btn p-0 text-start" style="box-shadow: 0px 0px 20px 0px rgba(33,37,41,0.11);border-radius: 10px;">
                        <div class="card-body">
                            <div class="d-flex float-start justify-content-between align-items-center align-content-center align-self-center" style="width: 100%;"><span class="badge rounded-pill bg-success float-start" style="margin-right: 4px;margin-bottom: 4px;font-size: 12px;background: rgb(13,190,108)!important;opacity: 0.83;"><i class="fa fa-truck"></i>&nbsp;Frete Grátis</span><span class="badge rounded-pill bg-danger float-start" style="margin-right: 4px;margin-bottom: 4px;font-size: 12px;background: rgb(13,190,108);opacity: 0.83;"><i class="fas fa-fire-alt"></i>&nbsp;Promoção</span></div>
                            <div id="imagem-doproduto-1" class="productImage" style="margin: -16px;background-size:cover !important;background-position: top;background-size: cover;background-repeat: space;border-radius: 10px;background: url('/images/${product.image}')"></div>
                            <div style="margin-top: 23px;">
                                <h5 style="text-overflow: ellipsis;"><strong>${product.name}</strong></h5>
                                <div class="text-end" style="white-space: nowrap;margin-top: -10px;">
                                <small style="font-size: 14px;">
                                <strong>
                                </strong><br></small><strong style="font-size: 28px;color: var(--bs-info);">R$ ${product.price}<br></strong></div>
                            </div><button class="btn w-100 rounded-pill" type="button" style="color: var(--bs-info);border-style: solid;border-color: var(--bs-info);"><strong>Ver Produto</strong></button>
                        </div>
                    </div>
                </div>`;
    console.log('#products'+product.departamento)
    $('#products'+product.departamento).append(html);
}

function UinovoDepartamento(department) {
    var html = `
    <section style="margin-top: 5px;">
            <h4 style="color: var(--bs-cyan);font-weight: bold;border-bottom-width: 1px;border-bottom-style: solid;"><i class="far fa-star"></i>&nbsp;${department.name}</h4>
            <div class="row" id="products${department.departamento??department.id}">
                
            </div>
        </section>  
    `;
    console.log(department)
    $('#products').append(html);
}

function modalLogin(){
    var id = modal('Login', `
    <div class="row">
        <div class="col">
            <div class="mb-3"><label class="form-label" for="email">Email</label><input class="form-control" type="email" id="email" name="email" placeholder="Email"></div>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <div class="mb-3"><label class="form-label" for="password">Senha</label><input class="form-control" type="password" id="password" name="password" placeholder="Senha"></div>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <div class="mb-3"><button class="btn btn-primary w-100" type="button" onclick="login()">Entrar</button></div>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <div class="mb-3"><button class="btn btn-primary w-100" type="button" onclick="modalRegister();$('#`+id+`').modal('hide')">Registrar</button></div>
            </div>
            </div>
    `);
}

function modalRegister(){
    var id = modal('Registrar', `
    <div class="row">
        <div class="col">
            <div class="mb-3"><label class="form-label" for="name">Nome</label><input class="form-control" type="text" name="namec" id="namec" placeholder="Nome"></div>
            </div><div class="col">
            <div class="mb-3"><label class="form-label" for="email">E-mail</label><input class="form-control" type="email" id="emailc" name="emailc" placeholder="E-mail"></div>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <div class="mb-3"><label class="form-label" for="password">Senha</label><input class="form-control" type="password" id="passwordc" name="passwordc" placeholder="Senha"></div>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <div class="mb-3"><button class="btn btn-primary w-100" type="button" onclick="register();$('#`+id+`').modal('hide')">Registrar</button></div>
            </div>
            </div>
    `);
}


function uiModalUploadImage(){
    var id = modal('Cadastre sua foto',
        `
        
       <div class="form-group text-center">
       <img src="" id="userImage" class="m-2" width="30%" height="auto">
            <label class="form-label">Enviar Foto</label>
            <input class="form-control" type="file" accept="image/*" id="upfoto">
       </div>
       <button class="btn btn-primary w-100 mt-2" onclick="uploadImage()">Enviar Imagem</button>
       `
        );
}

function modal(title, body, confirmText = false, callbackConfirm = false, callbackCancell = 'false') {
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var html = ' <div class="modal fade" id="' + id + '" data-bs-backdrop="static" tabindex="-1" aria-hidden="false">' +
        '            <div class="modal-dialog" role="document">' +
        '              <div class="modal-content">' +
        '                <div class="modal-header">' +
        '                  <h5 class="modal-title" id="exampleModalLabel1">' + title + '</h5>' +
        '                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '                </div>' +
        '                <div class="modal-body" style="max-height: 70vh;overflow: auto;">'
        + body +
        '                </div>' +
        '                <div class="modal-footer">' +
        '                  <button type="button" class="btn btn-outline-secondary" onclick="' + callbackCancell + '(this)" data-bs-dismiss="modal">Fechar</button>' +
        '                  <button type="button" style="' + (callbackConfirm && confirmText ? '' : 'display: none') + '" onclick="' + callbackConfirm + '(this)" class="btn btn-primary">' + confirmText + '</button>' +
        '                </div>' +
        '              </div>' +
        '            </div>' +
        '          </div>' +
        '        </div>' +
        '      </div>';
    $('body').append(html);
    $('#' + id).modal('show');
    $('#' + id).on('hidden.bs.modal', function (e) {
        setTimeout(function () {
            $('#' + id).remove();
        }, 500);
    });
    return id;
}

