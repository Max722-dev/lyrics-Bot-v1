module.exports = {
	name: "ticket",
	aliases: ["openticket"],
	category: "main",
	utilisation: "{prefix}ticket",

	async execute(client, message, args) {
			const channel = await message.guild.channels.create(`ticket-${message.author.id}`);

			channel.updateOverwrite(message.guild.id, {
				SEND_MESSAGES: false,
				VIEW_CHANNEL: false,
			});
			channel.updateOverwrite(message.author, {
				SEND_MESSAGES: true,
				VIEW_CHANNEL: true,
			});

			var ticketMessage = {
				color: "GREY",
                title: 'Tickets v1 { BETA }',
                url: '',
                author: {
                    name: `Hax Bot v3`,
                    icon_url: '',
                    url: '',
                },
                description: `Thank you for contacting support! the support team will be here as soon as possible.`,
                thumbnail: {
                    url: ``,
                },
                fields: [],
                image: {},
                timestamp: new Date(),
                footer: {},
			}

			const reactionMessage = await channel.send({ embed: ticketMessage });

			try {
				await reactionMessage.react("🔒");
				await reactionMessage.react("⛔");

				const collector = reactionMessage.createReactionCollector(
					(reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
					{ dispose: true }
				);

				collector.on("collect", (reaction, user) => {
					switch (reaction.emoji.name) {
						case "🔒":
							channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
							channel.send("Channel locked successfully! 🔒")
							break;
						case "⛔":
							channel.send("Deleting this channel in 5 seconds! ⛔");
							setTimeout(() => channel.delete(), 5000);
							break;
					}
				});

				message.channel
					.send(`We will be right with you! ${channel}`)
					.then((msg) => {
						setTimeout(() => msg.delete(), 7000);
						setTimeout(() => message.delete(), 3000);
					})
					.catch((err) => {
						throw err;
					});

			} catch (err) {
				channel.send("Error sending emojis!");
				throw err;
			}
		},
	}