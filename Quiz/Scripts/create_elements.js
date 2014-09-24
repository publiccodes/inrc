function createAudioElements() {
    [{
        id: "main_bgm",
        isLoop: true,
        src: getMainBgmString()
    },
    {
        id: "click_sound",
        isLoop: false,
        src: getClickSoundString()
    },
    {
        id: "hover_sound",
        isLoop: false,
        src: getHoverSoundString()
    },
    {
        id: "result_sound",
        isLoop: false,
        src: getResultSoundString()
    },
    {
        id: "result_bgm",
        isLoop: true,
        src: getResultBgmString()
    }
    ].forEach(function (element, index) {
        var audio = $("<audio preload='auto'></audio>");
        audio.attr("id", element.id);
        if (element.isLoop) {
            audio.attr("loop", "loop");
        }
        var source = $("<source type='audio/mp3'>");
        source.attr("src", element.src);
        audio.append(source);
        $("#quiz_wrap").append(audio);
    });
}

function createQuizPanelElements() {
    var quizPanelsWrap = $("<div id='quiz_panels_wrap'></div>")
    var html = "<canvas id='image_panel'></canvas>";

    html += "<div id='loading'><span>loading...</span>";
    html += "<div id='progress_bar_wrap'><div id='progress_bar'></div></div>";
    html += "</div>";

    html += "<div id='game_play_button' class='button p00'></div>";
    html += "<div id='sound_stop_button' class='button p00'></div>";

    html += "<div id='q01_a' class='button p01 q_a'></div>";
    html += "<div id='q01_b' class='button p01 q_b'></div>";
    html += "<div id='q01_c' class='button p01 q_c'></div>";

    html += "<div id='q02_a' class='button p02 q_a'></div>";
    html += "<div id='q02_b' class='button p02 q_b'></div>";
    html += "<div id='q02_c' class='button p02 q_c'></div>";

    html += "<div id='q03_a' class='button p03 q_a'></div>";
    html += "<div id='q03_b' class='button p03 q_b'></div>";
    html += "<div id='q03_c' class='button p03 q_c'></div>";

    html += "<div id='q04_a' class='button p04 q_a'></div>";
    html += "<div id='q04_b' class='button p04 q_b'></div>";
    html += "<div id='q04_c' class='button p04 q_c'></div>";

    html += "<div id='q05_a' class='button p05 q_a'></div>";
    html += "<div id='q05_b' class='button p05 q_b'></div>";
    html += "<div id='q05_c' class='button p05 q_c'></div>";

    html += "<a href='#' target='_blank' id='facebook_button' class='button  result_panel_button'></a>";
    html += "<a href='#' target='_blank' id='tweet_button' class='button result_panel_button'></a>";
    html += "<div id='again_button' class='button result_panel_button'></div>";
    html += "<a href='#' target='_blank' id='recommended_link_01' class='recommended_link'></a>";
    html += "<a href='#' target='_blank' id='recommended_link_02' class='recommended_link'></a>";
    html += "<a href='#' target='_blank' id='recommended_link_03' class='recommended_link'></a>";

    html += String.Format("<div id='mask' style='background-image: url(\"{0}\"); background-position: 0 500px;'></div>", _settings.quizImages[6]);

    quizPanelsWrap.append(html);
    $("#quiz_wrap").append(quizPanelsWrap);
}