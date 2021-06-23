module.exports = {
	name: "purge",
	aliases: [],
	category: "main",
	utilisation: "{prefix}purge <messages Number>",

	async execute(client, message, args) {
        const { member, channel, mentions, reply, react } = message
        const PurgeINT = args[0]

        if (!member.hasPermission("MANAGE_MESSAGES")) {
            return reply("You do not have permission to run this command")
        }

        try {
            const Purge = channel.bulkDelete(PurgeINT)
            channel.send(`${client.emotes.success} - Done! Purged: ${PurgeINT}`)
        } catch (error) {
            console.log(error)
            channel.send("Cannot Purge!")
        }
	}
}