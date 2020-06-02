// const crypto = require('crypto');
// const lengthBytes = 24;

module.exports = {
    server_port : 3001,
    database_url : 'mongodb://localhost:27017/souvenir_shop_db',
    salt : 's0/\/\P4$$w0rD',
    SecretSession: 's0/\/\P4$$w0rD'    //crypto.randomBytes(lengthBytes).toString('hex')
};