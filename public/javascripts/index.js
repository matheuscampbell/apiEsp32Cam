
//on page load
$(document).ready(function() {
    if(readCookie("token")){
        getUser();
        getDepartamentos();
        getProducts();
    }else{
        modalLogin();
    }
});