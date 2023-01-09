(function(app) {
	app.RecoveryComponent =
		ng.core.Component({
		selector: 'recovery-password',
		templateUrl: 'views/recovery-password_v2.html'
		})
		.Class({
		  constructor: [app.AppCallService,app.MsgComponent,ng.router.Router,app.LoadingServiceComponent,ng.router.ActivatedRoute,
		  function(authentication,msg,router,loading,active) {
	          this.msg=msg;
	          this.ser=authentication;
	          this.active=active;
	          this.mensaje="";
	          this.router=router;  
	          this.loading=loading;
		  }],
		  	getValueMsg: function() {
				var link = ['/init'];
				this.router.navigate(link);
			}
		});
	app.RecoveryComponent.prototype.validarEmail= function(event,data){
		return keypressvalidarEmail(event,data);
	}
	app.RecoveryComponent.prototype.calcYearCopy=function(){
		return calcYearCopy()
	}
	app.RecoveryComponent.prototype.keyupsearch=function(data,event){
		try{
			if (event.keyCode == 13) {
			    if(!(data==null || data==undefined || data=="")){
					this.changePass(data);
				}
			}
		}catch(err){
			
		}
	}
	app.RecoveryComponent.prototype.ngOnInit=function(){
		this.icon_eye_nueva="fas fa-eye-slash";
		this.icon_eye_confirm="fas fa-eye-slash";
		this.token=null;
		this.email=null;
		this.dataChange={
			email:null,
			password:null,
			confirm_password:null
		};
		try {
			this.token=null;
			this.email=null;
			if(this.active.hasOwnProperty('queryParams')){
				if(!(this.active.queryParams==null || this.active.queryParams==undefined || this.active.queryParams=="")){
					if(this.active.queryParams.hasOwnProperty('_value')){
						if(!(this.active.queryParams._value==null || this.active.queryParams._value==undefined || this.active.queryParams._value=="")){
							if(this.active.queryParams._value.hasOwnProperty('email')){
								this.email=this.active.queryParams._value.email;
							}
							if(this.active.queryParams._value.hasOwnProperty('q')){
								this.token=this.active.queryParams._value.q;
							}
						}
					}
				}
			}
		} catch (err) {

		}
	}
	app.RecoveryComponent.prototype.showPasswordNueva=function(){
		this.icon_eye_nueva="fas fa-eye-slash";
		try{
			document.getElementById("newpass").type="text";
		}catch(er){
			console.log("er");
		}
	}
	app.RecoveryComponent.prototype.showPasswordNuevaOut=function(){
		this.icon_eye_nueva="fa-eye";
		try{
			document.getElementById("newpass").type="password";
		}catch(er){
			console.log("er");
		}
	}
	app.RecoveryComponent.prototype.showPasswordConfirm=function(){
		this.icon_eye_confirm="fas fa-eye-slash";
		try{
			document.getElementById("newpass2").type="text";
		}catch(er){
			console.log("er");
		}
	}
	app.RecoveryComponent.prototype.showPasswordConfirmOut=function(){
		this.icon_eye_confirm="fa-eye";
		try{
			document.getElementById("newpass2").type="password";
		}catch(er){
			console.log("er");
		}
	}
	app.RecoveryComponent.prototype.back=function(){
		this.router.navigate(['/init']);
	}
	app.RecoveryComponent.prototype.clean=function(){
		this.dataChange={
			email:null,
			password:null,
			confirm_password:null
		};
	}
	app.RecoveryComponent.prototype.changePass=function(data){
		var parametros={};
		var email=null;
		if(data==null || data==undefined || data==""){
			this.mensaje="Los datos no pueden estar vacios";
			this.msg.warning();
			return;
		}else{
			if(data.hasOwnProperty('password')){
				if(data.password==null || data.password==undefined || data.password==""){
					this.mensaje="La contraseña no  puede estar vacía";
					this.dataChange.password=null;
					this.msg.warning();
					return;
				}else{
					if(checkPwd(data.password.trim())==null){
						parametros.password=data.password.trim();
					}else{
						this.mensaje=checkPwd(data.password.trim());
						this.msg.warning();
						return;
					}
				}
			}else{
				this.mensaje="La contraseña no  puede estar vacía";
				this.msg.warning();
				return;
			}
			if(data.hasOwnProperty('confirm_password')){
				if(data.confirm_password==null || data.confirm_password==undefined || data.confirm_password==""){
					this.mensaje="La confirmación de la contraseña no puede estar vacía";
					this.dataChange.confirm_password=null;
					this.msg.warning();
					return;
				}else{
					parametros.password_repeat=data.confirm_password.trim();
				}
			}else{
				this.mensaje="La confirmación de la contraseña no puede estar vacía";
				this.msg.warning();
				return;
			}
			if(!(parametros.password_repeat==parametros.password)){
				this.mensaje="La contraseña no concuerda con la confirmación";
				this.msg.warning();
				return;
			}
			parametros.token=this.token;
			var $key = RSA.getPublicKey(publicKey());
			var querys="?email="+this.email+"&q="+this.token;
			var mensajeAll="Error al cambiar contraseña";
			var request=this.ser.callServicesHttp('recovery',querys,RSA.encrypt(parametros.password.trim(),$key));
			request.subscribe(data=>{
				if(!(data==null || data==undefined || data=="")){
					if(data.status_http==200){
						delete data['status_http'];
						this.mensaje="Contraseña cambiada con éxito";
						try{
							if(data.hasOwnProperty("expiration_date")){
								if(!(data.expiration_date==null || data.expiration_date==undefined || data.expiration_date=="")){
									data.expiration_date=formattingDate(data.expiration_date);
								}
							}
						}catch(er){
							console.log(er);
						}
						this.mensaje=this.mensaje+" la misma expira el: "+data.expiration_date;
						this.msg.info();
					}else{
						this.mensaje=this.ser.processMessageError(data,mensajeAll);
						this.msg.warning();
						return;
					}
				}
			},err=>{
				this.mensaje=this.ser.processError(err,mensajeAll);
				this.msg.warning();
				return
			});
		}
	}
	app.RecoveryComponent.prototype.keyPressCtrlZ=function(event){
		return disabledCtlZ(event);
	}
})(window.app || (window.app = {}));