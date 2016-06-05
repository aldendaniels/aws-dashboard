var cron = require('cron');
var aws = require('./services/aws-service');
var cronJob = cron.job("*/2 * * * * *", function(){
    console.log('happenin');
    aws.updateRunningServers(null);
}); 
cronJob.start();