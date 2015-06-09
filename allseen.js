var levelup = require('levelup')
var db = levelup('./')
var allAddresses = new Array()

db.createReadStream()
    .on('data', function(data) {
        var pieces = data.key.split('-')
        var address = pieces[1]
        var txid = pieces[3]
        var activity = data.value.split(':')[0]
        var addressJson = {
            address: address,
            txid: txid,
            total: activity
        }
        allAddresses.push(addressJson)
    })
    .on('close', function() {
        console.log(JSON.stringify(allAddresses))
        db.close()
    })