import {NumberField} from './NumberField';

export class Row
{
    numberFields: NumberField[]

    constructor(number1: NumberField, number2: NumberField, number3: NumberField) {
        this.numberFields = [number1, number2, number3];
    }

    getNumbers(): NumberField[] {
        return this.numberFields;
    }
}
