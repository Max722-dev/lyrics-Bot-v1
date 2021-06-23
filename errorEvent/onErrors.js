module.exports.onError = async (DiscordMessage, message = String) => {
    DiscordMessage.channel.send("an error occured: ```" + message + "```")
}