(function (app) {
    'use strict';
    app.CreateBarMenuComponent = ng.core 
        .Component({
            selector: 'bar-menu',
            templateUrl: 'views/bar-with-menu_v3.html',
            outputs: ['valueChanged'],
            inputs:['nombre_usuario','nombre_email','id_doc','actions']
        })
        .Class({
           constructor: [
                app.AppCallService, 
                app.MsgComponent,
                ng.router.Router, 
                ng.router.ActivatedRoute,
                function (appService,msg,router,active) {
                    this.servicio=appService;
                    this.msg=msg;
                    this.router = router;
                    this.active=active;
                    this.valueChanged = new ng.core.EventEmitter();
					this.mensaje
                }            
            ]
        });
		app.CreateBarMenuComponent.prototype.signOut=function(){
			let mensajeAll="Error al cerrar sesion";
			if(this.servicio.getAccessToken()==null){
				doLogout();
				this.router.navigate(['/init']);
			}else{
				let request=this.servicio.callServicesHttp('logout',null,null);
				request.subscribe(data=>{
					doLogout();
					this.router.navigate(['/init']);
				},err=>{
					doLogout();
					this.router.navigate(['/init']);
				});
			}
		}
		app.CreateBarMenuComponent.prototype.calcYearCopy=function(){
			return calcYearCopy()
		}
		app.CreateBarMenuComponent.prototype.openModal=function(){
			$("#extenderSesion").modal();
		}
		app.CreateBarMenuComponent.prototype.extendSesion=function(){
			detenerSetInterval1();
			app.LoadingServiceComponent.prototype.showPleaseWait();
			 $.ajax({
				type: "PUT",
				url: getApi()+getEnlaceAuth()+"/refresh?refresh_token="+app.AppCallService.prototype.getRefreshToken(),
				beforeSend: function(request) {
					request.setRequestHeader("Authorization", "Bearer "+app.AppCallService.prototype.getAccessToken());
				},
				dataType: "json",
				success: function (r) {
					app.LoadingServiceComponent.prototype.hidePleaseWait();
					if(r.code==202){
						doLogout();
						window.location.href="/init";
					}else{
						if(r.hasOwnProperty("access_token")){
							app.AppCallService.prototype.setAccessToken(r.access_token);
						}
						if(r.hasOwnProperty("refresh_token")){
							app.AppCallService.prototype.setRefreshToken(r.refresh_token);
						}
						if(r.hasOwnProperty("expires_in")){
							if(!(r.expires_in==null || r.expires_in==undefined || r.expires_in=="" || r.expires_in==0)){
								var tiempo=r.expires_in;
								detenerSetInterval1();
								app.AppCallService.prototype.setTimeSession(tiempo);
								asyncSqrt(tiempo,function(value, result) {
								});
							}
						}
					}
				},
				error: function (r) {
					app.LoadingServiceComponent.prototype.hidePleaseWait();
					doLogout();
					window.location.href="/init";
				},
				failure: function (r) {
					app.LoadingServiceComponent.prototype.hidePleaseWait();
					doLogout();
					window.location.href="/init";
				}
			});
		}
})(window.app || (window.app = {}));