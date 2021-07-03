# gemmy-backend-nodejs

(IN DEVELOPMENT) 

Backend management for a language center

# AUTOMATICALLY RESTART EXPRESS.JS SERVER WHEN CHANGES ARE MADE
**INSIDE THE ROOT DIRECTORY:**

`forever -w ./server.js`

# PORT IN USE ISSUE:

** IF PORT 3000 IS IN USE : **

> **ON WINDOWS **
>
`netstat -ano | findstr :3000`

**THEN**

`TASKKILL /PID <PID here> /F `




