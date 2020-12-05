module.exports = class Listener {
    // Probably do ms
    constructor(client, live, sensors, granularity) {
        this.client = client;
        this.live = live;
        this.sensors = sensors;
        this.granularity = granularity;

        this.packetSize = granularity

        this.dataBuffer = []
    }

    // Get historical data
    query(timeRange, granularity) {

    }

    // For live data only
    addData(data) {
        data.push(data)

        if (dataBuffer[0]["stamp"] + granularity > data["stamp"]) { // If new data surpasses the granularity
            var sum = 0;
            for (var i=0; i<dataBuffer.length; i++) {
                sum += dataBuffer[i];
            }

            push(sum / dataBuffer.length);
        }
    }

    push(data) {
        client.send(data);
    }


}
