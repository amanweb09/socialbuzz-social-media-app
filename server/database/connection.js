const mongoose = require('mongoose')

module.exports = async function connection() {
    try {
        await mongoose.connect(process.env.LOCAL_DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: false
        })
        console.log('db connected ...');
    } catch (error) {
        console.log(error);
    }
}