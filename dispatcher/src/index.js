
var process  = require('process'),
    kafka    = require('kafka-node'),
    Client   = kafka.Client,
    Producer = kafka.Producer,
    Consumer = kafka.Consumer
;

var zkNode = process.env.ZK_PORT_2181_TCP_ADDR + ':'
           + process.env.ZK_PORT_2181_TCP_PORT ;

console.log("Connecting to ZK node: " + zkNode);

var client = new Client(zkNode);

var producer = new Producer(client);

producer.on('ready', () => {
    console.log("Producer ready");
    console.dir(producer);

    setInterval(function () {

        var trans = {
                    transaction: (new Date()).toISOString(),
                    amount: 50.0,
                    toAccount: 2132564,
                    fromAccount: 2135843
                }

        var payloads = [
            {
                topic: 'transaction',
                messages: trans,
                partition: 0,
                attributes: 0
            }
        ];
        producer.send(payloads, function (err, data) {
            console.log("Sent");
        });

    }, 3000);

});

producer.on('error', (e) => {
    console.log("ERROR", e);
    producer.close();
    process.exit(1);
});
