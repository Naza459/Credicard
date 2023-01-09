(function(app) {
	app.LoginComponent = ng.core.Component({
		selector : 'login-component',
		templateUrl : 'views/login_v21.html',
	}).Class({
		constructor :[app.AppCallService, ng.router.ActivatedRoute,app.MsgComponent, ng.router.Router,app.LoadingServiceComponent,
			function(ser,active, msg, router, loading) {
				this.msg = msg;
				this.mensaje = "";
				this.router = router;
				this.loading = loading;
				this.active = active;
				this.ser=ser;
			} 
		]
	});
	app.LoginComponent.prototype.validarEmail= function(event,data){
		return keypressvalidarEmail(event,data);
	}
	app.LoginComponent.prototype.validarCaracteres = function(event) {
		return keyPressValidarLetrasNumerosSimplesGuionesPisos(event);
	}
	app.LoginComponent.prototype.redirectServices=function(){
		window.open("/servicepay-public"); //This will open Google in a new window.
	}
	app.LoginComponent.prototype.validarCaracteres2=function(event){
		return keyPressValidarLetrasyOtrosCaracteres(event);
	}
	app.LoginComponent.prototype.keyupsearch=function(data,event, accion){
		try{
			if(accion==1){
				if (event.keyCode == 13) {
				     this.authPasswordGrant(data);
				 }
			}
		}catch(err){
			
		}
	}
	app.LoginComponent.prototype.ngOnInit = function() {
		setTimeout(() => {
			$("#button-next-carousel").click();
		}, 2500);
		this.icon_eye="fas fa-eye-slash";
		try{
			var g=document.getElementsByClassName('modal-backdrop')[0];
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(y){
		}
		try{
			var g=document.getElementById('sidenav-overlay');
			if(g!=null){
				var padre=g.parentNode;
				padre.removeChild(g);
			}
		}catch(r4){
		}
		this.textoToken="PEDIR TOKEN";
		this.tokenForzado=null;
		this.mensajeToken=null;
		this.isLogin = true;
		this.flagQuestion=false;
		this.loginPin = false;
		this.queryParams = {
			client_id : null,
			redirect_uri : null,
			response_type : null,
			scope : null,
			user : null,
			password : null
		};
		this.data = {
			user : '',
			password : ''
		};
		this.flag = true;
		this.countryShow = null;
		this.email = null;
		if(this.active.hasOwnProperty('queryParams')){
			if(this.active.queryParams!=null){
				if(this.active.queryParams.hasOwnProperty('_value')){
					if(this.active.queryParams._value!=null){
						if(this.active.queryParams._value.hasOwnProperty('code')){
							this.code=this.active.queryParams._value.code;
						}
					}
				}
			}
		}
		if(this.ser.getAccessToken()==null){
			this.ser.setRealm(null);
		}else{
			this.router.navigate(['/apps']);
		}
	}
	app.LoginComponent.prototype.calcYearCopy=function(){
		return calcYearCopy()
	}
	app.LoginComponent.prototype.authPasswordGrant=function(data){
		this.user=null;
		this.password=null;
		this.fingerprint=null;
		var gran_type="password";
		var client_id=getClient();
		var redirect_uri=redirectUri();
		var scope=null;
		var username=null;
		var password=null;
		if (data.hasOwnProperty('user')) {
			if (data.user == null || data.user == undefined || data.user == "") {
				this.mensaje = "Debe ingresar el correo electrónico";
				this.msg.warning();
				return;
			} else {
				if (!validarEmail(data.user)) {
					this.mensaje = "Debe ingresar un correo electrónico o usuario válido.";
					this.msg.warning();
					this.data.user = "";
					return;
				}else{
					username=data.user.trim().toLowerCase();
				}
			}
		} else {
			this.mensaje = "Debe ingresar el correo electrónico";
			this.msg.warning();
			return;
		}
		if (data.hasOwnProperty('password')) {
			if (data.password == null || data.password == undefined || data.password == "") {
				this.mensaje = "Debe ingresar la contraseña.";
				this.msg.warning();
				return;
			}else{
				password=data.password.trim();
			}
		} else {
			this.mensaje = "Debe ingresar la contraseña.";
			this.msg.warning();

			return;
		}
		this.textoToken="PEDIR TOKEN";
		this.tokenForzado=null;
		this.user=username;
		var $key = RSA.getPublicKey(publicKey());
		var h=RSA.encrypt(password,$key);
		this.password=h;
		var parametros=null;
		let request=null;
		parametros={
			client_id: client_id,
			redirect_uri: redirect_uri,
			username: username,
			password: h,
			// scopes: scope
		};
		if(this.ser.getFingerPrint()==null || this.ser.getFingerPrint()==undefined || this.ser.getFingerPrint()==""){
			this.fingerprint=create_UUID();
			parametros.fingerprint=this.fingerprint;
			this.ser.setFingerPrint(this.fingerprint);
			this.iniciarSesion(parametros);
		}else{
			parametros.fingerprint=this.ser.getFingerPrint();
			this.fingerprint=parametros.fingerprint;
			this.iniciarSesion(parametros);
		}
	}
	app.LoginComponent.prototype.iniciarSesion=function(parametros){
		var mensajeAll="Error al iniciar sesión";
		request=this.ser.callServicesHttp('login',"?grant_type=password",parametros);
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					delete data['status_http'];
					if(data.hasOwnProperty("access_token")){
						if(!(data.access_token==null || data.access_token==undefined || data.access_token=="")){
							this.ser.setAccessToken(data.access_token);
						}
					}
					if(data.hasOwnProperty("refresh_token")){
						if(!(data.refresh_token==null || data.refresh_token==undefined || data.refresh_token=="")){
							this.ser.setRefreshToken(data.refresh_token);
						}
					}
					if(data.hasOwnProperty("expires_in")){
						if(!(data.expires_in==null || data.expires_in==undefined || data.expires_in=="" || data.expires_in==0)){
							var tiempo=data.expires_in;
							this.ser.setTimeSession(tiempo);
							asyncSqrt(tiempo,function(value, result) {});
						}
					}
					this.router.navigate(['/apps']);
				}else{
					if(data.message=="MORE_THAN_ACTIVE_SESSION"){
						this.textoToken="PEDIR TOKEN";
						this.tokenForzado=null;
						this.mensajeToken=null;
						$("#forzarCierre").modal();
					}else{
						try{
							if(data.message.toUpperCase()=="PASSWORD_EXPIRED"){
								this.router.navigate(['/expired-password'], { queryParams: { email: parametros.username} });
							}else{
								this.mensaje=this.ser.processMessageError(data,mensajeAll);
								this.msg.error();
							}
						}catch(Er){
							console.log("Er",Er);
							this.mensaje=this.ser.processMessageError(data,mensajeAll);
							this.msg.error();
						}
					}
				}
			}
		},err=>{
			console.log('err',err);
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.LoginComponent.prototype.back = function() {
		window.history.back();
	}
	app.LoginComponent.prototype.actionToken=function(){
		if(this.textoToken=="PEDIR TOKEN"){
			this.pedirToken();
		}else{
			this.enviarToken();
		}
	}
	app.LoginComponent.prototype.pedirToken=function(){
		var parametros={
			client_id: getClient(),
			redirect_uri: redirectUriBase(),
			username: this.user,
			password: this.password,
			fingerprint: this.fingerprint,
			scopes: null
		};
		var mensajeAll="Error al pedir el token de cierre de sesión";
		let request=this.ser.callServicesHttp('session-auth-token',null,parametros);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http==200){
					this.textoToken="REENVIAR TOKEN";
					delete data['status_http'];
					this.mensajeToken="Token enviado con éxito";
				}else{
					this.mensajeToken=this.ser.processMessageError(data,mensajeAll);
				}
			}
		},err=>{
			this.mensajeToken=this.ser.processError(err,mensajeAll);
		});
	}
	app.LoginComponent.prototype.enviarToken=function(){
		var parametros={
			client_id: getClient(),
			redirect_uri: redirectUriBase(),
			username: this.user,
			password: this.password,
			fingerprint: this.fingerprint,
			scopes: null
		};
		var mensajeAll="Error al  reenviar token de cierre de sesión";
		let request=this.ser.callServicesHttp('session-resend-auth-token',null,parametros);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http==200){
					this.textoToken="REENVIAR TOKEN";
					delete data['status_http'];
					this.mensajeToken="Token Reenviado con éxito";
				}else{
					this.mensajeToken=this.ser.processMessageError(data,mensajeAll);
				}
			}
		},err=>{
			this.mensajeToken=this.ser.processError(err,mensajeAll);
		});
	}
	app.LoginComponent.prototype.forzarCierres=function(){
		var parametros={
			client_id: getClient(),
			redirect_uri: redirectUriBase(),
			username: this.user,
			password: this.password,
			fingerprint: this.fingerprint,
			scopes: null
		};
		var querys="?auth_code="+this.tokenForzado;
		var mensajeAll="Error al cerrar sesiones";
		let request=this.ser.callServicesHttp('close-all-session',querys,parametros);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http==200){
					delete data['status_http'];
					$("#forzarCierre").modal('hide');
					delete data['status_http'];
					if(data.hasOwnProperty("access_token")){
						if(!(data.access_token==null || data.access_token==undefined || data.access_token=="")){
							this.ser.setAccessToken(data.access_token);
						}
					}
					if(data.hasOwnProperty("refresh_token")){
						if(!(data.refresh_token==null || data.refresh_token==undefined || data.refresh_token=="")){
							this.ser.setRefreshToken(data.refresh_token);
						}
					}
					if(data.hasOwnProperty("expires_in")){
						if(!(data.expires_in==null || data.expires_in==undefined || data.expires_in=="" || data.expires_in==0)){
							var tiempo=data.expires_in;
							this.ser.setTimeSession(tiempo);
							asyncSqrt(tiempo,function(value, result) {});
						}
					}
					var contexto=this;
					setTimeout(function() {
						contexto.router.navigate(['/apps']);
					}, 1000);
				}else{
					this.mensajeToken=this.ser.processMessageError(data,mensajeAll);
				}
			}
		},err=>{
			this.mensajeToken=this.ser.processError(err,mensajeAll);
		});
	}
	app.LoginComponent.prototype.showPassword=function(){
		this.icon_eye="fa-eye";
		try{
			document.getElementById("contrase").type="text";
		}catch(er){
			console.log("er");
		}
	}
	app.LoginComponent.prototype.showPasswordOut=function(){
		this.icon_eye="fas fa-eye-slash";
		try{
			document.getElementById("contrase").type="password";
		}catch(er){
			console.log("er");
		}
	}
	app.LoginComponent.prototype.keyPressCtrlZ=function(event){
		return disabledCtlZ(event);
	}
	app.LoginComponent.prototype.validarEmail= function(event,data){
		return keypressvalidarEmail(event,data);
	}
	app.LoginComponent.prototype.openModalTerminos=function(){
		$("#modalTerminos1").modal();
	}
})(window.app || (window.app = {}));