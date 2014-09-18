// https://publiccodes.github.io/inrc/Quiz/

var _isMute = false;

$(function () {

    $("#play_button").hover(function () {
        var bgPosition = (_isMute) ? "0px -1500px" : "0px 0px";
        $("#q01_img").css("background-position", bgPosition);
    }, function () {
        var bgPosition = (_isMute) ? "0px -1000px" : "0px 0px";
        $("#q01_img").css("background-position", bgPosition);
    });

    $("#mute_button").hover(function () {
        $("#q01_img").css("background-position", "0px -1000px");
    }, function () {
        var bgPosition = (_isMute) ? "0px -1000px" : "0px 0px";
        $("#q01_img").css("background-position", bgPosition);
    });

    $("#play_button").click(function () {
        playSound("click_sound");
        return false;
    });
    $("#play_button").mouseover(function () {
        playSound("hover_sound");
        return false;
    });

    $("#mute_button").click(function () {
        if (!_isMute) {
            pauseBgm();
        } else {
            playBgm();
        }
        playSound("click_sound");
        return false;
    });
    $("#mute_button").mouseover(function () {
        playSound("hover_sound");
        return false;
    });
});
/* ---------------------------------------------------
 * q01
 */
function setQ01() {

}
/* ---------------------------------------------------
 * 共通部分
 */
function playSound(id) {
    if (!_isMute) {
        document.getElementById(id).load();
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