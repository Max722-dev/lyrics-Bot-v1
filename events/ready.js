module.exports = async (client) => {
    console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    setInterval(() => {
        client.user.setActivity(client.config.discord.activity + ` | ${client.guilds.cache.size} servers!`);
    }, 5000)
};