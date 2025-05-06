

// ТЕСТ ЗАПРОСА на плату комиссии
var feeb, feebtemp, comsum=0, sum, fullsum=0, feeam=0, varogran=999; 
var redeem = '';
var typeIn;
var recip = [];
calcoutx = [];
function wait(){
$("label span").html('+');
}
$( document ).ready(function() {
	const tempSymb =  symbChart;
async function getfee (cou, tempSymb){ 
var cou = typeof cou == 'undefined'?0:cou;
if (typeof setTimeFee == 'undefined') {window.setTimeFee = null;}
	feeb = 0;
	const regexPat = new RegExp(`^#!${tempSymb}\/wallet\/trans$`);
	if (regexPat.test(location.hash)) { 
	wait();
$.getJSON( "URL for NODE get price bitcoin"+symbChart+"/main")
.done (function( data ) {
feebtemp = data;
feeb = (feebtemp.high_fee_per_kb/1000).toFixed();
   $("label[for='fast'] span").html((feebtemp.high_fee_per_kb/1000).toFixed());
   $('input#fast').attr('value', (feebtemp.high_fee_per_kb/1000).toFixed());
   $("label[for='halfhour'] span").html((feebtemp.medium_fee_per_kb/1000).toFixed());
   $('input#halfhour').attr('value', (feebtemp.medium_fee_per_kb/1000).toFixed());
   $("label[for='hourFee'] span").html((feebtemp.low_fee_per_kb/1000).toFixed());
   $('input#hourFee').attr('value', (feebtemp.low_fee_per_kb/1000).toFixed());
  // alert('done');
// return feebtemp;
})
.always(function () {
	if (feeb==0 && cou ==0) {
cou = 1;
alertmsg('Connected to server node');

}
//console.log(cou, ' ---- after no connected') 
else if (feeb !=0 && cou == 1) { 
clouseAlert(); cou = 0;
}	

if (setTimeFee !== null) {
  	clearTimeout(setTimeFee);
  }
setTimeFee = setTimeout(getfee, 60000, cou, tempSymb);
if ($('.recip input.val').val() && feeb) {mass();}
});
}
else {
    if (setTimeFee !== null) {
  	setTimeFee = null;
  }
 }  	
}
if (symbChart) {
if (symbChart=='btc') {
coinjs.pub = 0x00;
	coinjs.priv = 0x80;
	coinjs.multisig = 0x05;
	coinjs.hdkey = {'prv':0x0488ade4, 'pub':0x0488b21e};
	coinjs.bech32 = {'charset':'qpzry9x8gf2tvdw0s3jn54khce6mua7l', 'version':0, 'hrp':'bc'};
}
else if (symbChart=='doge') {
coinjs.pub = 0x1e;
coinjs.priv = 0x9e;
coinjs.multisig = 0x16;
coinjs.hdkey = {'prv':0x089944e4, 'pub':0x0827421e};
varogran = 99999;
}
else if (symbChart=='ltc') {
coinjs.pub = 0x30; 
coinjs.priv = 0xb0;
coinjs.multisig = 0x32;
coinjs.hdkey = {'prv':0x019d9cfe, 'pub':0x019da462};
}
else if (symbChart=='eth') {
coinjs.compressed = false;
coinjs.pub = 1; //0x30 
}
}

// КОНЕЦ ТЕСТа
// Start for testnet

// End for testnet

//window.globball={};
// window.globball.btc = '50000000'; symbChart = 'btc';    

getfee(0, tempSymb);
  wif = '';
  add = '';
  
  var obr ="";
  /**
$('.bind').bind('input', function(){
if (this.id=="wif") {	
wif = this.value; 
 address = coinjs.bech32Address(coinjs.wif2pubkey(wif).pubkey);

//redeem = address.redeemscript;
//console.log(redeem)

$('#address').val(address);
 typeIn = coinjs.addressDecode(address).type;

console.log(typeIn)
}


})
**/
if (localStorage.getItem('address')) {
address = JSON.parse(localStorage.getItem('address'))[symbChart];

 typeIn = coinjs.addressDecode(address);


}


//$("#submit").click(function(){
add = address;
	CalcOutx(GetOutx(add));
	$('#outx').append(displayOUTX(calcoutx));
	$("#submit").attr('disabled', true)
//})

// Запрос к OUTX
async function GetOutx(add) {
const chain = symbChart == 'btc' ? 'bitcoin' : symbChart == 'ltc' ? 'litecoin' : symbChart == 'doge' ? 'dogecoin' :  '';	
var outx = [];
 try {
        const headers = {
            'X-API-Key': 'Your API KEY', // Пример заголовка авторизации
            'accept': 'application/json' // Другие заголовки, если необходимо
        };

        const data = await $.ajax({
            url: "URL for NODE get UTXO"+chain+"/mainnet/account/"+add+"/utxo?spent=false",
            headers: headers,
            dataType: 'json'
        });

        outx = data.data;
        
        return outx;
  
    } catch (error) {
        // Обработка ошибки
        $('.net span.ball.' + index).html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
        return false;
    }

}


async function CalcOutx(outx) {
	
var calc = [];

// IF TESTNET
if (coinjs.priv == 0x80) {

$.each( await outx, function( key, id ) { 
	value = Number((id.value).toFixed(0));
	script = id.mined.meta.script;
	if(((script.match(/^00/) && script.length==44)) || (script.length==40 && script.match(/^[a-f0-9]+$/gi))){
				s = coinjs.script();
				s.writeBytes(Crypto.util.hexToBytes(script));
				s.writeOp(0);
				s.writeBytes(coinjs.numToBytes(value, 8));
				script = Crypto.util.bytesToHex(s.buffer).slice(4);

			}
calc.push({['tx_hash_big_endian']: id.mined.tx_id, ['tx_output_n']: id.mined.index, ['script']: script, ['value']: value});
//$('#outx').append(id.tx_hash +' : '+id.tx_output_n+' - '+id.value +' Satoshi <br>')

  })
  calcoutx = calc;
// return calc;
}

// END TESTNET
else { 

	$.each( await outx, function( key, id ) { 
calc.push({['tx_hash_big_endian']: id.mined.tx_id, ['tx_output_n']: id.mined.index, ['script']: id.mined.meta.script, ['value']: id.value});
//$('#outx').append(id.tx_hash +' : '+id.tx_output_n+' - '+id.value +' Satoshi <br>')
  })
 
  calcoutx = calc;
  }
}
//outx = 


function displayOUTX (calcoutx) {
$.each (calcoutx, function (key, id){
 obr += id.tx_hash_big_endian +' : '+id.tx_output_n+' - '+id.value +' Satoshi <br>'
}

)
return obr;
}
//console.log(zzz);
//CalcOutx();
//console.log(calcoutx);
//var sum;


$( '#text' ).ready(function() {
  $('#text').val('');
});
//Операция для ввода данных получателя
 $("#addadd").click(function(){
 var numin = parseInt($('#addss div[class="recip"]:last').attr('id').replace('re', ''))+1;

 $('#addss').append('<div class="recip" id="re'+numin+'">'+
 '<div class="input_box">'+
    '<label>Address</label>'+
   ' <input type="text" id="address'+numin+'" class="address">'+
   '<button id="qrico" onclick="scanqr(\'address'+numin+'\')"></button>'+
    '</div>'+
    '<div class="input_box">'+
    '<label>Amount</label>'+
    '<input type="text" id="value'+numin+'" class="val" disabled>'+
    ' <span>'+symbChart.toUpperCase()+'</span>'+
    '<div class="butt buttrem"><span class="rem" id="'+numin+'"></span></div>'+
   ' </div></div>'
 )
 

})
$("#addss").on('click', '.rem',function(e){
  $('div[id="re'+this.id+'"').remove();
  document.getElementById('value1').dispatchEvent(new Event('input', { bubbles: true }));
    });
    $('.addss').on('input', 'input.address', function(){
    	let pre = this.id.replace('address','')
    //	console.log(this.value.match('^(bc1|tb1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$'));
 const regexPat = symbChart =='btc'? new RegExp('^(bc1|tb1|mv|[13])[a-zA-HJ-NP-Z0-9]{25,59}$'):symbChart =='doge'? new RegExp('^[DA9Nn]{1}[1-9A-HJ-NP-Za-km-z]{33}$'):symbChart =='ltc'? new RegExp('^([LMmQ3]|ltc1)[a-km-zA-HJ-NP-Z1-9]{26,39}$'):false;
	if (regexPat.test(this.value)) {
		$('.addss #value'+pre+'').prop('disabled', false).val('');
		 }   
 //  if (this.value.match('^(bc1|tb1|mv|[13])[a-zA-HJ-NP-Z0-9]{25,59}$')) {
//   $('.addss #value'+pre+'').prop('disabled', false).val('');
 //  } 
   else {
   $('.addss #value'+pre+'').prop('disabled', true).val('').trigger('input');
   }	
    })
//Конец операции получателя
$('.addss').on('input', 'input.val', function(){ 
	
             

   
if (this.value) {
	
	ch = this.value.replace(/[^0-9\.]/g, ''); 
pos = ch.indexOf('.');
if(pos != -1){ // если запятая есть
        if((ch.length-pos)>9){ // проверяем, сколько знаков после запятой, если больше 1го то
            ch = ch.slice(0, -1); // удаляем лишнее
        }
    }
    this.value = ch;

}

mass();         
});

function mass() {
	feeb = $('input[name="fee"]:checked').val(); 
var comblock = [];
var outxsum =0;
let getam = Array.from(document.querySelectorAll('.recip input.val')).map(inputElement => inputElement.value);
sum = 0;
$.each (getam, function (key, id){
sum = sum+Number((id*100000000).toFixed());
})


//sum = this.value*100000000;
//sum = Math.round(sum * 100)/100;
//console.log(sum) 
inputOutx = [];
if($.isNumeric(sum) && sum > varogran)	{
//	$.each (calcoutx, function (key, id) {
//		outxsum +=id.value; 
	//	console.log(outxsum)
	//	comblock.push(id);
	//	if (outxsum>=sum) {
		//$('#result').html(comblock);
	//		return false;
	//	}
	//}
	
	//)
	
// собираем массив output	
let getrecip = Array.from(document.querySelectorAll('.recip input.address')).map(inputElement => inputElement.value);
let getval = getam;
recip = [];
let t;
 // console.log(getval.length)
   let count = 0;
      for (const input of getrecip) { 
      	let obj = {};
      	a = input;
      	b = getval[count]
      	if (a && b > 0 ) {
        	obj = {'address': a, 'amount': b};//['address'] = a;
      recip.push(obj);
      	}
      
      count ++;
    }	
    t = recip.length+1;

//inputOutx = selblocks(calcoutx,comsum);	
	
	
////////////////////	
	inputOutx = selblocks(calcoutx,sum,t);
	
	}
	else {
	selectout= selblockStop();
	$('#result').html(selectout);
	return false; 
	}

var selectout;
if (fullsum > 0) {
var selectout ='<p>Transfer amount: <b>'+sum/100000000+'&nbsp;'+symbChart+'</b></p>'
+'<p>Transfer commission: <b>'+feeam/100000000+'&nbsp;'+symbChart+'</b></p>'
+'<p>Full transfer amount with commission: <b>'+Number(fullsum)/100000000+'&nbsp;'+symbChart+'</b></p>';
if (selout) {
selectout += selout; 
}
}
if ( selectoutOver ) { 
selectout += selectoutOver;
}


if (change > 0) {
recip.push({'address':address, 'amount': (change/100000000).toFixed(8)});// данные для сдачи на адрес отправителя
}



$('#result').html(selectout);
//console.log(sizeTrans)

}
function selblockStop() {
	$('button#gettrans').prop('disabled', true);
	selectoutOver = '';
 selectout =`<p class="warn">The payment amount must be greater than ${(varogran+1)/100000000} ${symbChart.toUpperCase()}</p>`;
 return selectout;

}
function overbalance(v) { 
$('button#gettrans').prop('disabled', true);
if (v) {
var selectout = '<p class="warn">For one transaction, you can send only '+v/100000000+' '+symbChart.toUpperCase()+'</p>';
}
else {
	var selectout = '<p class="warn">The payment amount exceeds your balance.</p>';
	}
return selectout;
}
function selblocks(comblock,sum,t) {
	let outxbal = 0; 
var varsum = sum;
	var inputOutx = []; selout =''; selectoutOver = ''; 
var input_count = 0;
//var feeam;	
$.each (comblock, function (key, id){
// собираем массив input	
input_count++;
var sizeTrans = calcfee(input_count,typeIn,t);
feeam = feeb*sizeTrans; //* calcfee(input_count,typeIn,t);
comsum = varsum + feeam;
	
	outxbal += id.value;
	inputOutx.push(id);
comsum = comsum - id.value;
varsum = varsum - id.value;
//selout += id.tx_hash_big_endian +' : '+id.tx_output_n+' - '+id.value +' Satoshi <br>'
if (comsum<=0) {
change = Math.abs(comsum);	
return false;
}

}
)

fullsum = BigInt(sum) + BigInt(feeam);
endingbal = BigInt(globball[symbChart])-BigInt(String(fullsum));

	$('#endingbal span').html((String(endingbal)/100000000).toFixed(8));
	if (endingbal < BigInt(0)) {$('#endingbal span').animate({backgroundColor: "#ff9f92"},200)}
else {$('#endingbal span').animate({backgroundColor: "#9cffa4"},200)}
	if (BigInt(endingbal) < BigInt(0) ) { 

selectoutOver = overbalance();
change = 0;
return false;	
	} 
	
if (comsum > 0) {
//	if () {} 
selectoutOver = overbalance(outxbal);
change = 0;
return false;
}
if ((BigInt(outxbal) - BigInt(fullsum)) > 0) {
$('button#gettrans').prop('disabled', false);
}

return inputOutx;

}



});
async function red() {

	coinjs.compressed = true;
	var prikey = getCook()[2].privkey;
	var mass = `
<div class="transtimer">
    <p>20</p>
 <svg   viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle id="circle" class="circle_animation" r="46" cy="50" cx="50" stroke-width="5" stroke="#6fdb6f" fill="none"/>
    </svg>   
    </div>	
	<p><b>Enter password</b> <br>for transfer amount with commission:<br> <b>${SatToBit(fullsum)} ${symbChart.toUpperCase()}</b></p>`;
	wif = coinjs.privkey2wif(await getKey(prikey,1,mass,1));
//	processForm(typeIn);

   // recip.push(obj);

// my test for transaction
var tx = coinjs.transaction();
//tx.witness = true;
//input
//var Script = coinjs.bech32Address(coinjs.wif2pubkey(wif).pubkey).redeemscript;
//console.log(Script);
//var inputScript = "514104f1cc7f3ae2c81713729f5d75251c33ad250668fd22a89344c23668aefd22ece446693be75c132ae3eddb3b7ae4b60fa95133a46979a42139256b09d0147d10e451ae";
//34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo
//var inputTx = "9ffe9abc6a19b8e6f46d5946ce810f698e24417916a08cd4cbfda88d116c128f";
//var inputN = 1;
//tx.addinput(inputTx, inputN, script, 0xffffffff/*sequence*/);
//var inputScript = "514104f1cc7f3ae2c81713729f5d75251c33ad250668fd22a89344c23668aefd22ece446693be75c132ae3eddb3b7ae4b60fa95133a46979a42139256b09d0147d10e451ae";
//34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo
//var inputTx = "b9bd0322af4f5ab71cce044bb5a24de79e4438fd22f6acaf3249b544d5d2b6f7";
//var inputN = 25;
//tx.addinput(inputTx, inputN, '', 0xffffffff/*sequence*/);
//var inputTx = "b9bd0322af4f5ab71cce044bb5a24de79e4438fd22f6acaf3249b544d5d2b6f7";
//var inputN = 52;
//tx.addinput(inputTx, inputN, inputScript, 0xffffffff/*sequence*/);

$.each (inputOutx, function (key, id){
var inputTx = id.tx_hash_big_endian;
var inputN = id.tx_output_n;  
var inputScript = id.script;	
tx.addinput(inputTx, inputN, inputScript, 0xffffffff/*sequence*/);
}
)
//var inputTx = "3fb933f94242f6f67afe05421cb6ef3ea4964cb8c81ac7897e8c6619a1e2444d";



//var s = coinjs.script();

//console.log(Script);
// var inputN = 0;
//output 
$.each (recip, function (key, id){
var address = id.address;
var amount = id.amount;
tx.addoutput(address, amount);

}
)
// var address1 = "2N3oefVeg6stiTb5Kh3ozCSkaqmx91FDbsm";
// var amount = 2;
// tx.addoutput(address1, amount);
// var address1 = "2N3oefVeg6stiTb5Kh3ozCSkaqmx91FDbsm";
// var amount = 1;
 


//tx.addoutput(address1, amount);	
//console.log(tx.sign(wif,1));

let rawTrans = tx.sign(wif,1);
//var textArea = document.getElementById("rawTrx");
//  textArea.value = rawTrans; //SIGHASH_ALL DEFAULT 1 
//	$("#rawTrx").attr({'disabled': true});
//	 $("#gettrans").attr({'id':'sendTrans', 'onclick':'send()'}).html('Send Transaction'); 

return rawTrans;	 
} 
function test(com, dat) {
	let tempdat = location.hash.slice(2).split('/');
	window.txcomp = {
	 txcomp: com,
	 txansw: dat
}
	symbChart = tempdat[0];
	var page = tempdat[1];
	uppage = 'home';
	history.pushState(null, null, '#!'+symbChart+'/'+page+'/'+uppage);
	closeWind(symbChart, page, uppage);
	setTimeout(getbalance, 20000);
//console.log(tempdat);

}
async function send() {
	const chain = symbChart == 'btc' ? 'bitcoin' : symbChart == 'ltc' ? 'litecoin' : symbChart == 'doge' ? 'dogecoin' :  '';
	/*
	var textArea = document.getElementById("rawTrx");
rawTrans = 	textArea.value;
*/
let raw = await red();
//console.log(raw, ' ----RAW')
if (raw) {
	 try {
 	const headers = {
            'X-API-Key': 'Your API KEY', 
            'accept': 'application/json',
            'content-type': 'application/json' 
        };
        const postData = {
        tx: raw
};

const sendTx = await $.ajax({
    url: "URL for NODE send transaction"+chain+"/mainnet/tx/send",
    headers: headers,
    dataType: 'json',
    method: 'POST', // Установите метод POST
    contentType: 'application/json', // Установите тип контента JSON
    data: JSON.stringify(postData) // Преобразуйте данные в формат JSON и передайте их
});
test(true, sendTx.id);
clouseAlert();
 
 }
catch (error) {
let er = error.responseJSON.detail?error.responseJSON.detail:'';
  test(false, er);    
    //    return false;
    }

}


}