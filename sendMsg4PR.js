$(document).ready(function () {
$("#productReviews").append( '<hr class="product-section-line">' );
$("#productReviews").append( '<h3 style="color:orange"> اضافه شده توسط T4A</h3>' );
$("#productReviews").append( '<textarea id="txtAreaMSG" name="txtAreaMSG" rows="3" cols="70" style="border-color: black; background-color:orange;"> </textarea>' )
$("#productReviews").append( '<button type="button" class="btn btn-warning" id="btnMSG" name="btnMSGName" onclick="textAreaBtnClickFunction()"> ارسال به همه </button>' );
});

function textAreaBtnClickFunction(offset = 0){

var authToken = "Bearer "+ readCookie('accessToken');

var productId = window.location.href.substr(window.location.href.indexOf('product/')+8, 6);

$.ajax({
	type: 'POST',
	url: 'https://api.basalam.com/user',
	data: {"variables": {"productId":productId,"offset":offset,"limit":50}, "query":"query prodcutReviews($productId: ID!, $offset: Int, $limit: Int) { product(id: $productId) { reviews(filter: { limit: $limit, offset: $offset }) { totalCount resultCount reviews { id star hashId createdAt isPublic description productId likeCount dislikeCount isLikedByCurrentUser isDislikedByCurrentUser reasons{ id title type } photo(size:MEDIUM) { url } photoLarge: photo(size: LARGE){ url } product { id name price vendor { name identifier id } } user { id name hashId username avatar(size:SMALL) { url } } answers{ id description createdAt user { id name hashId username avatar(size: MEDIUM) { url } } } } } } }"},
	beforeSend: function(xhr) {
		xhr.setRequestHeader("Authorization", authToken)
	}, success: function(data){
		console.log(data)
		for (var i = 0; i < data.data.product.reviews.reviews.length; i++) {
			child = data.data.product.reviews.reviews[i];
			console.log(child);
			hashId = child.user.hashId;

				$.ajax({
	type: 'POST',
	url: 'https://chat.basalam.com/v1/create_private_chat',
	data: {"hashId": hashId},
	beforeSend: function(xhr) {
		xhr.setRequestHeader("Authorization", authToken)
	}, success: function(data){
		console.log("first ajax suc");
		let chatId = data.data.id;
		let txtMSG = $("#txtAreaMSG").val();

		$.ajax({
			type: 'POST',
			url: 'https://chat.basalam.com/v1/send_message',
			data: {"chatId": chatId , "messageType":"TEXT", "message":{ "text": txtMSG}},
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", authToken)
			}, success: function(data){
				console.log('sent');
        	//process the JSON data etc
    		}
    
		})
	}
})
		}

		if (data.product.reviews.totalCount > offset+50 ) {
			test(offset+50);
		}
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
