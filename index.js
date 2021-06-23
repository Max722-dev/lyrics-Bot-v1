/*
 * Discord Bot
*/

// Consts \\

const Discord = require("discord.js")
const Token = "" // You could set your bot token here
const client = new Discord.Client({ disableMentions: "everyone" })
const webServer = require("./webServer")
const fs = require("fs")

const Discord_Player = require("discord-player")

client.player =  new Discord_Player.Player(client)
client.config = require("./Config/bot")
client.emotes = client.config.emojis
client.filters = client.config.filters
client.commands = new Discord.Collection()

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith(".js"))

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`)
        console.log(`Loading command ${file}`)
        client.commands.set(command.name.toLowerCase(), command)
    }
})

const events = fs.readdirSync('./events').filter(file => file.endsWith(".js"))
const player = fs.readdirSync('./player').filter(file => file.endsWith(".js"))

for (const file of events) {
    console.log(`Loading discord.js event ${file}`)
    const event = require(`./events/${file}`)
    client.on(file.split(".")[0], event.bind(null, client))
}

for (const file of player) {
    console.log(`Loading discord-player event ${file}`)
    const player = require(`./player/${file}`)
    client.player.on(file.split(".")[0], player.bind(null, client))
}

webServer()
client.login(Token)