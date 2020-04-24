$(function () {
    var first = [], second = []

    for (e = 1; e <= 25; e++)
        first.push(e); // first 25 numbers

    for (e = 26; e <= 50; e++)
        second.push(e); // second 25 numbers

    // stop timer and reset the grid
    var reset = function () {
        level = 1,
            first = shuffle(first), // shuffle first 25
            second = shuffle(second), // shuffle second 25
            $("#grid > div").each(function (e) {
                $(this).css({
                    opacity: 1
                }).show().removeClass("second").html('<span class="box" style="z-index:' + (100 - first[e]) + '"></span>' + first[e])
            }),
            clearInterval(l),
            $("#time").text("0.000")
    }

    l = 0;  // global variable for timer

    var game = function (e, tile) {

        if (1 == e) {
            start = new Date;
            // start timer when 1 is tapped
            l = setInterval(function () {
                var now = new Date;
                resultTime = (now - start) / 1e3,
                    $("#time").text(resultTime)
            }, 50); // update every 50ms
        }

        if (e <= 25) {  // show hidden numbers from second set of 25
            tile.animate({
                opacity: 0
            }, 100, function () {
                tile.stop().addClass("second").animate({
                    opacity: 1
                }, 100).html('<span class="box" style="z-index:' + (100 - second[tile.index()]) + '"></span>' + second[tile.index()])
            });
        } else {
            tile.text("").animate({
                opacity: 0  // remove the tile from the grid after tapped
            }, 100);
        }

        e < 50 ? $("#score").text(level) : clear()
    };

    n = new Date;

    // Fired when the user puts one or more fingers on the screen.
    $("#grid > div").on("touchstart", function (e) {
        var t = new Date;
        t - n < 300 ? (e.preventDefault(),
            e.stopImmediatePropagation()) : n = t
    });

    // Fired when the user stops touching the screen
    $("#grid > div").on("tap touchend", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        // when player taps on correct number (level)
        if ($(this).text() == level) {

            game(level, $(this));

            if (level < 50) {
                level++;
            }
        };
    })

    $(".resetBtn").on("click", function () {
        reset()
    })

    clear = function () {
        clearInterval(l);
        redirectResultPage(resultTime);
    };

    location.hash = "";
    reset();
});


function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};