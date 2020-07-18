"use strict";

export default class Player {
    constructor(player) {
        Object.assign(this, player);
    }

    getLinkedPlayername(itn){
        let self = this;
        return ($("<div class='player "+this.sex+"'>"+this.firstname+" "+this.lastname+" ("+itn+")</div>").on("click", function(){
            window.location.hash = "/player?id="+self.ID;
        }));
    }

    static getLinkedPlayername(id, itn){
        return(window.Shaby.model.getPlayer(id).getLinkedPlayername(itn));
    }
}