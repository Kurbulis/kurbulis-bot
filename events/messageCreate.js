module.exports = {
    name: "messageCreate",
    once: false,
    async execute(msg, client) {
        if(msg.author.bot) return

        if(!msg.content.startsWith(process.env.PREFIX)) return

        msg.args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);

        const command = client.commands.get(msg.args.shift().toLowerCase())

        if(!command)
            return msg.reply("Not a valid command!")

        try {
            await command.run(msg, client)
        } catch(err) {
            console.log(err)
        }
    },
}
