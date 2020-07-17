"use strict";
import Player from '../classes/class.player.js?v=0.1';

export default class Match {
    constructor(match) {
        Object.assign(this, match);
        for(let i = 1; i<=5; i++){
            for(let j = 1; j<=2; j++){
                if(this["set"+i+"Team"+j] != null)
                    this["set"+i+"Team"+j] = Number(this["set"+i+"Team"+j]);
            }
        }
        this.mode = this.player3 == null ? "singles" : "doubles";
    }

    renderMatch(){
        let match = $("<div class='match-preview"+this.getMatchAttributesAsCssClasses()+"' data-match-id='"+this.id+"'></div>");
        if(this.mode == "singles"){
            let opponent = $("<div class='opponent'></div>");
            opponent.append(Player.getLinkedPlayername(this.player2));
            match.append(opponent);
        }
        match.append(this.getHTMLFormattedMatchresult());
        match.append(this.matchtype);
        let matchDetails = $("<div class='match_details'></div>");
        matchDetails.append("<div class='match_date'>"+this.date+"</div>");
        if(this.balls != null)
            matchDetails.append("<div class='match_balls'>"+this.balls+"</div>");
        if(this.notes != null)
            matchDetails.append("<div class='notes'>"+this.notes+"</div>");
        match.append(matchDetails);
        return match;
    }

    getSetResult(){
        let won = 0;
        let lost = 0;
        let draw = 0;
        for(let i = 1; i <= 5; i++){
            if(this["set"+i+"Team1"] == null)
                break;
            if(this["set"+i+"Team1"] == this["set"+i+"Team2"])
                draw ++;
            else if(this["set"+i+"Team1"] > this["set"+i+"Team2"])
                won++;
            else
                lost++;
        }
        return {won: won, lost: lost, draw: draw};
    }

    getReadableMatchresult(){
        let result = "";
        for(let i = 1; i <= 5; i++) {
            if (this["set" + i + "Team1"] == null)
                break;
            if(i >=2)
                result += " ";
            result += this["set"+i+"Team1"] + "-"+this["set"+i+"Team2"];
        }
        return result;
    }

    getHTMLFormattedMatchresult(){
        let result = "<div class='match_result'>";
        for(let i = 1; i <= 5; i++) {
            if (this["set" + i + "Team1"] == null)
                break;
            result += "<span class='setResult "+this.setWonLostOrDraw(i)+"'>"+this["set"+i+"Team1"] + "-"+this["set"+i+"Team2"]+"</span>";
        }
        result += "</div>";
        return result;
    }

    setWonLostOrDraw(setNumber){
        if(this["set"+setNumber+"Team1"] == this["set"+setNumber+"Team2"])
            return "draw";
        else
            return(this["set"+setNumber+"Team1"] > this["set"+setNumber+"Team2"] ? "won" : "lost");
    }


    wonLostOrDraw(){
        let setResult = this.getSetResult();
        if(setResult.won == setResult.lost)
            return "draw";
        else
            return (setResult.won > setResult.lost ? "won" : "lost");
    }

    getMatchAttributesAsCssClasses(){
        let classes = [this.mode];
        if(this.itn_match)
            classes.push("itn_match");
        classes.push(this.wonLostOrDraw());
        classes.push(this.surface);
        return classes.length ? " "+classes.join(" ") : "";
    }

    static getWLDRatio(filter = false){
        let ratio = {
            won: 0,
            lost: 0,
            draw: 0
        };
        for(const match of window.Shaby.model.matches){
            if(!filter)
                ratio[match.wonLostOrDraw()]++;
            else{
                if(match[filter.key] == filter.value)
                    ratio[match.wonLostOrDraw()]++;
            }
        }
        return ratio;
    }

    static getSetWLDRatio(){
        let ratio = {
            won: 0,
            lost: 0,
            draw: 0
        };
        for(const match of window.Shaby.model.matches){
            for(let i = 1; i <= 5; i++) {
                if (match["set" + i + "Team1"] == null)
                    break;
                ratio[match.setWonLostOrDraw(i)]++;
            }
        }
        return ratio;
    }

}