var mqtt = require('mqtt');
var mysql = require('mysql');
var urlencode = require('urlencode');
var http = require('http');
var dbconfig = require('./config/database');
var options = {
    username: 'freeza',
    password: 'freeza'
};
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Equipment_Failure'
});

connection.connect();
var client = mqtt.connect('mqtt://broker.hivemq.com', options);
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
client.on('connect', function () {
    client.subscribe('vels545');
    console.log(`MQTT Started to Listen...`);
});
client.on('message', function (topic, message) {
    var recievedMessage = message.toString();
    var mqttvalue = recievedMessage;
    var splits = mqttvalue.split(",");
    let checkflag;
    connection.query("SELECT `value` FROM equipment_Value  ORDER BY dt DESC LIMIT 1", function (err, rows) {
        if (err) {
            console.log("Error getting previous equipment value", err);
        }
        else {
            if (rows[0].value == Number(splits[0])) {
                checkflag = true;
            } else {
                checkflag = false;
            }
            if (checkflag == false) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


                connection.query('INSERT INTO `equipment_Value`( `level`,`value`,`message`,`sensors_data_date`,`sensors_data_time`) VALUES ("NORMAL","' + Number(splits[0]) + '","' + splits[1] + '","' + date + '","' + time + '")', function (err) {
                    if (err) {
                        console.log("Error inserting equipment_Value Level ", err);
                    }
                    else {
                        console.log("equipment_Value data for inserted successfully");
                    }
                })


            }
        }
    })


})
