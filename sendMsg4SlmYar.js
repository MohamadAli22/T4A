$(document).ready(function () {
$(".container.events").append( '<textarea id="txtAreaMSG" name="txtAreaMSG" rows="5" cols="70" style="border-color: black;"> </textarea>' );
$(".container.events").append( '<button type="button" class="btn btn-warning" id="btnMSG" name="btnMSGName" onclick="textAreaBtnClickFunction()"> ارسال پیام </button>' );
});

function textAreaBtnClickFunction() {

	let hashId = 
	(document.querySelector("body > div.container.actions > div > div:nth-child(1) > a").href).substr(34,(document.querySelector("body > div.container.actions > div > div:nth-child(1) > a").href.length));

	let authToken = "Bearer "+ readCookie('accessToken');

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
					alert('sent');
            	//process the JSON data etc
        		}
        
    		})
		}
	})
}

	let forbidenWords = ['نانوسان', 'سی ین', 'امبیل', 'بیز', 'دکتر بیز', 'دالی', 'گوزل', 'پرفکتا', 'لینکس', 'چایو لیدی',
		'چایو بیبی', 'عطرینھ', 'ایزی ول', 'easy well', 'clair', 'کلیر', 'سورینت', 'آموس وان', 'زوریک', 'آلینتو',
		'نازگل', 'مھگل', 'گرینلند', 'آرترینا', 'بابایس', 'ھیدالو', 'بییوتی', 'لوکاتل', 'پاکر', 'پاپران', 'کارل',
		'پنبھریز', 'الیکس', 'دایلکس', 'لدورا', 'Goldensand', 'Sliverado', 'نیوشا',

		'عتیقه', 'قرص', 'دارو', 'ژل', 'چاق کننده', 'لاغر کننده', 'خنجر', 'قمه', 'چاقو', 'باروت', 'سیگار',
		'تنباکو','قلیان','تخته نرد','ارگانیک', 'علی', 'محمد', 'فاطمه', 'حسن', 'حسین','سجاد','باقر','کاظم',
		'صادق','نقی','تقی','مهدی','شفا','معجزه','درمان'
		];

var problemQueue = [];

    var hasProblem = false;

	forbidenWords.forEach( function(word, index) {
		
    queue = [document.body];
    var curr;

	flag:
	while (curr = queue.pop()) {
	    if (!curr.textContent.match(word)) continue;
	    for (var i = 0; i < curr.childNodes.length; ++i) {
	        switch (curr.childNodes[i].nodeType) {
	            case Node.TEXT_NODE :
	                if (curr.childNodes[i].textContent.match(word)) {
	                	hasProblem = true;
	                	problemQueue.push(word);
	                	
	                    console.log(word+" Found!");
	                    console.log(curr);
	                    break flag;
	                }
	                break;
	            case Node.ELEMENT_NODE :
	                queue.push(curr.childNodes[i]);
	                break;
	        }
	    }
	}
});

if (hasProblem) {
	$("#txtAreaMSG").val('سلام از طرف باسلام خدمتتون پیام میدم. غرفه شما جهت تایید نباید حاوی کلمات زیر باشد لطفا این کلمات را استفاده نکنید: ');
	problemQueue.forEach( function(element, index) {
		$("#txtAreaMSG").val($("#txtAreaMSG").val()+" "+element);
	});
}else{
$("#txtAreaMSG").val('سلام از طرف باسلام خدمتتون پیام میدم. غرفه شما تایید شد');
}





