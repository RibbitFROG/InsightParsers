# InsightParsers
Various scripts to parse the databases created by Insight and Insight-API

Drop these js files into your ~/.insight/txs/ directory
Pipe the results to a file like this:

```
node alltx.js > ~/insight/public/alltx.json
```
The above command will create your results here: 
```
http://yourinsightaddress.ext/alltx.json
```

alltx.js parses out every transaction with a positive value and sorts it by the value

allseen.tx parses out every address / transaction seen on the blockchain (including zero currency tx's)
