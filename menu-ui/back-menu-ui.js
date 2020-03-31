var menu = (language) => {
    return {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard":  [[{text: language.backToTheMenu, callback_data: '/backMainMenu'}]]
        }
    }
};

module.exports = { menu };