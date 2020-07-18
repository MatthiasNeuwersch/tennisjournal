"use strict";

export default class Player {
    constructor(player) {
        Object.assign(this, player);
    }

    getLinkedPlayername(myITN, player2ITN){
        let self = this;
        let itnDiff = (Number(myITN) - Number(player2ITN)).toFixed(3);
        itnDiff = itnDiff * -1;
        itnDiff = itnDiff > 0 ? "+"+itnDiff : itnDiff;
        let itnString = myITN != "0.000" && player2ITN != "0.000" ? "("+ (player2ITN != "0.000" ? player2ITN+"; "+itnDiff : "")+")" : "";
        return ($("<div class='player "+this.sex+"'>"+this.firstname+" "+this.lastname+itnString+"</div>").on("click", function(){
            window.location.hash = "/player?id="+self.ID;
        }));
    }

    static getLinkedPlayername(id, myITN = "0.000", player2ITN = "0.000"){
        return(window.Shaby.model.getPlayer(id).getLinkedPlayername(myITN, player2ITN));
    }
}