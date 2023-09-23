const mongoose = require("mongoose")

const GuildSettingsSchema = new mongoose.Schema({
    guild_id: String,
    welcome_enabled: Boolean,
    welcome_channel_id: String,
    default_group: String,
})

module.exports = mongoose.model("GuildSettings", GuildSettingsSchema)