var config = require('../config.js');
var db = require('../db').db;
var github = require('octonode');
var client = github.client({
  username: config.github.username,
  password: config.github.password
});

/**
 * Get the list of git commits for a repo
 *
 * @method     getCommits
 * @param      {username}  Github Username
 * @return     {Object} Repositories
 */
exports.getCommits = function(username, repo, next) {

    var repo = client.repo(username+'/'+repo);

    repo.commits(function(err,data){
        if(err){
            return next(err);
        }

        data.forEach(function(commit){
            console.log(commit.sha);
            console.log(commit.committer.login);
            console.log(commit.committer.avatar_url);
            console.log(commit.commit.committer.name);
            console.log(commit.commit.committer.date);
            console.log(commit.commit.message);
        });
    });
};