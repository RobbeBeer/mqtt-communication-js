//const cows = require('./data/cows');
const mqtt = require('mqtt');
var Promise = require('promise');

var options = {
    port: 10175,
    host: 'mqtt://m23.cloudmqtt.com',
    clientId: 'mqttjs_helper',
    username: 'pgsprqgl',
    password: 'Bdd6r1VFtb-k',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var channels = ["end", "eartagsIN","gatewayIN", "presence"];
const client = mqtt.connect('mqtt://m23.cloudmqtt.com', options);

client.on('connect', function () {   
    channels.forEach(element => {
        client.subscribe(element);
    });
})
    
client.on('message', function (topic, message) {
    console.log("Received message from: "+ topic +": "+message.toString())
    //callback(message);
    if (topic == 'end'){
        client.end();
    }
    
})

module.exports = { client };