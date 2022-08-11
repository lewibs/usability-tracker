# usability-tracker
The goal of this application is to provide a method for automating the usability test process.
 
should eventually include all of these events:
https://developer.mozilla.org/en-US/docs/Web/Events
 
## UserTracker
 
The module has only one export; it is the UserTracker class which is used to handle what is done each time an event is added to the history, what events to ignore, and what id to use when tracking the user.
 
```javascript
import UserTracker from "usability-tracker"
 
let user = new UserTracker(saveCallback, ignoreFilter, storageTag);
```
 
### methods
#### constructor(onUpdate, filter, storageTag)
| field | description |
| ----- | ----------- |
| onUpdate | is a callback for every time a new item is added to the log. |
| filter | example output of obj is a filter function that is used to determine if this log should be blocked from being added to the history |
| storageTag | this is the tag used to identify the user for multi page websites in localStorage. If unset it will be given custom tag defined internally |
 
#### get history(): [log]
returns the current total history
 
#### replay(history): undefined
| field | description |
| ----- | ----------- |
| history | an array of logs |
 
This simulates the user's actions on the screen.
 
<b>Warning: replay does not work as robustly as it could if an external program written with something, such as pyautogui, would work. This is due to events with isTrusted=false being ignored.</b>
 
#### toString(): String
returns a string of the history in json format
 
#### example log
This is an example of what a history log looks like:
```javascript
{
   "pressed": {
       "mousemove": true
   },
   "event": {
       "isTrusted": true,
       "key": "mousemove",
       "currentKey": "mousemove",
       "ratioX": 0.941696113074205,
       "ratioY": 0.750561797752809,
       "wheelRatioX": null,
       "wheelRatioY": null
   },
   "time": 1660187659423,
   "userID": "2cab6f8a-ffea-4f86-9a38-baea73735cfc",
   "type": "mousemove",
   "html": "<header class=\"App-header\"><img src=\"/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg\" class=\"App-logo\" alt=\"logo\"><p>Edit <code>src/App.js</code> and save to reload.</p><input type=\"password\"><input type=\"text\"><button id=\"alert\">alert</button></header>"
}
```