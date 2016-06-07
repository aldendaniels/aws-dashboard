var Promise = require('bluebird');
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
exports.getCommits = function(username, repository, next) {

    var repo = client.repo(username+'/'+repository);

    // Promisify this function so that we can pass around promises per
    // our desire to do so, because sweet sweet promises.
    var getCommits = Promise.promisify(repo.commits,{context: repo});

    getCommits().then(function(data){
        console.log(repo);

        // Save each commit to the database
        data.forEach(function(commit){
            db.commits.insert({
                sha: commit.sha,
                commit_author: commit.committer.login,
                avatar_url: commit.committer.avatar_url,
                author_name: commit.commit.committer.name,
                date: commit.commit.committer.date,
                message: commit.commit.message,
                repository: repository,
                owner: username
            }).then(function(data){
                //console.log(data);
            }).catch(function(err){
                console.log(err);
            });
        });

        return data;

    }).catch(function(err) {
        // Next is only not present here if we are calling from Mocha
        if(next){
            return next(err);
        } else {
            console.log(err);
        }
    });

    return getCommits();
};