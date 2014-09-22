String.Format = function () {
    if (typeof (arguments[0]) == "string") {
        for (var i = 0; i < arguments.length; i++) {
            arguments[0] = arguments[0].replace("{" + i + "}", arguments[i + 1]);
        }
    } return arguments[0];
};