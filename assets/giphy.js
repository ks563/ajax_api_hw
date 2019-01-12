var topics = ["Alaska", "Jujubee", "Shangela", "Willam Belli", "Alyssa Edwards", "Bob the Drag Queen"];

$("button").on("click", function () {
    var queen = $(this).attr("data-target");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      queen + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var queenGif = $("<img>");
            queenGif.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(queenGif);

            $("#gifs-here").prepend(gifDiv);
          }
      });
});
    
var createButtons = function () {
  // need to empty, buttons repeat when you add buttons
  $("#buttonsDiv").empty();

  for (var j = 0; j < topics.length; j++){
    var gifButton = $("<button>");
    gifButton.addClass("gif-btn");
    gifButton.attr("data-target", topics[j])
    gifButton.text(topics[j]);
    $("#buttonsDiv").append(gifButton);
  }
}
 
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // var gif holds value of input
  var gif = $("#gif-input").val().trim();
  // pushes in to array that holds search topics - and what is looped over to create buttons
  topics.push(gif);

  // call create buttons again to make new button as items are pushed into array
  createButtons();
});

//on click event to start gif
//onclick event to stop gifs

createButtons();