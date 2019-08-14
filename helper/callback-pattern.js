//Structure of callback
//[command]:[msgid]@[paramter1]@[parameter2]@[parameterN]

const set = (cmd, msgId, parameters) => `${cmd}$${msgId}@${parameters}`

const extract = (input) => {
    var a = input.data.split('$');
    var b = a[1].split('@');
    var parameters = null;
    try {   //check is the parameters format is JSON type.
        parameters = JSON.parse(b[1]);
    } catch (error) {
        parameters = b[1];
    }

    return {
        cmd : a[0],
        msgId: b[0] != 0 ? b[0] : input.message.message_id, // if b[0] msgId is zero is because I am creating a new message and I won't use the same id, so a passa the id from the telegram input.
        parameters: parameters
    }
}

module.exports =  {set, extract};