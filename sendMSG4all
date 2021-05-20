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
			console.log(data.data.chats);
            $('#statistics').text( offset+ data.data.chats.length +"/"+ data.data.totalCount);
			data.data.chats.forEach((element) => { 
				window.set.add(element.id);
			} );
			if(offset+250 < data.data.totalCount){
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
        ii=ii+1;
        if(ii%2==0){
            $('#statistics').text(ii + " پیام ارسال شده ");
        }
        if(ii%500==0){
            for(i=0; i<1000000; i++){}
        }
        $.ajax({
        type: 'POST',
        async:true,
        url: 'https://chat.basalam.com/v1/send_message',
        data: {
          chatId: value,
          messageType: 'TEXT',
          message: { text: msgText + '\n این پیام به صورت اتوماتیک ارسال شده است\n آموزش ارسال پیام از طریق لینک زیر\n'},
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', authToken);
        },
        success: function (data) {            
        },
      });
    });
}
