var _isMute = true;
var _context = null;
var _img = new Image();
var _score = 0;
var _scores = [
    3, 1, 2,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3,
    1, 2, 3
];

$(function () {
    var canvas = document.getElementById("image_panel");
    if (!canvas || !canvas.getContext) { return false; }
    _context = canvas.getContext("2d");
    _img = new Image();
    _img.src = "Content/Images/images.gif";
    _img.onload = function () {
        setBackgroundImage(0, 500);
    }
    canvas.width = 600;
    canvas.height = 500;
    events();
});

function setPanel01() {
    $(".p00").hide();
    $(".p01").show();
    setBackgroundImage(600, 0);
    $(this).unbind("hover");
}

function events() {
    // -------------------------------------------------------
    // game_play_button
    $("#game_play_button").click(function () {
        $(this).off();
        playSound("click_sound");
        setPanel01();
    });
    $("#game_play_button").hover(function () {
        playSound("hover_sound");
        var y = (_isMute) ? 1500 : 1000;
        setBackgroundImage(0, y);
    }, function () {
        var y = (_isMute) ? 500 : 0;
        setBackgroundImage(0, y);
    });

    // -------------------------------------------------------
    // sound_stop_button
    $("#sound_stop_button").click(function () {
        (!_isMute) ? pauseBgm() : playBgm();
        playSound("click_sound");
    });
    $("#sound_stop_button").hover(function () {
        playSound("hover_sound");
        setBackgroundImage(0, 500);
    }, function () {
        var y = (_isMute) ? 500 : 0;
        setBackgroundImage(0, y);
    });

    setQuizPanelEvents();
}

function setNextPanel(dom) {
    var current = Number($(dom).data("panelNo"));
    var next = current + 1;
    alert("ok");
    $(".p0" + current).hide();
    $(".p0" + next).show();
    setBackgroundImage(600 * next, 0);
    $(this).unbind("hover");
}

function setQuizPanelEvents() {
    var xPositions = [600, 1200, 1800, 2400, 3000];
    var yPositions = [500, 1000, 1500];
    for (var quizNo = 0; quizNo < 5; quizNo++) {
        ["a", "b", "c"].forEach(function (val, index) {
            var id = String.Format("#q0{0}_{1}", quizNo + 1, val);
            var x = xPositions[quizNo];
            var y = yPositions[index];
            $(id).click(function () {
                var ansNo = $(this).data("ansNo");
                _score += _scores[ansNo];
                playSound("click_sound");
                $(this).off();
                setNextPanel(this);
            });
            $(id).hover(function () {
                playSound("hover_sound");
                setBackgroundImage(x, y);
            }, function () {
                setBackgroundImage(x, 0);
            });
        });
    }
}

/* ---------------------------------------------------
 * 共通部分
 */
function playSound(id) {
    if (!_isMute) {
        document.getElementById(id).currentTime = 0;
        document.getElementById(id).play();
    }
}
function pauseBgm() {
    document.getElementById("main_bgm").pause();
    _isMute = true;
}

function playBgm() {
    document.getElementById("main_bgm").play();
    _isMute = false;
}

function setBackgroundImage(x, y) {
    _context.drawImage(_img, x, y, 600, 500, 0, 0, 600, 500);
}

String.Format = function () {
    if (typeof (arguments[0]) == "string") {
        for (var i = 0; i < arguments.length; i++) {
            arguments[0] = arguments[0].replace("{" + i + "}", arguments[i + 1]);
        }
    } return arguments[0];
};