

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
            
            var characterDiv = $("<div class='character'>");

            // Storing the rating data
            var rating = response.Rated;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            characterDiv.append(pOne);

                                            //   // Retrieving the URL for the image
                                            //   var imgURL = response.Poster;

                                            //   // Creating an element to hold the image
                                            //   var image = $("<img>").attr("src", imgURL);

                                            //   // Appending the image
                                            //   characterDiv.append(image);

            // Putting the entire movie above the previous movies
            $("#buttons-view").prepend(characterDiv);
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

      $('#add-character').on("click", function(event) {
        event.preventDefault();

        var character = $("#character-input").val().trim();

        characters.push(character);

        renderButtons();
      });

      $(document).on("click", ".character-btn", displayCharacterInfo);

      renderButtons();
