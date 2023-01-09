(function(app) {
	app.AuthorizedComponent = ng.core.Component({
		selector : 'authorized-component',
		templateUrl : 'views/authorized_v9.html'
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
	app.AuthorizedComponent.prototype.validarEmail= function(event,data){
		return keypressvalidarEmail(event,data);
	}
	app.AuthorizedComponent.prototype.validarCaracteres = function(event) {
		return keyPressValidarLetrasNumerosSimplesGuionesPisos(event);
	}
	app.AuthorizedComponent.prototype.validarCaracteres2=function(event){
		return keyPressValidarLetrasyOtrosCaracteres(event);
	}
	app.AuthorizedComponent.prototype.keyupsearch=function(data,event, accion){
		try{
			if(accion==1){
				if (event.keyCode == 13) {
				     this.authPasswordGrant(data);
				 }
			}
		}catch(err){
			
		}
	}
	app.AuthorizedComponent.prototype.ngOnInit = function() {
		this.access_token=null;
		this.itemNatural=true;
		this.itemJuridica=false;
		this.listDocType=returnListDocType();
		this.listCountry = [ {
			value : 'VE',
			name : 'VENEZUELA'
		} ];
		$(document).ready(function() {
			$('.phone').mask('(0000) 000-0000', {
				placeholder : "(0000) 000-0000"
			});
		});
		this.id_doc_type=null;
		this.id_doc=null;
		this.validacion_id_doc="El id de documento no puede estar vacío";
		this.validacion_nombre="El nombre no puede estar vacío";
		this.validacion_apellido="El apellido no puede estar vacio";
		this.validacion_business="La razón social no puede estar vacío";
		this.validacion_alias=null;
		this.validacion_country="El país no puede estar vacío";
		this.name_perfil=null;
		this.last_name_perfil=null;
		this.business_name=null;
		this.country=null;
		this.alias=null;
		this.phone=null;
		this.codigo=null;
		this.icon_eye="fa-eye";
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
	}
	app.AuthorizedComponent.prototype.selectedIdDoc=function(){
		this.itemNatural=!this.itemNatural;
		this.itemJuridica=!this.itemJuridica;
	}
	app.AuthorizedComponent.prototype.authPasswordGrant=function(data){
		this.user=null;
		this.password=null;
		this.fingerprint=null;
		var username=null;
		var password=null;
		if (data.hasOwnProperty('user')) {
			if (data.user == null || data.user == undefined || data.user == "") {
				this.mensaje = "Debe ingresar el correo electrónico";
				this.msg.warning();
				return;
			} else {
				if (!validarLetrasyOtrosCaracteres(data.user)) {
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
		var parametros=null;
		var mensajeAll="Error al iniciar sesión";
		let request=null;
		if(this.code==null || this.code==undefined || this.code==""){
			this.mensaje="Error parametros obtener el código de inicio de sesión";
			this.msg.warning();
			return;
		}else{
			parametros={
				auth_code: this.code,
				username: username,
				password: h/*,
				client_id: getClient(),
				redirect_uri: redirectUri(),
				scopes: null*/
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
	}
	app.AuthorizedComponent.prototype.iniciarSesion=function(parametros){
		var mensajeAll="Error al iniciar sesión";
		request=this.ser.callServicesHttp('login-gravitee',null,parametros);
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
					this.deviceLogin();
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
	app.AuthorizedComponent.prototype.deviceLogin=function(){
		var parametros={};
		parametros.features={};
		parametros.fingerprint=this.fingerprint;
		this.fingerprint=this.fingerprint;
		var aux9=returnClientjs();
		if(aux9!=null){
			if(aux9.hasOwnProperty("device")){
				if(!(aux9.device==null || aux9.device==undefined || aux9.device=="")){
					this.device_type=aux9.device.type;
					parametros.type=aux9.device.type;
					parametros.features.device=JSON.stringify(aux9.device);
				}
			}
			if(aux9.hasOwnProperty("browser")){
				if(!(aux9.browser==null || aux9.browser==undefined || aux9.browser=="")){
					parametros.features.browser=JSON.stringify(aux9.browser);
					if(aux9.browser.hasOwnProperty("name")){
						this.so=aux9.browser.name;
					}
					if(aux9.browser.hasOwnProperty("image_uri")){
						this.imageUrl=getStatic()+aux9.browser.image_uri;
					}
				}
			}
		}
		this.dataShow = "Obteniendo información del dispositivo";
		var mensajeAll="Error al iniciar en el dispositivo";
		var contexto=this;
		var request = this.ser.callServicesHttp("login-device-gravitee","?code="+this.code, parametros);
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					delete data['status_http'];
					if(data.hasOwnProperty("redirect_uri")){
						if(data.redirect_uri==null || data.redirect_uri==undefined || data.redirect_uri==""){
							this.mensaje="No hay dirección de redirección";
							this.msg.warning();
						}else{
							window.location.href=data.redirect_uri;
						}
					}else{
						this.mensaje="No hay dirección de redirección";
						this.msg.warning();
					}
				}else{
					if(data.hasOwnProperty("message")){
						if(data.message==null || data.message==""  || data.message==undefined){
							this.mensaje=mensajeAll;
							this.msg.error();
						}else{
							if(data.message.toUpperCase()=="DEVICE NOT AUTHORIZED" || data.message.toUpperCase()=="AUTHORIZATION_EMAIL_SENDED"){
								this.nombre_new=null;
								this.codigo=null;
								$("#autorizar").modal();
							}else{
								if(data.message.toUpperCase()=="PROFILE_NOT_FOUND"){
									this.itemNatural=true;
									this.itemJuridica=false;
									this.id_doc_type=null;
									this.id_doc=null;
									this.validacion_id_doc="El id de documento no puede estar vacío";
									this.validacion_nombre="El nombre no puede estar vacío";
									this.validacion_apellido="El apellido no puede estar vacio";
									this.validacion_business="La razón social no puede estar vacío";
									this.validacion_alias=null;
									this.validacion_country="El país no puede estar vacío";
									this.name_perfil=null;
									this.last_name_perfil=null;
									this.alias=null;
									this.phone=null;
									this.business_name=null;
									this.country=null;
									this.mensajeValidacion=null;
									$("#profileModal").modal();
								}else{
									this.mensaje=this.ser.processMessageError(data,mensajeAll);
									this.msg.error();
								}
							}
						}
					}else{
						this.mensaje=mensajeAll;
						this.msg.error();
					}
				}
			}
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			this.msg.error();
		});
	}
	app.AuthorizedComponent.prototype.calcYearCopy=function(){
		return calcYearCopy()
	}
	app.AuthorizedComponent.prototype.autorizate=function(){
		var querys=null;
		try{
			querys="?fingerprint="+this.fingerprint+"&auth_code="+this.codigo.toUpperCase().trim()+"&code="+this.code;
		}catch(t){
		}
		var mensajeAll="Error al obtener estatus de la autorización del dispositivo";
		var request=this.ser.callServicesHttp('autorize-device-gravitee',querys,null);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http==200){
					delete data['status_http'];
					if(data.hasOwnProperty("redirect_uri")){
						if(data.redirect_uri==null || data.redirect_uri==undefined || data.redirect_uri==""){
							this.mensaje="No hay dirección de redirección";
							this.msg.warning();
						}else{
							window.location.href=data.redirect_uri;
						}
					}else{
						this.mensaje="No hay dirección de redirección";
						this.msg.warning();
					}
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
	app.AuthorizedComponent.prototype.saveProfile=function(){
		this.validacion_id_doc="El id de documento no puede estar vacío";
		this.validacion_nombre="El nombre no puede estar vacío";
		this.validacion_apellido="El apellido no puede estar vacio";
		this.validacion_business="La razón social no puede estar vacío";
		this.validacion_alias=null;
		this.validacion_country="El país no puede estar vacío";
		var validacion=false;
		this.mensajeValidacion=null;
		var parametros={};
		if(this.id_doc==null || this.id_doc==undefined || this.id_doc==""){
			this.validacion_id_doc="El número de documento no puede estar vacío";
			this.id_doc=null;
			validacion=true;
		}else{
			if(utils_keyNumber(this.id_doc.trim())){
				var texto1="";
				if(this.id_doc_type==null || this.id_doc_type==undefined || this.id_doc_type==""){
					this.validacion_id_doc=="El tipo de documento no puede estar vacío";
					this.id_doc=null;
					validacion=true;
				}else{
					var texto=this.id_doc_type.trim();
					parametros.id_doc=texto+this.id_doc.trim();
				}
			}else{
				this.validacion_id_doc="El número de documento, sólo acepta números";
				this.id_doc=null;
				validacion=true;
			}
		}
		if(this.itemNatural){
			parametros.type="NATURAL_PERSON";
			parametros.id_doc_type="CI";
			if(this.name_perfil==null || this.name_perfil==undefined || this.name_perfil==""){
				this.validacion_nombre="El nombre de la persona no puede estar vacío";
				validacion=true;
			}else{
				if(validarOnlyLetrasBoolean(this.name_perfil.trim())){
					parametros.first_name=this.name_perfil.trim().toUpperCase();
					dataDevice=parametros.first_name;
				}else{
					this.name_perfil=null;
					this.validacion_nombre="El formato del nombre de la persona es incorrecto";
					validacion=true;
				}
			}
			if(this.last_name_perfil==null || this.last_name_perfil==undefined || this.last_name_perfil==""){
					this.validacion_apellido="El apellido no puede estar vacío";
					validacion=true;
				}else{
					if(validarOnlyLetrasBoolean(this.last_name_perfil.trim())){
						parametros.last_name=this.last_name_perfil.trim().toUpperCase();
						if(dataDevice!=null){
							dataDevice=dataDevice+" "+parametros.last_name;
						}
					}else{
						this.validacion_apellido="El formato del apellido es incorrecto";
						validacion=true;
						this.last_name_perfil=null;
					}
				}
			}else{
				parametros.type="LEGAL_PERSON";
				parametros.id_doc_type="RIF";
				if(this.business_name==null || this.business_name==undefined || this.business_name==""){
					this.validacion_business="La razón social no puede estar vacía";
					validacion=true;
				}else{
					parametros.business_name=this.business_name.trim().toUpperCase();
					dataDevice=parametros.business_name;
				}
			}
			var telefono = null;
			try {
				telefono = $("#phone").unmask();
				if (telefono != null) {
					telefono = telefono[0].value;
				}
			} catch (err) {
				telefono = null;
			}
			if(telefono!=null){
				parametros.phone= telefono;
			}
			if(this.country==null || this.country==undefined || this.country==""){
				validacion=true;
			}else{
				parametros.country=this.country;
			}
			if(!(this.alias==null || this.alias==undefined || this.alias=="")){
				if(validarLetrasNumerosSimplesGuionesPiso(this.alias)) {
					parametros.alias=this.alias.toUpperCase().trim();
				}else{
					this.validacion_alias="El alias contiene caracteres inválidos (se permiten letras, números y \"-\", \"_\",\".\",\",\",\";\"";
					validacion=true;
				}	
			}
			if(validacion){
				this.mensajeValidacion="Datos inválidos, verifique el formulario";
				return;
			}
			var mensajeAll="Error al registrar perfil";
			var request=this.ser.callServicesHttp('profile-register-gravitee',"?code="+this.code,parametros);
			request.subscribe(data=>{
					if(data==null || data==undefined || data==""){
						this.mensajeValidacion=mensajeAll;
					}else{
						if(data.status_http==200){
							delete data['status_http'];
							if(data.hasOwnProperty("redirect_uri")){
								if(data.redirect_uri==null || data.redirect_uri==undefined || data.redirect_uri==""){
									this.mensajeValidacion="No hay dirección de redirección";
								}else{
									window.location.href=data.redirect_uri;
								}
							}else{
								this.mensajeValidacion="No hay dirección de redirección";
							}
						}else{
							this.mensajeValidacion=this.ser.processMessageError(data,mensajeAll);
						}
					}
				},err=>{
					this.mensajeValidacion=this.ser.processError(err,mensajeAll);
				}
			);
	}
	app.AuthorizedComponent.prototype.back = function() {
		window.history.back();
	}
	app.AuthorizedComponent.prototype.actionToken=function(){
		if(this.textoToken=="PEDIR TOKEN"){
			this.pedirToken();
		}else{
			this.enviarToken();
		}
	}
	app.AuthorizedComponent.prototype.pedirToken=function(){
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
	app.AuthorizedComponent.prototype.enviarToken=function(){
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
	app.AuthorizedComponent.prototype.forzarCierres=function(){
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
	app.AuthorizedComponent.prototype.openModalTerminos=function(){
		$("#modalTerminos1").modal();
	}
	app.AuthorizedComponent.prototype.showPassword=function(){
		if(this.icon_eye=="fa-eye"){
			this.icon_eye="fas fa-eye-slash";
			try{
				document.getElementById("contrase").type="text";
			}catch(er){
				console.log("er");
			}
		}else{
			this.icon_eye="fa-eye";
				try{
				document.getElementById("contrase").type="password";
			}catch(er){
				console.log("er");
			}
		}
	}
})(window.app || (window.app = {}));