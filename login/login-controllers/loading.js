(function (app) {
    'use strict';
    app.LoadingServiceComponent = ng.core
        .Component({
            selector: 'loading-service',
            template: '<div class="modal" style="text-align:center;margin-top:180px;" scroll="no" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div><img style="width:70px;height:70px;"src="assets/images/loading.gif"></div></div>'
        })
        .Class({
           constructor: [
                function () {
                  
                }            
            ]
        });
    app.LoadingServiceComponent.prototype.showPleaseWait=function(){
        $("#pleaseWaitDialog").modal();
    }  
    app.LoadingServiceComponent.prototype.hidePleaseWait=function () {
        $("#pleaseWaitDialog").modal('hide');
    }
})(window.app || (window.app = {}));
