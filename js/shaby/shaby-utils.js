"use strict";

/***************************************************
 *  A Collectorclass for several useful functions
 *
 *  ShaBy, 2019-04-20
 ***************************************************/

class Shaby_Utils{
    constructor(){}

    getOS(){
        let device = "Unknown Device";
        if(navigator.appVersion.indexOf("Win")!=-1) device = "Windows";
        if(navigator.appVersion.indexOf("Mac")!=-1) device = "MacOS/iOS";
        if(navigator.appVersion.indexOf("Android")!=-1) device = "Android";
        return device;
    }

    isEmpty(variable) {
        if(Array.isArray(variable)) {
            return (variable.length == 0);
        } else if(typeof variable === "object") {
            return (Object.entries(variable).length === 0 && variable.constructor === Object);
        } else {
            return (typeof variable === "undefined" || variable == null || variable == "");
        }
    }

    //Name = programm ;)
    getIndexOfObjectInArrayByPropertyvalue(array, attr, value) {
        for(let i = 0; i < array.length; i++) {
            if(array[i][attr] === value)
                return i;
        }
        return -1;
    };

    setCookie(name,value,days){
        let expires;
        if (days) {
            let date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        else
            expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    };

    stringToBool(value){
        return (value=="1");
    }

    getCookie(name){
        let nameEQ = name + "=",
            cookiesArray = document.cookie.split(';');
        for(let i=0;i < cookiesArray.length;i++) {
            let cookie = cookiesArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1,cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0)
                return cookie.substring(nameEQ.length,cookie.length);
        }
        return null;
    };

    deleteCookie(name){
        window.Shaby.utils.setCookie(name,"",-1);
    };

    arrayDifference(a, b){
        return a.filter(notContainedIn(b));

        function notContainedIn(array){
            return function arrNotContains(element) {
                return array.indexOf(element) === -1;
            };
        }
    };

    monthOfDay(day){
        if (day <= 31)
            return 1;
        if ( day <= 59)
            return 2;
        if  (day <= 90)
            return 3;
        if  (day <= 120)
            return 4;
        if (day <= 151)
            return 5;
        if  (day <= 181)
            return 6;
        if (day <= 222)
            return 7;
        if ( day<=253)
            return 8;
        if (day <= 283)
            return 9;
        if  (day <= 314)
            return 10;
        if  (day <= 334)
            return 11;
        if (day <= 365)
            return 12;
        return -1;
    }

    twoDigitNumber(i){
        return i <= 9 ? "0"+i : i;
    }

    roundUpTo(round, upto){
        return (round%upto)>0?(round-(round%upto)+upto): round;
    }

    roundDownTo(round, downto){
        return (round%downto)>0?(round-(round%downto)): round;
    }

    getDateFromTimestamp(timestamp){
        let date = new Date(timestamp*1000);
        date = this.twoDigitNumber(date.getDate()) + "-" + this.twoDigitNumber(months[date.getMonth()]) + "-" + date.getFullYear();
        return(this.getFormatedDateFromDate());
    };

    getFormatedDateFromDate(date){
        let day = this.twoDigitNumber(date.getDate());
        let month = this.twoDigitNumber(date.getMonth() + 1);
        let year = date.getFullYear();
        return (year + '-' + month+ '-' + day);
    }

    sanitize(s){
        return s.replace(/ |\(|\)/g, '');
    };

    strMaxLength(string, maxlength){
        if(string.length > maxlength)
            return string.substring(0,maxlength)+"...";
        return string;
    }

    search(searchtag, selector, data){
        $('.displaynone').removeClass("displaynone");
        selector.each(function(index, element){
            let visible = false;
            for(let i = 0; i < data.length; i++){
                if($(element).data(data[i]).toString().toLowerCase().includes(searchtag.toString().toLowerCase())){
                    visible = true;
                    break;
                }
            }
            if (!visible)
                $(element).addClass("displaynone");
        });
    };

    twoDigits(number){
        return Math.round((number + Number.EPSILON) * 100) / 100;
    }

    numberformat(number, maxFractionDigits = 2, minFractionDigits = 0){
        return number.toLocaleString('de-DE', { maximumFractionDigits: maxFractionDigits, minimumFractionDigits: minFractionDigits});
    }

    moneyformat(money){
        return money.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
    };

    htmlEntities(string){
        return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    mergeObjects(obj, src){
        Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
        return obj;
    };

    confirm(question, callback){
        $('#confirm_overlay').remove();
        let element = "<div id='confirm_overlay' class='active'><div id='confirm'><div class='headline'>"+window.Shaby.t('confirm')+"</div><div class='text'>"+question+"</div>" +
            "<div class='button_box'><div id='confirm_ok' class='button'>"+window.Shaby.t('yes')+"</div><div id='confirm_cancel' class='button'>"+window.Shaby.t('no')+"</div></div>" +
            "</div></div>";
        $('body').append($(element)).css('overflow', 'hidden');

        $('#confirm_ok').unbind().on('click', function(){
            $('#confirm_overlay').removeClass('active');
            $('body').css('overflow', 'auto');
            callback(true);
        });

        $('#confirm_cancel').unbind().on('click', function(){
            $('#confirm_overlay').removeClass('active');
            $('body').css('overflow', 'auto');
            callback(false);
        })
    }

    complexConfirm(question, headline, ok_button, callback){
        $('#confirm_overlay').remove();
        let element = "<div id='confirm_overlay' class='active'><div id='confirm'><div class='headline'>"+window.Shaby.t(headline)+"</div><div class='text'>"+window.Shaby.t(question)+"</div>" +
            "<div class='button_box'><div id='confirm_ok' class='button'>"+window.Shaby.t(ok_button)+"</div><div id='confirm_cancel' class='button'>"+window.Shaby.t('no')+"</div></div>" +
            "</div></div>";
        $('body').append($(element)).css('overflow', 'hidden');;

        $('#confirm_ok').unbind().on('click', function(){
            $('#confirm_overlay').removeClass('active');
            $('body').css('overflow', 'auto');
            callback(true);
        });

        $('#confirm_cancel').unbind().on('click', function(){
            $('#confirm_overlay').removeClass('active');
            $('body').css('overflow', 'auto');
            callback(false);
        })
    }

    modal(html, headline = ''){
        if(!$('#modal').length) {
            let element = "<div id='modal_overlay' class='active'><div id='modal'><span class='icon-cross'></span><div class='headline'>"+headline+"</div><div class='text'>"+html+"</div></div></div>";
            $('body').append($(element)).css('overflow', 'hidden');
        }
        else {
            $('#modal .text').text(html);
            $('#modal .headline').text(headline);
            $('#modal_overlay').addClass('active');
            $('body').css('overflow', 'hidden');
        }
        $('#modal .icon-cross').unbind().on('click', function(){
            $('#modal_overlay').removeClass('active');
            $('#lds-roller').removeClass('active');
            $('body').css('overflow', 'auto');
        });
    }

    sanitizeFilename(str){
        return(str);
        // return str.replace("/[^a-z0-9\.]/", "").toLowerCase();
    }
}
export default Shaby_Utils;