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

**Troubleshooting Looker Report:**

Error with data source ("patient_doc_id not specified"): 
* In the event that you uninstall or reinstall the extension "Stream Firestore to BigQuery", the dataset will be disconnected or overridden (When reinstalling the extension with all the same settings) and the Looker Report will show an error with the data source. To fix this, edit the `enhance-bdc3f.enhance_export.patient_visits_raw_latest` View query by clicking on it in the BigQuery Console -> Details -> Edit Query.
* Replace the 2nd `SELECT` statement (After the `WITH latest AS...` statement) with the following query:
`t.document_name,
  document_id,
  timestamp as timestamp,
  ANY_VALUE(event_id) as event_id,
  operation as operation,
  PARSE_DATETIME("%d/%m/%Y %H:%M:%S",STRING(PARSE_JSON(ANY_VALUE(data)).date)) as date,
  INT64(PARSE_JSON(ANY_VALUE(data)).averageSysBP) as sys_bp,
  INT64(PARSE_JSON(ANY_VALUE(data)).averageDiaBP) as dia_bp,
  ANY_VALUE(old_data) as old_data,
  STRING(PARSE_JSON(path_params).patientID) as patient_doc_id`
* After editing the query, click on "Save View", next to the "Run" button.

**Importing Data from Firestore into BigQuery:**

Reference Guide: https://github.com/firebase/extensions/blob/master/firestore-bigquery-export/guides/IMPORT_EXISTING_DOCUMENTS.md
Youtube Guide: https://youtu.be/eGDojMEcs0M?si=oKek8DPUOKcR0fQP
