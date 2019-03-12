$(document).ready(function() {

// initial buttons which are displayed for user
      var characters = ["Homer Simpson", "Archer", "Minions"];

// function which allows for creation of new buttons and query to giphy/API for gif's
      function displayCharacterInfo() {

// establsihing variable for character
        var character = $(this).attr("data-name");

// query search to giphy
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=wABYUPbOL923Ngb9coOwmarOJ0o6rh4m&limit=10&rating=g";

// for reaching out to giphy/API and retrieving information based on query terms
        $.ajax({
            url: queryURL,
             method: "GET"
        }).then(function(response) {
            console.log(response);

// variable stroring response from giphy/API
            var results = response.data;

// loop used to provide determined amount of gif's (10 per search requirements) and rating for each
            for (var i = 0; i < results.length; i++) {
// assigns new variable to div.character
                var characterDiv = $("<div class='character' id = 'float'>");
// retrieves rating information and tells to display
                var ratingDisplay = $("<p font-weight = 'bold'>").text("Rating: " + results[i].rating);
// provides holder for gif to be displayed
                var characterImage = $('<img>');
// this section provides atttribues for the gif's displayed
                characterImage.attr("src", results[i].images.fixed_height_still.url);
                characterImage.attr("class", "gif");
                characterImage.attr("data-state", "still");
                characterImage.attr("data-animate", results[i].images.fixed_height.url);
                characterImage.attr("data-still", results[i].images.fixed_height_still.url);
// assigns the images and ratings info to each gif
                characterDiv.append(ratingDisplay);
                characterDiv.append(characterImage)
// uploads each gif to the specified location
                $("#container").prepend(characterDiv);
            }
// this function provides for gif to toggle between static and animated when clicked by user
            $(".gif").on("click", function(){
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"))
                    $(this).attr("data-state", "still");
                };
                })
        
        
            });

      }
// this function adds new buttons to the form as entered by user in the input box, then appends them to the form
      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < characters.length; i++) {

          var a = $("<button id = 'styleButtons'>");

          a.addClass("character-btn");

          a.attr("data-name", characters[i]);

          a.text(characters[i]);

          $("#buttons-view").append(a);

        }
      }

// this function captures the input from the user
      $("#add-character").on("click", function(event) {
        event.preventDefault();

        var character = $("#character-input").val().trim();

        characters.push(character);

        renderButtons();
      });

    $(document).on("click", ".character-btn", displayCharacterInfo);

    renderButtons();

})