const sendMessageMainMenu = async (bot, input, result) => {
    let msg = `You are in ${result.address.country}\n`;
    msg += `Your current location is: ${result.display_name}. There are services available ${require('../emoji.js').party.three}\n`;
    msg += "Choose an option:\n";

    await bot.sendMessage(input.chat.id, msg, 
                                require('../menu-ui/main-menu-ui')
                                    .menu(0, JSON.stringify({ typeText : true })));
}

const editMessageMainMenu = async (bot, input, obj) => {
    let msg = "Choose an option:\n";

    await bot.editMessageText(msg, {
        chat_id: input.message.chat.id,
        message_id: obj.msgId,
        reply_markup: require('../menu-ui/main-menu-ui').menu(obj.msgId, JSON.stringify({ typeText : true })).reply_markup
    });
}

module.exports = {
    sendMessageMainMenu,
    editMessageMainMenu
}