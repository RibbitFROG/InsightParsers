var fs = require('fs')
var addressArray = []
var balanceArray = []
Array.prototype.unique = function() {
    var sorted = this;
    sorted.sort();
    return sorted.filter(function(value, index, arr){
        if(index < 1) 
            return true;
        else
            return value != arr[index-1];
    });
}
var ProgressBar = require('progress')
var genProgressBar = function(len, title){
	var bar = new ProgressBar('  '+title+' [:bar] :percent', {
	    complete: '=',
	    incomplete: ' ',
	    width: 20,
	    total: len
	})
	return bar
}

var explorers = require('bitcore-explorers-multi')
var insight = new explorers.Insight("ribbit")

var parseFile = function(fileName,callback) {
	var obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));
	var bar = genProgressBar(obj.length, "Processing "+fileName)

	for (var index = 0; index < obj.length; index++) {
		var address = obj[index]
		bar.tick()
		var addressObj = address.address
		if (Number(address.total) > 0 ) {
			addressArray.push(addressObj)
		}
		if (index == obj.length-1) {
		//if (index > 250) {			
			return callback(addressArray.unique())
		}
	}
}


var getBalance = function(addresses, index, bar, callback) {
	bar.tick()
	if (index == addresses.length) {
		return callback()
	}
	insight.getBalance(addresses[index],function(err, balance) {
		if (err) {
			console.log(err)
		} else {
			if (balance > 0) {
				var obj = {address: addresses[index], balance: balance * 0.00000001}
				balanceArray.push(obj)				
			}
			getBalance(addresses, index+1, bar, callback)
		}
	})
}

parseFile('./allseen.json',function(addresses){
	var bar = genProgressBar(addresses.length, "Processing addresses")
	getBalance(addresses, 0, bar, function(){
		console.log(JSON.stringify(balanceArray.sort(sort_by('balance', true, parseInt))))
	})
})



var sort_by = function(field, reverse, primer) {
    var key = primer ?
        function(x) {
            return primer(x[field])
        } :
        function(x) {
            return x[field]
        };

    reverse = !reverse ? 1 : -1;

    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}



