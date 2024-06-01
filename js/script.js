let hoursBlocks = [];
let hoursBlock24hour = [];
let bodyEl = $(".container");

for (i = 9; i < 18; i++) {
    hoursBlocks.push(moment(i + ":00", "h:mm").format("hhA"));
    hoursBlock24hour.push(moment(i + ":00", "h:mm").format("H"));
}

for (var i = 0; i < hoursBlocks.length; i++) {
    bodyEl.append(
        '<section id =" ' +
            hoursBlock24hour[i] +
            ' "class="row time-block"><div class="hour">' +
            hoursBlocks[i] +
            '</div><textarea class="description"></textarea><button class="saveBtn"><img src="./assets/SaveIcon.png" alt="Save"></button></section>'
    );
}

$(".description").each(function () {
    var currentTime = moment().hour();
    var blockTime = parseInt($(this).parent().attr("id"));
    if (blockTime < currentTime) {
        $(this).addClass("past");
    } else if (blockTime === currentTime) {
        $(this).addClass("present");
    } else {
        $(this).addClass("future");
    }
});

$(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var hourBlock = $(this).siblings(".hour").text();
    localStorage.setItem(hourBlock, text);
});

$(".hour").each(function () {
    var hourBlock = $(this).text();
    var localKey = localStorage.getItem(hourBlock);
    $(this).siblings(".description").val(localKey);
});
