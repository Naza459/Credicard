(function(app) {
	app.ActiveComponent =
		ng.core.Component({
		selector: 'active-component',
		templateUrl: 'views/active.html'
		})
		.Class({
		  constructor: [app.AppCallService,ng.router.Router,ng.router.ActivatedRoute,app.LoadingServiceComponent,app.MsgComponent,
		  function(appService,router,active,loading,msg) {
	          this.router=router;
	          this.active=active;
	          this.loading=loading;
	          this.ser=appService;
	          this.mensaje=null;
			  this.msg=msg;
		  }]
		});
	app.ActiveComponent.prototype.ngOnInit=function(){
		this.mensaje=null;
		this.user=null;
		this.user_id=null;
		this.realm=null;
		this.activation_code=null;
		if(this.active.hasOwnProperty('queryParams')){
			if(!(this.active.queryParams==null || this.active.queryParams==undefined || this.active.queryParams=="")){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(!(this.active.queryParams._value==null || this.active.queryParams._value==undefined || this.active.queryParams._value=="")){
						if(this.active.queryParams._value.hasOwnProperty('activation_code')){
							this.activation_code=this.active.queryParams._value.activation_code;
						}
						if(this.active.queryParams._value.hasOwnProperty('user')){
							this.user=this.active.queryParams._value.user;
						}
					}
				}
			}
		}
		var querys="&email="+this.user+"&code="+this.activation_code;
		var mensajeAll="Error al activar cuenta";
		var request=this.ser.callServicesHttp('active',querys,null,mensajeAll);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http==200){
					delete data['status_http'];
					this.mensaje="Cuenta activada con éxito";
					this.msg.info();
					var contexto=this;
					setTimeout(function() {
						contexto.router.navigate(['/init']);
					}, 2000);
				}else{
					this.mensaje=this.ser.processMessageError(data,mensajeAll);
					this.msg.error();
				}
			}
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.ActiveComponent.prototype.calcYearCopy=function(){
		return calcYearCopy()
	}
	app.ActiveComponent.prototype.back=function(){
		doLogout();
		this.router.navigate(['/init']);
	}
})(window.app || (window.app = {}));