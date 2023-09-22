module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(
            `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
        )
        client.user.setActivity("testing", { type: "STREAMING", link: "https://www.twitch.tv/twitch" })
    },
}
