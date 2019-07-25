var menu = {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard":  [[{text: 'Cancel', callback_data: '/cancel'}]]
    }
};

module.exports = { menu };