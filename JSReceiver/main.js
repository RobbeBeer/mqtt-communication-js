const mqtt_helper = require('./mqtt_helper');
//import * as mqtt_helper from ('./mqtt_helper');
console.log("wezijhier");

mqtt_helper.init( () => {
    console.log("let's go");
} )