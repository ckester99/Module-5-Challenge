$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    initTimeBlocks();

    function initTimeBlocks() {
        var timeBlocks = $(".time-block");
        for (var i = 0; i < timeBlocks.length; i++) {
            $(timeBlocks[i]).children("button").click(saveTodo);
            var textContent = localStorage.getItem($(timeBlocks[i]).attr("id"));
            if (textContent != null) {
                $(timeBlocks[i]).children("textarea").text(textContent);
            }
        }
    }

    function saveTodo(event) {
        var btnClicked = $(event.target);
        var todo = btnClicked.parent().children("textarea").val();
        console.log(todo);
        localStorage.setItem(btnClicked.parent().attr("id"), todo);
    }

    function applyTimeStyles() {
        var hour = dayjs().hour();
        var timeBlocks = $(".time-block");

        for (var i = 0; i < timeBlocks.length; i++) {
            tb = $(timeBlocks[i]);
            var id = tb.attr("id");
            var tbHr = tb.attr("hour");

            if (hour > tbHr) {
                tb.addClass("past");
            } else if (hour == tbHr) {
                tb.addClass("present");
            } else {
                tb.addClass("future");
            }
        }
    }

    setInterval(function () {
        applyTimeStyles();
    }, 1000);

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
});
