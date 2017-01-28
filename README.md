# daemon-dash

# Setup
```
$ cp .env.example .env
$ yarn install
$ mongod
$ npm watch
$ npm run dev
```
# Daemon-Dash

# Minimum Project Reqs
* From a student’s view, the student is able to access a lecture stream from the browser.
* The stream will have an accompanying editor.
  * The editor only supports Java.
  * The editor will update its own contents as the video progresses, as to synchronize with the lecture.
  * The viewer may edit the code in the editor. If the viewer modified the code, the video will pause.
    * If the viewer resumes the video, the editor will return to its original state that’s synchronized with the lecture.
  * The viewer may run the code that’s in the editor at any time. The output will be displayed to the user on the browser.
* From the professor’s view, when streaming, the professor will have access to a web IDE where he or she can type the code pertaining to the lecture.
* The code will be synchronized with the stream.
* UI must look nice on desktop.

# Additional Project Features
* The application should support recorded videos in addition to streams.
* Students who edit code can opt to branch off from the original lecture code and save their changes.
* In live streams, students can post questions to a Dory and vote as well. At the end of the lecture, the professor can answer the top questions.
* Likewise, in videos, students can post questions attached to certain timestamps of the video, and these questions can be linked/posted to Piazza.
* The code editor and runner can support additional languages.
