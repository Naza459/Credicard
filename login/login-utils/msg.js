(function(app) {
  app.MsgComponent =
    ng.core.Component({
    	selector:  'msg-component',
     	templateUrl: 'views/msg.html',
      inputs:['mensaje'],
      outputs:['valueChanged','valueChangedError']
    })
    .Class({
      constructor: [function() {
        this.valueChanged = new ng.core.EventEmitter();
        this.valueChangedError= new ng.core.EventEmitter();
      }]
    });

    app.MsgComponent.prototype.info=function(){
        $("#msgInfo").modal();
    }
    app.MsgComponent.prototype.error=function(){
      $("#msgError").modal();
    }
    app.MsgComponent.prototype.error2=function(){
      $("#msgErrorRedirect").modal();
    }
    app.MsgComponent.prototype.warning=function(){
      $("#msgWarning").modal();
    }
    app.MsgComponent.prototype.sendMsg=function(){
      this.valueChanged.emit(); 
    }
    app.MsgComponent.prototype.sendMsg2=function(){
      this.valueChangedError.emit();   
    }
})(window.app || (window.app = {}));