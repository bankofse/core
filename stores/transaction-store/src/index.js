
var process  = require('process'),
	kafka    = require('kafka-node'),
	Client   = kafka.Client,
	Consumer = kafka.Consumer
;

var zkNode = process.env.ZK_PORT_2181_TCP_ADDR + ':'
 		   + process.env.ZK_PORT_2181_TCP_PORT ;

var client = new Client(zkNode);

console.info("Starting Transaction Store");
console.info("Connecting to ZK node: " + zkNode);

var consumer = new Consumer(
        client,
        [
            { topic: 'transaction', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );

consumer.on('message', (message) => {
    console.info("-> " + message.value);
});

consumer.on('error', (e) => {
    console.log("ERROR", e);
    consumer.close();
});
