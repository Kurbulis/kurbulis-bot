const mongoose = require("mongoose")

const UserSettingsSchema = new mongoose.Schema({
    user_id: String,
    group: String,
    name: String,
    surname: String,
    sid: String,
})

module.exports = mongoose.model("UserSettings", UserSettingsSchema)