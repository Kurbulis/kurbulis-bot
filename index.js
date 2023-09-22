const fs = require("fs")
const { Client, GatewayIntentBits } = require("discord.js")
require("dotenv").config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        // GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
})

// Load all commands
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"))
client.commands = new Map()

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    console.log(`Loading ${command.data.name} command...`)

    if(client.commands.get(command.data.name))
        throw new Error("Cannot have two commands with the same name.")

    client.commands.set(command.data.name.toLowerCase(), command)
}

// Load all events
const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    console.log(`Loading ${event.name} event...`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

client.login(process.env.TOKEN)