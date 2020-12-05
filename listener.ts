module.exports = class Listener {
    live: boolean;
    client: any;
    sensors = [];
    dataBuffer = [];
    granularity: number;
    packetSize: number;

    // Probably do ms
    constructor(client, live: boolean, sensors, granularity) {
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
        console.log(data);
        this.dataBuffer.push(data)

        if (this.dataBuffer[0]["stamp"] + this.granularity > data["stamp"]) { // If new data surpasses the granularity
            var sum = 0;
            for (var i=0; i<this.dataBuffer.length; i++) {
                sum += this.dataBuffer[i];
            }

            //this.push(sum / this.dataBuffer.length);

        }

        this.push(JSON.stringify(data));
    }

    push(data) {
        console.log(data);
        this.client.send(data);
    }


}
