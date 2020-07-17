"use strict";

export default class Shaby_DataBinder{
    constructor(object_id){
        this.pubSub = $({});
        this.data_attribute = "bind-"+object_id;
        this.message = object_id + ":change";
        this.init();
    }

    init(){
        let self = this;
        $(document).on("change", "[data-" + self.data_attribute + "][data-action='change']", this.listen.bind(this));
        $(document).on("keyup", "[data-" + self.data_attribute + "][data-action='keyup']", this.listen.bind(this));

        this.pubSub.on(self.message, function (event, property_name, new_value, initiator) {
            $("[data-" + self.data_attribute + "=" + property_name + "]").each(function () {
                if($(this)[0] != initiator[0]){
                    //TODO: Selects/Radios
                    if ($(this).is("input[type='text'], input[type='number'], textarea, select"))
                        $(this).val(new_value);
                    else if($(this).is("input[type='checkbox']"))
                        $(this).prop("checked", (new_value == 1));
                    else
                        $(this).html(new_value);
                }
            });
        });
    }

    listen(e){
        let $source = $(e.target);
        let self = this;
        if($source.is("input[type='text'], input[type='number'], textarea, select"))
            self.pubSub.trigger(self.message, [$source.data(self.data_attribute), $source.val(), $source]);
        else if($source.is("input[type='checkbox']"))
            self.pubSub.trigger(self.message, [$source.data(self.data_attribute), ($source.prop("checked") ? 1 : 0), $source]);
        else
            self.pubSub.trigger(self.message, [$source.data(self.data_attribute), $source.html(), $source]);
    }
}