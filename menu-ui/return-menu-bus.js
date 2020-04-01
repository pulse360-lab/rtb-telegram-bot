var menu = (language, busStopId) => {
    return {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "inline_keyboard":  [[{text: language.cancel, callback_data: `/searchByStopNumber|${busStopId}`}]]
        }   
    }
};

module.exports = { menu };