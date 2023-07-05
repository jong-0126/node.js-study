const schedule = require('node-schedule');

const date = new Date(2017, 11, 16, 19, 27, 0)

console.log(date);

const j = schedule.scheduleJob(date, () => {
    console.log('no pain, no gain');
});

const rule = new schedule.RecurrenceRule();
rule.minute = 32;

const k = schedule.scheduleJob(rule, () => {
    console.log('Laziness is nothing more than the habit of resting before you get tired');
});

