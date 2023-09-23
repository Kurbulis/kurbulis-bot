const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
    async execute(interaction, client) {
        const reply = await interaction.reply({
            content: `Ping?`,
            emphemeral: false,
            fetchReply: true,
        })

        const diff = reply.createdTimestamp - interaction.createdTimestamp
        const ping = client.ws.ping
        // const ping = Math.round(client.ws.ping);
        return interaction.editReply(`Pong! 🏓 (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`)
    }
}