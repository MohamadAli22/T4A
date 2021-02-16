$(document).ready(function () {
$(".container.events").append( '<textarea id="txtAreaMSG" name="txtAreaMSG" rows="5" cols="70" style="border-color: black;"> </textarea>' );
$(".container.events").append( '<button type="button" class="btn btn-warning" id="btnMSG" name="btnMSGName" onclick="textAreaBtnClickFunction()"> ارسال پیام </button>' );
});

function textAreaBtnClickFunction() {

	let hashId = 
	(document.querySelector("body > div.container.actions > div > div:nth-child(1) > a").href).substr(34,(document.querySelector("body > div.container.actions > div > div:nth-child(1) > a").href.length));

	let authToken = 
	"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNjOTI3NDFiMzE5NWFmMTAzMWUwYzM1ODYxMDM2NTMyNTA4NzkzNzgyMGI0YjliNjM2M2M5YjhiODgyZTA3Njk4ODM5MWFjMDA2NjJmZGRhIn0.eyJhdWQiOiIyIiwianRpIjoiY2M5Mjc0MWIzMTk1YWYxMDMxZTBjMzU4NjEwMzY1MzI1MDg3OTM3ODIwYjRiOWI2MzYzYzliOGI4ODJlMDc2OTg4MzkxYWMwMDY2MmZkZGEiLCJpYXQiOjE2MTAwMTIwNzQsIm5iZiI6MTYxMDAxMjA3NCwiZXhwIjoxNjE3Nzg0NDc0LCJzdWIiOiI1OTg1MjciLCJzY29wZXMiOltdfQ.g6UzYop1CZcDMsW0q5zScOJiRzp3u8XzjuvlwCoFj-qSG7T2GzOpiE9tyCT6sl3Os0SwYu_p23WL3F7IRebtAPOuoelItJ0SYfBRpLUwXazwJpcrU6c5eyV5X50KQbRfdvvlQGRoIYzUbZarDUV3VxDWmX17pY3MROJ2KPApn5yJvz0jQsF_dZ8tqrfScmZXoPE-Jyar4fSYiRdeao7yNfgxjLNmE8ZW0PACbPD6EL1luFryy4TabMZaugaBkkc_pgq4X9iN0VlfE2PZFywzwz8Mh7IAtBN26m3U2asgEBypZKtdngl32F5mWpfyB-ZzqE_9a5f9ObAYJML3_WyDiFXu5ctqNhxsuB4Yy_uGb-3uUkwi5ARreIQKNbUM3b9u6vlsmhIXQ8EqeQDapEqvbFd6_Uz1N_kZ_CAYWjjSI6byxzflzD474Gq1NKLi0wvrOsuI-g7eh2QG6TqRq3mPBrhUBJQxy6jf3kS62a4s5He9SVqsGh0caLXDYEt6FcrVOTZBcUXWfaG8sIqOIdrD1320Wwze5tTFSUIPUFTXy15toz9u2QD0JKA7WF7eWIblN2CsX_5Zt71BeZXXW29pFIXZJyFImdvHfqaOWcPZn10dvM3wpcbg2pnjijASSFMqgINzi6zqxl-z_0DHLdvSvK--Aic0e7tAMYNiGGbvWfw";

	console.log(authToken);

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





