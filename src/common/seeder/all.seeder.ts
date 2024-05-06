import { faker } from '@faker-js/faker';
import { EmploymentType, Gender, Status } from '../enums/all.enum';


function getRandomEnum(enumType): any {
    const enumValues = Object.values(enumType);
    return enumValues[Math.floor(Math.random() * enumValues.length)];
}

function toDateString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1 to get the correct month number.
    const day = date.getDate();
    return `${year}-${(month.toString()).padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}