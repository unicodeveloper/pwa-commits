(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader')
  };

  var container = document.querySelector('.container');

 
  function fetchCommits() {
    var url = 'https://api.github.com/repos/unicodeveloper/resources-i-like/commits';

    fetch(url)
    .then(function(fetchResponse){ 
      return fetchResponse.json();
    })
    .then(function(response) {
        console.log("Response from Github", response);

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
        //If user is offline and sent a request, store it in localStorage
        //Once user comes online, trigger bg sync fetch from application tab to make the failed request
        // localStorage.setItem('request', name);
        // app.spinner.setAttribute('hidden', true); //hide spinner
        console.error(error);
      });
  }

  fetchCommits();
})();