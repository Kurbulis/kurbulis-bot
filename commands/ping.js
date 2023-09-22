module.exports = {
    data: {
        name: "ping",
        description: "Get ponged"
    },
    async run(msg, client) {
        const m = await msg.channel.send("Ping?");
        const diff = m.createdTimestamp - msg.createdTimestamp
        const ping = client.ws.ping
        m.edit(`Pong! 🏓 (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
    },
}