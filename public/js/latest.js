(function() {
  'use strict';

  var app = {
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');

  document.getElementById('butRefresh').addEventListener('click', function() {
    // Get fresh, updated data from Github whenever you are clicked
    toast('Fetching latest data...');
    fetchCommits();
    console.log("Getting fresh data!!!");
  });

  var commitContainer = ['.first', '.second', '.third', '.fourth', '.fifth'];
  var posData = ['first', 'second', 'third', 'fourth', 'fifth'];

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

    app.spinner.setAttribute('visible', true); 

    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        console.log("Response from Github", response);

        var commitData = {};

        for (var i = 0; i < posData.length; i++) {
          commitData[posData[i]] = {
            message: response[i].commit.message,
            author: response[i].commit.author.name,
            time: response[i].commit.author.date,
            link: response[i].html_url
          };
        }

        localStorage.setItem('commitData', JSON.stringify(commitData));

        for (var i = 0; i < commitContainer.length; i++) {

          container.querySelector("" + commitContainer[i]).innerHTML = 
          "<h4> Message: " + response[i].commit.message + "</h4>" +
          "<h4> Author: " + response[i].commit.author.name + "</h4>" +
          "<h4> Time committed: " + (new Date(response[i].commit.author.date)).toUTCString() +  "</h4>" +
          "<h4>" + "<a href='" + response[i].html_url + "'>Click me to see more!</a>"  + "</h4>";

        }

        app.spinner.setAttribute('hidden', true); // hide spinner
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Get the commits Data from the Web Storage
  function fetchCommitsFromLocalStorage(data) {
    var localData = JSON.parse(data);

    app.spinner.setAttribute('hidden', true); //hide spinner

    for (var i = 0; i < commitContainer.length; i++) {

      container.querySelector("" + commitContainer[i]).innerHTML = 
      "<h4> Message: " + localData[posData[i]].message + "</h4>" +
      "<h4> Author: " + localData[posData[i]].author + "</h4>" +
      "<h4> Time committed: " + (new Date(localData[posData[i]].time)).toUTCString() +  "</h4>" +
      "<h4>" + "<a href='" + localData[posData[i]].link + "'>Click me to see more!</a>"  + "</h4>";

    }
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
    toast("We can't cache your app data yet..");
  }
})();