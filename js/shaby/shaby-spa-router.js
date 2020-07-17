'use strict';
/*******************************************************
 *     Hash-based router for Single Page Applications.
 *     Handles Routes behind a '/#/' to your convenience.
 *     First Route will be handled as homeRoute.
 *     Second Route will be handled as 404Route;
 *
 *     ShaBy - 2019-04-20
 *******************************************************/
export default class Shaby_SPA_Router{
    constructor(routes, route404 = undefined){
        console.log(routes);
        this.routes = routes;
        this.route404 = route404;
        this.homeRoute = this.routes[0];
        this.init();
    }

    init(){
        window.removeEventListener('hashchange', this.hasChanged);
        window.addEventListener('hashchange',this.hasChanged.bind(this));
        this.hasChanged();
    }

    hasChanged(){
        if (window.location.hash.length > 2) {
            for (const route of this.routes) {
                if (route.isActive()){
                    this.goToRoute(route);
                    return;
                }
            }
            if(this.route404)
                window.location.hash = this.route404.slug;
            else{
                console.log("I have no Idea where "+window.location.hash+" should be, but hey - taste some startpage!");
                window.location.hash = this.homeRoute.slug;
            }
        } else{
            window.location.hash = this.homeRoute.slug;
            this.goToRoute(this.homeRoute);
        }
    };

    goToRoute(route) {
        route.renderMarkup();
    }
}