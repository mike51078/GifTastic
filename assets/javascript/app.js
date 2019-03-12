$(document).ready(function() {

      var characters = ["Homer Simpson", "Archer", "Minions"];

      function displayCharacterInfo() {

        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=wABYUPbOL923Ngb9coOwmarOJ0o6rh4m&limit=10&rating=g";

        $.ajax({
            url: queryURL,
             method: "GET"
        }).then(function(response) {
            console.log(response);

            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {

                var characterDiv = $("<div class='character' id = 'float'>");

                var ratingDisplay = $("<p font-weight = 'bold'>").text("Rating: " + results[i].rating);

                var characterImage = $('<img>');

                characterImage.attr("src", results[i].images.fixed_height_still.url);
                characterImage.attr("class", "gif");
                characterImage.attr("data-state", "still");
                characterImage.attr("data-animate", results[i].images.fixed_height.url);
                characterImage.attr("data-still", results[i].images.fixed_height_still.url);

                characterDiv.append(ratingDisplay);
                characterDiv.append(characterImage)

                $("#container").prepend(characterDiv);
            }

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

      $("#add-character").on("click", function(event) {
        event.preventDefault();

        var character = $("#character-input").val().trim();

        characters.push(character);

        renderButtons();
      });

    $(document).on("click", ".character-btn", displayCharacterInfo);

    renderButtons();

})