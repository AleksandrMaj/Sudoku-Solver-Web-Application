import {GameField} from './GameField'

export const initializeSolve = data => {
    GameField.fieldsToSolve = 0;
    let sudokuData: number[][] = [[], [], [], [], [], [], [], [], []];

    //Convert data into array
    let counter: number = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudokuData[i][j] = Number(data[counter]);
            counter++;
        }
    }

    /*sudokuData = [
        [3, 9, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 7, 0, 0, 4, 8, 0, 0],
        [0, 0, 4, 0, 5, 0, 1, 9, 6],
        [6, 7, 2, 1, 0, 0, 0, 8, 4],
        [0, 3, 1, 9, 4, 0, 0, 0, 0],
        [0, 4, 0, 7, 0, 0, 6, 1, 0],
        [9, 2, 0, 4, 0, 3, 5, 6, 0],
        [0, 0, 3, 5, 0, 1, 4, 0, 9],
        [0, 0, 0, 0, 6, 9, 0, 0, 0]
    ];*/

    const gameField = new GameField(sudokuData);
    console.log("Start");
    console.log(`Anzahl zu lösender Felder: ${GameField.fieldsToSolve}`)

    while (GameField.fieldsToSolve != 0) {
        const prevFieldsToSolve = GameField.fieldsToSolve;
        gameField.solve();
        if (prevFieldsToSolve === GameField.fieldsToSolve) {
            gameField.showSoduko(true)
            console.log('Sudoku konnte nicht gelöst werden')
            return {
                err: true
            }
        }
        console.log(`Durchgang: ${gameField.roundsToSolve}`)
        console.log(`Anzahl zu lösender Felder: ${GameField.fieldsToSolve}`)
        gameField.showSoduko(true);
    }

    if(gameField.getSum() !== 405) {
        console.log('SUMME PASST NICHT')
        return {err: true}
    }

    console.log(`Es wurden ${gameField.roundsToSolve} Durchgänge benötigt!`)

    console.log('Daten werden übermittelt!')
    return gameField.getJSONData();
}

