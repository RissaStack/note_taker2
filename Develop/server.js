//dependencies
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = 3001;

//middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes for the HTML files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// app.listen(PORT, () => console.log(`app listening http://localhost:3001`));
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
