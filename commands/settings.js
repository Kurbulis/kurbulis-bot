const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require("@discordjs/builders")
const userSettings = require("../database/schemas/UserSettings")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("settings")
        .setDescription("Mainīt savus iestatījumus")
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName("group")
                .setDescription("Mainīt savu noklusējuma grupu")
                .addStringOption((term) => term
                    .setName("grupa")
                    .setDescription("Grupas nosaukums (ex. DT1-2)")
                    .setRequired(true)
                )
                    
        ),
    async execute(interaction) {
        interaction.deferReply()
            .then(async () => { switch(interaction.options.getSubcommand()) {
                case("group"):
                    const newGroup = interaction.options.getString('grupa').toUpperCase()
                    try {
                        var settings = await userSettings.findOne({ user_id: interaction.user.id }).exec()
                        
                        if(!settings)
                            settings = new userSettings({
                                user_id: interaction.user.id,
                                group: newGroup
                        })
            
                        settings.group = newGroup
            
                        settings.save()
                            .then(() => {
                                console.log(`User ${interaction.user.id} changed group to ${newGroup}`)
                                interaction.editReply({
                                    content: `Tava grupa tika nomainīta uz ${newGroup}`
                                })
                            })
            
                    } catch (err) {
                        if(err) return console.log(err)
                    }
                    break
            }})
    }
}


