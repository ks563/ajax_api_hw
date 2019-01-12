var topics = ["Alaska", "Jujubee", "Shangela", "Willam Belli", "Alyssa Edwards", "Bob the Drag Queen"];

$("button").on("click", function () {
    var searchObject = $(this).attr("data-target");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      searchObject + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-here").prepend(gifDiv);
          }
        });
});
    
var createButtons = function () {
  for (var j = 0; j < topics.length; j++){
    var gifButton = $("<button>");
    gifButton.addClass("gif-btn");
    gifButton.attr("data-target", topic[i])
    gifButton.text(topic[i]);
    $("#buttonsDiv").append(gifButton);
  }
}
 
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  
}