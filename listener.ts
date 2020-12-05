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
        this.granularity = 1000;

        this.packetSize = granularity

        this.dataBuffer = []
    }

    // Get historical data
    query(timeRange, granularity) {



    }

    // For live data only
    addData(data) {
        
        this.dataBuffer.push(data)
        //console.log(data["stamp"] - this.dataBuffer[0]["stamp"], this.granularity );
        if (data["stamp"] - this.dataBuffer[0]["stamp"] > this.granularity) { // If new data surpasses the granularity
            console.log("push")
            var sum = 0;
            for (var i=0; i<this.dataBuffer.length; i++) {
                sum += this.dataBuffer[i]["data"];
            }

            console.log(this.dataBuffer.length)

            this.push(JSON.stringify({data: sum / this.dataBuffer.length}));
            this.dataBuffer = []
        }

        //this.push(JSON.stringify(data));
    }

    push(data) {
        console.log(data);
        this.client.sendUTF(data);
    }


}
