"use strict";
import Shaby_PWA from './shaby/shaby-pwa.js?v=0.1';
import Shaby_Model from './shaby/shaby-model.js?v=0.1';
import LoginView from './views/route.login.js?v=0.1';
import MainmenuView from './views/route.mainmenu.js?v=0.1';
import PlayerView from './views/route.player.js?v=0.1';

let routes = [
    new MainmenuView("/", "mainmenu"),
    new PlayerView("/player", "player"),
    new LoginView("/login", "login"),
];
let model = new Shaby_Model();
const TennisJournal = new Shaby_PWA("https://tj.neuwersch.eu/", "templates", routes, model, {}, "de","en");