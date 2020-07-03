// this function should likely be moved to 'monthly budget' file
export async function addDataAndFormat (props) {
    const { sheetId, sheetTitle, spreadsheetId, startCol, values } = props;

    const colLetter = String.fromCharCode(65 + startCol + values[0].length - 1)
    const range = `${sheetTitle}!A1:${colLetter}${values.length}`;

    const params = { 
        range, spreadsheetId,
        valueInputOption: 'RAW'
    };
    
    const valueRangeBody = {
        range,
        majorDimension: 'ROWS',
        values: values
    };

    // Creates ranges for formatting cells
    const headerRowRange = Range(sheetId, 0, 1, 0, values[0].length);
    const expensesRange = Range(sheetId, 0, 1, 1, values[0].length);
    const expenseDateCellRange = Range(sheetId, 0, 1, 0, 1);
    const datesColumnRange = Range(sheetId, 1, values.length, 0, 1);

    // Creates RepeatCell requests with associated formatting ranges
    const headerCells = RepeatCell(headerRowRange, { textFormat: { bold: true } });
    const expensesCells = RepeatCell(expensesRange, 
        { horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' });
    const expenseDateCell = RepeatCell(expenseDateCellRange, { wrapStrategy: 'WRAP' });
    const dateCells = RepeatCell(datesColumnRange, { horizontalAlignment: 'RIGHT' });

    const requests = [ headerCells, expensesCells, expenseDateCell, dateCells ];
    
    // adds data to sheet
    const updateValueResponse = await gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    // formats data
    const formatCellsResponse = await gapi.client.sheets.spreadsheets.batchUpdate({ spreadsheetId }, BatchUpdateBody(requests));
}


// the below functions will likely stay in helpers.js
export async function createNewSheet (id, title) {
    const params = {
        spreadsheetId: id
    };

    const requests = [
        {
            addSheet: SheetProperties(title)
        }
    ];
    let response = await gapi.client.sheets.spreadsheets.batchUpdate(params, BatchUpdateBody(requests));
    return response.result.replies[0].addSheet.properties.sheetId;
}

const BatchUpdateBody = (requests) => ({ requests });
const RepeatCell = (range, userEnteredFormat) => ({
    repeatCell: {
        range,
        cell: { userEnteredFormat },
        fields: `userEnteredFormat(${_.keys(userEnteredFormat).join(',')})`
    }
});
const Range = (sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex) => 
    ({ sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex });
const SheetProperties = (title) => ({ properties: { title } });