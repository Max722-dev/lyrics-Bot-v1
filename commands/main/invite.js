module.exports = {
    name: "invite",
    aliases: ['botInviteLink', 'botInvite'],
    category: 'main',
    utilisation: "{prefix}invite",

    async execute(client, message, args) {
        const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=846745416397619200&permissions=8&scope=bot"
        message.channel.send("Thank you for using Lyrics bot! if you wan't to use in your own server you could use this link: " + inviteLink)
    }
}