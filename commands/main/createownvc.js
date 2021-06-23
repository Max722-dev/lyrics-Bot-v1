module.exports = {
    name: "createownvc",
    aliases: ['cov', "createvc"],
    category: "main",
    utilisation: "{prefix}createownvc <name> <t/f>",

    async execute(client, message, args) {
        const vcName = args[0]
        const vcLocked = args[1]

        try {
            if (!vcName) {
                const vc = message.guild.channels.create(`${message.author.username} VC`, {
                    type: "voice"
                })
                message.channel.send("Done! created your own VC.")
            } else if (!vcLocked) {
                const vc = message.guild.channels.create(`${vcName}`, {
                    type: "voice"
                })
                message.channel.send("Done! created your own VC.")
            } else if (vcLocked === "t") {
                const vc = message.guild.channels.create(`${vcName}`, {
                    type: "voice",
                    permissionOverwrites: [
                        {
                          id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                          allow: [], //Allow permissions
                          deny: ['VIEW_CHANNEL', 'CONNECT'] //Deny permissions
                        },
                        {
                            id: message.author,
                            allow: ['VIEW_CHANNEL', 'CONNECT'],
                            deny: []
                        }
                     ],
                })
                message.channel.send("Done! created your own VC.")
            } else if (vcLocked === "f") {
                const vc = message.guild.channels.create(`${vcName}`, {
                    type: "voice"
                })
                message.channel.send("Done! created your own VC.")
            }
        } catch (error) {
            console.error(error)
            message.channel.send("There was an error while creating a vc: ```" + error + "```")
        }
    }
}