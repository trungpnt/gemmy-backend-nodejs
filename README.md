# gemmy-backend-nodejs

(IN DEVELOPMENT) 

Backend management for a language center

# AUTOMATICALLY RESTART EXPRESS.JS SERVER WHEN CHANGES ARE MADE
**inside the root directory:**

`forever -w ./server.js`

# PORT IN USE ISSUE:

** IF PORT 3000 IS IN USE : **

`netstat -ano | findstr :3000`

**THEN**
`TASKKILL /PID /F <PID here>  `




