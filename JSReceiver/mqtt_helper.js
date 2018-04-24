const mqtt = require('mqtt')
const options = {
    port: 10175,
    host: 'mqtt://m23.cloudmqtt.com',
    clientId: 'mqttjs_receiver',
    username: 'pgsprqgl',
    password: 'Bdd6r1VFtb-k',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

const channels = ["end", "collectorIN", "presence"];

var client;

function init(fncallback){
    client = mqtt.connect('mqtt://m23.cloudmqtt.com', options)

    client.on('connect', function () {
        channels.forEach(element => {
            client.subscribe(element);
        });
    })
    
    client.on('message', function (topic, message) {
        // message is Buffer
        console.log("Received message from: "+ topic +": "+message.toString())
        if (topic == 'collectorIN' && fncallback){
            fncallback(topic, message);
        }
        if (topic == 'end'){
            client.end();
        }
    })
}

module.exports={
    init
}

