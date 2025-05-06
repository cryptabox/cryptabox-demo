

// ТЕСТ ЗАПРОСА на плату комиссии
var feeb, rawTrans, feebtemp,fullmaxfee, semimaxfee, maxfullsum, semimaxfullsum, nonce, sum; 
//provider = new ethers.providers.EtherscanProvider("goerli", "Q25UXFYXEDG872177KYK9XZMKPVSFKCV9D");
function wait(){
$("label span").html('+');
}



// КОНЕЦ ТЕСТа
// Start for testnet

// End for testnet
var wallet, balance, varfee;
var redeem = '';
var typeIn;
var recip = [];
$( document ).ready(function() {
	const tempSymb =  symbChart; 
async function getfee (cou, tempSymb){
	if (typeof setTimeFee == 'undefined') {window.setTimeFee = null;} 
	feeb = 0;
	const regexPat = new RegExp(`^#!${tempSymb}\/wallet\/trans$`);
	if (regexPat.test(location.hash)) {
	wait();
$.getJSON( "URL for NODE gas price")
.done (function( data ) {
feebtemp = data.result;
//console.log(feebtemp);
feeb = number_format(feebtemp.ProposeGasPrice, 2, '.','');
baseFee = ethers.utils.formatUnits(ethers.utils.parseUnits(String(feebtemp.suggestBaseFee), 'gwei'), 'wei'); 
   $("label[for='fast'] span").html(number_format(feebtemp.FastGasPrice, 2, '.', ''));
   $('input#fast').attr('value', number_format(feebtemp.FastGasPrice, 2, '.', ''));
   $("label[for='halfhour'] span").html(number_format(feebtemp.ProposeGasPrice, 2, '.', ''));
   $('input#halfhour').attr('value', number_format(feebtemp.ProposeGasPrice, 2, '.', ''));
   $("label[for='hourFee'] span").html(number_format(feebtemp.SafeGasPrice, 2, '.', ''));
   $('input#hourFee').attr('value', number_format(feebtemp.SafeGasPrice, 2, '.', ''));
  // alert('done');
// return feebtemp;

})

.always(function () {
	if (feeb==0 && cou ==0) {
 cou = 1;
 
alertmsg('Connected to server node');

}

else if (feeb !=0 && cou == 1) { 
clouseAlert(); cou = 0;
}

if (setTimeFee !== null) {
  	clearTimeout(setTimeFee);
  }
setTimeFee = setTimeout(getfee, 10000, cou, tempSymb);
if ($('.recip input.val').val() && feeb) {mass();}
});
}

else {
    if (typeof setTimeFee !== null) {
  	 setTimeFee = null;
  }
 }  	

}
getfee(0, tempSymb);
  wif = '';
  add = '';
  calcoutx = [];
  var zzz ="";
$('.bind').bind('input', function(){
if (this.id=="wif") {	
wif = this.value; 

 address = wallet.address;

//redeem = address.redeemscript;
//console.log(redeem)

$('#address').val(address);
 typeIn = address.type;

//console.log(typeIn)
}


})

function CalcOutx(outx) {
var calc = [];

// IF TESTNET
if (coinjs.priv == 0xef) {

$.each( outx, function( key, id ) { 
	value = Number((id.value*100000000).toFixed(0));
	script = id.script_hex;
	if(((script.match(/^00/) && script.length==44)) || (script.length==40 && script.match(/^[a-f0-9]+$/gi))){
				s = coinjs.script();
				s.writeBytes(Crypto.util.hexToBytes(script));
				s.writeOp(0);
				s.writeBytes(coinjs.numToBytes(value, 8));
				script = Crypto.util.bytesToHex(s.buffer).slice(4);

			}
calc.push({['tx_hash_big_endian']: id.txid, ['tx_output_n']: id.output_no, ['script']: script, ['value']: value});
//$('#outx').append(id.tx_hash +' : '+id.tx_output_n+' - '+id.value +' Satoshi <br>')

  })

  return calc;


}

// END TESTNET
else {

	$.each( outx, function( key, id ) { 
calc.push({['tx_hash_big_endian']: id.tx_hash_big_endian, ['tx_output_n']: id.tx_output_n, ['value']: id.value});
//$('#outx').append(id.tx_hash +' : '+id.tx_output_n+' - '+id.value +' Satoshi <br>')
  })
  return calc;
  }
}
//outx = 


function displayOUTX (calcoutx) {
$.each (calcoutx, function (key, id){
 zzz += id.tx_hash_big_endian +' : '+id.tx_output_n+' - '+id.value +' Satoshi <br>'
}

)
return zzz;
}
//console.log(zzz);
//CalcOutx();
//console.log(calcoutx);
//var sum;


$( '#text' ).ready(function() {
  $('#text').val('');
});
 $('.addss').on('input', 'input.address', function(){
    	let pre = this.id.replace('address','')
    //	console.log(this.value.match('^(bc1|tb1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$'));
   if (this.value.match('^(0x)?[0-9a-fA-F]{40}$')) {
   $('.addss #value'+pre+'').prop('disabled', false).val('');
   } 
   else {
   $('.addss #value'+pre+'').prop('disabled', true).val('').trigger('input');
   }	
    })
$('.addss').on('input', 'input.val', function(){ 
if (this.value) {
	ch = this.value.replace(/[^0-9\.]/g, ''); 
pos = ch.indexOf('.');
if(pos != -1){ // если запятая есть
        if((ch.length-pos)>19){ // проверяем, сколько знаков после запятой, если больше 1го то
            ch = ch.slice(0, -1); // удаляем лишнее
        }
    }
    this.value = ch;

}
	
mass();         
});

function mass() {
   feeb = $('input[name="fee"]:checked').val(); 

var gaslimit = '21000';   

    
var comblock = [];
var outxsum =0;
sum  = $('.recip input.val').val()?ethers.utils.formatUnits(ethers.utils.parseEther($('.recip input.val').val()), "wei"):0;


feeb = ethers.utils.formatUnits(ethers.utils.parseUnits(feeb, 'gwei'), 'wei');
//sum = this.value*100000000;
//sum = Math.round(sum * 100)/100;
//console.log(sum) 
//inputOutx = [];
if($.isNumeric(sum) && sum > 9999999999999)	{

	//baseFee = 16000000000;
	//feeb = 17000000000;
	
		
	
	
	inputOutx = selblocks(globball.eth,sum,feeb,baseFee,gaslimit);
	
	}
	else {
	selectout= selblockStop();
$('#result').html(selectout);
	return false; 	
	 }

var selectout;
if (sum > 0) {
	//$("label[for='fullcomm']").html((+ethers.utils.formatUnits(fullmaxfee)).toFixed(4) + ' Sum + max commision: '+ (+maxfullsum).toFixed(4) );
//	$("label[for='semicomm']").html((+ethers.utils.formatUnits(semimaxfee)).toFixed(4) +' Sum + semimax commission:' +(+semimaxfullsum).toFixed(4) );
	
var selectout =
'<p>Transfer amount: <b>'+ethers.utils.formatUnits(sum)+'&nbsp;'+symbChart+'</b></p>'
+'<p>Transfer commission: <b>~'+ethers.utils.formatUnits(fee)+'&nbsp;'+symbChart+'</b></p>'
+'<p>Full transfer amount with commission: <b>~'+ethers.utils.formatUnits(fullsum)+'&nbsp;'+symbChart+'</b></p>'
+'<p>Max allowable commission: '+(+ethers.utils.formatUnits(semimaxfee)).toFixed(4)+'&nbsp;'+symbChart+'</b></p>'
+'<p>Min balance for transaction: '+(+semimaxfullsum).toFixed(4)+'&nbsp;'+symbChart+'</b></p>';

if (selout) {
selectout += selout; 
}
}
if ( selectoutOver ) { 
selectout += selectoutOver;
}




//recip.push({'address':address.address, 'amount': (change/100000000)});// данные для сдачи на адрес отправителя
//selectout += '<p><b>Change: ' +change + 'Satoshis</b></p>';
$('#result').html(selectout);

}

function selblockStop() {
	selectoutOver = '';
 selectout ='<p class="warn">The payment amount must be greater than 0.00001 ETH</p>';
 $('button#gettrans').prop('disabled', true);
 return selectout;

}
function overbalance() { 
var selectout = '<p class="warn">Min balance for transaction exceeds your balance</p>';
$('button#gettrans').prop('disabled', true);
return selectout;
}
function selblocks(balance,sum,feeb,baseFee,gaslimit) { 

	var inputOutx; selout =''; selectoutOver = '';
// ЭФИР
	maxPriorityFeePerGas = String(BigInt(feeb) - BigInt(baseFee));
	
	//fullmaxFeePerGas = String(BigInt(baseFee)*BigInt(2)+BigInt(maxPriorityFeePerGas));
	semimaxFeePerGas = String(BigInt(baseFee)*BigInt(15)/BigInt(10)+BigInt(maxPriorityFeePerGas));
	
	maxFeePerGas = semimaxFeePerGas;
	
	
fee = String(BigInt(gaslimit)*BigInt(feeb));
semimaxfee = String(BigInt(gaslimit)*BigInt(semimaxFeePerGas));
	
	//console.log(typeof(change))

fullsum = String(BigInt(sum) + BigInt(fee));
semimaxfullsum = ethers.utils.formatUnits(String(BigInt(sum) + BigInt(semimaxfee)));
//maxfullsum = ethers.utils.formatUnits(String(BigInt(sum) + BigInt(fullmaxfee)));
change = String(BigInt(balance) - BigInt(ethers.utils.parseEther(semimaxfullsum, 'ether')));
var endingbal = BigInt(balance)-BigInt(fullsum);
$('#endingbal span').html('~ '+(+ethers.utils.formatUnits(endingbal)).toFixed(8));
if (endingbal < 0) {$('#endingbal span').animate({backgroundColor: "#ff9f92"},200)}
else {$('#endingbal span').animate({backgroundColor: "#9cffa4"},200)}
//change = String(BigInt(balance) - BigInt(fullsum));
	
// КОНЕЦ ЭФИР
//var nonce = 1;	

	inputOutx = {
		value: ethers.utils.parseUnits(sum, 'wei'),
		gasLimit:gaslimit, 
		maxPriorityFeePerGas: ethers.utils.parseUnits(maxPriorityFeePerGas, 'wei'),
		maxFeePerGas:ethers.utils.parseUnits(maxFeePerGas, 'wei'), 
		nonce: globball.ethnonce,
		type: 2,
		chainId: 1
	};

//selout += balance +' WEI <br>'

if (change < 0) { 
selectoutOver = overbalance();
//change = 0;
return false;
}

$('button#gettrans').prop('disabled', false);



return inputOutx;

}



});

async function red() {
	var tempprikey = getCook()[2].privkey;
	var massg = `
	<div class="transtimer">
    <p>20</p>
 <svg   viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle id="circle" class="circle_animation" r="46" cy="50" cx="50" stroke-width="5" stroke="#6fdb6f" fill="none"/>
    </svg>   
    </div>	
    <p><b>Enter password</b> <br>for transfer amount without commission:<br><b> ${WeiToEth(sum)} ${symbChart.toUpperCase()}</b></p>`;
	privatek = await getKey(tempprikey,1,massg,1);
//	processForm(typeIn);

   // recip.push(obj);
 
// my test for transaction
recip = $('.recip .address').val();

inputOutx.to = recip;
var tx ='';
$.each (inputOutx, function (key, id){
 tx += '\n' + key +': '+id;
}
)
//var inputTx = "3fb933f94242f6f67afe05421cb6ef3ea4964cb8c81ac7897e8c6619a1e2444d";



//var s = coinjs.script();

//console.log(Script);
// var inputN = 0;
//output 

// var address1 = "2N3oefVeg6stiTb5Kh3ozCSkaqmx91FDbsm";
// var amount = 2;
// tx.addoutput(address1, amount);
// var address1 = "2N3oefVeg6stiTb5Kh3ozCSkaqmx91FDbsm";
// var amount = 1;
 
// console.log(tx)

//tx.addoutput(address1, amount);	
//console.log(tx.sign(wif,1));
/**
rawTrans = tx;
console.log(rawTrans);
var textArea = document.getElementById("rawTrx");
  textArea.value = rawTrans; //SIGHASH_ALL DEFAULT 1 
	$("#rawTrx").attr({'disabled': true});
	 $("#gettrans").attr({'id':'sendTrans', 'onclick':'send()'}).html('Send Transaction'); 
	 **/
	 /////////////////////////
let wallet = new ethers.Wallet(privatek);
let signer = wallet.connect(ethers.getDefaultProvider()); 
let rawTransaction = await signer.signTransaction(inputOutx).then(ethers.utils.serializeTransaction(inputOutx));
return rawTransaction;	 
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
	history.pushState(null, null, '#'+symbChart+'/'+page+'/'+uppage);
	closeWind(symbChart, page, uppage);
	setTimeout(getbalance, 5000);
//console.log(tempdat);

}
async function send() {
	
	/*
	var textArea = document.getElementById("rawTrx");
rawTrans = 	textArea.value;
*/
let raw = await red();
//console.log(raw, ' ----RAW')
if (raw) {
	 try {
 	const headers = {
            'X-API-Key': 'You API Key', 
            'accept': 'application/json',
            'content-type': 'application/json' 
        };
        const postData = {
        tx: raw
};

const sendTx = await $.ajax({
    url: "URL for NODE send transaction",
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