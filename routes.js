const { Router } = require("express");
const router = Router();
const Enmap = require('enmap');
const adminsdata = new Enmap({ name: 'admins' });
const statsdata = new Enmap({ name: 'stats' });
const urlsdata = new Enmap({ name: 'urls' });
const powersdata = new Enmap({ name: 'powers' });
const config = require("./config.json");

module.exports = (client) => {
  console.log(powersdata)
  router.get('/', (req, res) => {
    res.render('index', {
      admins: adminsdata.get('admins') || [],
      urls: urlsdata.get('urls') || {
        discord: '',
        tiktok: '',
        twitter: '',
        instagram: '',
        youtube: '',
        instagramp: ''
      },
      stats: adminsdata.get('stats') || {
        creators: 0,
        players: 0,
        followers: 0,
        team: 0,
        powers: 0
      },
      powers: powersdata.get('powers') || [],
      ...config,
      client,
    }); 
  }); 

  router.get('/admin/:password', (req, res) => {
    if (req.params.password !== config.password) return res.redirect('/');

    res.render('admin', {
      admins: adminsdata.get('admins') || [],
      powers: powersdata.get('powers') || [{},{},{}],
      urls: urlsdata.get('urls') || {
        discord: '',
        tiktok: '',
        twitter: '',
        instagram: '',
        youtube: '',
        instagramp: ''
      },
      stats: adminsdata.get('stats') || {
        creators: 0,
        players: 0,
        followers: 0,
        team: 0,
        powers: 0
      },
      ...config
    });
  });

  router.post('/add', (req, res) => {
    let body = req.body;

    if (body.password !== config.password) return res.send('Error');

    let data = adminsdata.get('admins') || [];

    data.push({
      username: body.username,
      avatarURL: body.avatar,
      role: body.role
    });

    adminsdata.set('admins', data);

    res.redirect('/admin/' + config.password);
  });
  
  router.post('/admins/:index', (req, res) => {
    let body = req.body;

    if (body.password !== config.password) return res.send('Error');

    let data = adminsdata.get('admins') || [];
    
    data.splice(+req.params.index, 1);
    
    adminsdata.set('admins', data);
    
    res.redirect('/admin/' + config.password);
  });

  router.post('/edit/:index', (req, res) => {
    let body = req.body;

    if (body.password !== config.password) return res.send('Error');

    let data = adminsdata.get('admins') || [];

    data[req.params.index] = {
      username: body.username,
      avatarURL: body.avatar,
      role: req.body.role
    }

    adminsdata.set('admins', data);

    res.redirect('/admin/' + config.password);
  });

  router.post('/setstats', (req, res) => {
    let body = req.body;

    if (body.password !== config.password) return res.send('Error');

    let data = adminsdata.get('admins') || [];

    data = req.body;

    adminsdata.set('stats', data);

    res.redirect('/admin/' + config.password);
  });
  
  router.post('/seturls', (req, res) => {
    let body = req.body;

    if (body.password !== config.password) return res.send('Error');

    let data = urlsdata.get('urls') || {
      discord: '',
      tiktok: '',
      twitter: '',
      instagram: '',
      youtube: '',
      instagramp: ''
    };

    data = req.body;

    urlsdata.set('urls', data);

    res.redirect('/admin/' + config.password);
  });
  
  router.post('/setpower/:index', (req, res) => {
    let body = req.body;

    if (body.password !== config.password) return res.send('Error');

    let data = powersdata.get('powers') || [{},{},{}];

    data[req.params.index] = req.body;

    powersdata.set('powers', data);

    res.redirect('/admin/' + config.password);
  });
  
  return router;
}