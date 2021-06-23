const express = require("express")

const server = express()

server.all("/", (req, res) => {
	res.send("Bot is Ready/Runnning")
})

function keepAlive() {
	server.listen(3000, () => {
		console.log("server is Ready!")
	})
}

module.exports = keepAlive