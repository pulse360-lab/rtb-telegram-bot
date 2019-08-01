var menu = busStopId => {
    return {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "inline_keyboard":  [[{text: 'Cancel', callback_data: `/searchByStopNumber|${busStopId}`}]]
        }   
    }
};

module.exports = { menu };