(function() {
  'use strict';

  var app = {
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');

  // Check that localStorage is both supported and available
  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  }

  // Get Commit Data from Github API
  function fetchCommits() {
    var url = 'https://api.github.com/repos/unicodeveloper/resources-i-like/commits';

    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        console.log("Response from Github", response);


        var commitData = {
            'first': {
              message: response[0].commit.message,
              author: response[0].commit.author.name,
              time: response[0].commit.author.date,
              link: response[0].html_url
            },
            'second': {
              message: response[1].commit.message,
              author: response[1].commit.author.name,
              time: response[1].commit.author.date,
              link: response[1].html_url
            },
            'third': {
              message: response[2].commit.message,
              author: response[2].commit.author.name,
              time: response[2].commit.author.date,
              link: response[2].html_url
            },
            'fourth': {
              message: response[3].commit.message,
              author: response[3].commit.author.name,
              time: response[3].commit.author.date,
              link: response[3].html_url
            },
            'fifth': {
              message: response[4].commit.message,
              author: response[4].commit.author.name,
              time: response[4].commit.author.date,
              link: response[4].html_url
            }
        };

        localStorage.setItem('commitData', JSON.stringify(commitData));
     
        container.querySelector('.first').innerHTML = 
        "<h4> Message: " + response[0].commit.message + "</h4>" +
        "<h4> Author: " + response[0].commit.author.name + "</h4>" +
        "<h4> Time committed: " + (new Date(response[0].commit.author.date)).toUTCString() +  "</h4>" +
        "<h4>" + "<a href='" + response[0].html_url + "'>Click me to see more!</a>"  + "</h4>";

        container.querySelector('.second').innerHTML = 
        "<h4> Message: " + response[1].commit.message + "</h4>" +
        "<h4> Author: " + response[1].commit.author.name + "</h4>" +
        "<h4> Time committed: " + (new Date(response[1].commit.author.date)).toUTCString()  +  "</h4>" +
        "<h4>" + "<a href='" + response[1].html_url + "'>Click me to see more!</a>"  + "</h4>";

        container.querySelector('.third').innerHTML = 
        "<h4> Message: " + response[2].commit.message + "</h4>" +
        "<h4> Author: " + response[2].commit.author.name + "</h4>" +
        "<h4> Time committed: " + (new Date(response[2].commit.author.date)).toUTCString()  +  "</h4>" +
        "<h4>" + "<a href='" + response[2].html_url + "'>Click me to see more!</a>"  + "</h4>";

        container.querySelector('.fourth').innerHTML = 
        "<h4> Message: " + response[3].commit.message + "</h4>" +
        "<h4> Author: " + response[3].commit.author.name + "</h4>" +
        "<h4> Time committed: " + (new Date(response[3].commit.author.date)).toUTCString()  +  "</h4>" +
        "<h4>" + "<a href='" + response[3].html_url + "'>Click me to see more!</a>"  + "</h4>";

        container.querySelector('.fifth').innerHTML = 
        "<h4> Message: " + response[4].commit.message + "</h4>" +
        "<h4> Author: " + response[4].commit.author.name + "</h4>" +
        "<h4> Time committed: " + (new Date(response[4].commit.author.date)).toUTCString() +  "</h4>" +
        "<h4>" + "<a href='" + response[4].html_url + "'>Click me to see more!</a>"  + "</h4>";

        app.spinner.setAttribute('hidden', true); //hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Get the commits Data from the Web Storage
  function fetchCommitsFromLocalStorage(data) {
    var localData = JSON.parse(data);

    app.spinner.setAttribute('hidden', true); //hide spinner

    container.querySelector('.first').innerHTML = 
    "<h4> Message: " + localData.first.message + "</h4>" +
    "<h4> Author: " + localData.first.author + "</h4>" +
    "<h4> Time committed: " + (new Date(localData.first.time)).toUTCString() +  "</h4>" +
    "<h4>" + "<a href='" + localData.first.link + "'>Click me to see more!</a>"  + "</h4>";

    container.querySelector('.second').innerHTML = 
    "<h4> Message: " + localData.second.message + "</h4>" +
    "<h4> Author: " + localData.second.author + "</h4>" +
    "<h4> Time committed: " + (new Date(localData.second.time)).toUTCString() +  "</h4>" +
    "<h4>" + "<a href='" + localData.second.link + "'>Click me to see more!</a>"  + "</h4>";

    container.querySelector('.third').innerHTML = 
    "<h4> Message: " + localData.third.message + "</h4>" +
    "<h4> Author: " + localData.third.author + "</h4>" +
    "<h4> Time committed: " + (new Date(localData.third.time)).toUTCString() +  "</h4>" +
    "<h4>" + "<a href='" + localData.third.link + "'>Click me to see more!</a>"  + "</h4>";

    container.querySelector('.fourth').innerHTML = 
    "<h4> Message: " + localData.fourth.message + "</h4>" +
    "<h4> Author: " + localData.fourth.author + "</h4>" +
    "<h4> Time committed: " + (new Date(localData.fourth.time)).toUTCString() +  "</h4>" +
    "<h4>" + "<a href='" + localData.fourth.link + "'>Click me to see more!</a>"  + "</h4>";

    container.querySelector('.fifth').innerHTML = 
    "<h4> Message: " + localData.fifth.message + "</h4>" +
    "<h4> Author: " + localData.fifth.author + "</h4>" +
    "<h4> Time committed: " + (new Date(localData.fifth.time)).toUTCString() +  "</h4>" +
    "<h4>" + "<a href='" + localData.fifth.link + "'>Click me to see more!</a>"  + "</h4>";
  };

  if (storageAvailable('localStorage')) {
    if (localStorage.getItem('commitData') === null) {
      /* The user is using the app for the first time, or the user has not
       * saved any commit data, so show the user some fake data.
       */
      fetchCommits();
      console.log("Fetch from API");
    } else {
      fetchCommitsFromLocalStorage(localStorage.getItem('commitData'));
      console.log("Fetch from Local Storage");
    }   
  }
  else {
    toast('We cant cache your app data yet..');
  }
})();