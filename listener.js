module.exports = /** @class */ (function () {
    // Probably do ms
    function Listener(client, live, sensors, granularity) {
        this.sensors = [];
        this.dataBuffer = [];
        this.client = client;
        this.live = live;
        this.sensors = sensors;
        this.granularity = granularity;
        this.packetSize = granularity;
        this.dataBuffer = [];
    }
    // Get historical data
    Listener.prototype.query = function (timeRange, granularity) {
    };
    // For live data only
    Listener.prototype.addData = function (data) {
        console.log(data);
        this.dataBuffer.push(data);
        if (this.dataBuffer[0]["stamp"] + this.granularity > data["stamp"]) { // If new data surpasses the granularity
            var sum = 0;
            for (var i = 0; i < this.dataBuffer.length; i++) {
                sum += this.dataBuffer[i];
            }
            //this.push(sum / this.dataBuffer.length);
        }
        this.push(JSON.stringify(data));
    };
    Listener.prototype.push = function (data) {
        console.log(data);
        this.client.sendUTF(data);
    };
    return Listener;
}());
