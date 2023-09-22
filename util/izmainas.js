const fetch = require("node-fetch")

module.exports = {
    get: function(group) {
        return new Promise((resolve, reject) => {
            var output = {
                today: [],
                tomorrow: []
            };
    
            fetch("https://izmainas.rtk.lv/schedule/screenData")
                .then(response => response.json())
                .then(data => {
                    const today = data.result.today.filter(entry => entry.group.groupName.includes(group));
                    const tomorrow = data.result.tomorrow.filter(entry => entry.group.groupName.includes(group));
                    if (today.length > 0) output.today = this.combineString(today);
                    if (tomorrow.length > 0) output.tomorrow = this.combineString(tomorrow);
                    
                    resolve(output)
                })
                .catch(err => reject(err))
        });
    },
    dateToDay: function(dateStr) {
        var date = new Date(dateStr);
        return date.toLocaleDateString("lv-LV", { weekday: 'long' });
    },
    combineString: function(day) {
        return day.map(entry => {
            return {
                date: entry.scheduleDate,
                day: this.dateToDay(entry.scheduleDate),
                pair: entry.schedulePairNumber,
                classroom: entry.teacher.cabinet,
                teacher: `${entry.teacher.fName} ${entry.teacher.sName}`,
                lesson: entry.subject.subjectName
            };
        });
    }
}