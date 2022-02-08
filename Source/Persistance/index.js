const mongoose = require('./mongooseAdapter');
const appInsight = require('./applicationInsightAdapter');
const elasticApm = require('./elasticApmAdapter');

module.exports = {
    mongoose,
    appInsight,
    elasticApm,
};
