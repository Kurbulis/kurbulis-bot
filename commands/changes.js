const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require("@discordjs/builders")
const Table = require("easy-table")
const changes = require("../util/izmainas")
const userSettings = require("../database/schemas/UserSettings")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("changes")
        .setDescription("Uzzināt izmaiņas.")
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("today")
                .setDescription("Uzzināt šodienas izmaiņas.")
                .addStringOption((term) => term
                    .setName("grupa")
                    .setDescription("Kuras grupas izmaiņas vēlies uzzināt."))
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("tomorrow")
                .setDescription("Uzzināt rītdienas izmaiņas.")
                .addStringOption((term) => term
                    .setName("grupa")
                    .setDescription("Kuras grupas izmaiņas vēlies uzzināt."))
        ),
    async execute(interaction) {
        interaction.deferReply()
        .then(async () => {

            const settings = await userSettings.findOne({ user_id: interaction.user.id})

            const getGroup = () => {
                if(interaction.options.getString('grupa')) return interaction.options.getString('grupa') 
                if(!settings) return "DT1-2"
                return settings.group
            }

            const data = await changes.get(getGroup().toUpperCase())

            const embedGen = (input) => {

                if(!input[0]) return {
                    color: 0x191919,
                    title: "Izmaiņu nav!"
                }

                var embed = {
                    color: 0x191919,
                    title: input[0].day,
                    fields: []
                }

                input.forEach((a) => {
                    embed.fields.push({ 
                        name: `${a.pair}. pāris`, 
                        value: `${a.lesson} (${a.classroom} kabinets)`, 
                        inline: false
                    })
                })
                return embed
            }

            switch(interaction.options.getSubcommand()) {
                case("today"):
                    interaction.editReply({
                        content: `Izmaiņas ${getGroup()} grupai:`,
                        embeds: [embedGen(data.today)]
                    })
                    break
                case("tomorrow"):
                    interaction.editReply({
                        content: `Izmaiņas ${getGroup()} grupai:`,
                        embeds: [embedGen(data.tomorrow)]
                    })
                    break
            }
        })
    }
}


// const codeblockTableTime = async (input) => {
//     var t = new Table

//     input.forEach(function(thing) {
//         t.cell('Pāris', thing.pair)
//         t.cell('Stunda', thing.lesson)
//         t.cell('Kabinets', thing.classroom)
//         t.newRow()
//     })

//     return `\`\`\`${t.toString()}\`\`\``
// }