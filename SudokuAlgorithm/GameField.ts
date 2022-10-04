import {Quadrant} from './Quadrant';
import {LinkedList} from './LinkedList';
import {NumberField} from "./NumberField";

export class GameField {
    quadrants: Quadrant[] = [];
    static fieldsToSolve: number = 0;
    roundsToSolve = 0;

    constructor(sodukoData: number[][]) {
        for (let i = 0; i < 9; i++) {
            this.quadrants[i] = new Quadrant();
        }
        this.fillQuadrants(this.generateOrderedQuadrantData(sodukoData));
    }

    generateOrderedQuadrantData(sodukoData: number[][]): number[][] {
        let quadrantData: number[][] = [[], [], [], [], [], [], [], [], []];
        let rowStartPos = 0;
        let fieldStartPos = 0;
        let counter = 0;

        //Durch alle Quadranten gehen
        for (let reps = 0; reps < 9; reps++) {
            //Durch einen Quadranten gehen
            for (let dataRow = rowStartPos; dataRow < rowStartPos + 3; dataRow++) {
                //Durch alle 3 Reihen gehen
                for (let rowField = fieldStartPos; rowField < fieldStartPos + 3; rowField++) {
                    quadrantData[reps][counter] = sodukoData[dataRow][rowField];
                    counter++;
                }
            }
            //Vorbereitung auf den nächsten Quadranten
            fieldStartPos += 3;
            counter = 0;

            //Ab in die nächste Quadrantenreihe
            if (fieldStartPos == 9) {
                fieldStartPos = 0;
                rowStartPos += 3;
            }
        }
        return quadrantData;
    }

    fillQuadrants(quadrantData: number[][]) {
        for (let i = 0; i < 9; i++) {
            this.quadrants[i].fillQuadrant(quadrantData[i]);
        }
    }

    showSoduko(print: boolean = false): number[][] {
        let soduko: number[][] = [[], [], [], [], [], [], [], [], []];
        let rowPos = 0;
        let fieldPos = 0;
        let fieldPosOffset = 0;
        let rowPosOffset = 0;

        for (let q = 0; q < 9; q++) {
            let temp: LinkedList<number> = this.quadrants[q].getNumbers(); //TODO

            for (let i = 0; i < 9; i++) {
                soduko[rowPos][fieldPos] = temp.get(i);
                fieldPos++;

                if (fieldPos % 3 == 0) {
                    rowPos++;
                    fieldPos = fieldPosOffset;
                }
            }
            fieldPosOffset += 3;
            fieldPos = fieldPosOffset;
            rowPos = rowPosOffset;

            if (fieldPos == 9) {
                rowPosOffset += 3;
                rowPos = rowPosOffset;
                fieldPosOffset = 0;
                fieldPos = fieldPosOffset;
            }
        }
        if (print) {
            for (let arr of soduko) {
                console.log(arr.toString())
            }
            console.log()
        }
        return soduko;
    }

    solve() {
        //Jeden einzelnen Quadranten durchgehen
        for (let quadrantID = 0; quadrantID < 9; quadrantID++) {
            let currentQuadrant: Quadrant = this.quadrants[quadrantID];

            //Die Nullen entfernen, damit das Programm schneller ist
            let mesh: LinkedList<number> = new LinkedList<number>();
            mesh.append(0);
            let quadrantNumbers: LinkedList<number> = currentQuadrant.getNumbers();
            quadrantNumbers.removeAll(mesh); //Nullen entfernen


            //Wir gehen die 3 Reihen durch
            for (let rowID = 0; rowID < 3; rowID++) {
                //Wir gehen die 3 Felder einer Reihe durch
                for (let numberFieldID = 0; numberFieldID < 3; numberFieldID++) {
                    let currentNumberfield: NumberField = currentQuadrant.rows[rowID].numberFields[numberFieldID];
                    if (currentNumberfield.getCorrectNumber() != 0) continue;

                    //Zahlen, die bereits im Quadranten sind, aus der Anzahl der möglichen Zahlen entfernen
                    currentNumberfield.getPossibleNumbers().removeAll(quadrantNumbers);
                    let deletingNumbers: LinkedList<number> = new LinkedList<number>();

                    //Rows
                    // 0, 3, 6
                    if (quadrantID % 3 == 0) {
                        deletingNumbers = this.getRowNumbers((quadrantID + 1), rowID, deletingNumbers);
                        deletingNumbers = this.getRowNumbers((quadrantID + 2), rowID, deletingNumbers);
                    }
                    //1, 4, 7
                    else if ((quadrantID - 1) % 3 == 0) {
                        deletingNumbers = this.getRowNumbers((quadrantID - 1), rowID, deletingNumbers);
                        deletingNumbers = this.getRowNumbers((quadrantID + 1), rowID, deletingNumbers);
                    }
                    //2, 5, 8
                    else {
                        deletingNumbers = this.getRowNumbers((quadrantID - 1), rowID, deletingNumbers);
                        deletingNumbers = this.getRowNumbers((quadrantID - 2), rowID, deletingNumbers);
                    }

                    //Columns
                    // 0, 1, 2
                    if (quadrantID < 3) {
                        deletingNumbers = this.getColumnNumbers((quadrantID + 3), numberFieldID, deletingNumbers);
                        deletingNumbers = this.getColumnNumbers((quadrantID + 6), numberFieldID, deletingNumbers);
                    }
                    //3, 4, 5
                    else if (quadrantID < 6) {
                        deletingNumbers = this.getColumnNumbers((quadrantID - 3), numberFieldID, deletingNumbers);
                        deletingNumbers = this.getColumnNumbers((quadrantID + 3), numberFieldID, deletingNumbers);
                    }
                    //6, 7, 8
                    else {
                        deletingNumbers = this.getColumnNumbers((quadrantID - 6), numberFieldID, deletingNumbers);
                        deletingNumbers = this.getColumnNumbers((quadrantID - 3), numberFieldID, deletingNumbers);
                    }

                    //Gesammelte Zahlen aus Reihe und Spalte auch noch entfernen = deletungNumbers ist eine LinkedList
                    currentNumberfield.getPossibleNumbers().removeAll(deletingNumbers);
                    //console.log(currentNumberfield.getPossibleNumbers().toString())
                    currentNumberfield.checkForCorrectNumber();
                }
            }
        }
        this.roundsToSolve++;
    }

    getRowNumbers(quadrantID: number, rowID: number, list: LinkedList<number>): LinkedList<number> {
        for (let num of this.quadrants[quadrantID].rows[rowID].getNumbers()) {
            let number: number = num.getCorrectNumber();
            if (number != 0 && !list.contains(number)) list.append(number);
        }
        return list;
    }

    getColumnNumbers(quadrantID: number, numberFieldID: number, list: LinkedList<number>): LinkedList<number> {
        for (let num of this.quadrants[quadrantID].columns[numberFieldID].getNumbers()) {
            let number = num.getCorrectNumber();
            if (number != 0 && !list.contains(number)) list.append(number);
        }
        return list;
    }

    getJSONData(): Object {
        return {
            roundsToSolve: this.roundsToSolve,
            // @ts-ignore
            data: this.showSoduko().toString().replaceAll(',', '')
        };
    }

    getSum(): number {
        let sum: number = 0;
        for(const quadrant of this.quadrants) {
            sum += quadrant.getNumbers().getSum();
        }
        return sum;
    }
}
