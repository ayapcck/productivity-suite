import { getDays, months } from '../../utilities/dates';
import { BatchUpdateBody, createNewSheet, Range, RepeatCell } from './helpers';

const makeData = (expenses, month, year) => {
    let expenseRow = ['Expenses:  >  Date: V'];
    let accountValues = [['Totals:']];
    _.each(expenses, (expense) => {
        expenseRow.push(expense);
        accountValues.push([expense]);
    });
    let mainValues = [expenseRow];
    const days = getDays(month, year);
    for (let day = 1; day < days + 1; day++) {
        mainValues.push([`${months.indexOf(month)+1}/${day}/${year}`]);
    }

    return { accountValues, mainValues };
};

// this function should likely be moved to 'monthly budget' file
export async function createMonthlyExpenseSheet (props) {
    const { expenses, month, year, spreadsheetId, startCol } = props;

    // create the new sheet
    const sheetTitle = month;
    const sheetId = await createNewSheet(spreadsheetId, sheetTitle);

    const { accountValues, mainValues } = makeData(expenses, month, year);

    const endColumnKeyCode = 65 + startCol + mainValues[0].length - 1;
    const mainDataEndColumnChar = String.fromCharCode(endColumnKeyCode);
    const mainDataRange = `${sheetTitle}!A1:${mainDataEndColumnChar}${mainValues.length}`;
    const accountsStartColumnChar = String.fromCharCode(endColumnKeyCode + 2);
    const accountsEndColumnChar = String.fromCharCode(endColumnKeyCode + 4);
    // const accountsRange = `${sheetTitle}!${accountsStartColumnChar}2:${accountsEndColumnChar}${}`

    const mainValueParams = { 
        range: mainDataRange,
        spreadsheetId,
        valueInputOption: 'RAW'
    };
    
    const mainValueRangeBody = {
        range: mainDataRange,
        majorDimension: 'ROWS',
        values: mainValues
    };

    // Creates ranges for formatting cells
    const headerRowRange = Range(sheetId, 0, 1, 0, mainValues[0].length);
    const expensesRange = Range(sheetId, 0, 1, 1, mainValues[0].length);
    const expenseDateCellRange = Range(sheetId, 0, 1, 0, 1);
    const datesColumnRange = Range(sheetId, 1, mainValues.length, 0, 1);

    // Creates RepeatCell requests with associated ranges to format
    const formatHeaderCells = RepeatCell(headerRowRange, { textFormat: { bold: true } });
    const formatExpenseCells = RepeatCell(expensesRange, 
        { horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' });
    const formatExpenseDateCell = RepeatCell(expenseDateCellRange, { wrapStrategy: 'WRAP' });
    const formatDateCells = RepeatCell(datesColumnRange, { horizontalAlignment: 'RIGHT' });

    const requests = [ formatHeaderCells, formatExpenseCells, formatExpenseDateCell, formatDateCells, 
        updateColumnWidths(sheetId, mainValues[0].length), freezeFirstColRow(sheetId) ];
    
    // adds main data to sheet
    const updateValueResponse = await gapi.client.sheets.spreadsheets.values.update(mainValueParams, mainValueRangeBody);
    // formats data
    const formatCellsResponse = await gapi.client.sheets.spreadsheets.batchUpdate({ spreadsheetId }, BatchUpdateBody(requests));
};

const updateColumnWidths = (sheetId, endIndex) => ({
    updateDimensionProperties: {
        range: {
            sheetId,
            dimension: 'COLUMNS',
            startIndex: 1,
            endIndex
        },
        properties: {
            pixelSize: 75
        },
        fields: 'pixelSize'
    }
});

const freezeFirstColRow = (sheetId) => ({
    updateSheetProperties: {
        properties: {
            sheetId,
            gridProperties: {
                frozenColumnCount: 1,
                frozenRowCount: 1
            }
        },
        fields: 'gridProperties(frozenColumnCount,frozenRowCount)'
    }
});