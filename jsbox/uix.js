 var uppage = '';
if (location.hash !='') {
	//alertFrame();
let tempdat = location.hash.slice(2).split('/');
symbChart = tempdat[0];
	var page = tempdat[1];
	if (typeof tempdat[2] !='undefined' && !$('#alertframe #alertcont .include').length) {
	history.replaceState(null, null, '#!'+symbChart+'/'+page+'/');
	}
	$('html, body').animate({ scrollTop: 0 }, 'fast');
	if (page == 'sellnow') { sellnow(1); }
	else {
            	oppage(symbChart, page, uppage); }
            }
 window.addEventListener("popstate", async function(e) {  
            if (location.hash =='') { 
            	closeFrame();
            }
            else { 
let tempdat = location.hash.slice(2).split('/');
symbChart = tempdat[0];
	var page = tempdat[1];
	uppage = (tempdat[2] && $('#alertframe #alertcont .include').length) ? tempdat[2]:'';
	if (typeof tempdat[2] !='undefined' && !$('#alertframe #alertcont .include').length) {
	history.replaceState(null, null, '#!'+symbChart+'/'+page+'/');	
	}
	
           if ($('#alertframe')) {
           	if (uppage) {
           		if ($("#sellframe").length) { await closeSellframe(35);  } 
		closeWind(symbChart, page, uppage)
		}
		else if (page == 'sellnow') { sellnow(1); }
		else {
		if ($("#sellframe").length) { await closeSellframe(35);  }
closeAlertFrame(symbChart, page);	
	}
            }
         }
        });
$("body").on('click', '.alertbutton.back', function(event) {
history.back();});
var 
		ajaxLoading = false,
		ajaxLocation = '';

$("body").on('click', '.ajax-link.inactive', async function(event) {
 	event.preventDefault();
	if (typeof socketChart != 'undefined' && socketChart) { socketChart.close(1000); 
$('div.btc, div.sot').off();
 }  
	let tempdat = $(this).data("set").split('/');
	symbChart = tempdat[0];
	var page = tempdat[1];
		uppage = (tempdat[2] && $('#alertframe #alertcont .include').length) ? tempdat[2]:'';
	history.pushState(null, null, '#!'+symbChart+'/'+page+'/'+uppage); 
	if (document.getElementById('alertframe')) {
		if (uppage) {
			if ($("#sellframe").length) { await closeSellframe(35);  }
		closeWind(symbChart, page, uppage)
		}
		else {
			if ($("#sellframe").length) { await closeSellframe(35);  }
closeAlertFrame(symbChart, page);	
}
	}
	else {
		$('html, body').animate({ scrollTop: 0 }, 'fast');
oppage(symbChart, page, uppage);	
	}
	
 	});
async function oppage(symbChart, page, uppage) {
 	if ($('#alerts').length) {
clouseAlert()
 	}
 	if ($('.ajax-link.menu').length) {
 		let b = (uppage)? uppage:'home';
           	$('.ajax-link.menu').removeClass('active inactive').addClass('inactive');

 	 $('.ajax-link.menu.'+b).removeClass('inactive').addClass('active');}
  	if (!$('#alertOverlay').length) {
 await alertFrame();
}
	divs = '#alertframe #alertcont';
	if (uppage) {
		page = uppage;
		divs = '#alertframe #alertcont .include';
		}
	$(divs).load(page+'.html?ver=1.2', 'body');
 	$("iframe").on('load', function() {

});

 }
async function sellnow(e) {
	let tempdat = location.hash.slice(2).split('/');
symbChart = tempdat[0];
	var page = tempdat[1];
	var uppage = (tempdat[2])?tempdat[2]:'';
	if (page !='sellnow') {
	window.activesell = window.location.hash
	}
	var page = 'sellnow';
	if(e!=1) {history.pushState(null, null, '#!'+symbChart+'/'+page+'/'+uppage);} 
	if (document.getElementById('alertframe')) {
		if (!$('#alertOverlay').length) {
      	$('<div class="overlay" id="alertOverlay"></div>').appendTo('body');
await new Promise(resolve => {
        $("#alertOverlay").fadeIn(300);
        resolve();
    });	      	
      	}
if (!$('#sellframe').length){
$('<div class="" id="sellframe"></div>').appendTo('body');
$('#sellframe').load(page+'.html?ver=1.2', 'body');}
 $('#sellframe').animate({
                'min-height': "100dvh",
            }, 'linear', function() {
               $(this).css({height: 'auto'});
            });
	}
	else {
		if (!$('#alertOverlay').length) {
      	$('<div class="overlay" id="alertOverlay"></div>').appendTo('body');
      	 $('<div id="framebut"><div class="alertbutton back"><span class="back"></span></div>' +
        '<div class="alertbutton close"><span onclick="closeFrame(1)" class="close"></span></div></div><div id="alertframe"><div id="alertcont"></div><div id="alertfoot"></div></div>').appendTo('body');
if (!$('#sellframe').length){
$('<div class="" id="sellframe"></div>').appendTo('body');
$('#sellframe').load(page+'.html?ver=1.2', 'body');
}
await new Promise(resolve => {
        $("#alertOverlay").fadeIn(300, function() {
          $("#framebut").css('visibility', 'visible').animate({opacity: 1.0}, 400);
          $('html, body').animate({ scrollTop: 0 }, 'fast');
           $('#sellframe').animate({
                'min-height': "100dvh",
            }, 'linear', function() {
               $(this).css({height: 'auto'});
            });
resolve(); 
        });
    });	
    }
		
	}
	
}
async function hideSell(e) { 
if (e==0) {
closeFrame(1);
}	
else {
let newpath = activesell?activesell:'./';
await closeSellframe(e);
history.pushState(null, null, newpath);
if (!activesell) {

$('#alertframe').animate({
    height: '0',
    'min-height':"0",   
  }, 300, 'linear', function(){ $("#alertframe").remove();
 //resolve();
   });
$("#alertOverlay, #framebut").animate({opacity: 0.0}, 400, function(){
$("#alertOverlay, #framebut").remove();
});

}
}

	}
async	function closeSellframe(e) {
let s=e+'px';
  return new Promise((resolve, reject) => {
     $('#sellframe').animate({
    	height: s,
      'min-height': s,
  }, 300, 'linear', function() {
  //	$(this).css('position', 'fixed');
                if (e==0){$("#sellframe").remove();}
                resolve();       
            });
  });
}
 	$("body").on('click', '.butclose', function(event) {closeFrame();});
 


