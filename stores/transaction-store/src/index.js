
var process  = require('process'),
	kafka    = require('kafka-node'),
	Client   = kafka.Client,
	Consumer = kafka.Consumer
;

var zkNode = process.env.ZK_PORT_2181_TCP_ADDR + ':'
 		   + process.env.ZK_PORT_2181_TCP_PORT ;

var client = new Client(zkNode);

console.log("Starting Transaction Store");
console.log("Connecting to ZK node: " + zkNode);

var consumer = new Consumer(
        client,
        [
            { topic: 'transaction', partition: 1 }
        ],
        {
            autoCommit: false
        }
    );

consumer.on('ready', () => {
    console.log('Consumer ready');
    consumer.on('message', (message) => {
        console.log("-> " + message.value);
    });

});

consumer.on('error', (e) => {
    console.log("ERROR", e);
});
