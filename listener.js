module.exports = /** @class */ (function () {
    // Probably do ms
    function Listener(client, live, sensors, granularity) {
        this.sensors = [];
        this.dataBuffer = [];
        this.client = client;
        this.live = live;
        this.sensors = sensors;
        this.granularity = 1000;
        this.packetSize = granularity;
        this.dataBuffer = [];
    }
    // Get historical data
    Listener.prototype.query = function (timeRange, granularity) {
    };
    // For live data only
    Listener.prototype.addData = function (data) {
        this.dataBuffer.push(data);
        //console.log(data["stamp"] - this.dataBuffer[0]["stamp"], this.granularity );
        if (data["stamp"] - this.dataBuffer[0]["stamp"] > this.granularity) { // If new data surpasses the granularity
            console.log("push");
            var sum = 0;
            for (var i = 0; i < this.dataBuffer.length; i++) {
                sum += this.dataBuffer[i]["data"];
            }
            console.log(this.dataBuffer.length);
            this.push(JSON.stringify({ data: sum / this.dataBuffer.length }));
            this.dataBuffer = [];
        }
        //this.push(JSON.stringify(data));
    };
    Listener.prototype.push = function (data) {
        console.log(data);
        this.client.sendUTF(data);
    };
    return Listener;
}());
