"use strict";
import Shaby_Utils from './shaby-utils.js?v=0.1';
import Shaby_App_Lib from './shaby-app-lib.js?v=0.1';
import Shaby_SPA_Router from './shaby-spa-router.js?v=0.1';
import Shaby_Translator from './shaby-language.js?v=0.1';
import Charter from './../classes/class.charter.js?v=0.1';
import API from './../api.js?v=0.1';

/**********************************************************************
 *     Class-Bundle for PWAs.
 *     App-Shell needs an ID "#shaby_app".
 *
 *     @param:
 *     webRoot - Give me the root-URL of your App
 *     templatesPath - Give me the Path to your templates
 *       relative to your webRoot.
 *     routes - Give me an Object with "slug" : "template" Routes
 *     ...languages - Give me all languages you want your App to support.
 *
 *     ShaBy - 2020-07-02
 **********************************************************************/
export default class Shaby_PWA{
    constructor(webRoot, templatesPath, routes, model = {}, config = {}, ...languages) {
        this._currentLanguage = "de"; //Todo: Find a way, not to hardcode this.
        this.system = {
            webRoot: webRoot,
            templatesPath : templatesPath,
            app: document.getElementById('shaby_app'),
            debugmode: true
        };
        this.api = new API();
        this.translator = languages.length ? new Shaby_Translator(...languages) : new Shaby_Translator("de");
        this.getParams = {};
        window.Shaby = this;
        this.utils = new Shaby_Utils();
        this.appLib = new Shaby_App_Lib();
        this.router = new Shaby_SPA_Router(routes);
        this.model = model;
        this.charter = new Charter();
        this.serviceWorker();
        this.initAppMenu();
    }

    get currentLanguage(){
        return this._currentLanguage;
    }

    set currentLanguage(lng){
        this._currentLanguage = lng;
        let changeEvent = new Event("languageChange");
        this.dispatchEvent(changeEvent);
    }

    serviceWorker(){
        if('serviceWorker' in navigator) {
            navigator.serviceWorker.register('serviceworker.js?')
                .then(function() {
                    console.log('Service Worker Registered');
                });
        }
    }

    /********************************************
     * Delivers Resource in current Language.
     * key should be found in shaby-language.js
     ********************************************/
    t(key){
        return(this.translator.t(this.currentLanguage, key));
    }

    initAppMenu(){
        let self = this;
        $.get(window.Shaby.system.webRoot+window.Shaby.system.templatesPath+"/footer.tpl", function(tpl) {
            let markup = tpl,
                open = /<%>/gi,
                result,
                indices_open = [],
                indices_close = [],
                even = true;
            while ((result = open.exec(tpl))) {
                even ? indices_open.push(result.index) : indices_close.push(result.index);
                even = !even;
            }
            for (let i = 0; i < indices_close.length; i++) {
                let word = window.Shaby.t(tpl.substring(indices_open[i] + 3, indices_close[i]));
                markup = markup.replace(tpl.substring(indices_open[i], indices_close[i] + 3), word);
            }
            $("#footer").html(markup);
            $("#back").unbind("click").on("click", function () {
                window.history.back();
            });

            $("#home").unbind("click").on("click", function () {
                window.location.hash = "/";
            });

            $("#logout").unbind("click").on("click", function () {
                self.model.logout();
            });
        });
    }
}