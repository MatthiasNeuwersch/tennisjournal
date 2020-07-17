'use strict';
/*******************************************************
 *     Hash-based Routes for Single Page Applications.
 *     Routes can are treated like Views. Each Route is
 *     therefore bound to one single (unique) View.
 *
 *     ShaBy - 2019-05-25
 *******************************************************/

const app = document.getElementById('shaby_app');
export default class Shaby_Route{
    constructor(slug, template){
        this.slug = slug;
        this.template = template;
        window.addEventListener("templateChanged", this.listen.bind(this));
    }

    listen(e){
        if(e.detail.slug == this.slug)
            this.init();
    };

    init(){
        console.log("init");
    }

    isActive(){
        if(window.Shaby.utils.isEmpty(Shaby_Route.getGetParameters()))
            return (window.location.hash.substr(1).replace('#','') === this.slug);
        else{
            let index = window.location.hash.substr(1).indexOf("?");
            return (window.location.hash.substr(1,index).replace("#","") === this.slug);
        }
    };

    renderMarkup(){
        if(typeof(template) === "function")
            app.innerHTML = this.template();
        else
            this.tpl();
    }

    tpl()  {
        let slug = this.slug;
        $.get(window.Shaby.system.webRoot+window.Shaby.system.templatesPath+"/"+this.template+".tpl", function(tpl) {
            let markup = tpl,
                open = /<%>/gi,
                result,
                indices_open = [],
                indices_close = [],
                even = true;
            while ( (result = open.exec(tpl)) ) {
                even ? indices_open.push(result.index): indices_close.push(result.index);
                even = !even;
            }
            for(let i = 0; i < indices_close.length; i++){
                let word = window.Shaby.t(tpl.substring(indices_open[i]+3, indices_close[i]));
                markup = markup.replace(tpl.substring(indices_open[i], indices_close[i]+3), word);
            }
            app.innerHTML = markup;
            window.Shaby.getParams = Shaby_Route.getGetParameters();
            window.dispatchEvent(new CustomEvent("templateChanged", {detail : {slug: slug}}));
        });
    };

    static getGetParameters() {
        let index = window.location.hash.substr(1).indexOf("?");
        if (index != -1) {
            let parameters = window.location.hash.substr(index+2);
            let result = parameters.split('&').reduce(function (result, item) {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {});
            return(result);
        } else
            return {};
    }
}