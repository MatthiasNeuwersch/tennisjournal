"use strict";
import Shaby_Route from '../shaby/shaby-spa-route.js?v=0.1';

export default class LoginView extends Shaby_Route{
    constructor(slug, template){
        super(slug, template);
    }

    init(){
        if(!window.Shaby.utils.getCookie("user"))
            $("#login-submit").unbind("click").on("click", this.handleSubmit);
        else
            window.location.hash = "/";
    };

    handleSubmit(e){
        e.preventDefault();
        window.Shaby.api.login($("#login-username").val(), $("#login-password").val(), LoginView.loginCallback);
    };

    static loginCallback(response){
        if(response){
            window.Shaby.model.login(response);
            window.location.hash = "/";
        }
        else
            alert("Login Failed");
    }
}