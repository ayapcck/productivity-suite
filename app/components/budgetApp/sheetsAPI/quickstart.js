/* Might need an authorize/signout method/button */

const CLIENT_ID = '223523931856-uj2hp1prpjlek9hmaj9dtjnks37ge0mo.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDfk_hBnkvBHYonF7fzI8xf4geH9V_kfXI';

const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

let authorizeButton = document.getElementById('authorize_button');
let signoutButton = document.getElementById('signout_button');

export const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
};

const initClient = () => {
    gapi.client.init({
        apiKey: API_KEY,
        clientID: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        gapi.auth2.init({'client_id': CLIENT_ID});
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, (error) => {
        alert(JSON.stringify(error, null, 2));
    })
};

const updateSigninStatus = (isSignedIn) => {
    authorizeButton = document.getElementById('authorize_button');
    signoutButton = document.getElementById('signout_button');
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        listMajors();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
};

const handleAuthClick = () => gapi.auth2.getAuthInstance().signIn();
const handleSignoutClick = () => gapi.auth2.getAuthInstance().signOut();

const listMajors = () => {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BlpKMYSTycxih_93JBlbuHmTFh-HU7LvqgyttRD-ej4',
        range: 'June!A2',
    }).then((response) => {
        const range = response.result;
        if (range.values.length > 0) {
            alert(range.values);
        } else {
            alert('No data found');
        }
    }, (response) => {
        alert('Error: ' + response.result.error.message);
    })
}