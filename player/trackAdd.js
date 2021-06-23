module.exports = (client, message, queue, track) => {
    var Embed = {
        embed: {
            color: 'GREEN',
            author: { name: 'Queue' },
            footer: { text: 'Portal Bot' },
            fields: [
                { name: 'Bot', value: infos },
                { name: 'Music', value: music },
                { name: 'Filters', value: client.filters.map((x) => '`' + x + '`').join(', ') },
            ],
            timestamp: new Date(),
            description: `${client.emotes.music} - ${track.title} has been added to the queue!`,
        },
    }

    message.channel.send({ embed: Embed });
};