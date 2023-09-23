const fs = require("fs")
const { Client, GatewayIntentBits, Collection } = require("discord.js")
const Database = require("./database/Database")
require("dotenv").config()

const db = new Database()
db.connect()

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
const commands = []
client.commands = new Collection()

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    console.log(`Loading command ${file}...`)
    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
}

//load all events
const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    console.log(`Loading event ${file}...`)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands, client, client.commands))
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands, client.commands))
    }
}

client.login(process.env.TOKEN)