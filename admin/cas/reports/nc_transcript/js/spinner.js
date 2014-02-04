define(["jquery", "/scripts/cas/spin.js"], function ($j, Spinner) {
    /* Add spinner Div */
    if ($j('#spinner').length === 0) {
        $j('body').prepend('<div id="spinner"></div>' +
            '<div id="loading_overlay"></div>');
    }

    var spinSettings = {
        opts: {
            lines: 13, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 10, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        },
        target: document.getElementById('spinner')
    };
    $j('article').css('display', 'none');
    spinSettings.spinner = new Spinner(spinSettings.opts).spin(spinSettings.target);
    $j(document).ajaxStart(function () {
        if (!spinSettings.spinner) {
            spinSettings.spinner.start();
            $j('article').css('display', 'none');
        }
    });
    $j(document).ajaxStop(function () {
        spinSettings.spinner.stop();
        $j('article').css('display', 'block');
    });
    return spinSettings;

});