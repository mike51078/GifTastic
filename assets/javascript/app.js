

      var characters = ["Homer Simpson", "Archer", "Minions"];

      function displayCharacterInfo() {

        var character = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=wABYUPbOL923Ngb9coOwmarOJ0o6rh4m&limit=10";

        $.ajax({
            url: queryURL,
             method: "GET"
        }).then(function(response) {
            console.log(response);

            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {

                var characterDiv = $("<div class='character'>");

                var ratingDisplay = $("<p>").text("Rating: " + results[i].rating);

                var characterImage = $('<img id = "ciShowing>"></img>');

                characterImage.attr("src", results[i].images.fixed_height_still.url);

                $("#ciShowing").on("click", 
                    characterImage.attr("src", results[i].images.fixed_height.url)
                );

                characterDiv.append(ratingDisplay);
                characterDiv.append(characterImage)

                $("#buttons-view").append(characterDiv);
            
            }
        });

      }

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < characters.length; i++) {

          var a = $("<button>");

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
