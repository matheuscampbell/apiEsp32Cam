
//on page load
$(document).ready(function() {
    if(readCookie("token")){
        getUser();
        getDepartamentos();
        setTimeout(function(){

            getProducts();
        },5000);
    }else{
        modalLogin();
    }
});