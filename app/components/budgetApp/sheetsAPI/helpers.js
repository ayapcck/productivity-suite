export async function addExpensesRow (props) {
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

    const requests = [
        {
            repeatCell: {
                range: Range(sheetId, 0, 1, 0, values[0].length),
                cell: {
                    userEnteredFormat: {
                        textFormat: {
                            bold: true
                        }
                    }
                },
                fields: 'userEnteredFormat(textFormat)'
            }
        },
        {
            repeatCell: {
                range: Range(sheetId, 0, 1, 1, values[0].length),
                cell: {
                    userEnteredFormat: {
                        horizontalAlignment: 'CENTER',
                        verticalAlignment: 'MIDDLE'
                    }
                },
                fields: 'userEnteredFormat(horizontalAlignment,verticalAlignment)'
            }
        },
        {
            repeatCell: {
                range: Range(sheetId, 0, 1, 0, 1),
                cell: {
                    userEnteredFormat: {
                        wrapStrategy: 'WRAP'
                    }
                },
                fields: 'userEnteredFormat(wrapStrategy)'
            }
        },
        {
            repeatCell: {
                range: Range(sheetId, 1, values.length, 0, 1),
                cell: {
                    userEnteredFormat: {
                        horizontalAlignment: 'RIGHT'
                    }
                },
                fields: 'userEnteredFormat(horizontalAlignment)'
            }
        }
    ];

    const updateValueResponse = await gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    const formatCellsResponse = await gapi.client.sheets.spreadsheets.batchUpdate({ spreadsheetId }, createBatchUpdateRequestBody(requests));
    // return response.result;
    console.log('add values: ' + updateValueResponse.result);
    console.log('format values: ' + JSON.stringify(formatCellsResponse.result));
}

export async function createNewSheet (id, title) {
    const params = {
        spreadsheetId: id
    };

    const requests = [
        {
            addSheet: SheetProperties(title)
        }
    ];
    let response = await gapi.client.sheets.spreadsheets.batchUpdate(params, createBatchUpdateRequestBody(requests));
    return response.result.replies[0].addSheet.properties.sheetId;
}

export const createBatchUpdateRequestBody = (requests) => ({ requests });
const Range = (sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex) => 
    ({ sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex });

const SheetProperties = (title) => ({ 
    properties: { title }
});