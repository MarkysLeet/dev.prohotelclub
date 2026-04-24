const { exec } = require('child_process');
exec('npm run dev > dev.log 2>&1 &');
