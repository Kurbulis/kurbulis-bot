module.exports = {
    data: {
        name: "ping",
        description: "Get ponged"
    },
    async run(msg) {
        msg.reply("pong!")
    },
}