function info_box_displayer(blurb, xoff, yoff) {
  // Tooltip only Text
  $(blurb)
    .hover(
      function () {
        // Hover over code
        var title = $(this).attr("title");
        $(this).data("tipText", title).removeAttr("title");
        $('<p class="tooltip"></p>')
          .text(title)
          .appendTo("body")
          .fadeIn("slow");
      },
      function () {
        // Hover out code
        $(this).attr("title", $(this).data("tipText"));
        $(".tooltip").remove();
      },
    )
    .mousemove(function (e) {
      var mousex = e.pageX + xoff; //Get X coordinates
      var mousey = e.pageY + yoff; //Get Y coordinates
      $(".tooltip").css({ top: mousey, left: mousex });
    });
}
