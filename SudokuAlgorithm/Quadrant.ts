import {Row} from "./Row";
import {Column} from "./Column";
import {NumberField} from "./NumberField";
import {LinkedList} from "./LinkedList";

export class Quadrant {
    rows: Row[] = [];
    columns: Column[] = [];

    fillQuadrant(numbers: number[]) {
        let temp: NumberField[][] = [
            [new NumberField(numbers[0]), new NumberField(numbers[1]), new NumberField(numbers[2])],
            [new NumberField(numbers[3]), new NumberField(numbers[4]), new NumberField(numbers[5])],
            [new NumberField(numbers[6]), new NumberField(numbers[7]), new NumberField(numbers[8])]
        ];

        this.rows[0] = new Row(temp[0][0], temp[0][1], temp[0][2]);
        this.rows[1] = new Row(temp[1][0], temp[1][1], temp[1][2]);
        this.rows[2] = new Row(temp[2][0], temp[2][1], temp[2][2]);

        this.columns[0] = new Column(temp[0][0], temp[1][0], temp[2][0]);
        this.columns[1] = new Column(temp[0][1], temp[1][1], temp[2][1]);
        this.columns[2] = new Column(temp[0][2], temp[1][2], temp[2][2]);
    }

    getNumbers(): LinkedList<number> {
        let allNumbers: LinkedList<number> = new LinkedList<number>();

        for (let row of this.rows) {
            for (let number of row.getNumbers()) {
                allNumbers.append(number.getCorrectNumber());
            }
        }
        return allNumbers;
    }
}