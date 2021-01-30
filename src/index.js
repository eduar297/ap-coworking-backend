const seed = require('./service/seed');

require('dotenv').config();
// require('./database');

const ioCtr = require('./socketio'),
    { server } = require('./app'),
    port = process.env.PORT || '5000';

async function main() {
    ioCtr.connectedUserHandler()

    await server.listen(port);
    console.log(">> Backend Server On Port:", port);
}

// seed()

main();