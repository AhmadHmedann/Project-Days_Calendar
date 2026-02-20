// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.
import fs from 'node:fs';
import { state, buildEventsByDateMap, pad2} from './common.mjs'

const START_YEAR = 2020;
const END_YEAR = 2030;
const OUTPUT_FILE = './days.ics';

function formatDate(year, month, day, addDays = 0){
    const date = new Date(Date.UTC(year, month - 1, day));
    
    date.setUTCDate(date.getUTCDate() + addDays)

   //extracting calculated values and avoiding fall overs

   const y = date.getUTCFullYear();
   const m = date.getUTCMonth() + 1;
   const d = date.getUTCDate();

   // 3. Return as YYYYMMDD
   return `${y}${pad2(m)}${pad2(d)}`
}
 
//initlaizing calender. 


const icalLines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Emmanuel//Project-Days Calender//EN",
  "CALSCALE:GREGORIAN"
];

 //time travel loop.
for (let year = START_YEAR; year <= END_YEAR; year++) {
    const eventsMap = buildEventsByDateMap(state.commemorativeDays, year);

    for (const [dateKey, events] of eventsMap) {
        //split "2026/10/13" into numbers [2026, 10, 13]
        const[y, m, d] = dateKey.split('/').map(Number);

        for (const event of events){
        const start = formatDate(y, m, d, 0);
        const end = formatDate(y, m, d, 1);

        //3. create a unique ID for this specific year
        const uid = `${event.name.replace(/\s+/g, '-').toLowerCase()}-${year}@piscine.local`;
        


        // 4. Push the event block
      icalLines.push("BEGIN:VEVENT");
      icalLines.push(`UID:${uid}`);
      icalLines.push(`DTSTAMP:${formatDate(2026, 2, 20)}T000000Z`); // Today's stamp
      icalLines.push(`DTSTART;VALUE=DATE:${start}`);
      icalLines.push(`DTEND;VALUE=DATE:${end}`);
      icalLines.push(`SUMMARY:${event.name}`);
      icalLines.push("END:VEVENT");



   }
 }
}

//5. 
icalLines.push("END:VCALENDAR");
//save the file.
fs.writeFileSync(OUTPUT_FILE, icalLines.join('\r\n'));
