const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

if(process.env.NODE_ENV === "production"){
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  })
}

// Start Server
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
