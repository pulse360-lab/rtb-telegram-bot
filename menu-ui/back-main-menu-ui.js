var menu = msgId => {
    return {
    "parse_mode": "Markdown",
    "reply_markup": {
        "one_time_keyboard": true,
        "inline_keyboard":  [
                            [{text: 'Back to the Main Menu', callback_data: `/backMainMenu|{"param":{"msgId" : ${msgId}}`}]]
    }
};
}

module.exports = { menu };