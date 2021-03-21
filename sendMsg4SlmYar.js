$(document).ready(function () {
  $('.container.events').append(
    '<textarea id="txtAreaMSG" name="txtAreaMSG" rows="5" cols="70" style="border-color: black;"> </textarea>'
  );
  $('.container.events').append(
    '<button type="button" class="btn btn-warning" id="btnMSG" name="btnMSGName" onclick="textAreaBtnClickFunction()"> ارسال پیام </button>'
  );
    $('.container.events').append(
    '<button type="button" class="btn btn-danger" id="btnMSG2" name="btnMSGName2" onclick="textAreaBtnClickFunction2()"> ارسال پیام غیر فعالی  </button>'
  );

  
    $("[href^='tel']").click(function() {
         $(this).select();
         document.execCommand("copy");  
    });
    $("[href^='tel']").removeAttr('href');



  let forbidenWords = [
    'نانوسان ',
    'سی ین ',
    'امبیل ',
    'بیز ',
    'دکتر بیز ',
    'دالی ',
    'گوزل ',
    'پرفکتا ',
    'لینکس ',
    'چایو لیدی ',
    'چایو بیبی ',
    'عطرینھ ',
    'ایزی ول ',
    'easy well',
    'clair',
    'کلیر ',
    'سورینت ',
    'آموس وان ',
    'زوریک ',
    'آلینتو ',
    'نازگل ',
    'مھگل ',
    'گرینلند ',
    'آرترینا ',
    'بابایس ',
    'ھیدالو ',
    'بییوتی ',
    'لوکاتل ',
    'پاکر ',
    'پاپران ',
    'کارل ',
    'پنبھریز ',
    'پنبه ریز ',
    'الیکس ',
    'دایلکس ',
    'لدورا ',
    'تلگرام:',
    'Goldensand',
    'Sliverado',
    'نیوشا ',
    'اینستاگرام:',
    'پیجم ', 
    'شماره زیر  ', 
    ' اورگانیک',
    'دارویی ',
    'کارتخوان',
    'کارت خوان',
    'پوز سیار',
     'حجم دهنده',
    'سوپراستار',


    'عتیقه',
    'قرص',
    'دارو ',
    'عفونی',
    'چاق کننده',
    'لاغر کننده',
    'لاغری',
    'چاقی',
    'خنجر',
    'قمه ',
    'چاقو',
    'باروت',
    'سیگار ',
    'تنباکو',
    'قلیان',
    'تخته نرد',
    'ارگانیک',
    'شفا ',
    'معجزه',
    'درمان',
    'وزن خالص: 1 گرم',
    '10000 گرم',
    'www.instagram.com',
    'fuck',
    'https://eitaa.com'
  ];

  var problemQueue = [];

  var hasProblem = false;

  forbidenWords.forEach(function (word, index) {
    queue = [document.body];
    var curr;

    flag: while ((curr = queue.pop())) {
      if (!curr.textContent.match(word)) continue;
      for (var i = 0; i < curr.childNodes.length; ++i) {
        switch (curr.childNodes[i].nodeType) {
          case Node.TEXT_NODE:
            if (curr.childNodes[i].textContent.match(word)) {
              hasProblem = true;
              problemQueue.push(word);
              break flag;
            }
            break;
          case Node.ELEMENT_NODE:
            queue.push(curr.childNodes[i]);
            break;
          default:
            break;
        }
      }
    }
  });

  if (hasProblem) {
    $('#txtAreaMSG').val(
      'سلام از طرف باسلام خدمتتون پیام میدم. متون غرفه شما جهت تایید نباید حاوی کلمات زیر باشد لطفا این کلمات را در زمان 24 ساعت آینده ویرایش کنید. سپاس : '
    );
    problemQueue.forEach(function (element, index) {
      $('#txtAreaMSG').val($('#txtAreaMSG').val() + ' - ' + element);
    });
  } else {
    $('#txtAreaMSG').val(
      "سلام غرفه شما تایید شد. من سلامیار هستم و کمکتون میکنم بتونید فروش بالایی رو تجربه کنید. ویدیو آموزش مخصوص غرفه دار های تازه نفس: https://www.youtube.com/watch?v=4RBf4kqra4o   لینک خرید رایگان آموزش باسلام از سلامیاران عضو باسلام:https://karbalad.basalam.com/blog/salamyar-landing"
    );
  }
});

document
    .querySelector('*[@id="event-type-select"]')
    .childNodes


function textAreaBtnClickFunction() {
  let hashId = document
    .querySelector('body > div.container.actions > div > div:nth-child(1) > a')
    .href.substr(
      34,
      document.querySelector(
        'body > div.container.actions > div > div:nth-child(1) > a'
      ).href.length
    );

  let authToken = 'Bearer ' + readCookie('accessToken');

  $.ajax({
    type: 'POST',
    url: 'https://chat.basalam.com/v1/create_private_chat',
    data: { hashId: hashId },
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', authToken);
    },
    success: function (data) {
      console.log('first ajax suc');
      let chatId = data.data.id;
      let txtMSG = $('#txtAreaMSG').val();

      $.ajax({
        type: 'POST',
        url: 'https://chat.basalam.com/v1/send_message',
        data: {
          chatId: chatId,
          messageType: 'TEXT',
          message: { text: txtMSG },
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', authToken);
        },
        success: function (data) {
          alert('sent');
          //process the JSON data etc
        },
      });
    },
  });
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


function textAreaBtnClickFunction2(){
    $('#txtAreaMSG').val(
    'سلام غرفه شما تایید نشد. لطفا جهت پیگیری به همین  گفت و گو پاسخ دهید. سپاس. تیم باسلام.'
    );

    textAreaBtnClickFunction();
}
