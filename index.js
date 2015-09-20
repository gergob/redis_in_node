/**
 * Created by Gergo on 9/20/2015.
 */

var redis = require('redis');
var client = redis.createClient();

client.on('error', function (message) {
    console.error(message);
});

function clearValue(client, key) {
    client.del(key, function (err, result) {
        if (err) {
            console.error(err);
        }
        if (result > 0) {
            console.log(key + ' deleted from Redis.');
        }
    });
}

function storeSimpleValue(client) {
    var SIMPLE_VALUE_KEY = 'myapp:entities:values:1';

    clearValue(client, SIMPLE_VALUE_KEY);
    client.set(SIMPLE_VALUE_KEY, 'Value1');
    client.get(SIMPLE_VALUE_KEY, function (err, replies) {
        if (err) {
            console.error(err);
        }
        console.log(replies);
    });
}

function storeArray(client) {
    var ARRAY_VALUE_KEY = 'myapp:entities:arrays:1';
    var myPrimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 31, 37];

    clearValue(client, ARRAY_VALUE_KEY);
    client.rpush.apply(client, [ARRAY_VALUE_KEY].concat(myPrimes));

    client.lrange(ARRAY_VALUE_KEY, 0, -1, function (err, result) {
        if (err) {
            console.error(err);
        }
        console.log(result);
    });
}

storeSimpleValue(client);
storeArray(client);

client.quit();
