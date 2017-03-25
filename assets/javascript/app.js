
$(document).on("click", ".shows", function(event) {
  event.preventDefault();

  var show = $(this).attr("data-show");
  console.log($(this));

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
          show + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({url: queryURL, method:"GET"}).done(function(response) {

    var results = response.data;
          //cycles through the array of the objects returned from the ajax request
        for (var i = 0; i < results.length; i++) {

          var gifDiv = $("<div class='gifs'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img>");

          personImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);

          gifDiv.prepend(personImage);

          $("#gifsHere").prepend(gifDiv);
    }

  });

});

$("#formButton").on("click", function(event) {
  event.preventDefault();

  var button = $("#newButtonText").val().trim();

  var newButton = $("<button>");

  newButton.addClass("shows");

  newButton.attr("data-show", button);

  newButton.html(button);

  console.log(newButton);

  $("#buttonsHere").prepend(newButton);

  $("#newButtonText").val("");

});
