var menu = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        //"keyboard": [[{
        "inline_keyboard": [[{
        text: "My Localization",
            request_location: true
        }], ["Cancel"]]
    }
};

module.exports = { menu };