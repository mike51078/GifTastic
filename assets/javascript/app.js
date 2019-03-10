

      var characters = ["Homer Simpson", "Archer", "Minions"];

      function displayCharacterInfo() {

        var character = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          var characterDiv = $("<div class='character'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          movieDiv.append(pOne);

          // Storing the release year
          var released = response.Released;

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          movieDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          movieDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          movieDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#buttons-view").prepend(movieDiv);
        });

      }

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < movies.length; i++) {

          var a = $("<button>");

          a.addClass("character-btn");

          a.attr("data-name", character[i]);

          a.text(character[i]);

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
