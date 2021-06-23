module.exports = {
    name: "ban",
    aliases: ['banMember'],
    category: "main",
    utilisation: "{prefix}ban <@member> <reason>",

    async execute(client, message, args) {
        const reason = await args.slice(1).join(" ")
        const member = await message.mentions.members.first()

        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("You do not have permissions to run this command!")
        }

        if (!reason) {
            return message.reply("Please provide a reason!")
        } else if (!member) {
            return message.reply("Please provide a Member!")
        } else if (member.bot) {
            return message.reply("You cannot ban a bot!")
        } else if (member.id === message.guild.owner.id) {
            return message.reply("You cannot ban the owner of the server!")
        } else if (member.id === message.author.id) {
            return message.reply("You cannot ban your self!")
        }

        try {
            member.ban({ reason: reason })
            message.channel.send(`${client.emotes.success} - ${member.username} has been banned!`)
            const dm = await member.createDM()
            dm.send("You were banned from: " + message.guild.name + " \nBy: " + message.author.username + " \nReason: " + reason)
        } catch (error) {
            var errorEmbed = {
                color: "RED",
                title: 'Error',
                url: '',
                author: {
                    name: `Lyrics Bot`,
                    icon_url: '',
                    url: '',
                },
                description: "There was an error while banning the user ```" + error + "```",
                thumbnail: {
                    url: ``,
                },
                fields: [],
                image: {},
                timestamp: new Date(),
                footer: {},
            }
            console.error(error)
            message.channel.send({ embed: errorEmbed })
        }
    }
}