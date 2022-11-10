$(function () {
    initTimeBlocks();

    var saveNotification = $("#savedNotification");

    /*///////////////FUNCTION DEFINITIONS//////////////////////////////*/

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
        saveNotification.html("Apointment Saved to <span class ='text-danger'>localStorage ✔️</span>");
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

    function displayCurrentDay() {
        var p = $("#currentDay");
        var now = dayjs();

        var suffix = "th";
        var curDate = now.date();
        if (curDate === 1) {
            suffix = "st";
        } else if (curDate === 2) {
            suffix = "nd";
        } else if (curDate === 3) {
            suffix = "rd";
        }

        p.text(now.format("dddd, MMMM D") + suffix);
    }

    setInterval(function () {
        applyTimeStyles();
        displayCurrentDay();
    }, 1000);
});
