const schedule = require('node-schedule');

const j = schedule.scheduleJob('00 30 11 * * 1-5', () => {
    console.log('Cron-style scheduling');
});

const rule = new schedule.RecurrenceRule();
rule.dayOfWeekl = [0, new schedule.Range(0, 6)];
rule.hour = 17;
rule.minute = 17;

const k = schedule.scheduleJob(rule, () =>{
    console.log('Recurrence Rule Scheduling');
});

const l = schedule.scheduleJob({hour: 21, minute: 10, dayOfWeek: 6}, () =>{
    console.log('Object Literal Syntax');
});

const startTime = new Date(Date.now() + 5000);
const endTime = new Date(startTime.getTime() + 5000);
const m = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * * *'}, () => {
    console.log('Set StartTime and EndTime');
});












































































