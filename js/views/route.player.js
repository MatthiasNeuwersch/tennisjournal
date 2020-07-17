"use strict";
import Shaby_Route from './../shaby/shaby-spa-route.js?v=0.1';

export default class PlayerView extends Shaby_Route{
    constructor(slug, template){
        super(slug, template);
        this.player = undefined;
    }

    init(){

        if(!window.Shaby.utils.getCookie("user") || window.Shaby.utils.isEmpty(window.Shaby.model.players))
            window.location.hash = "/login";
        else if ((window.Shaby.utils.isEmpty(window.Shaby.getParams["id"])))
            window.location.hash = "/";
        else{
            this.player = window.Shaby.model.getPlayer(window.Shaby.getParams["id"]);
            if(this.player == false)
                window.location.hash = "/";
            else
                this.renderPlayersview();
        }
    };

    renderPlayersview(){
        $(".player_container").append("<h2>"+this.player.firstname+" "+this.player.lastname+"</h2>");
    }
}