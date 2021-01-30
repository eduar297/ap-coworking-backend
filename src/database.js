const mongoose = require('mongoose');

const URI_ATLAS = process.env.MONGODB_ATLAS_URI;
const URI = process.env.MONGODB_URI || 'mongodb://localhost/FyndPro';

async function connect() {
    await mongoose.connect(URI_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(">> Db is Connected");
}

connect();