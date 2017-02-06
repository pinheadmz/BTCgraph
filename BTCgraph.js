var bitcoinapi = {
	url: "http://btc.blockr.io/api/v1/",
	result: null,
	getdata:	function(params, obj){	
					$.ajax({
						url:		this.url + params,
						dataType: 	"JSON",
						type: 		"GET",
						async:		false,
						success:	function(r){
										obj.result = r;
									}
					});
				},	
	latestblock:function(){
					this.result = null;
					this.getdata("block/info/last", this);
					return this.result.data.nb;
				},
	blocktxs:	function(n){
					this.result = null;
					this.getdata("block/txs/" + n, this);
					return this.result.data.txs.map(this.txformat);
				},
	tx:			function(h){
					this.result = null;
					this.getdata("tx/info/" + h, this);
					return this.txformat(this.result.data);
				},
	txformat:	function(t){
					this.result = null;	
					var result = {};
					result.block = t.block;
					result.hash = t.tx;
					result.ins = [];
					var txins = t.trade.vins;
					for(var i=0; i<txins.length; i++){
						result.ins.push( {	hash: txins[i].vout_tx,
											amt: txins[i].amount * -1} );
					}
					return result;
				}
	}
	

function listalltx(){
	var distThr = 10;
	var amtThr = .1;
	var count = 0;
	var n = bitcoinapi.latestblock();
	var txs = bitcoinapi.blocktxs(n-1);
	
	console.log("txs.length: ", txs.length);
	
	for (var i=0; i<txs.length; i++){
		var t = txs[i];
		console.log(t.hash, t.ins.length);
		
		var ins = t.ins;
		for (var j=0; j<ins.length; j++){
			tin = bitcoinapi.tx(ins[j].hash);
			if (n - tin.block <= distThr && ins[j].amt >= amtThr) {
				console.log("    + ", j, ":    ", tin.block, " ! DIST: ", n - tin.block, "! AMT: ", ins[j].amt);
				count++;
			} else {
				console.log("    + ", j, ":    ", tin.block, ins[j].amt);
			}
		}
		
	}
	
	return count;
}

function redraw(){
	c1 = $("#C1");
	c2 = $("#C2");
	x1 = c1.offset().left + 2;
	y1 = c1.offset().top + 2;
	x2 = c2.offset().left + 2;
	y2= c2.offset().top + 2;
	
	
	
	$("#L1").attr('d',"M " + x1 + " " + y1 + " L " + x2 + " " + y2);
	
	
	window.requestAnimationFrame(redraw);
}

window.requestAnimationFrame(redraw);
