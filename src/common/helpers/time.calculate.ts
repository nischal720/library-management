export function getTimeDifferenceInMinutes(time1: Date, time2: Date): number {
    // Parse the timestamps into Date objects
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    // Calculate the difference in milliseconds
    const timeDiffMs = Math.abs(date1.getTime() - date2.getTime());

    // Convert the difference to minutes and round down (floor)
    const minutes = Math.floor(timeDiffMs / (1000 * 60));

    return minutes;
}

export function getAmPmTime(datetimeObj: Date): string {
    // const datetimeObj = new Date(utcDatetimeStr);

    // Extract hour (12-hour format)
    const hour = datetimeObj.getHours() % 12;

    // Get AM/PM based on hour
    const meridian = hour < 12 ? "AM" : "PM";

    // Format the time string with AM/PM
    return `${hour.toString().padStart(2, '0')}:${datetimeObj.getMinutes().toString().padStart(2, '0')}:${datetimeObj.getSeconds().toString().padStart(2, '0')} ${meridian}`;
}