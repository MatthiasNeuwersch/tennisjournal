"use strict";

export default class Stats {
    constructor() {
    }

    static renderWLD(headline, wld){
        let cssClass = "";
        if(wld.won == wld.lost)
            cssClass = "draw";
        else
            cssClass = (wld.won > wld.lost ? "won":"lost");
        let draw = wld.draw > 0 ? " | Draw: "+wld.draw: "";
        return $("<div class='stats_element "+cssClass+"'><h4>"+headline+"</h4><p>Win: "+wld.won+" | Loss: "+wld.lost+draw+"</p></div>");
    }




    static getSetWinPrediction(filter){
        let setPredictions = 0;
        let numOfWatchedSets = 0;
        for(const match of window.Shaby.model.matches){
            let filter_applies = true;
            for(const single_filter of filter){
                if(match[single_filter.key] != single_filter.value){
                    filter_applies = false;
                    break;
                }
            }
            if(filter_applies){
                let ratio = {won: 0, lost: 0, prediction : 0};
                for(let i = 1; i <= 5; i++) {
                    if (match["set" + i + "Team1"] == null)
                        break;
                    numOfWatchedSets ++;
                    setPredictions += match["set" + i + "Team1"] / (match["set" + i + "Team1"] +  match["set" + i + "Team2"]);
                }
            }
        }
        return setPredictions / numOfWatchedSets;
    }

    static renderSetWinPrediction(filter){
        let prediction = Stats.getSetWinPrediction(filter);
        let cssClass = (Number(prediction) > 0.5 ? "won": "lost");
        return $("<div class='stats_element "+cssClass+"'><h4>Win Prediction<br/>(Set)</h4><p>"+(prediction*100).toFixed(2)+"%</p></div>");
    }

    //Requires Filter. Function makes sense with player2 only.
    static renderWinPrediction(filter, bestOfFive = false){
        let setPrediction = Stats.getSetWinPrediction(filter);
        let winPrediction;
        if(bestOfFive){
            winPrediction = setPrediction*setPrediction*setPrediction; // 3:0
            winPrediction += setPrediction*setPrediction*(1-setPrediction)*setPrediction; // 1:0 - 2:0 - 2:1 - 3:1
            winPrediction += setPrediction*(1-setPrediction)*setPrediction*setPrediction; // 1:0 - 1:1 - 2:1 - 3:1
            winPrediction += (1-setPrediction)*setPrediction*setPrediction*setPrediction; // 0:1 - 1:1 - 2:1 - 3:1
            winPrediction += setPrediction*setPrediction*(1-setPrediction)*(1-setPrediction)*setPrediction; // 1:0 - 2:0 - 2:1 - 2:2 - 3:2
            winPrediction += setPrediction*(1-setPrediction)*(1-setPrediction)*setPrediction*setPrediction; // 1:0 - 1:1 - 1:2 - 2:2 - 3:2
            winPrediction += setPrediction*(1-setPrediction)*setPrediction*(1-setPrediction)*setPrediction; // 1:0 - 1:1 - 2:1 - 2:2 - 3:2
            winPrediction += (1-setPrediction)*(1-setPrediction)*setPrediction*setPrediction*setPrediction; // 0:1 - 0:2 - 1:2 - 2:2 - 3:2
            winPrediction += (1-setPrediction)*setPrediction*(1-setPrediction)*setPrediction*setPrediction; // 0:1 - 1:1 - 1:2 - 2:2 - 3:2
            winPrediction += (1-setPrediction)*setPrediction*setPrediction*(1-setPrediction)*setPrediction; // 0:1 - 1:1 - 2:1 - 2:2 - 3:2
        }
        else
            winPrediction = (setPrediction*setPrediction)+(setPrediction*(1-setPrediction)*setPrediction)+((1-setPrediction)*setPrediction*setPrediction);
        let cssClass = (Number(winPrediction) > 0.5 ? "won": "lost");
        return $("<div class='stats_element "+cssClass+"'><h4>Win Prediction <br/>(Best of "+(bestOfFive ? "5":"3")+")</h4><p>"+(winPrediction*100).toFixed(2)+"%</p></div>");
    }

    static getWLDRatio(filter = false){
        let ratio = {won: 0, lost: 0, draw: 0};
        for(const match of window.Shaby.model.matches){
            if(!filter)
                ratio[match.wonLostOrDraw()]++;
            else{
                let filter_applies = true;
                for(const single_filter of filter){
                    if(match[single_filter.key] != single_filter.value){
                        filter_applies = false;
                        break;
                    }
                }
                if(filter_applies)
                    ratio[match.wonLostOrDraw()]++;
            }
        }
        return ratio;
    }

    static getSetWLDRatio(filter = false){
        let ratio = {won: 0, lost: 0, draw: 0};
        for(const match of window.Shaby.model.matches){
            if(!filter){
                for(let i = 1; i <= 5; i++) {
                    if (match["set" + i + "Team1"] == null)
                        break;
                    ratio[match.setWonLostOrDraw(i)]++;
                }
            }else{
                let filter_applies = true;
                for(const single_filter of filter){
                    if(match[single_filter.key] != single_filter.value){
                        filter_applies = false;
                        break;
                    }
                }
                if(filter_applies){
                    for(let i = 1; i <= 5; i++) {
                        if (match["set" + i + "Team1"] == null)
                            break;
                        ratio[match.setWonLostOrDraw(i)]++;
                    }
                }
            }
        }
        return ratio;
    }
}