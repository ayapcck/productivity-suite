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

export const BatchUpdateBody = (requests) => ({ requests });
export const RepeatCell = (range, userEnteredFormat) => ({
    repeatCell: {
        range,
        cell: { userEnteredFormat },
        fields: `userEnteredFormat(${_.keys(userEnteredFormat).join(',')})`
    }
});
export const Range = (sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex) => 
    ({ sheetId, startRowIndex, endRowIndex, startColumnIndex, endColumnIndex });
const SheetProperties = (title) => { 
    
    return { 
        properties: { 
            title 
        }
    };
};