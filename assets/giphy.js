var topics = ["Alaska Thunderfuck", "Jujubee", "Shangela", "Willam Belli", "Alyssa Edwards", "Bob the Drag Queen", "Manila Luzon", "Raja"];
// var ratingParam = ["g", "pg"]
// var limit;
// var key = "N5OKJJ5Kx7gKlaYEZha1x3zZvZli3Wwd"; used key from hw  for now - giphy key should be working now

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
    queen + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

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

        var p = $("<p>").text("Rating: " + rating);

        var queenGif = $("<img>");
        queenGif.attr("src", results[i].images.fixed_height_still.url);
        queenGif.attr("data-still", results[i].images.fixed_height_still.url);
        queenGif.attr("data-animate", results[i].images.fixed_height_still.url);
        queenGif.attr("data-state", "still")

        gifDiv.prepend(p);
        gifDiv.prepend(queenGif);

        $("#gifs-here").prepend(gifDiv);
      }
    });
});

//on click event to start gif
//onclick event to stop gifs

$("#gifs-here").on("click", "img", function () {
  var state = $(this).attr("data-state");
  if(state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
})
  // if ($(this).hasClass('playing')) {
  //   //stop
  //   $(this).removeAttr("src");
  //   $(this).attr("src", results[i].images.fixed_height_still.url);
  //   $(this).removeClass('playing');
  // } else {
  //   //play
  //   $(this).addClass('playing');
  //   $(this).removeAttr('src');
  //   $(this).attr("src", results[i].images.fixed_height.url);
  // }