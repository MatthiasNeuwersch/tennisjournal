'use strict';
/*******************************************************
 *     API-Class to connect to Fleetscan API.
 *     Fleetscan API is a SOAP-Api, therefore some
 *     transformations are needed to get a valid JSON.
 *
 *     ShaBy - 2019-05-26
 *******************************************************/
export default class API {
    constructor() {}

    login(email, password, callback){
        let user = {
            "email" : email,
            "password" : password
        };
        API.request("Login", JSON.stringify(user), callback);
    };

    getMatches(id, callback){
        API.request("getMatches", JSON.stringify({id:id}), callback)
    }

    addMatch(match, callback){
        API.request("addMatch", JSON.stringify(match), callback)
    }

    getPlayers(id, callback){
        API.request("getPlayers", JSON.stringify({id:id}), callback);
    }

    static request(purpose, json, callback){
        $.ajax({
            url: "./ajax.php",
            data : {
                "purpose" : purpose,
                "data" : json
            },
            method: 'POST'
        }).done(function(data){
            callback(data);
        });
    };

}