"use strict";
import Shaby_Route from '../shaby/shaby-spa-route.js?v=0.1';
import Match from '../classes/class.match.js?v=0.1';
import Stats from "../classes/class.stats.js?v=0.1";

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
                    MainmenuView.activateMatchinputMask();
                    MainmenuView.renderStats();
                    MainmenuView.renderRecentGames();
                })
            });
        }
    };

    static activateMatchinputMask(){
        window.Shaby.utils.setDatetimeLocalToNow($("#am_date"));
        for(const player of window.Shaby.model.players)
            $("#am_player2").append("<option value='"+player.ID+"'>"+player.lastname+", "+player.firstname+"</option>");

        $("#am_submit").unbind("click").on("click",function(){
            let match = {
                owner: window.Shaby.model.user.id,
                date: $("#am_date").val(),
                matchtype: $("#am_matchtype").val(),
                itn_match : $("#am_itn_match").prop("checked") ? 1 : 0,
                myITN : $("#am_myITN").val(),
                player2 : $("#am_player2").val(),
                player2ITN : $("#am_player2ITN").val(),
                surface : $("#am_surface").val() || "",
                balls : $("#am_balls").val() || "",
                notes : $("#am_notes").val() || "",
            };
            for(let i = 1; i <= 5; i++) {
                if ($("#am_set" + i + "Team1").val() == "" )
                    break;
                match["set"+i+"Team1"] = $("#am_set"+i+"Team1").val();
                match["set"+i+"Team2"] = $("#am_set"+i+"Team2").val();
            }

            window.Shaby.model.addMatch(match).then(function(data){
                if(data != "NIX"){
                    $("form.add_match input, #am_notes").val("");
                    $("#am_balls").val("Babolat Team");
                    $("#am_matchtype").val("Freies Spiel, Post SV");
                    $("#am_itn_match").prop("checked", false);
                    $("#am_surface").val($("#am_surface  option:first").val());
                    $("#am_player2").val($("#am_player2 option:first").val());
                    window.Shaby.utils.setDatetimeLocalToNow($("#am_date"));
                }

                //TODO: IF SUCCESS, empty, Else: notify!

            })
        });
    }

    static renderRecentGames(){
        let recentMatchesContainer = $(".recentMatchesContainer");
        recentMatchesContainer.empty();
        for(const match of window.Shaby.model.matches)
            recentMatchesContainer.append(match.renderMatch());
        $("#searchPlayer").unbind("keyup").on("keyup", function(){
            window.Shaby.utils.search($(this).val(), $(".match-preview"));
        });
    }

    static renderStats(){
        let wldRatio = Stats.getWLDRatio();
        let itnWLDRatio = Stats.getWLDRatio([{"key":"itn_match", "value": 1}]);
        let clayWLDRatio = Stats.getWLDRatio([{"key": "surface", "value":"Clay"}]);
        let carpetWLDRatio = Stats.getWLDRatio([{"key":"surface", "value":"Carpet"}]);
        let hardcourtWLDRatio = Stats.getWLDRatio([{"key":"surface", "value":"Hard"}]);
        let setWLDRatio = Stats.getSetWLDRatio();
        let stats = $("<div class='stats'></div>");
        $(".matchStatsContainer").append("<h2>Statistics</h2>").append(stats);
        stats.append(Stats.renderWLD("Matches", wldRatio));
        stats.append(Stats.renderWLD("Sets", setWLDRatio));
        stats.append(Stats.renderWLD("ITN-Matches", itnWLDRatio));
        stats.append(Stats.renderWLD("Clay-Matches", clayWLDRatio));
        stats.append(Stats.renderWLD("Carpet-Matches", carpetWLDRatio));
        stats.append(Stats.renderWLD("Hardcourt-Matches", hardcourtWLDRatio));
    }
}