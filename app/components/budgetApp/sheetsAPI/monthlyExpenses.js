import { getDays, months } from '../../utilities/dates';
import { BatchUpdateBody, createNewSheet, getColumnChar, Range, RepeatCell } from './helpers';

const makeData = (expenses, month, trackingList, year) => {
    let expenseRow = ['Expenses:  >  Date: V'];
    let trackedValues = [['Totals:']];
    _.each(expenses, (expense) => expenseRow.push(expense));
    _.each(trackingList, (item) => {
        const char = getColumnChar(_.indexOf(expenses, item) + 2);
        trackedValues.push([item, `=SUM(${char}:${char})`]);
    })
    let mainValues = [expenseRow];
    const days = getDays(month, year);
    for (let day = 1; day < days + 1; day++) {
        mainValues.push([`${months.indexOf(month)+1}/${day}/${year}`]);
    }

    return { trackedValues, mainValues };
};

export async function createMonthlyExpenseSheet (props) {
    const { expenses, month, year, spreadsheetId, trackingList } = props;

    // create the new sheet
    const sheetTitle = month;
    const sheetId = await createNewSheet(spreadsheetId, sheetTitle);

    const { trackedValues, mainValues } = makeData(expenses, month, trackingList, year);

    const mainDataEndColumn = mainValues[0].length;
    const trackingStartColumn = mainDataEndColumn + 2;
    const trackingEndColumn = trackingStartColumn + 1;

    const mainDataEndColumnChar = getColumnChar(mainDataEndColumn);
    const mainDataRange = `${sheetTitle}!A1:${mainDataEndColumnChar}${mainValues.length}`;
    const trackingStartColumnChar = getColumnChar(trackingStartColumn);
    const trackingEndColumnChar = getColumnChar(trackingEndColumn);
    const trackingRange = `${sheetTitle}!${trackingStartColumnChar}2:${trackingEndColumnChar}${trackedValues.length + 1}`;

    const mainValueParams = updateValueParams(mainDataRange, spreadsheetId);
    const trackedValueParams = updateValueParams(trackingRange, spreadsheetId);
    
    const mainValueRangeBody = updateValueRangeBody(mainDataRange, mainValues);
    const trackedValueRangeBody = updateValueRangeBody(trackingRange, trackedValues);

    // Creates ranges for formatting cells
    const headerRowRange = Range(sheetId, 0, 1, 0, mainDataEndColumn);
    const expensesRange = Range(sheetId, 0, 1, 1, mainDataEndColumn);
    const expenseDateCellRange = Range(sheetId, 0, 1, 0, 1);
    const datesColumnRange = Range(sheetId, 1, mainValues.length, 0, 1);
    const trackingCellHeaderRange = Range(sheetId, 1, 2, trackingStartColumn - 1, trackingEndColumn - 1);
    const trackingValuesRange = Range(sheetId, 2, trackedValues.length + 2, trackingStartColumn, trackingEndColumn);

    // Creates RepeatCell requests with associated ranges to format
    const formatHeaderCells = RepeatCell(headerRowRange, bold);
    const formatExpenseCells = RepeatCell(expensesRange, 
        { horizontalAlignment: 'CENTER', verticalAlignment: 'MIDDLE' });
    const formatExpenseDateCell = RepeatCell(expenseDateCellRange, { wrapStrategy: 'WRAP' });
    const formatDateCells = RepeatCell(datesColumnRange, { horizontalAlignment: 'RIGHT' });
    const formatTrackingHeaderCell = RepeatCell(trackingCellHeaderRange, bold);
    const formatTrackingValues = RepeatCell(trackingValuesRange, { numberFormat: { type: 'CURRENCY' } });

    const requests = [ 
        formatHeaderCells, 
        formatTrackingHeaderCell,
        formatTrackingValues,
        formatExpenseCells, 
        formatExpenseDateCell,
        formatDateCells, 
        updateColumnWidths(sheetId, mainDataEndColumn), 
        freezeFirstColRow(sheetId)
    ];
    
    // adds main data to sheet
    await gapi.client.sheets.spreadsheets.values.update(mainValueParams, mainValueRangeBody);
    // adds tracking data to sheet
    await gapi.client.sheets.spreadsheets.values.update(trackedValueParams, trackedValueRangeBody);
    // formats data
    await gapi.client.sheets.spreadsheets.batchUpdate({ spreadsheetId }, BatchUpdateBody(requests));
};

const bold = { textFormat: { bold: true } };

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

const updateValueParams = (range, spreadsheetId) => 
    ({ range, spreadsheetId, valueInputOption: 'USER_ENTERED' });

const updateValueRangeBody = (range, values) => ({ range, majorDimension: 'ROWS', values });