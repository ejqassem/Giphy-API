var topics = ["Psych", "Scrubs", "Suits", "White Collar", "Hawaii Five O", "Silicon Valley", "The Walking Dead", "Game of Thrones", "Criminal Minds", "Fresh Prince of Bel-air"];
var gifClicked = false;
var counter = 0;
var gifCounter = 0;

for (var i = 0; i < sessionStorage.length; i++) {
  topics.push(sessionStorage.getItem("newButton" + i));
}

for (var i = 0; i < topics.length; i++) {

  var newButton = $("<button>");
  newButton.attr("class", "shows");
  newButton.attr("data-show", topics[i]);
  newButton.html(topics[i]);
  $("#buttonsHere").append(newButton);

}

$("#formButton").on("click", function(event) {
  event.preventDefault();
  var submitInfo = $("#newButtonText").val().trim();
  sessionStorage.setItem("newButton" + counter, submitInfo);
  topics.push(submitInfo);
  var newButton = $("<button>");
  newButton.attr("class", "shows");
  newButton.attr("data-show", submitInfo);
  newButton.html(submitInfo);
  $("#buttonsHere").append(newButton);
  counter++;
});

$(document).on("click", ".shows", function(event) {

  event.preventDefault();
  gifClicked = true;
  if (gifClicked) {
    $("#gifsHere").empty();
  }

  var show = $(this).attr("data-show");
  queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({url: queryURL, method: "GET"}).done(function(response) {
    var results = response.data;
    for (i = 0; i < results.length; i++) {
      var newDiv = $("<div>");
      newDiv.css("display", "inline-block");
      var newImg = $("<img>");
      var p = $("<p>");
      newImg.attr("src", results[i].images.fixed_height_still.url);
      newImg.attr("data-still", results[i].images.fixed_height_still.url);
      newImg.attr("data-animate", results[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newImg.addClass("gifs");
      p.text("Rating: " + results[i].rating);
      p.attr("class", "ratings");
      p.css({"vertical-align": "middle", "text-align":"center"});
      newDiv.append(p);
      newDiv.append(newImg);
      $("#gifsHere").append(newDiv);
    }

  });

});

$(document).on("click", ".gifs", function() {
    console.log($(this).attr("data-state"));
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
