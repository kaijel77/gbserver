let config = module.exports = {};

if(process.env.NODE_ENV === 'development'){
    config = require('./default.dev');
} else if(process.env.NODE_ENV === 'qa'){
    config = require('./default.qa');
} else if(process.env.NODE_ENV === 'beta'){
    config = require('./default.beta');
} else if(process.env.NODE_ENV === 'live'){
    config = require('./default.live');
} else {
    config = require('./default.ohtg')
}

module.exports = config;
