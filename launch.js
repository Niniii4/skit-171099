require('ts-node').register({
    compilerOptions:{
        "module": "commonjs",
        "resolveJsonModule": true
    },
    disableWarnings: true,
    fast: true
})
exports.config = require('./protractor.conf.ts').config;