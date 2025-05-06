var symb = symbChart.replace('USDT','').toLowerCase();
var symbtwo = symb == 'btc' ? 'bitcoin' : symb == 'ltc' ? 'litecoin' : symb == 'doge' ? 'dogecoin' : symb == 'eth' ? 'ethereum' : '';
$("div#stat .spantit").text(symbtwo.charAt(0).toUpperCase() + symbtwo.slice(1)).addClass(symb);
$("a.buts span").text(symbtwo.charAt(0).toUpperCase() + symbtwo.slice(1));
function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
	var switcherElement = document.createElement('div');
	switcherElement.classList.add('switcher');
	var intervalElements = items.map(function(item) {
		var itemEl = document.createElement('button');
		itemEl.innerText = item;
		itemEl.classList.add('switcher-item');
		itemEl.classList.toggle('switcher-active-item', item === activeItem);
		itemEl.addEventListener('click', function() {
			onItemClicked(item);
		});
		switcherElement.appendChild(itemEl);
		return itemEl;
	});
	function onItemClicked(item) {
		if (item === activeItem) {
			return;
		}

		intervalElements.forEach(function(element, index) {
			element.classList.toggle('switcher-active-item', items[index] === item);
		});

		activeItem = item;

		activeItemChangedCallback(item);
	}
	return switcherElement;
}
var intervals = ['1h', '1d', '1w', '1M'];
var switcherElement = createSimpleSwitcher(intervals, intervals[1], stratChart);
$('#tvchart').after(switcherElement);
$("div.chart h2").html(symbChart);
var tzoneText = "Time Zone: "+Intl.DateTimeFormat().resolvedOptions().timeZone;
var tzone = new Date().getTimezoneOffset() / -60;
$('#tzone').html(tzoneText);
var chartProperties = {
autoSize: true,
  height:220,
   crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
	localization: {
                    dateFormat: 'yyyy-MM-dd',
                },
	timeScale: {
                    timeVisible: true,
                    secondsVisible: false
                },
}
var domElement = document.getElementById('tvchart');
var chart = LightweightCharts.createChart(domElement,chartProperties);
var candleSeries = null;
var socketChart = null;
var volumeSeries = null;
var lastBarData = null;
var isCrosshairActive = false;
chart.timeScale().setVisibleLogicalRange({
    from: 0,
    to: 80,
});
chart.timeScale().scrollToPosition(1, true);
function getGraf(symb, inter, lim) {
$.ajax({
   url: "https://api.binance.com/api/v3/klines",
   data: "symbol="+symb+"&interval="+inter+"&limit="+lim,
   success: function (record) { 
    GGG = record;
    $("#stats span.mpr").html(number_format(GGG[GGG.length-1][4], 8, '.', ','));
    getDataGraf(GGG);
   }
 });
}
function getDataGraf(dataGraf) {
	var GrafDat = [];
	var VolDat = [];
	$.each(dataGraf, function() { 
	var cand = [];
		$.each(this, function(index,value) {
		cand.push(this);
		
		});
		GrafDat.push(new Object({ time: Math.round((cand[0]/1000)+(tzone*60*60)), open: +cand[1], high: +cand[2], low: +cand[3], close: +cand[4]}));
		VolDat.push(new Object({ time: Math.round((cand[0]/1000)+(tzone*60*60)), value: +cand[5]}));	
	});
	//console.log(GrafDat)
			candleSeries.setData(GrafDat);
			volumeSeries.setData(VolDat);
			lastBarData = {open: GrafDat[GrafDat.length - 1].open, close: GrafDat[GrafDat.length - 1].close, high: GrafDat[GrafDat.length - 1].high, low: GrafDat[GrafDat.length - 1].low, volume: VolDat[GrafDat.length - 1].value};
			 lastBar (lastBarData, legend);
}
function lastBar (lastBarData, legend) {
legend.innerHTML = `
          <div class="row"><span class="rowt">O:&nbsp;</span><span class="c">${number_format(lastBarData.open, 6, '.', ',')}</span>&nbsp;|&nbsp;<span class="rowt">C:&nbsp;</span><span class="c">${number_format(lastBarData.close, 6, '.', ',')}</span></div>
    <div class="row"><span class="rowt">H:&nbsp;</span><span class="c">${number_format(lastBarData.high, 6, '.', ',')}</span>&nbsp;|&nbsp;<span class="rowt">L:&nbsp;</span><span class="c">${number_format(lastBarData.low, 6, '.', ',')} </span></div>
    <div class="row"><span class="rowt">Vol:&nbsp;</span><span class="c">${number_format(lastBarData.volume, 2, '.', ',')}</span></div>
 `;
  if (lastBarData.close < lastBarData.open) {
    $("#legend .c").css("color", "red");
    }
    else {$("#legend .c").css("color", "#00aa00");}
}
function stratChart (inter) {
if (socketChart != null) { 
socketChart.close(1000);
chart.removeSeries(candleSeries);
chart.removeSeries(volumeSeries);
const legend = document.getElementById('legend');

if (legend && legend.innerHTML.trim() !== '') {
  legend.innerHTML = '';
}
$("#stats span.varPerc").find('.perr').text('').end().find('.inte').text('');
}
candleSeries = chart.addCandlestickSeries();
candleSeries.applyOptions({ 
  priceFormat: {
         type: 'price',
        minMove: 0.000001,
        precision: 6,
         },
         scaleMargins: {
        // positioning the price scale for the area series
        top: 0.1,
        bottom: 0.4,
    }
           });
    //VOLUME
 volumeSeries = chart.addHistogramSeries({
    color: 'rgba(0, 0, 0, 0.1)',
    priceFormat: {
        type: 'volume',
    },
    priceScaleId: '', // set as an overlay by setting a blank priceScaleId
    // set the positioning of the volume series
    scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
    },
});
volumeSeries.priceScale().applyOptions({
    scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
    },
});
chart.subscribeCrosshairMove(function(param) {
    //const legend = document.getElementById('legend');
    if (!legend) return;

   if (!param || !param.time || param.seriesData.size === 0) {
    isCrosshairActive = false;
     lastBar (lastBarData, legend);
            return;
    }
isCrosshairActive = true;
    const candleData = param.seriesData.get(candleSeries);
    const volumeData = param.seriesData.get(volumeSeries);

    if (!candleData || !volumeData) {
        legend.innerText = 'Нет данных';
        return;
    }

    const time = new Date(param.time * 1000).toLocaleString('en-GB', { timeZone: 'UTC' });
    const open = number_format(candleData.open, 6, '.', ',');
    const high = number_format(candleData.high, 6, '.', ',');
    const low = number_format(candleData.low, 6, '.', ',');
    const close = number_format(candleData.close, 6, '.', ',');
    const volume = number_format(volumeData.value, 2, '.', ',');

    legend.innerHTML = `
    <div class="row"><span class="rowt">O:&nbsp;</span><span class="c">${open}</span>&nbsp;|&nbsp;<span class="rowt">C:&nbsp;</span><span class="c">${close}</span></div>
    <div class="row"><span class="rowt">H:&nbsp;</span><span class="c">${high}</span>&nbsp;|&nbsp;<span class="rowt">L:&nbsp;</span><span class="c">${low}</span></div>
    <div class="row"><span class="rowt">Vol:&nbsp;</span><span class="c">${volume}</span></div>
            `;
             if (candleData.close < candleData.open) {
    $("#legend .c").css("color", "red");
    }
    else {$("#legend .c").css("color", "#00aa00");}
});

    //END VOLUME       
getGraf(symbChart, inter, 120);	
socketChart = new WebSocket('wss://stream.binance.com:9443/stream?streams='+symbChart.toLowerCase()+'@kline_'+inter);
socketChart.addEventListener('open', function (event) {
 });
socketChart.addEventListener('message', function (event) {
	var pars =  jQuery.parseJSON(event.data);
	var comVar = pars.data.k.c; 
	document.title =  'CryptaBox | '+symbChart+' : '+number_format(comVar, 8, '.', ',')+' price today, live price, marketcap and chart';
	var comPerc = ((comVar - pars.data.k.o) / pars.data.k.o * 100).toFixed(2);
    if(number_format($("#stats span.mpr").html(), 8, '.', '') <= comVar) {//alert($("div."+symb+" div.sot").html()+" : "+pars.data.c);
	$("#stats span.mpr").html(number_format(comVar, 8, '.', ',')).animate({color: "#00aa00"},200);
}
else{
	$("#stats span.mpr").html(number_format(comVar, 8, '.', ',')).animate({color: "red"},200);
}
if (comPerc < 0) {
  	$("#stats span.varPerc").animate({ backgroundColor: "#ff9f92" }, 200).find('.perr').text(comPerc + '% ').end().find('.inte').text('(' + inter + ')');
  }
  else {
  $("#stats span.varPerc").animate({ backgroundColor: "#9cffa4" }, 200).find('.perr').text('+'+comPerc + '% ').end().find('.inte').text('(' + inter + ')');
  }
	var curBar = {
	time: Math.round((pars.data.k.t/1000)+(tzone*60*60)),
	open: +pars.data.k.o,
	high: +pars.data.k.h,
	low: +pars.data.k.l,
	close: +pars.data.k.c
	}
	var curVal = {
	time: Math.round((pars.data.k.t/1000)+(tzone*60*60)),
	value: +pars.data.k.v,
		}
candleSeries.update(curBar);
volumeSeries.update(curVal);
lastBarData = {
    time: new Date(pars.data.k.t).toLocaleString('en-GB'),
    open: +pars.data.k.o,
    high: +pars.data.k.h,
    low: +pars.data.k.l,
    close: +pars.data.k.c,
    volume: +pars.data.k.v
};
//const legend = document.getElementById('legend');
if (!isCrosshairActive) {
    lastBar (lastBarData, legend);
}
});
}
stratChart (intervals[1]);
