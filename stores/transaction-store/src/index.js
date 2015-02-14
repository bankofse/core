
var process  = require('process'),
	kafka    = require('kafka-node'),
	Client   = kafka.Client,
	Consumer = kafka.Consumer
;

var zkNode = (process.env.ZK_PORT_2181_TCP_ADDR || 'localhost') + ':'
 		   + (process.env.ZK_PORT_2181_TCP_PORT || 2187);

console.info("Creating Client Connection to zk " + zkNode);
var client = new Client(zkNode);

function Store(client, topic) {
    //if (!(this.isInstanceOf(Store)))
    //    return new Store(client, topic);

    this.client = client;
    this.topic = topic;

    this.consumer = new Consumer(
        client,
        [
            { topic: topic, partition: 0 }
        ],
        {
            autoCommit: false
        }
    );
    this.consumer.on('message', this.onMessage.bind(this));
    this.consumer.on('error', this.onError.bind(this));
}

Store.prototype.onMessage = function (message) {
    console.log("->", message);
};


Store.prototype.onError = function (e) {
    console.error(e);
};

setTimeout(() => {
    console.info("Starting Store");
    var store = new Store(client, 'transaction');
}, 10000);

