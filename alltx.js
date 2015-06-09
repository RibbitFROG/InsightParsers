var levelup = require('levelup')
var db = levelup('./')
var allWithActivity = new Array()
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

db.createReadStream()
    .on('data', function(data) {
            var pieces = data.key.split('-')
            var address = pieces[1]
            var txid = pieces[3]
            var activity = data.value //.split(':')[0]
            var addressJson = {
                address: address,
                txid: txid,
                total: ac$

                //accounts with movement
                    if (activity > 0 && address.length == 34) {
                    allWithActivity.push(addressJson)
                }
            })
        .on('close', function() {

            allWithActivity.sort(sort_by('total', false, parseInt))
            console.log(JSON.stringify(allWithActivity))
            db.close()
        })