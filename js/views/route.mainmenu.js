"use strict";
import Shaby_Route from '../shaby/shaby-spa-route.js?v=0.1';
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
            $("#am_player2").append("<option value='"+player.ID+"'>"+player.firstname+" "+player.lastname+"</option>");

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
                notes : $("#notes").val() || "",
            };
            for(let i = 1; i <= 5; i++) {
                if ($("#am_set" + i + "Team1").val() == "" )
                    break;
                match["set"+i+"Team1"] = $("#am_set"+i+"Team1").val();
                match["set"+i+"Team2"] = $("#am_set"+i+"Team2").val();
            }

            window.Shaby.model.addMatch(match).then(function(data){
                console.log(data);
                if(data != "NIX"){
                    $("form.add_match input").val("");
                    $("#am_itn_match").prop("checked", false);
                    $("#am_surface").val($("#am_surface  option:first").val());
                    $("#am_player2").val($("#am_player2 option:first").val());
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