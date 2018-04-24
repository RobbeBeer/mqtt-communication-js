const cows = require('./data/cows');
const mqtt_helper = require ('./mqtt/mqtt-helper');

const client =  mqtt_helper.client;

client.publish("collectorIN",JSON.stringify(cows));
var i = 0;
var json = JSON.parse(JSON.stringify(cows));
var count = json.cows.length;

function changeSomeValue(json){
    //Math.floor((Math.random() * json.cows.length) + 1);
    cow = json.cows[Math.floor(Math.random() * json.cows.length)];
    property = cow.values[Math.floor(Math.random() * cow.values.length)];
    toChange=Object.keys(property);
    typeOfProperty = JSON.stringify(toChange);
    propertyType = typeOfProperty.slice(2, typeOfProperty.length-2);


    switch(propertyType) {
        case "hematocriet": 
            property[toChange]= Math.floor((Math.random() * 37) + 21)/100;
            break;
        case "hemoglobine": 
            property[toChange]= Math.floor((Math.random() * 89) + 47)/10;
            break;
        case "glucose": 
            property[toChange]= Math.floor((Math.random() * 40) + 25)/10;
            break;
        case "eiwit": 
            property[toChange]= Math.floor((Math.random() * 75) + 67)/100;
            break;
        default:
            console.log("Er is duidelijk iets mis gegaan");

    }

    console.log("changing "+ cow.name+"'s "+ propertyType + " to " + property[toChange]);
    return json;
}

function fn60sec() {
    if (i< count){
        client.publish("collectorIN",JSON.stringify(json.cows[i]));
        i++;
    } else {
        i = 0;
    }
    json = changeSomeValue(json);
}
fn60sec();
setInterval(fn60sec, 1000);


