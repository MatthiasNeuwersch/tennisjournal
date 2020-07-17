"use strict";
import Match from '../classes/class.match.js?v=0.1';
import Player from '../classes/class.player.js?v=0.1';

export default class Shaby_Model {
    constructor() {
        this.user = undefined;
        this.matches = [];
        this.players = [];
    }

    login(user_json) {
        this.user = JSON.parse(user_json);
        window.Shaby.utils.setCookie("user", JSON.stringify(this.user), 1);
    }

    resolveUser(){
        this.user = JSON.parse(window.Shaby.utils.getCookie("user"));
    }

    getMatches() {
        let self = this;
        this.matches = [];
        return new Promise(resolve => {
            window.Shaby.api.getMatches(this.user.id, function(matches){
                for(const match of JSON.parse(matches))
                    self.matches.push(new Match(match));
                resolve();
            });
        });
    }

    addMatch(match){
        return new Promise(resolve => {
            window.Shaby.api.addMatch(match, function(data){
                resolve(data);
            });
        });
    }

    getPlayers() {
        let self = this;
        this.players = [];
        return new Promise(resolve => {
            window.Shaby.api.getPlayers(this.user.id, function(players){
                for(const player of JSON.parse(players))
                    self.players.push(new Player(player));
                resolve();
            });
        });
    }

    getPlayer(id){
        for(const player of this.players){
            if(player.ID == id)
                return player;
        }
    }
}