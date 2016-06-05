var cron = require('cron');
var aws = require('./services/aws-service');
var cronJob = cron.job("*/2 * * * * *", function(){
    aws.updateRunningServers(null);
}); 
cronJob.start();