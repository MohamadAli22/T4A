// Type your JavaScript code here.

let authToken = 'Bearer ' + readCookie('accessToken');


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



$('div.container.container--mob').append(
    '<textarea id="txtMSG" name="txtMSG" rows="4" cols="100" style="border-color: black;"> </textarea>'
);
 $('div.container.container--mob').append(
    '<button disabled type="button" class="btn btn-warning" id="btnMSG" name="btnMSG" onclick="sendPM()"> ارسال پیام جعبه </button>'
 );
 $('div.container.container--mob').append(
    '<p id="statistics">statistics</p>'
 );
var set = new Set();
var sentSet = new Set();
readChat(0);


	
function readChat(offset){
	$.ajax({
        type: 'POST',
        url: 'https://chat.basalam.com/v1/get_chat_list',
        data: {
          offset: offset,
          size: 250
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', authToken);
        },
        success: function (data) {
			console.log(data.data);
            $('#statistics').text( offset+ data.data.chats.length);
			data.data.chats.forEach((element) => { 
				window.set.add(element.id);
			} );
			if(data.data.chats.length!=0){
				readChat(offset+250);
			}else{
                console.log(set);
                $('#btnMSG').removeAttr("disabled");
            }
        },
      });
}

async function sendPM(){
    msgText = $('#txtMSG').val();
    var ii=0;
    window.set.forEach((value, index) => { 
        if(ii%2==0){
            $('#statistics').text(ii + " پیام ارسال شده ");
        }
        if(ii%500==0){
            for(i=0; i<1000000; i++){}
        }
        if(!sentSet.has(value)){
            ii=ii+1;
            $.ajax({
                    type: 'POST',
                    async:true,
                    url: 'https://chat.basalam.com/v1/send_message',
                    data: {
                    chatId: value,
                    messageType: 'TEXT',
                    message: { text: msgText + '\n این پیام به صورت اتوماتیک ارسال شده است\n آموزش ارسال پیام از طریق https://youtu.be/viWPGxzwDww\n'},
                    },
                    beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', authToken);
                    },
                    success: function (data) {            
                    },
                });
            sentSet.add(value);
        }
    });
}
