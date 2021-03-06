var topics = ["Alaska Thunderfuck", "Jujubee", "Shangela", "Willam Belli", "Alyssa Edwards", "Bob the Drag Queen", "Manila Luzon", "Raja"];
// var ratingParam = ["g", "pg"]
// var limit;
// var key = "7PbXKNpRWtxRy8fbeuE7lnnXgotvBvF5"; 

var createButtons = function () {
  // need to empty, buttons repeat when you add buttons
  $("#buttonsDiv").empty();

  for (var j = 0; j < topics.length; j++) {
    var gifButton = $("<button>");
    gifButton.addClass("gif-btn");
    gifButton.attr("data-target", topics[j])
    gifButton.text(topics[j]);
    $("#buttonsDiv").append(gifButton);
  }
}

createButtons();

//new button is added but gifs are not generated when button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // var gif holds value of input
  var gif = $("#gif-input").val().trim();
  // pushes in to array that holds search topics - and what is looped over to create buttons
  topics.push(gif);
  // debugger;

  // call create buttons again to make new button as items are pushed into array
  createButtons();
  $("#gif-input").val("");
});

//as soon as I add a new button it breaks the ajax call

// $(".gif-btn").on("click", function () {
 $(document).on("click", ".gif-btn", function () {
  var queen = $(this).attr("data-target");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    queen + "&api_key=7PbXKNpRWtxRy8fbeuE7lnnXgotvBvF5&limit=10&rating=pg";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;
      console.log(results);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var gifRating = $("<p>").text("Rating: " + rating);

        var title = results[i].title;

        var gifTitle = $("<p>").text("Title: " + title);
        

        //asigns image to queen gif and assigns data attributes, src attribute, along with class
        var queenGif = $("<img>");
        queenGif.attr("src", results[i].images.fixed_height_still.url);
        queenGif.attr("data-still", results[i].images.fixed_height_still.url);
        queenGif.attr("data-animate", results[i].images.fixed_height.url);
        queenGif.attr("data-state", "still");
        queenGif.addClass("gif");

        gifDiv.prepend(gifRating);
        gifDiv.prepend(gifTitle)
        gifDiv.prepend(queenGif);

        $("#gifs-here").prepend(gifDiv);
      }
    });
});

//worked through pausing gifs exercise with my tutor then used code to play/pause gifs in my code.
//uses on click event to target data attributes assigned in ajax call to switch still and animated gifs
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");
  if(state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})
 