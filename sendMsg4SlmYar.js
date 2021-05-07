
let authToken = 'Bearer ' + readCookie('accessToken');

$(document).ready(function () {
  $('.container.events').append(
    '<textarea id="txtAreaMSG" name="txtAreaMSG" rows="4" cols="90" style="border-color: black;"> </textarea>'
  );
  $('.container.events').append(
    '<button type="button" class="btn btn-warning" id="btnMSG" name="btnMSGName" onclick="textAreaBtnClickFunction()"> ارسال پیام جعبه </button>'
  );
    $('.container.events').append(
    '<button type="button" class="btn btn-danger" id="btnMSG2" name="btnMSGName2" onclick="textAreaBtnClickFunction2()"> تعیین وضعیت و ارسال پیام غیر باسلامی  </button>'
  );
   $('.container.events').append(
    '<button type="button" class="btn btn-success" id="btnMSG3" name="btnMSGName2" onclick="textAreaBtnClickFunction3()"> تعیین وضعیت و ارسال پیام فعالی  </button>'
  );

$('.container.events').append(
  '<div style="position:fixed; z-index:1000; top:200px; left:4px; background:orange;"><input type="checkbox" id="agahi"><label for="agahi"> حالت آگهی دارد</label><br><input type="checkbox" id="shabkei"><label for="shabkei"> بازاریابی شبکه ای</label><br><input type="checkbox" id="tafkik"><label for="tafkik"> محصولات تفکیک نیست</label><br><br></div>'
  );
  
    $("[href^='tel']").click(function() {
         $(this).select();
         document.execCommand("copy");  
    });
    $("[href^='tel']").removeAttr('href');


    scanPage();

    $('input').change(function(){
        scanPage();    
        checkboxCheck();
    });

});


function checkboxCheck(){
    var newM = ' \n دیگر اصلاحات مورد نیاز غرفه شما: ';
    $('input').each(function () {
        if($(this).prop( "checked" )){
            if($(this).attr('id') == 'agahi' ){
                newM = newM.concat(" محصولات شما حالت آگهی دارند- ", " ");
                console.log('agahi');
            }
            if($(this).attr('id') == 'shabkei'){
                newM = newM.concat(" محصولات شما بازاریابی شبکه ای هستند- ", " ");
                console.log('shabkei');
            }
            if($(this).attr('id') == 'tafkik'){
                newM = newM.concat( " محصولات شما به درستی تفکیک نشده اند- ", " ");
                console.log('tafkik');
            }
        }
    });
    if(newM != ' \n دیگر اصلاحات مورد نیاز غرفه شما: '){
        if($('#txtAreaMSG').val().includes('دعوت')){
            $('#txtAreaMSG').val('');
        }
        $('#txtAreaMSG').val( ($('#txtAreaMSG').val() + " "+ newM + " لینک ویدیو رفع مشکل (با فیلتر_شکن لینک را باز کنید) " +"\n"+ "https://youtu.be/NgvGbGENlzM") );
    }
}


function textAreaBtnClickFunction(alertText) {
  let hashId = document
    .querySelector('body > div.container.actions > div > div:nth-child(1) > a')
    .href.substr(
      34,
      document.querySelector(
        'body > div.container.actions > div > div:nth-child(1) > a'
      ).href.length
    );

    let successMsgPic = 8926565;
    let failedMsgPic = 8926591;


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
      let name = data.data.data.contact.name +" غرفه دار محترم ,  "+document.querySelector("body > div.container.information > h1").textContent;
	    
	 var txtMSG ;
     var msgPicId;
      if($('#txtAreaMSG').val().includes("نشد") || $('#txtAreaMSG').val().includes("نباید")){
	       txtMSG = name+ " عزیز، " + $('#txtAreaMSG').val();
           msgPicId = failedMsgPic;
      }else{
	       txtMSG = name+ "  غرفه شما فعال شد. " + $('#txtAreaMSG').val();
           msgPicId = successMsgPic;
      }
    

      $.ajax({
        type: 'POST',
        url: 'https://chat.basalam.com/v1/send_message',
        data: {
          chatId: chatId,
          messageType: 'PICTURE',
          message: { caption: txtMSG, fileIds: [msgPicId]},
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', authToken);
        },
        success: function (data) {
            if(alertText==null){
                alertText='sent'
            }
          alert(alertText);
          //process the JSON data etc
          location.reload();
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

    vendor_id=window.location.href.substr(window.location.href.indexOf('vendor/')+7)
    event_enum=16
    value=74 //72(اعلام اصلاحات)  74(غ ب) 70)(تماس موفق)
    
 $.ajax({
        type: 'POST',
        url: 'https://salamyar.basalam.com/api/add-vendor-event',
        data: {
          vendor_id: vendor_id,
          event_enum: event_enum,
          value: value,
          text_value: ''
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', authToken);
        },
        success: function (data) {
           console.log('done')
          $('#txtAreaMSG').val(
            'سلام غرفه شما تایید نشد. لطفا جهت پیگیری به همین  گفت و گو پاسخ دهید. سپاس. تیم باسلام.'
            );

            checkboxCheck();

            textAreaBtnClickFunction('ارسال پیام غیر فعالی و تغییر وضعیت انجام شد');

        },
      });
}


function scanPage(){


  let forbidenWords = [
    'نانوسان',
    'سی ین',
    'امبیل ',
    'بیز ',
    'دکتر بیز',
    'دالی ',
    'گوزل ',
    'پرفکتا ',
    'لینکس',
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
    'دایلکس',
    'لدورا',
    'Goldensand',
    'Sliverado',
    'نیوشا ',
    'پیجم ', 
    'شماره زیر  ', 
    ' اورگانیک',
    'دارویی ',
    'کارتخوان',
    'کارت خوان',
    'پوز سیار',
     'حجم دهنده',
    'سوپراستار',
    'ردنایت',
    'رد نایت',
    'تریاک',
    'کامان',
    'دافی',
    'داینامین',
    'Mnd',
    'mnd',
    'MND',
	  'ام ان دی',
    'اوریفیلیم',
    'دستگاه فشار خون',
    'فشار سنج',
    'فشارسنج',
    'سالید مجیک',
	  'مکمل بدنسازی',
	  'گینر ',
	  'تکسوو',
'111 گرم',
'شفا',
	  'تبلت',
	  'هارد',
	  'دوربین خودکاری',
	  'مشاوره تلفنی',
	  'در حد نو',
	  'تراست',
	  'دکتر ماشروم',
	  'هلث نوشن',
	  'الیکس',
	  '10 گرم',
	  'الن بیوتی',
	  'آموس وان',
	  'vita bella',

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
      'سلام از طرف باسلام خدمتتون پیام میدم. متون غرفه شما جهت تایید نباید حاوی کلمات زیر باشد لطفا این کلمات را در زمان 12 ساعت آینده ویرایش کنید. سپاس : '
    );
    problemQueue.forEach(function (element, index) {
      $('#txtAreaMSG').val($('#txtAreaMSG').val() + ' - ' + element);
    });
  } else {
    $('#txtAreaMSG').val(
      "از  شما دعوت می شود ویدیو آموزش سیر تا پیاز غرفه داری در باسلام را مشاهده نمایید (با فیلتر_شکن وارد لینک شوید):\n https://youtu.be/4RBf4kqra4o"
    );
  }
}

function textAreaBtnClickFunction3(){
    scanPage();
    vendor_id=window.location.href.substr(window.location.href.indexOf('vendor/')+7)
    event_enum=16
    value=70 //72(اعلام اصلاحات)  74(غ ب) 70)(تماس موفق)
    
    $('#btnMSG3').attr('disabled', '');

 $.ajax({
        type: 'POST',
        url: 'https://salamyar.basalam.com/api/add-vendor-event',
        data: {
          vendor_id: vendor_id,
          event_enum: event_enum,
          value: value,
          text_value: ''
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', authToken);
        },
        success: function (data) {
           console.log('done')
           $('#txtAreaMSG').val(
            "از  شما دعوت می شود ویدیو آموزش سیر تا پیاز غرفه داری در باسلام را مشاهده نمایید (با فیلتر_شکن وارد لینک شوید): https://youtu.be/4RBf4kqra4o"
            );

            checkboxCheck();

            textAreaBtnClickFunction('ارسال پیام فعالی و تغییر وضعیت انجام شد');
            
        },
      });

}
