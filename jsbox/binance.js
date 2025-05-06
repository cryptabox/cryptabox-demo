//Decrypt file key
var balanceint = null;
function decryptAES(pass, key) {

//console.log(e.target.result);
				var decrypted = CryptoJS.AES.decrypt(key, pass)
										.toString(CryptoJS.enc.Latin1);
				if(!/^[A-Fa-f0-9]{64}$/.test(decrypted)){
					alert("Invalid pass phrase or file! Please try again.");
					return false;
				}
				else {
		let res = {['key']: key, ['dekey']: decrypted};
return res;
		//		a.attr('href', decrypted);
		//		a.attr('download', file.name.replace('.encrypted',''));

			//	step(4);
		}	}

// END Decrypt
  ////// For cookie
    function getCook() {
    	var cooks = [];
    	var cook = localStorage.getItem('address');
    	let key = localStorage.getItem('privkey');
    	if (key) { //console.log(cook);
     cook = JSON.parse(cook);
    // Object.assign(cook, {log: "1"});
     cooks = ["1", cook, {['privkey']:key}];
     $('#mem').prop('checked', true);
    //console.log(cooks);
  }
  else {
  //	let cook = localStorage.getItem('address');
  	let key = sessionStorage.getItem('privkey');
    if (cook || key) { //console.log(cook);
     cook = JSON.parse(cook);
   //  Object.assign(cook, {log: "0"});
    cooks = ["0", cook, {['privkey']:key}];
  //  cook = {log: "0"};
   
  }
 // console.log(sessionStorage.getItem('privkey'));
  }
    	
  return cooks;
    }
  async  function getKey(e, log, mass, time) {
  	let massage = mass?mass:''; 
  //	let log = log?log:'';
  	// var closeAlert =
  let privkey = e? e : getCook()[2].privkey;
  	 alertmsg('<div id="ins">'+massage+'<div class="input_box pass"><input type="password" id="pass" class="inpass"/><button class="hidepass" onclick="showpass()"></button></div><button id="getkey">&nbsp;&nbsp;OK&nbsp;&nbsp;</button> <button class="cancel" onclick="clouseAlert()"> Cancel</button></div>');
let gg;
if (time) {transtimer(); }  	
  	let key = new Promise((resolve, reject) => {
  		  		$( "#getkey" ).click(function() {
  		  			gg = $('#fee input:checked').val()?$('#fee input:checked').val():'';
  			let pass = 	$('#pass').val();	
  			$('#ins').fadeOut(300, function () {
  	$(this).html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>').fadeIn(300, function () {
   	 resolve(decryptAES(pass, privkey));
  		 });
  	})
});
    
  });
  $('input#pass').focus();
   let res = await key;
  if (!log || res == false ) {
if (typeof window.blinkInterval !== 'undefined' && window.blinkInterval !== null) {
  	clearInterval(interval);
      clearInterval(blinkInterval);
      interval = null;  blinkInterval = null;
 } 	
  	 clouseAlert();}
  	 if (gg && gg!='eth') {
  	 return [zapadd(gg,res.dekey).wif,gg];
  	 }
  	 else {
  	    return res.dekey;
  	 }
   //console.log(ffff);
   //alertmsg(res+'<button onclick="clouseAlert()"> >Close alert</button>');
    }
async function encryptAES(key, pas) {
	
 
 let fileSec = key, pass = pas;
 let enkey = new Promise((resolve, reject) => {
    var encrypted = CryptoJS.AES.encrypt(fileSec, pass);
    var base64Data = 'data:application/octet-stream,'+encrypted;
    var fileName = 'cypabox.key';
     window.link = document.createElement('a'); 
  link.href = base64Data;
  link.download = fileName;
 // link.click();
   		$('#ins').fadeOut(300, function () {
  	$('html, body').animate({ scrollTop: 0 }, 'fast'); 
  	$(this).html('<div id="com"><div class="divtxt"><b>Download your CryptaBox keyfile</b><span class="warn">Download and save the CryptaBox keyfile in a safe place. Don\'t give it to anyone</span></div><button onclick="link.click()">Download</button><button id="comdown" disabled="true">Go to login</button></div><fieldset class="check"><input type="checkbox" id="checkme"/>&nbsp;<label for="checkme">Yes, I downloaded and saved keyfile</label></fieldset>').fadeIn(300, function () {
  		$("#com #keyfile").attr('href', 'data:application/octet-stream,' + encrypted).attr('download', 'bitkey.encrypted');
  		var checker = document.getElementById('checkme');
 var sendbtn = document.getElementById('comdown');
 // when unchecked or checked, run the function
 checker.onchange = function(){
if(this.checked){
    sendbtn.disabled = false;
} else {
    sendbtn.disabled = true;
}

}
  		$( "#comdown" ).click(function() { 
 $('#ins').fadeOut(300, function () {
  	$(this).html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>').fadeIn(300, function () {
   	 resolve(encrypted);
  		 });
  	})
});  	
   	
  		 });
  	})

    
  });
  let res = await enkey;
  return res;
 
 }    
    
    
 //    Function setCook(priv, keyd, vals, mem) - priv - privkey to MEM, keyd - coin name, vals - coin address, mem - to MEM save or not.
  function setCook(priv, keyd, vals, mem) {
  //var keyd = $('#key').val();
 // var vals = $('#vals').val();
  if(keyd && vals||priv) {
  	let tmpcook = {[keyd]:vals}; 
  let mood = getCook(); //console.log(mood);
  if (mood[1]) {
  	mood = Object.assign(mood[1],tmpcook);
  }
  	else {
  		mood = tmpcook;
  	}
  var serialObj = JSON.stringify(mood);
 
  if(mem == true) {
  	if (keyd && vals) {
  	localStorage.setItem('address', serialObj);}
  	if (priv) {
localStorage.setItem('privkey', priv);  
  }
  }
  else {
  	if (keyd && vals) {
  localStorage.setItem('address', serialObj);}
  if (priv) {
sessionStorage.setItem('privkey', priv);  
  }
  }
  	
  }
  
  	logon();
  }
  function genCook(c,vals) {
  	
  }
  function logon() {
  	let mylink = '<a data-url="" data-set="/mycryptabox" class="ajax-link inactive"><span id="logo"></span><b>My cryptaBox</b></a>';
 let nomylink = '<a href="#/mycryptabox/" data-url="" data-set="/mycryptabox" class="ajax-link inactive"><span id="logo"></span><b>Login</b></a>';
  	a = getCook();
  	window.keylog = a[2]? true:false;
   if (keylog == true) {
  $('#log').html(mylink);  	
    }
    else {
    $('#log').html(nomylink);  	
    }	
  	if(a[1]||a[2])
{

/**
$('div#log').html('');
for (let key in a[1]) {
$('#log').append('<div id="'+key+'">'+ key +':'+ a[1][key]+'</div>');
 }
 **/
 getbalance()
if (balanceint == null) {
	
	balanceint = setInterval(() => getbalance(), 180000);
}
$('.net a.lin').attr('class', 'ajax-link inactive lin');
$('span.labefi').text('$');
$('span.fiatbal').html('&nbsp;&nbsp;- - -');
  }
  else {
  	if ( balanceint != null) { 
  	clearInterval(balanceint);
  	 balanceint = null;
  	}
  $('.net .tit span.ball').html('Not logged in');
  $('.net a.inactive.lin').attr('class', 'lin');
  }
  }
  function toMem() {
  if ($('#mem').is(':checked')){
	a = getCook();
  	if(a[1])
{
for (let key in a[1]) {
	setCook(a[2].privkey, key, a[1][key], true);
 }
sessionStorage.clear();
  }
  
} else {
	localStorage.clear();
	sessionStorage.clear();
	logon();
	
}
checkLog();
  }
   ////// For cookie End 
   function zapadd(coin, newkey) {
	coinjs.compressed = true;
	if (coin == 'doge') {
coinjs.pub = 0x1e; // 0x71
coinjs.priv = 0x9e;
coinjs.multisig = 0x16;
coinjs.hdkey = {'prv':0x089944e4, 'pub':0x0827421e};
var pubkey = coinjs.newPubkey(newkey);
//console.log(coinjs.privkey2wif(newkey));
		return {'privkey': newkey,'pubkey': pubkey,'address': coinjs.pubkey2address(pubkey),'wif': coinjs.privkey2wif(newkey),'compressed': coinjs.compressed};}
if (coin == 'ltc') {
coinjs.pub = 0x30; //0x6F 
coinjs.priv = 0xb0;
coinjs.multisig = 0x32;
coinjs.hdkey = {'prv':0x019d9cfe, 'pub':0x019da462};
var pubkey = coinjs.newPubkey(newkey);
//console.log(coinjs.privkey2wif(newkey));
		return {'privkey': newkey,'pubkey': pubkey,'address': coinjs.pubkey2address(pubkey),'wif': coinjs.privkey2wif(newkey),'compressed': coinjs.compressed};}
		if (coin == 'eth') {
coinjs.compressed = false;
coinjs.pub = 1; //0x30 

var pubkey = coinjs.newPubkey(newkey);
//console.log(coinjs.privkey2wif(newkey));
		return {'privkey': newkey,'pubkey': pubkey,'address': coinjs.pubkey2address(pubkey)};}
else {
	coinjs.pub = 0x00;
	coinjs.priv = 0x80;
	coinjs.multisig = 0x05;
	coinjs.hdkey = {'prv':0x0488ade4, 'pub':0x0488b21e};
	coinjs.bech32 = {'charset':'qpzry9x8gf2tvdw0s3jn54khce6mua7l', 'version':0, 'hrp':'bc'};
var pubkey = coinjs.newPubkey(newkey);
		return {'privkey': newkey,'pubkey': pubkey,'address': coinjs.bech32Address(pubkey).address,'wif': coinjs.privkey2wif(newkey),'compressed': coinjs.compressed};}
		
 
}
function WeiToEth(wei, decPlace) {
  const weiBigInt = BigInt(wei);
  const etherInt = weiBigInt / BigInt(10) ** BigInt(18); // Целая часть в эфирах
  const etherStr = etherInt.toString(); // Преобразуем целую часть в строку
  const weiRemainder = weiBigInt % BigInt(10) ** BigInt(18); // Остаток в wei
  const decimals = weiRemainder.toString().padStart(18, '0'); // Десятичная часть с дополнительными нулями
const dec =  decPlace?decimals.substring(0,decPlace):decimals;
  return `${etherStr}.${dec}`.replace(/0*$/, '').replace(/\.$/, '');
}
function EthToWei(ether) {
  const etherParts = ether.split('.');
  const wholePart = etherParts[0];
  const decimalPart = etherParts[1] || '';

  let wei = BigInt(wholePart) * BigInt(10) ** BigInt(18);
  if (decimalPart.length > 0) {
    const decimalPartBigInt = BigInt(decimalPart);
    const decimalMultiplier = BigInt(10) ** BigInt(18 - decimalPart.length);
    wei += decimalPartBigInt * decimalMultiplier;
  }

  return wei.toString();
}
function SatToBit(satoshi) {
  const satoshiBigInt = BigInt(satoshi);
  const bitcoinInt = satoshiBigInt / BigInt(100000000); // Целая часть в биткоинах
  const bitcoinStr = bitcoinInt.toString(); // Преобразуем целую часть в строку
  const satoshiRemainder = satoshiBigInt % BigInt(100000000); // Остаток в satoshi
  const decimals = satoshiRemainder.toString().padStart(8, '0'); // Десятичная часть с дополнительными нулями

  return `${bitcoinStr}.${decimals}`.replace(/0*$/, '').replace(/\.$/, '');
}
function BitToSat(bitcoin) {
	bitcoin = bitcoin.toString();
  const bitcoinParts = bitcoin.split('.');
  const wholePart = bitcoinParts[0];
  const decimalPart = bitcoinParts[1] || '';

  let satoshi = BigInt(wholePart) * BigInt(100000000);
  if (decimalPart.length > 0) {
    const decimalPartBigInt = BigInt(decimalPart);
    const decimalMultiplier = BigInt(10) ** BigInt(8 - decimalPart.length);
    satoshi += decimalPartBigInt * decimalMultiplier;
  }

  return satoshi.toString();
}

async function getbalance(address) {
$('.net span.ball').html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    window.globball = {};
    let incoming, outgoing, inIndex, outIndex;
    let cook = getCook()[1];
   async function processBit(index, value, chain) {
    try {
    	const testnet = 'mainnet'; //index =='eth'?'goerli':'testnet';
        const headers = {
            'X-API-Key': 'Your API KEY', 
            'accept': 'application/json' 
        };

        const balanceResponse = await $.ajax({
            url: "URL FOR NODE"+chain+"/"+testnet+"/account/"+value,
            headers: headers,
            dataType: 'json'
        });
         const ball = balanceResponse[0].confirmed_balance;

        // Остальной код обработки баланса
        globball[index] = ball;
if (index=='eth') {
	globball[index + 'nonce'] = balanceResponse[0].confirmed_nonce ? balanceResponse[0].confirmed_nonce : 0;
	$('.conball span.ball.' + index).html((+WeiToEth(ball)).toFixed(6));
	if ($('#wallet').length) {
	$('#wallet-content span.ball.' + index).html((+WeiToEth(ball)));
	}
	} 
	else {
$('.conball span.ball.' + index).html((+SatToBit(ball)).toFixed(6));
if ($('#wallet').length) {
	$('#wallet-content span.ball.' + index).html((+SatToBit(ball)));
	}		
		 }      
        
    } catch (error) {
    	if (error.status === 429) {
                console.warn(`Получен статус 429, повторный запрос через 2 секунды...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
                return await processBit(index, value, chain); // Рекурсивный вызов с задержкой
            }
            else {
        // Обработка ошибки
        $('.net span.ball.' + index).html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
        return false;}
    }
}

    async function processCook() {
    for (const [index, value] of Object.entries(cook)) {
        var chain = index == 'btc' ? 'bitcoin' : index == 'ltc' ? 'litecoin' : index == 'doge' ? 'dogecoin' : index == 'eth' ? 'ethereum' : '';
        var vals = 0;  // значение по умолчанию

        await new Promise(resolve => setTimeout(resolve, 1000));

        await processBit(index, value, chain);
    }
}

processCook();

}
async function alertmsg(alertcontent, sclass){
	$(window).scrollTop(0);
let bod,bods;
if ($("#alertframe").length) {
 bod = 'div#alertframe', bods = 'alert'; 
}
else {
bod = 'body', bods = 'bod';
}
if ($("#alerts").length) { await clouseAlert();  }
$('<div class="overlay '+bods+'" id="alertOverlay"></div>').appendTo(bod);
$('<div id="alerts"><div class="alertspad">'+alertcontent+'</div></div>').appendTo('body');
$("#alertOverlay, #alerts").fadeIn(300);
if (sclass=='connect') {
	$('#alerts').css('margin-top', (-1/2)*($('#alerts').height())+'px');
$('#alerts').css('margin-left', -($('#alerts').width()/2)+'px');
}
}

async	function clouseAlert() {
  let bods;
  if ($("#alertframe").length) {
    bods = 'alert';
  } else {
    bods = 'bod';
  }
if (typeof window.blinkInterval !== 'undefined' && window.blinkInterval !== null) {
clearInterval(interval);
      clearInterval(blinkInterval);
      interval = null;  blinkInterval = null;
}
  return new Promise((resolve, reject) => {
    $("." + bods + "#alertOverlay, #alerts").fadeOut(300, function() {
      $("." + bods + "#alertOverlay, #alerts").remove();
      resolve();
    });
  });
  
}
	
async function alertFrame(alertcontent) {
    if (!alertcontent) {
        alertcontent = '<div class="lds-ellipsis conts"><div></div><div></div><div></div><div></div></div>';
    }
    $('<div class="overlay" id="alertOverlay"></div>').appendTo('body');
    $('<div id="framebut"><div class="alertbutton back"><span class="back"></span></div>' +
        '<div class="alertbutton close"><span onclick="closeFrame(1)" class="close"></span></div></div><div id="alertframe"><div id="alertcont">' + alertcontent + '</div><div id="alertfoot"></div></div>').appendTo('body');

    await new Promise(resolve => {
        $("#alertOverlay").fadeIn(300, function() {
          $("#framebut").css('visibility', 'visible').animate({opacity: 1.0}, 400);
          $('html, body').animate({ scrollTop: 0 }, 'fast');
            $('#alertframe').animate({
                'min-height': "100%",
            }, 'linear', function() {
                $(this).css('height', 'auto');

                resolve(); // Разрешаем обещание после завершения анимации
            });

        });
    });
}
async function closeFrame(c){
let d = 35;
	if (c==1) {
 d = 0; 		
	history.pushState(null, null, './');
}
	
if ($("#alerts").length) { await clouseAlert();  }
if ($("#sellframe").length) { await closeSellframe(d);  }
 if (location.hash ==''|| c==1) { 
$("#alertOverlay, #framebut").animate({opacity: 0.0}, 400, function(){
$("#alertOverlay, #framebut").remove();
});
}  

$('#alertframe').animate({
    height: '0',
    'min-height':"0",   
  }, 300, 'linear', function(){ $("#alertframe").remove();
 //resolve();
   });
  
  
 if (typeof socketChart != 'undefined' && socketChart !=null) { socketChart.close(1000); 
$('div.btcb, div.sot').off();
 }
document.title = 'CryptaBox | Buy, Store, Trade:  Bitcoin, Ethereum, Dogecoin, Litecoin | Your Crypto Wallet ';
document.querySelector('h1').innerHTML = 'Buy, Store, Trade:  Bitcoin, Ethereum, Dogecoin, Litecoin - Your Crypto Wallet ';
$('meta[name="description"]').attr("content", 'Open your world of cryptocurrencies on CryptaBox. Seamlessly buy, sell, and trade Bitcoin, Ethereum, Dogecoin, Litecoin, all within your secure personal crypto wallet.Take control of your finances and be your own bank. Effortlessly create your own crypto accounts with just a few clicks, ensuring complete independence from intermediaries. Experience true financial freedom at your fingertips!'); 	
}
async function closeAlertFrame(symbChart, page) {
    await new Promise(resolve => {
        $('#alertframe').animate({
            height: '0',
            'min-height': "0",
        }, 300, 'linear').promise().done(resolve);
    });
    $('#alertcont').html('<div class="lds-ellipsis conts"><div></div><div></div><div></div><div></div></div>');
    if (!$('#alertOverlay').length) {
        await alertFrame();
    }
    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
    await new Promise(resolve => {
        $('#alertframe').animate({
            'min-height': "100%",
        }, 'linear', function() {
            $(this).css('height', 'auto');
            resolve();
        });
    });
    oppage(symbChart, page);
    if (typeof socketChart != 'undefined' && socketChart != null) {
        socketChart.close(1000);
        $('div.btcb, div.sot').off();
    }
}
 function closeWind(symbChart, page, uppage) {
    $('.include').fadeOut(300, function() {
        // По завершении анимации исчезновения, выполняем нужные действия
        // Например, вставляем div в '.include'
        $(this).html('<div class="lds-ellipsis conts"><div></div><div></div><div></div><div></div></div>').css("display", "block");
$('html, body').animate({ scrollTop: 0 }, 'fast');
        // После изменения содержимого, вызываем oppage и выполняем анимацию появления
        oppage(symbChart, page, uppage, function() {
            $('.include').fadeIn(300);
        });
    });

    if (typeof socketChart !== 'undefined' && socketChart !== null) {
        socketChart.close(1000);
        $('div.btcb, div.sot').off();
    }
}
if (location.hash =='') {
//alertmsg('<div>Connected</div><div class="lds-dual-ring"></div>', 'connect');
}

function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}

////////////////////////////////////////////////////////////////










///////////////////////////////////////////////////////////////


function mainStream (pars) {
var symb = pars.data.s;
var comData = number_format(pars.data.c, 8, '.', ''); 
var dayPrice = pars.data.p; 
var dayPerc = pars.data.P; 
//$("div.test").html(pars.data.c);
//$("div.test").html(event.data);

if(number_format($("div."+symb+" div.sot span").html(), 8, '.', '') <= comData) {
	$("div."+symb+" div.sot span").html(number_format(comData, 8, '.', ',')).animate({color: "#00aa00"},200);
}
else{
	$("div."+symb+" div.sot span").html(number_format(comData, 8, '.', ',')).animate({color: "red"},200);
}

if (symb != "BTCUSDT" && typeof btc != 'undefined') {
		var toUSDT = number_format(comData * btc, 8, '.', ''); 
		if (number_format($("div."+symb+" div.btcb span").html(), 8, '.', '') <= toUSDT) {
			$("div."+symb+" div.btcb span").html(number_format(toUSDT, 8, '.', ',')).animate({color: "#00aa00"},200);
		}
		else {
			$("div."+symb+" div.btcb span").html(number_format(toUSDT, 8, '.', ',')).animate({color: "red"},200);
		}
		/**
		var endPrice = number_format(toUSDT*uah, 8, '.', '');
		if (number_format($("div."+symb+" div.UAH span").html(), 8, '.', '') <= endPrice) {
			$("div."+symb+" div.UAH span").html(number_format(endPrice, 8, '.', ',')).animate({color: "#00aa00"},200);
	}
	else {
		$("div."+symb+" div.UAH span").html(number_format(endPrice, 8, '.', ',')).animate({color: "red"},200);}
	**/	
		//-------24 hours for alt
var usdDayPrice = (comData - dayPrice)*(btc - BTCdayPrice);
var raz = toUSDT - usdDayPrice; 
var usdDayPerc = raz / usdDayPrice * 100;
		if ( raz < 0) {
			$("div."+symb+" div.dayu").animate({backgroundColor: "#ff9f92"},200);
  			$("div."+symb+" div.usdtperc").html(number_format(usdDayPerc, 3, '.', ',') + " %");
  			$("div."+symb+" div.usdt").html(number_format(raz, 8, '.', ','));
  	
  	}  
  	else {
  		$("div."+symb+" div.dayu").animate({backgroundColor: "#9cffa4"},200);
  		$("div."+symb+" div.usdtperc").html('+'+number_format(usdDayPerc, 3, '.', ',') + " %");
  		$("div."+symb+" div.usdt").html('+'+number_format(raz, 8, '.', ','));
  		
 } 
 // -------end 24 hours	for alt
}
else {
btc = comData;
BTCdayPrice = dayPrice;
/**
var endPrice = number_format(btc*uah, 8, '.', '');
if (number_format($("div."+symb+" div.UAH span").html(), 8, '.', '') <= endPrice) {
		$("div."+symb+" div.UAH span").html(number_format(endPrice, 8, '.', ',')).animate({color: "#00aa00"},200);
}
else {
		$("div."+symb+" div.UAH span").html(number_format(endPrice, 8, '.', ',')).animate({color: "red"},200);}}
**/	
}	
//Start convert ballance
 let ballElement = document.querySelector('div.'+symb+' span.ball');
 if (ballElement) {
  // Получаем текстовое содержимое элемента
  let value = ballElement.textContent.trim();

  // Проверяем, является ли содержимое числом
  if (!isNaN(value) && value !== '') {
  	let fbal = symb=='BTCUSDT'?comData:toUSDT;
  	$('div.'+symb+' span.fiatbal').text(number_format(Number(value)*fbal, 2, '.', ''));
  } 
}
//End convert ballance
//$("title").html(pars.data.c)
    // ------24 hours for all
  if (dayPrice < 0) {
  	$("div."+symb+" div.dayb").animate({backgroundColor: "#ff9f92"},200);
  	$("div."+symb+" div.perc").html(dayPerc + " %");
  	$("div."+symb+" div.btcc").html(dayPrice);
  	}  
  	else {
  		$("div."+symb+" div.dayb").animate({backgroundColor: "#9cffa4"},200);
  		$("div."+symb+" div.perc").html('+'+dayPerc + " %");
  		$("div."+symb+" div.btcc").html('+'+dayPrice);
 } 
 if ($("iframe").length){
// $('iframe').contents().find('div#stat').html("Hallo, Welt!");
}
}

//////////////////

  // Construct a msg object containing the data the server needs to process the message from the chat client.
  var msg = {
    type: "message"
  };
///////////////////////////////////////////////////////////////
 var socket;
const socketMessageListener = (event) => {
	if ($("#alertOverlay.connect").length){ 
	clouseAlert(); 
	}
   var pars =  jQuery.parseJSON(event.data); 
mainStream(pars);
 
};

  
//////////////////////////////////////////////////////////////  
// Open
const socketOpenListener = (event) => {
 //  socket.send('hello');
};
// Closed
const socketCloseListener = (event) => {
   if (socket) {
   	if ($('div').is('#alertOverlay') == false) {
   	//	alertmsg('<div>Connected</div><div class="lds-dual-ring"></div>', 'connect');
   	}
      
   }
   socket = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethbtc@ticker/dogebtc@ticker/ltcbtc@ticker');
   socket.addEventListener('open', socketOpenListener);
   socket.addEventListener('message', socketMessageListener);
   socket.addEventListener('close', socketCloseListener);
};
socketCloseListener();
function copyToClipboard(text, input) {
  const tempTextarea = document.createElement('textarea');
  input = (input)?input:0;
  tempTextarea.className = "tempAr";
  tempTextarea.value = text;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextarea);
  if (input != 0) {
  let styles = "#myTooltip"+input;
  //var tooltip = document.getElementById("myTooltip");
  $(styles).html("Copied!");
  $('.input_box .tooltiptext'+styles).css('display', 'block');
  setTimeout(function() {
    $('.input_box .tooltiptext'+styles).fadeOut(1000);  
  }, 1000);
  }
}
 function copy(count) {
 //	console.log(document.getElementById("qradd"));
 let ids = (count)?"qradd" + count:"qradd";
  var copyText = document.getElementById(ids).innerText;
  copyToClipboard(copyText);
  let styles = (count)?"#myTooltip"+count:"#myTooltip";
  //var tooltip = document.getElementById("myTooltip");
  $(styles).html("Copied: " + copyText);
  $('.input_box .tooltiptext'+styles).css('display', 'block');
  setTimeout(function() {
    $('.input_box .tooltiptext'+styles).fadeOut(1000);  
  }, 1000);
}
function showpass() {
$('.pass button').toggleClass("hidepass showpass");
 // var input = $($(this).attr("toggle"));
 ins = document.getElementsByClassName("inpass")[0].type;
 if (ins == "password") {
document.getElementsByClassName("inpass")[0].type = "text";
 }
 else {
 document.getElementsByClassName("inpass")[0].type = "password";
 }
}
function printer(txt) {
	event.preventDefault();
	const title = document.title;
	document.title = txt?txt.replace(/ /g, "-"):'print';
    setTimeout(() => {
        window.onafterprint = (event) => {
            document.title = title;
        };
        window.print();
    }, 100);
}
