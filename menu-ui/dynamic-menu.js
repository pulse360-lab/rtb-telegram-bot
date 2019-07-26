var menu = buttoms => ({
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard": [buttoms]
    }
});

module.exports = { menu };