/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;
var generateRandomTokenAsync = require('./promisification').generateRandomTokenAsync;
var readFileAndMakeItFunnyAsync = require('./promisification').readFileAndMakeItFunnyAsync;
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var writeFile = Promise.promisify(fs.writeFile);




var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(getGitHubProfileAsync)
    .then((gitHubProfile) => {
      let profile = JSON.stringify(gitHubProfile);
      return writeFile(writeFilePath, profile);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
