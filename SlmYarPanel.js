// Type your JavaScript code here.

shopArray = [];
name = ""; 
color = ""; 
login();


function login(){

id = localStorage.getItem('ID');

    if (id == null) {
        var person = prompt("Please enter your given ID");
        if (person != null) {
            localStorage.setItem('ID', person);
            id = person;
        } else {
            close;
        }
    }


if(id==1) {
name = "خانم آرزو هاشمی"
color= "#8BCACA"
}else if (id==2){
name = "خانم رویا هاشمی"
color= "#FEA889"
} else if (id==3){
    name = "خانم کرباسی"
    color= "#FFD8C5"
}else if (id==4){
    name = "خانم قاسمی"
    color= "#e0c061"
}
    
$("nav").removeClass("bg-dark");
$('nav').attr("style", "background-color:"+color);
getShops(id)

}

function resetLogin(){
    localStorage.removeItem('ID');
    location.reload(); 
}

function getShops(id){
    if(document.title == 'سلام‌یار - لیست غرفه‌های تحت آموزش'){
        $.get("https://magharaat.ir/public/getMyShops/"+id, function(data, status){
            console.log('hh '+status);
        shopArray = data.result;
        console.log(data);
        name = name + "(" + data.moreInfo  +")";
        $("nav:has(img)").append('<a style="color:white" onclick="resetLogin()" href="#">'+name+'</a>');
        
        $("th:first-child").each(function(index, parent) {
            $(parent).attr("style", "background-color:#FF6962");
        });
        $("th:first-child").each(function(index, parent) {
            shopArray.forEach(function(item, index) {
                if(parent.childNodes[0].textContent.replace(/\s/g, '').replace('\n', '') == item) {
                                console.log('found')
                                $(parent).attr("style", "background-color:#77DD76");
                }
            });
        });
    });
    } 
}
