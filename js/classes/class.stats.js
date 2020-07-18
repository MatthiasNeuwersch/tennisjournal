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
        return $("<div class='stats_element "+cssClass+"'><h4>"+headline+"</h4><p>Win: "+wld.won+" | Loss: "+wld.lost+" | Draw: "+wld.draw+"</p></div>");
    }
}