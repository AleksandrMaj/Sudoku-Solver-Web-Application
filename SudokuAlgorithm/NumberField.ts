import {LinkedList} from "./LinkedList";
import {GameField} from "./GameField";

export class NumberField {
    possibleNumbers: LinkedList<number>;
    correctNumber: number = 0;
    //numberUknown: boolean = true;

    constructor(correctNumber: number) {
        if (correctNumber == 0) {
            GameField.fieldsToSolve++;
            this.possibleNumbers = new LinkedList<number>();
            this.fillPossibleNumbersArray();
            //console.log(correctNumber);
            return;
        }
        this.correctNumber = correctNumber;
        //this.numberUknown = false;
    }

    getPossibleNumbers(): LinkedList<number> {
        if (this.possibleNumbers == null) {
            let temp: LinkedList<number> = new LinkedList<number>();
            temp.append(this.correctNumber);
            return temp;
        }
        return this.possibleNumbers;
    }

    getCorrectNumber() {
        return this.correctNumber;
    }

    setCorrectNumber(correctNumber: number) {
        GameField.fieldsToSolve--;
        this.correctNumber = correctNumber;
        //this.numberUknown = false;
    }

    fillPossibleNumbersArray() {
        this.possibleNumbers = new LinkedList<number>();
        for (let i = 1; i < 10; i++) {
            this.possibleNumbers.append(i);
        }
    }

    checkForCorrectNumber()
    {
        if(this.possibleNumbers != null && this.possibleNumbers.size() == 1)
            this.setCorrectNumber(this.possibleNumbers.getFirst());
    }
}