Front-End is hosted on Firebase with the given URL: https://enhance-bdc3f.web.app

Project Console: https://console.firebase.google.com/project/enhance-bdc3f/overview

**Useful site for any trouble-shooting regarding Firebase hosting:** https://firebase.google.com/docs/hosting/quickstart

**Editing the site:**
"build" folder is the main folder being hosted. To change the folder that is being hosted, modify the destination in the firebase.json
and run the "firebase deploy --only hosting" command in the terminal. 

Note: After every edit, run the "firebase deploy --only hosting" command to see the changes on the site

**Testing WebView integration:**
Currently, testing the WebView within the Android Emulator itself doesn't seem to be working. Instead, to test the WebView functionality, 
physically connect an android device to your laptop with a USB cable (Wifi connection is available but slow). 

To connect your android device for physical testing, you can refer to the Android Studio guide (https://developer.android.com/studio/run/device)
1. On your mobile device, enable Developer Options by clicking on the "Build Number" 7 times in Settings.
2. Enable USB Debugging on your movile device.
3. Plug in your device into your laptop.
4. Run the android application with your device as the selected emulator. 

**Editing the Looker Report:**
Data Source used in Looker Report is a custom BigQuery query: 
"SELECT * FROM `enhance-bdc3f.enhance_export.patient_visits_raw_latest` WHERE contains_substr(patient_doc_id, @documentid)"

`enhance-bdc3f.enhance_export.patient_visits_raw_latest` refers to the dataset in BigQuery that streams data from the Firestore database (Updates BigQuery table according to the updates in Firestore)

The "WHERE" statement checks the for a patient_doc_id that contains @documentid (parameter passed to the Looker Report that filters each graph/visualisation)
