const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static('dist'));
app.get('/',  (req, res)=> res.sendFile(path.join(__dirname, 'index.html'))); 

//seed your data before server listens 
const setup = async()=>{
  console.log('starting');
  //SEED DATA
  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log(`listening on port ${port}`));
}

setup();
