const { Log } = require("../../../logging/index");
const { google } = require('googleapis');
const TAG = __filename;
//TODO: need to relocate this to env
const CLIENT_ID = '488822753460-fl701frojsq3cmr31udoe4pmmg830i4c.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:4090/api/v1/driveApp/drive-callback-url';
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

exports.BLManager = class BLManager {
    driveLoginUrl = async (request) => {
        //simple sends login url
        try {
            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            })
            return authUrl
        } catch (error) {
            Log.error(TAG, "driveLoginUrl", `Error while logging in drive.`, error)
            return []
        }
    }

    getfile = async (request,response) => {
        try {
            //Initiate authentication process
            try {
                const authUrl = oauth2Client.generateAuthUrl({
                    access_type: 'offline',
                    scope: SCOPES,
                })
                response.redirect(authUrl) 
            } catch (error) {
                Log.error(TAG, "driveLoginUrl", `Error while logging in drive.`, error)
                return []
            }
            //get file from the google drive 
            const fileId = request.query.id; // Extract the file ID from the request

            // Use the Google Drive API to download the file and display "Welcome" page
            // You need to implement the logic to download the file and serve the HTML page here.
            // For simplicity, I'll assume you've implemented functions: downloadFile(fileId) and serveWelcomePage(res).
            const drive = google.drive({ version: 'v3', auth: oauth2Client });
            try {
                const response = await drive.files.get({
                    fileId: fileId,
                    alt: 'media', // This requests the file content
                });
                //   return response.data; // Return the downloaded file content
                const welcomePage = `
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                      <title>Welcome to My App</title>
                                    </head>
                                    <body>
                                      <h1>Welcome to My App</h1>
                                      <p>File content:</p>
                                      <pre>${response?.data}</pre>
                                    </body>
                                    </html>
                                `;
                return welcomePage;
            } catch (error) {
                throw new Error('Error downloading file: ' + error.message);
            }
        } catch (error) {
            Log.error(TAG, "getfile", `Error while fetching files from the drive.`, error)
            return []
        }
    }

    driveCallbackUrl = async (request) => {
        try {
            //get the code here and do the authentication part. 
            const { tokens } = await oauth2Client.getToken(request.code);
            oauth2Client.setCredentials(tokens)
            if (!tokens) return "User Authentication failed."
            //eventually we need to save this refresh token
            //serve welcome page and download the file 
            return 
            return { tokens:tokens} 
        } catch (error) {
            Log.error(TAG, "getfile", `Error while authenticating users from the drive.`, error)
            return []
        }
    }

    registerApp = async (request) => {
        try {
            //registerig app to open certain files
            const drive = google.drive({ version: 'v3', auth: oauth2Client });

            const fileId = request; // Replace with the actual file ID
            await drive.files.update({
                fileId: fileId,
                supportsAllDrives: true, // If you're working with shared drives
                requestBody: {
                    appProperties: {
                        'openWithLink': 'http://localhost:4090/api/v1/driveApp/open-file?id=' + fileId,
                    },
                    mimeType: 'application/vnd.oasis.opendocument.text', // Specify the MIME type
                },
            })
            return `App registered for ODT files`
        } catch (error) {
            Log.error(TAG, "registerAppasync", `Error while Error registering app: `, error)
            return []
        }
    }

}