module.exports = {
	name: "warn",
	aliases: [],
	category: "main",
	utilisation: "{prefix}warn <@user> <reason>",

	async execute(client, message, args) {
            var Colors = {
                Red: 0xff0000,
                Blue: 0x0099ff,
                Green: 0x00FF00
            }

            const { mentions, author, channel, member } = message
            const user = mentions.users.first()

            if(!message.member.hasPermission("KICK_MEMBERS")) {
                return message.channel.send("You should have Kick perms to use this command!")
            }

            if(user.bot) {
                return message.reply("You cannot warn a bot!")
            }

            if (!user) {
                return messages.reply("Please provide a User")
            }

            if(user.id == author.id) {
                return message.reply("You cannot warn your self!")
            } else if(mention.id === message.guild.owner.id) {
                return message.reply("You cannot warn the owner of the server!")
            }

            try {
                const reason = args.slice(1).join(" ")
                const warnings = db.get(`warnings_${user.id}`)
                if(!reason) {
                    return message.reply("Please provide a Reason!")
                }

                if(warnings === 4) {
                    message.channel.send(`${user.username} already reached his/her limit with 4 warnings, ${user.username} is gonna get banned!`)
                    user.ban({ reason: reason })
                    const dm = await user.createDM()
                    dm.send(`You have been banned from: ${message.guild.name} \nBy: ${message.client.user.username} \nReason: limit Reached! 4 Warns`)
                    return 
                }

                if(warnings === null) {
                    db.set(`warnings_${message.guild.id}_${user.id}`, 1)
                    const dm = await user.createDM()
                    dm.send(`You have been warned in **${message.guild.name}** for ${reason}`)
                    await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)//DO NOT FORGET TO USE ASYNC FUNCTION
                } else if(warnings !== null) {
                    db.add(`warnings_${message.guild.id}_${user.id}`, 1)
                    const dm = await user.createDM()
                    dm.send(`You have been warned in **${message.guild.name}** for ${reason}`)
                    await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`) //DO NOT FORGET TO USE ASYNC FUNCTION
                }
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
                    description: "There was an error while warning the user ```" + error + "```",
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