# Drive application

## A simple app that registers for certain file types in Google Drive (e.g. "application/vnd.oasis.opendocument.text" MIME type) in JavaScript / node.js. 
Once the user chose to open a matching file from within Google Drive, download the file in node.js and display a static "Welcome" page to the user. Document the necessary steps to register the app for Google Drive to be public to other users.

Here's an example user flow:
1. User finds .odt-file in their Google Drive and attempts to open it
2. No supported viewer available, Google Drive suggests to use your app to open the file (see screenshot as an example)
3. User is redirected to your app to view the file