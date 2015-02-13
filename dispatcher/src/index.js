
var process  = require('process'),
	kafka    = require('kafka-node'),
	Client   = kafka.Client,
	Producer = kafka.Producer,
    Consumer = kafka.Consumer
;

var zkNode = process.env.ZK_PORT_2181_TCP_ADDR + ':'
 		   + process.env.ZK_PORT_2181_TCP_PORT ;

var client = new Client(zkNode)

var producer = new Producer(client);

producer.on('ready', () => {
	console.log("Producer ready");

	setInterval(function () {
        var message = [];

        message.push("Just a random message");

        var payloads = [
            { topic: 'transaction', messages: message }
        ];
        producer.send(payloads, function (err, data) {
            console.log("Sent");
        });

    }, 5000);

});

producer.on('error', (e) => {
	console.log("ERROR", e);
});
