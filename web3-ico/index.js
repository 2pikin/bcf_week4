const path = require('path');
const express = require('express');

// create http server
const app = express();

// activate support for static content
app.use(express.static(path.resolve(__dirname, 'public')));

// start listen on port 3000
app.listen(3000, () => {
  console.log('> ready on http://localhost:3000');
});
