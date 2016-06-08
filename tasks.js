var cron = require('cron');
var aws = require('./services/aws-service');
var gh = require('./services/github-service');
var config = require('./config');

var updateServers = cron.job("*/5 * * * * *", function(){
    aws.updateRunningServers(null);
}); 
updateServers.start();

var updateCommits = cron.job("*/10 * * * * *", function(){
    gh.getCommits(config.deploymentRepo.owner, config.deploymentRepo.repo, null); 
}); 
updateCommits.start();