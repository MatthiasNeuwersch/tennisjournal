"use strict";

export default class Player {
    constructor(player) {
        Object.assign(this, player);
    }

    getLinkedPlayername(){
        let self = this;
        return ($("<div class='player "+this.sex+"'>"+this.firstname+" "+this.lastname+"</div>").on("click", function(){
            window.location.hash = "/player?id="+self.ID;
        }));
    }

    static getLinkedPlayername(id){
        return(window.Shaby.model.getPlayer(id).getLinkedPlayername());
    }
}