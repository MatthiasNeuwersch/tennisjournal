"use strict";

/**********************************************************************
 *     Translation-Engine for Shaby-Fleetscan-PWA
 *     Just add your key:"value" Pairs down by.
 *
 *     ShaBy - 2019-05-25
 **********************************************************************/

class Shaby_Translator{
    constructor(...languages){
        for(const lng of languages){
            this[lng] = Shaby_Language[lng];
        }
    }

    t(language, key){
        return this[language][key];
    }

}
export default Shaby_Translator;

let Shaby_Language = {};
Shaby_Language.en = {
    //LOGIN
    forgot_pw: "Forgot Password?",
    username: "Username",
    password: "Password",
    login: "Login",

    //SETTINGS
    language: "Language",
    german: "German",
    english: "English",

    //GENERAL
    online_only: "You need an active internet connection to proceed.",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    confirm_delete: "Do you really want to delete?",

    //ADD MATCH
    date : "Date",
    matchtype : "Matchtype, Location",
    itn_match : "ITN Match",
    myITN : "My ITN",
    player2 : "Opponent",
    player2ITN: "Opponent ITN",
    surface: "Surface",
    Clay: "Sand",
    Hard: "Hardcourt",
    Carpet : "Carpet",
    Grass : "Grass",
    OtherSurface : "Other Surface",
    balls : "Balltype",
    set : "Set",
    notes : "Notes",
    submit : "Submit",
};

Shaby_Language.de = {

    //LOGIN
    forgot_pw: "Passwort vergessen?",
    username: "Benutzerkennung",
    password: "Passwort",
    login: "Anmelden",

    //SETTINGS
    language: "Sprache",
    german: "Deutsch",
    english: "Englisch",

    //GENERAL
    online_only: "Sie benötigen eine aktive Internetverbindung um fortzufahren.",
    confirm: "Bestätigen",
    yes: "Ja",
    no: "Nein",
    confirm_delete: "Möchten Sie wirklich löschen?",

    //ADD MATCH
    date : "Datum",
    matchtype : "Matchtyp, Ort",
    itn_match : "ITN gewertetes Match",
    myITN : "Meine ITN",
    player2 : "Gegner",
    player2ITN: "Gegner ITN",
    surface: "Belag",
    Clay: "Sand",
    Hard: "Hartplatz",
    Carpet : "Teppich",
    Grass : "Gras",
    OtherSurface : "Anderer Belag",
    balls : "Ballmarke",
    set : "Satz",
    notes : "Anmerkungen",
    submit : "Absenden",

};