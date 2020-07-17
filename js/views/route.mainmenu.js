"use strict";
import Shaby_Route from './../shaby/shaby-spa-route.js?v=0.1';
import Match from '../classes/class.match.js?v=0.1';

export default class MainmenuView extends Shaby_Route{
    constructor(slug, template){
        super(slug, template);
        this.numOfRecentGamesShown = 5;
    }

    init(){
        if(!window.Shaby.utils.getCookie("user"))
            window.location.hash = "/login";
        else{
            if(window.Shaby.utils.isEmpty(window.Shaby.model.user))
                window.Shaby.model.resolveUser();
            window.Shaby.model.getPlayers().then(function(){
                window.Shaby.model.getMatches().then(function(){
                    MainmenuView.renderRecentGames();
                    MainmenuView.renderStats();
                })
            });
        }
    };

    static renderRecentGames(){
        let recentMatchesContainer = $(".recentMatchesContainer");
        recentMatchesContainer.empty();
        for(const match of window.Shaby.model.matches)
            recentMatchesContainer.append(match.renderMatch());
    }

    static renderStats(){
        let wldRatio = Match.getWLDRatio();
        let itnWLDRatio = Match.getWLDRatio({"key":"itn_match", "value": 1});
        let clayWLDRatio = Match.getWLDRatio({"key": "surface", "value":"Clay"});
        let carpetWLDRatio = Match.getWLDRatio({"key":"surface", "value":"Carpet"});
        let setWLDRatio = Match.getSetWLDRatio();
        $(".matchStatsContainer").append("<h3>Matches</h3><p>W: "+wldRatio.won+" | L: "+wldRatio.lost+" | D: "+wldRatio.draw+"</p>");
        $(".matchStatsContainer").append("<h3>Sets</h3><p>W: "+setWLDRatio.won+" | L: "+setWLDRatio.lost+" | D: "+setWLDRatio.draw+"</p>");
        $(".matchStatsContainer").append("<h3>ITN-Matches</h3><p>W: "+itnWLDRatio.won+" | L: "+itnWLDRatio.lost+" | D: "+itnWLDRatio.draw+"</p>");
        $(".matchStatsContainer").append("<h3>Clay-Matches</h3><p>W: "+clayWLDRatio.won+" | L: "+clayWLDRatio.lost+" | D: "+clayWLDRatio.draw+"</p>");
        $(".matchStatsContainer").append("<h3>Carpet-Matches</h3><p>W: "+carpetWLDRatio.won+" | L: "+carpetWLDRatio.lost+" | D: "+carpetWLDRatio.draw+"</p>");
    }
}