const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// Handshake


const Influx = require('influx');

// Initializes a new database with the timestamp as the name
let dbName = new Date
dbName.toISOString();
console.log(dbName);
//Influx.createDatabase(dbName);

const influx = new Influx.InfluxDB({
 host: 'localhost',
 database: 'BajaSampleData',
})

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

/*
Input :
{
  mac: '',
  data: '',
  stamp: '',
}
*/
server.on('message', (msg, rinfo) => {
  let data = JSON.parse(String.fromCharCode(...(JSON.parse(JSON.stringify(msg))).data));
  console.log(data);
  influx.writePoints([
    {
      measurement: 'testMeasurement',
      fields: {[data.mac]: data.data},
      timestamp: data.stamp
    }
  ], {
    precision: 'ms'
  })
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);