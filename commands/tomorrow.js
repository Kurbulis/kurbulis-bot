const changes = require("../util/izmainas")
const Table = require("easy-table")

module.exports = {
    data: {
        name: "tomorrow",
        description: "Izmaiņas rītdienai."
    },
    async run(msg) {
        const data = await changes.get("DT1-2")
        
        var t = new Table

        data.today.forEach(function(thing) {
        t.cell('Pāris', thing.pair)
        t.cell('Stunda', thing.lesson)
        t.cell('Kabinets', thing.classroom)
        t.newRow()

        msg.reply(`\`\`\`${t.toString()}\`\`\``)
        })
    }
}