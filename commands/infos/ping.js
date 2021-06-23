module.exports = {
	name: "ping",
	aliases: [],
	category: "main",
	utilisation: "{prefix}ping",

	execute(client, message, args) {
        const { channel } = message

        var Ping = {
            color: "GREEN",
            title: 'Ping',
            url: '',
            author: {
                name: `Lyrics Bot`,
                icon_url: '',
                url: '',
            },
            description: `🏓Ping is ${client.ws.ping}ms`,
            thumbnail: {
                url: ``,
            },
            fields: [],
            image: {},
            timestamp: new Date(),
            footer: {},
        }

        channel.send({ embed: Ping })
	}
}