module.exports = {
    name: "mute",
    aliases: ['muteMember'],
    category: "main",
    utilisation: "{prefix}mute <@member> <reason>",

    async execute(client, message, args) {
        const reason = await args.slice(1).join(" ")
        const member = await message.mentions.members.first()

        if(!message.member.hasPermission("MUTE_MEMBERS")) {
            return message.reply("You do not have permissions to run this command!")
        }

        if (!reason) {
            return message.reply("Please provide a reason!")
        } else if (!member) {
            return message.reply("Please provide a Member!")
        } else if (member.bot) {
            return message.reply("You cannot mute a bot!")
        } else if (member.id === message.guild.owner.id) {
            return message.reply("You cannot mute the owner of the server!")
        } else if (member.id === message.author.id) {
            return message.reply("You cannot mute your self!")
        }

        try {
            const role = message.guild.roles.cache.find(muted => muted.name === "Muted")

            if (!role) {
                return message.reply("There is no muted role in the server! Please contact the Administrators or Moderators.")
            }
            
            message.channel.send(`${client.emotes.success} - ${member.username} has been kicked!`)
            member.roles.add(role)
            const dm = await member.createDM()
            dm.send("You were muted in: " + message.guild.name + " \nBy: " + message.author.username + " \nReason: " + reason)
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
                description: "There was an error while muting the user ```" + error + "```",
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