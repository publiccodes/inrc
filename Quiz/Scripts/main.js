var _isMute = true;
var _context = null;
var _img = new Image();
var _score = 0;
var _panelNo = 0;
var _images = new Array();
var _progress = 0;

$(function () {
    createStyles();
    createAudioElements();
    createQuizPanelElements();
    var canvas = document.getElementById("image_panel");
    if (!canvas || !canvas.getContext) { return false; }
    _context = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 500;
    loadQuizImages();
    events();
});

function loadQuizImages() {
    for (var i = 0; i < 10; i++) {
        _images.push(new Image());
        _images[i].src = _settings.quizImages[i];
        _images[i].onload = function () {
            setProgress();
        }
    }
}

function isMobileIOs() {
    var userAgent = navigator.userAgent;
    return (userAgent.search(/iPhone/) != -1 || userAgent.search(/iPad/) != -1 || userAgent.search(/iPod/) != -1);
}

function setProgress() {
    var width = ++_progress;
    $("#progress_bar").css("width", width * 10 + "%");
    if (_progress == 10) {
        var time = 500;
        $("#loading").fadeOut(time);
        setTimeout(function () {
            if (isMobileIOs()) {
                setBackgroundImage(0, 4);
            } else {
                setBackgroundImage(0, 1);
            }
        }, time);
    }
}

function setNextPanel(dom) {
    if (dom != null) {
        $(dom).off();
    }
    var current = _panelNo;
    var next = current + 1;
    $(".p0" + current).hide();
    $(".p0" + next).show();
    var fadeTime = 0;
    if (_panelNo >= 5) {
        fadeTime = 300;
        if (_panelNo == 5) {
            playSound("result_sound");
            stopSound("main_bgm");
        }
    }
    $("#mask").fadeIn(fadeTime, function () {
        setBackgroundImage(next, 0);
        if (_panelNo >= 6) {
            setRecommendedLinks();
        }
        $("#mask").fadeOut(fadeTime, function () {
            _panelNo++;
            if (_panelNo == 6) {
                var time = (_isMute) ? 2000 : 3750;
                setTimeout(function () {
                    playSound("result_bgm");
                    if (40 <= _score) {
                        _panelNo = 6;
                    } else if (20 <= _score && _score < 40) {
                        _panelNo = 7;
                    }
                    else {
                        _panelNo = 8;
                    }
                    setNextPanel(null);
                    $(".result_panel_button").show();
                }, time);
            }
        });
    });
}

function setRecommendedLinks() {
    $(".recommended_link").each(function (i, data) {
        $(this).text(_settings.recommendedLinks[8 - _panelNo][i].title).show();
        $(this).attr("href", _settings.recommendedLinks[8 - _panelNo][i].url);
    });
}

function events() {
    // -------------------------------------------------------
    // game_play_button
    $("#game_play_button").click(function () {
        playSound("click_sound");
        setNextPanel(this);
    });
    $("#game_play_button").hover(function () {
        playSound("hover_sound");
        var y = (_isMute) ? 3 : 2;
        setBackgroundImage(0, y);
    }, function () {
        var y = (_isMute) ? 1 : 0;
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
        setBackgroundImage(0, 1);
    }, function () {
        var y = (_isMute) ? 1 : 0;
        setBackgroundImage(0, y);
    });

    // -------------------------------------------------------
    // setQuizPanel
    setQuizPanelEvents();

    // -------------------------------------------------------
    // setResultPanel
    $("#facebook_button").click(function () {
        var url = encodeURIComponent(_settings.url);
        var href = String.Format("http://www.facebook.com/sharer.php?u={0}", url);
        $(this).attr("href", href);
    });
    $("#facebook_button").hover(function () {
        playSound("hover_sound");
        setBackgroundImage(_panelNo, 1);
    }, function () {
        setBackgroundImage(_panelNo, 0);
    });
    $("#tweet_button").click(function () {
        var url = encodeURIComponent(_settings.url);
        var href = String.Format("http://twitter.com/share?url={0}", url);
        $(this).attr("href", href);
    });
    $("#tweet_button").hover(function () {
        playSound("hover_sound");
        setBackgroundImage(_panelNo, 2);
    }, function () {
        setBackgroundImage(_panelNo, 0);
    });
    $("#again_button").click(function () {
        playSound("click_sound");
        stopSound("result_bgm");
        playSound("main_bgm");
        _score = 0;
        _panelNo = 0;
        $(".result_panel_button").hide();
        $(".recommended_link").hide();
        setQuizPanelEvents();
        setNextPanel(null);
    });
    $("#again_button").hover(function () {
        playSound("hover_sound");
        setBackgroundImage(_panelNo, 3);
    }, function () {
        setBackgroundImage(_panelNo, 0);
    });
}

function setQuizPanelEvents() {
    for (var quizNo = 0; quizNo < 5; quizNo++) {
        ["a", "b", "c"].forEach(function (val, index) {
            var id = String.Format("#q0{0}_{1}", quizNo + 1, val);
            var x = (quizNo + 1);
            var y = (index + 1);
            $(id).off().click(function () {
                _score += getScore(val);
                playSound("click_sound");
                $(this).off();
                setNextPanel(this);
            }).hover(function () {
                playSound("hover_sound");
                setBackgroundImage(x, y);
            }, function () {
                setBackgroundImage(x, 0);
            });
        });
    }
}

function getScore(ansSymbol) {
    switch (ansSymbol) {
        case "a":
            return 10;
        case "b":
            return 5;
        case "c":
            return 1;
        default:
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

function stopSound(id) {
    if (!_isMute) {
        document.getElementById(id).currentTime = 0;
        document.getElementById(id).pause();
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

function setBackgroundImage(column, row) {
    row = row * 500;
    _context.drawImage(_images[column], 0, row, 600, 500, 0, 0, 600, 500);
}

