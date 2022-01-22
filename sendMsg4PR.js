// Type your JavaScript code here.

$(document).ready(function () {
$("#product-reviews").append( '<hr class="product-section-line">' );
$("#product-reviews").append( '<h3 style="color: #ff5c39"> اضافه شده توسط T4A</h3>' );
$("#product-reviews").append( '<textarea id="txtAreaMSG" name="txtAreaMSG" rows="3" cols="70" style="border-color: black; background-color:#ff5c39;"> </textarea>' )
$("#product-reviews").append( '<h5 style="color: #ff5c39">شماره صفحه</h5>' );
$("#product-reviews").append( '<textarea id="txtAreaPage" name="txtAreaPage" rows="1" cols="5" style="border-color: black; background-color:#ff5c39;">1</textarea>' )
$("#product-reviews").append( '<button type="button" class="btn btn-warning" id="btnMSG" name="btnMSGName" onclick="textAreaBtnClickFunction(0)"> ارسال به همه </button>' );
});

var sentSet = new Set();

function textAreaBtnClickFunction(offset){

var authToken = "Bearer "+ readCookie('accessToken');

var index_from = window.location.href.indexOf('product/')+8
var index_to = window.location.href.indexOf('/reviews')
var productId = window.location.href.substr(index_from,index_to-index_from);
let txtPage = $("#txtAreaPage").val();

$.ajax({
	type: 'POST',
	url: 'https://api.basalam.com/user',
	data: {"variables": {"productId":productId,"offset":(txtPage-1)*10,"limit":50}, "query":"query prodcutReviews($productId: ID!, $offset: Int, $limit: Int) { product(id: $productId) { reviews(filter: { limit: $limit, offset: $offset }) { totalCount resultCount reviews { id star hashId createdAt isPublic description productId likeCount dislikeCount isLikedByCurrentUser isDislikedByCurrentUser reasons{ id title type } photo(size:MEDIUM) { url } photoLarge: photo(size: LARGE){ url } product { id name price vendor { name identifier id } } user { id name hashId username avatar(size:SMALL) { url } } answers{ id description createdAt user { id name hashId username avatar(size: MEDIUM) { url } } } } } } }"},
	beforeSend: function(xhr) {
		xhr.setRequestHeader("Authorization", authToken)
	}, success: function(data){
		for (var i = 0; i < data.data.product.reviews.reviews.length; i++) {
			child = data.data.product.reviews.reviews[i];
			hashId = child.user.hashId;

            if(!sentSet.has(hashId)){				
            $.ajax({
                type: 'POST',
                url: 'https://chat.basalam.com/v2/chat',
                data: {"hashId": hashId, 'chatType':"PRIVATE"},
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", authToken)
                }, success: function(data){
                    console.log("first ajax suc");
                    let chatId = data.data.id;
                    let txtMSG = $("#txtAreaMSG").val();

                    $.ajax({
                        type: 'POST',
                        url: 'https://chat.basalam.com/v2/message',
                        data: {"chatId": chatId, "inProgressMessageId":"2", "messageType":"TEXT", "message":{ "text": txtMSG}},
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("Authorization", authToken)
                        }, success: function(data){
                            console.log('sent');
                        }
                
                    })
                }
            })
            sentSet.add(hashId);	
            }
        }

		// if (data.data.product.reviews.totalCount > offset+50 ) {
		// 	console.log('offset = '+offset);
		// 	setTimeout(() => {  textAreaBtnClickFunction(offset+50); }, 1000);
		// }else{
			alert("تعداد"+ data.data.product.reviews.totalCount+ " پیام ارسال گردید.");
		// }
	}
})

}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
