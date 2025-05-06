function calcfee(input_count,typeIn,t) {
let comsize;
var inputs=input_count?input_count:0;
var outputs=t?t:0;
if (inputs>0 && outputs>0) {
var bytes=(parseInt(inputs)*148+parseInt(outputs)*34+10);
 if (typeIn == 'bech32') {
var pbase=parseInt(inputs)*64+parseInt(outputs)*32+10
var ptotal=pbase+2+107*parseInt(inputs)
var pvsize=parseInt((pbase*3+ptotal)/4)
comsize=pvsize+10; // bech32 + 10 - correction for pool
}
else {
comsize=bytes; 
}
return comsize;
}
else {
return 0;
}
}
