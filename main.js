const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================

function getShiftDuration(startTime, endTime) {

    let startParts = startTime.split(" ");
    let startTimeOnly = startParts[0];
    let startPeriod = startParts[1];

    let endParts = endTime.split(" ");
    let endTimeOnly = endParts[0];
    let endPeriod = endParts[1];

    let startTimeParts = startTimeOnly.split(":");
    let startHour = parseInt(startTimeParts[0]);
    let startMinute = parseInt(startTimeParts[1]);
    let startSecond = parseInt(startTimeParts[2]);

    let endTimeParts = endTimeOnly.split(":");
    let endHour = parseInt(endTimeParts[0]);
    let endMinute = parseInt(endTimeParts[1]);
    let endSecond = parseInt(endTimeParts[2]);

    if (startPeriod === "am" && startHour === 12) {
    startHour = 0;}
     else if (startPeriod === "pm" && startHour !== 12) {
    startHour = startHour + 12;}

if (endPeriod === "am" && endHour === 12) {
    endHour = 0;}
     else if (endPeriod === "pm" && endHour !== 12) {
    endHour = endHour + 12;}

let startTotalSeconds = startHour * 3600 + startMinute * 60 + startSecond;
let endTotalSeconds = endHour * 3600 + endMinute * 60 + endSecond;
let durationSeconds = endTotalSeconds - startTotalSeconds;

let hours = Math.floor(durationSeconds / 3600);
let remainingSeconds = durationSeconds % 3600;
let minutes = Math.floor(remainingSeconds / 60);
let seconds = remainingSeconds % 60;

if (minutes < 10) {
    minutes = "0" + minutes;}

if (seconds < 10) {
    seconds = "0" + seconds;}

let result = hours + ":" + minutes + ":" + seconds;

return result;

}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================

function getIdleTime(startTime, endTime) {
        
    let startParts = startTime.split(" ");
    let startTimeOnly = startParts[0];
    let startPeriod = startParts[1];

    let endParts = endTime.split(" ");
    let endTimeOnly = endParts[0];
    let endPeriod = endParts[1];

    let startTimeParts = startTimeOnly.split(":");
    let startHour = parseInt(startTimeParts[0]);
    let startMinute = parseInt(startTimeParts[1]);
    let startSecond = parseInt(startTimeParts[2]);

    let endTimeParts = endTimeOnly.split(":");
    let endHour = parseInt(endTimeParts[0]);
    let endMinute = parseInt(endTimeParts[1]);
    let endSecond = parseInt(endTimeParts[2]);

    if (startPeriod === "am" && startHour === 12) {
    startHour = 0;}
    
    else if (startPeriod === "pm" && startHour !== 12) {
    startHour = startHour + 12;}

if (endPeriod === "am" && endHour === 12) {
    endHour = 0;}
     else if (endPeriod === "pm" && endHour !== 12) {
    endHour = endHour + 12;}

let startTotalSeconds = startHour * 3600 + startMinute * 60 + startSecond;
let endTotalSeconds = endHour * 3600 + endMinute * 60 + endSecond;

let deliveryStartSeconds = 8 * 3600;
let deliveryEndSeconds = 22 * 3600;

let idleSeconds = 0;

if (startTotalSeconds < deliveryStartSeconds) {

    let idleBefore = deliveryStartSeconds - startTotalSeconds;

    if (endTotalSeconds < deliveryStartSeconds) {
        idleBefore = endTotalSeconds - startTotalSeconds; }

    idleSeconds = idleSeconds + idleBefore;
}

if (endTotalSeconds > deliveryEndSeconds) {

    let idleAfter = endTotalSeconds - deliveryEndSeconds;

    if (startTotalSeconds > deliveryEndSeconds) {
        idleAfter = endTotalSeconds - startTotalSeconds;}

    idleSeconds = idleSeconds + idleAfter;
}

let hours = Math.floor(idleSeconds / 3600);
let remainingSeconds = idleSeconds % 3600;
let minutes = Math.floor(remainingSeconds / 60);
let seconds = remainingSeconds % 60;

if (minutes < 10) {
    minutes = "0" + minutes;}

if (seconds < 10) {
    seconds = "0" + seconds;}

let result = hours + ":" + minutes + ":" + seconds;

return result;

}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================

function getActiveTime(shiftDuration, idleTime) {

    let shiftParts = shiftDuration.split(":");
    let shiftHour = parseInt(shiftParts[0]);
    let shiftMinute = parseInt(shiftParts[1]);
    let shiftSecond = parseInt(shiftParts[2]);

    let idleParts = idleTime.split(":");
    let idleHour = parseInt(idleParts[0]);
    let idleMinute = parseInt(idleParts[1]);
    let idleSecond = parseInt(idleParts[2]);

let shiftTotalSeconds = shiftHour * 3600 + shiftMinute * 60 + shiftSecond;
let idleTotalSeconds = idleHour * 3600 + idleMinute * 60 + idleSecond;

let activeSeconds = shiftTotalSeconds - idleTotalSeconds;

let hours = Math.floor(activeSeconds / 3600);
let remainingSeconds = activeSeconds % 3600;
let minutes = Math.floor(remainingSeconds / 60);
let seconds = remainingSeconds % 60;

if (minutes < 10) {
    minutes = "0" + minutes;}

if (seconds < 10) {
    seconds = "0" + seconds;}

let result = hours + ":" + minutes + ":" + seconds;

return result;
 
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================

function metQuota(date, activeTime) {

    let activeParts = activeTime.split(":");
    let activeHour = parseInt(activeParts[0]);
    let activeMinute = parseInt(activeParts[1]);
    let activeSecond = parseInt(activeParts[2]);

    let activeTotalSeconds = activeHour * 3600 + activeMinute * 60 + activeSecond;

let quotaSeconds;

if (date >= "2025-04-10" && date <= "2025-04-30") {
    quotaSeconds = 6 * 3600;}

     else {quotaSeconds = 8 * 3600 + 24 * 60;}

if (activeTotalSeconds >= quotaSeconds) {
    return true;}

     else {return false;}

}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================

function addShiftRecord(textFile, shiftObj) {

    let fileContent = fs.readFileSync(textFile, "utf8");
    let lines = fileContent.split("\n");

    for (let i = 0; i < lines.length; i++) {
    let currentLine = lines[i].split(",");

    let currentDriverID = currentLine[0];
    let currentDate = currentLine[2];

    if (currentDriverID === shiftObj.driverID && currentDate === shiftObj.date) {
        return {};
    }
}

let shiftDuration = getShiftDuration(shiftObj.startTime, shiftObj.endTime);
let idleTime = getIdleTime(shiftObj.startTime, shiftObj.endTime);
let activeTime = getActiveTime(shiftDuration, idleTime);
let quotaMet = metQuota(shiftObj.date, activeTime);

let newRecord = {
    driverID: shiftObj.driverID,
    driverName: shiftObj.driverName,
    date: shiftObj.date,
    startTime: shiftObj.startTime,
    endTime: shiftObj.endTime,
    shiftDuration: shiftDuration,
    idleTime: idleTime,
    activeTime: activeTime,
    metQuota: quotaMet,
    hasBonus: false
};

let newLine =
    newRecord.driverID + "," +
    newRecord.driverName + "," +
    newRecord.date + "," +
    newRecord.startTime + "," +
    newRecord.endTime + "," +
    newRecord.shiftDuration + "," +
    newRecord.idleTime + "," +
    newRecord.activeTime + "," +
    newRecord.metQuota + "," +
    newRecord.hasBonus;

    let lastIndex = -1;

for (let i = 0; i < lines.length; i++) {

    let parts = lines[i].split(",");
    let currentDriverID = parts[0];

    if (currentDriverID === shiftObj.driverID) {
        lastIndex = i;}
}

if (lastIndex === -1) {
    lines.push(newLine);}
     else {
    lines.splice(lastIndex + 1, 0, newLine);}

fs.writeFileSync(textFile, lines.join("\n"));

return newRecord;
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================

function setBonus(textFile, driverID, date, newValue) {

    let fileContent = fs.readFileSync(textFile, "utf8");
    let lines = fileContent.split("\n");

    for (let i = 0; i < lines.length; i++) {

    let parts = lines[i].split(",");
    let currentDriverID = parts[0];
    let currentDate = parts[2];

    if (currentDriverID === driverID && currentDate === date) {
        parts[9] = newValue;
        lines[i] = parts.join(",");
    }

}
fs.writeFileSync(textFile, lines.join("\n"));
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================

function countBonusPerMonth(textFile, driverID, month) {

let fileContent = fs.readFileSync(textFile, "utf8");
let lines = fileContent.split("\n");

    let count = 0;
    let driverFound = false;
    let targetMonth = parseInt(month);

    for (let i = 0; i < lines.length; i++) {

        let parts = lines[i].split(",");

    if (parts.length < 10) {
        continue; }

        let currentDriverID = parts[0];
        let currentDate = parts[2];
        let currentHasBonus = parts[9].trim();

        let dateParts = currentDate.split("-");
        let currentMonth = parseInt(dateParts[1]);

        if (currentDriverID === driverID) {
            driverFound = true;

            if (currentMonth === targetMonth && currentHasBonus === "true") {
                count++;
            }
        }
    }

    if (!driverFound) {
        return -1;
    }

    return count;
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================

function getTotalActiveHoursPerMonth(textFile, driverID, month) {
       let fileContent = fs.readFileSync(textFile, "utf8");
    let lines = fileContent.split("\n");

    let totalSeconds = 0;
    let targetMonth = parseInt(month);

    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(",");

        if (parts.length < 10) {
            continue;
        }

        let currentDriverID = parts[0];
        let currentDate = parts[2];
        let currentActiveTime = parts[7].trim();

        let dateParts = currentDate.split("-");
        let currentMonth = parseInt(dateParts[1]);

        if (currentDriverID === driverID && currentMonth === targetMonth) {

            let activeParts = currentActiveTime.split(":");
            let activeHour = parseInt(activeParts[0]);
            let activeMinute = parseInt(activeParts[1]);
            let activeSecond = parseInt(activeParts[2]);

            let activeSeconds = activeHour * 3600 + activeMinute * 60 + activeSecond;

            totalSeconds = totalSeconds + activeSeconds;
        }
    }

    let hours = Math.floor(totalSeconds / 3600);
    let remainingSeconds = totalSeconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    let result = hours + ":" + minutes + ":" + seconds;

    return result;
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================

function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {

 let shiftsContent = fs.readFileSync(textFile, "utf8");
    let shiftLines = shiftsContent.split("\n");

    let ratesContent = fs.readFileSync(rateFile, "utf8");
    let rateLines = ratesContent.split("\n");

    let targetMonth = parseInt(month);
    let totalRequiredSeconds = 0;

    let dayOff = "";

    for (let i = 0; i < rateLines.length; i++) {
        let parts = rateLines[i].split(",");

        if (parts.length < 4) {
            continue;
        }

        let currentDriverID = parts[0];
        let currentDayOff = parts[1].trim();

        if (currentDriverID === driverID) {
            dayOff = currentDayOff;
        }
    }

    for (let i = 0; i < shiftLines.length; i++) {
        let parts = shiftLines[i].split(",");

        if (parts.length < 10) {
            continue;
        }

        let currentDriverID = parts[0];
        let currentDate = parts[2];

        let dateParts = currentDate.split("-");
        let currentMonth = parseInt(dateParts[1]);

        if (currentDriverID === driverID && currentMonth === targetMonth) {

            let year = parseInt(dateParts[0]);
            let monthNumber = parseInt(dateParts[1]);
            let dayNumber = parseInt(dateParts[2]);

            let dateObject = new Date(year, monthNumber - 1, dayNumber);

            let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let currentDayName = dayNames[dateObject.getDay()];

            if (currentDayName !== dayOff) {
                if (currentDate >= "2025-04-10" && currentDate <= "2025-04-30") {
                    totalRequiredSeconds = totalRequiredSeconds + (6 * 3600);
                } else {
                    totalRequiredSeconds = totalRequiredSeconds + (8 * 3600 + 24 * 60);
                }
            }
        }
    }

    totalRequiredSeconds = totalRequiredSeconds - (bonusCount * 2 * 3600);

    let hours = Math.floor(totalRequiredSeconds / 3600);
    let remainingSeconds = totalRequiredSeconds % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    let result = hours + ":" + minutes + ":" + seconds;

    return result;
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================

function getNetPay(driverID, actualHours, requiredHours, rateFile) {
        
    let fileContent = fs.readFileSync(rateFile, "utf8");
    let lines = fileContent.split("\n");

    let basePay = 0;
    let tier = 0;

    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(",");

        if (parts.length < 4) {
            continue;
        }

        let currentDriverID = parts[0];

        if (currentDriverID === driverID) {
            basePay = parseInt(parts[2]);
            tier = parseInt(parts[3].trim());
        }
    }

    let actualParts = actualHours.split(":");
    let actualHour = parseInt(actualParts[0]);
    let actualMinute = parseInt(actualParts[1]);
    let actualSecond = parseInt(actualParts[2]);

    let requiredParts = requiredHours.split(":");
    let requiredHour = parseInt(requiredParts[0]);
    let requiredMinute = parseInt(requiredParts[1]);
    let requiredSecond = parseInt(requiredParts[2]);

    let actualTotalSeconds = actualHour * 3600 + actualMinute * 60 + actualSecond;
    let requiredTotalSeconds = requiredHour * 3600 + requiredMinute * 60 + requiredSecond;

    if (actualTotalSeconds >= requiredTotalSeconds) {
        return basePay; }

    let missingSeconds = requiredTotalSeconds - actualTotalSeconds;
    let allowedMissingHours = 0;

    if (tier === 1) {
    allowedMissingHours = 50;}

         else if (tier === 2) {
        allowedMissingHours = 20;}
         else if (tier === 3) {
        allowedMissingHours = 10;}
         else if (tier === 4) {
        allowedMissingHours = 3;}

    let allowedMissingSeconds = allowedMissingHours * 3600;
    let remainingMissingSeconds = missingSeconds - allowedMissingSeconds;

    if (remainingMissingSeconds < 0) {
        remainingMissingSeconds = 0;
    }

    let billableMissingHours = Math.floor(remainingMissingSeconds / 3600);

    let deductionRatePerHour = Math.floor(basePay / 185);
    let salaryDeduction = billableMissingHours * deductionRatePerHour;

    let netPay = basePay - salaryDeduction;

    return netPay;
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
