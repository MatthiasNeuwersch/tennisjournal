"use strict";
import Shaby_Route from '../shaby/shaby-spa-route.js?v=0.1';
import Match from '../classes/class.match.js?v=0.1';
import Stats from '../classes/class.stats.js?v=0.1';

export default class PlayerView extends Shaby_Route{
    constructor(slug, template){
        super(slug, template);
        this.player = undefined;
    }

    init(){
        if(!window.Shaby.utils.getCookie("user"))
            window.location.hash = "/login";
        else if ((window.Shaby.utils.isEmpty(window.Shaby.getParams["id"])))
            window.location.hash = "/";
        else{
            this.player = window.Shaby.model.getPlayer(window.Shaby.getParams["id"]);
            if(this.player == undefined)
                window.location.hash = "/";
            else
                this.renderPlayersview();
        }
    };

    renderPlayersview(){
        $("#headercontent h1").text(this.player.firstname+" "+this.player.lastname);
        this.renderH2H();
        this.renderRecentGames();
    }

    renderH2H(){
        let wldRatio = Stats.getWLDRatio([{"key": "player2", "value":this.player.ID}]);
        let clayWLDRatio = Stats.getWLDRatio([{"key": "player2", "value":this.player.ID},{"key": "surface", "value":"Clay"}]);
        let carpetWLDRatio = Stats.getWLDRatio([{"key": "player2", "value":this.player.ID},{"key": "surface", "value":"Carpet"}]);
        let hardcourtWLDRatio = Stats.getWLDRatio([{"key": "player2", "value":this.player.ID},{"key": "surface", "value":"Hard"}]);
        let setWLDRatio = Stats.getSetWLDRatio([{"key": "player2", "value":this.player.ID}]);
        let stats = $("<div class='stats'></div>");
        $(".player_container").append("<h2>Statistics</h2>").append(stats);
        stats.append(Stats.renderWLD("Head2Head", wldRatio));
        stats.append(Stats.renderWLD("Sets", setWLDRatio));
        stats.append(Stats.renderWLD("Clay-Matches", clayWLDRatio));
        stats.append(Stats.renderWLD("Carpet-Matches", carpetWLDRatio));
        stats.append(Stats.renderWLD("Hardcourt-Matches", hardcourtWLDRatio));
        stats.append(Stats.renderSetWinPrediction([{"key": "player2", "value":this.player.ID}]));
        stats.append(Stats.renderWinPrediction([{"key": "player2", "value":this.player.ID}]));
        stats.append(Stats.renderWinPrediction([{"key": "player2", "value":this.player.ID}], true));
    }

    renderRecentGames(){
        for(const match of window.Shaby.model.matches){
            if(match["player2"] == this.player.ID)
                $(".player_container").append(match.renderMatch());

        }
    }
}