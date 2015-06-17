var levelup = require('levelup')
var db = levelup('./')
var allAddresses = new Array()

db.createReadStream()
    .on('data', function(data) {
        var pieces = data.key.split('-')
        var address
        var txid
        var activity
        var txType        

        address = pieces[1]
        txid = pieces[3]
        activity = data.value.split(':')[0]

        var addressJson = {
            address: address,
            txid: txid,
            total: activity
        }
        if (data.key.indexOf('txa2-') > -1)
            allAddresses.push(addressJson)
    })
    .on('close', function() {
        console.log(JSON.stringify(allAddresses))
        db.close()
    })
    
    
    // to show tx outs
//var OUTS_PREFIX = 'txo-'; //txo-<txid>-<n> => [addr, btc_sat]
//var SPENT_PREFIX = 'txs-'; //txs-<txid(out)>-<n(out)>-<txid(in)>-<n(in)> = ts

    // to sum up addr balance (only outs, spents are gotten later)
// var ADDR_PREFIX = 'txa2-'; //txa-<addr>-<tsr>-<txid>-<n> 
    // tsr = 1e13-js_timestamp
    // => + btc_sat [:isConfirmed:[scriptPubKey|isSpendConfirmed:SpentTxid:SpentVout:SpentTs]
    // |balance:txApperances