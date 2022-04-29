const { Client } = require('discord.js');
const client = new Client();
const express = require('express');
const app = express();
const Enmap = require('enmap');

client.once('ready', () => {
  console.log('Logged in as ' + client.user.tag);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/', require('./routes')(client));

app.listen(process.env.PORT || 3000, () => {
  console.log('App started...');
});

client.login(require('./config.json').token);