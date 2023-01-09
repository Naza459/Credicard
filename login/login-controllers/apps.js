(function(app) {
	app.AppsComponent =
		ng.core.Component({
			selector: 'apps-component',
			templateUrl: 'views/apps_v5.html'
		})
		.Class({
			constructor: [app.AppCallService, app.MsgComponent, ng.router.Router, app.LoadingServiceComponent,
				function(ser,msg, router, loading) {
					this.msg = msg;
					this.mensaje = "";
					this.router = router;
					this.loading = loading;
					this.ser = ser;
				}
			]
		});
	app.AppsComponent.prototype.ngOnInit = function() {
		this.hayMasDeUnWallet=false;
		this.clase_natural="btn-primary";
		this.clase_juridica="btn-light";
		this.menu_top=null;
		this.rol_account=null;
		this.mensajeReenvio=null;
		this.showMessageResend=false;
		this.nombre_usuario=null;
		this.doc_usuario=null;
		this.email_usuario=null;
		this.device_type=null;
		this.so=null;
		this.browser_data=null;
		this.image_url=null;
		this.codigo=null;
		this.nombre_new=null;
		this.fingerprint=null;
		this.ser.setRealm();
		this.ser.removeKey('role');
		this.ser.removeKey('init');
		this.ser.removeKey('menu_formatted');
		this.apps=null;
		this.showSystem=false;
		this.listCountry = [ {
			value : 'VE',
			name : 'VENEZUELA'
		} ];
		this.alias=null;
		this.countryShow=null;
		this.country=null;
		this.newProfile=false;
		this.itemNatural=true;
		this.itemJuridica=false;
		this.dataProfile={};
		this.dataProfile.name=null;
		this.dataProfile.lastName=null;
		this.dataProfile.email=null;
		this.dataProfile.phone=null;
		this.dataProfile.business_name=null;
		this.dataProfile.name=null;
		this.dataProfile.id_doc_type=null;
		this.dataProfile.id_doc=null;
		this.listDocType=returnListDocType();
		this.listAgents=[];
		this.realm=null;
		this.user_id=null;
		this.validacionProfile={
				nombre:"El nombre de la persona no puede estar vacío",
				apellido:"El apellido no puede estar vacio",
				business_name:"La razón social no puede estar vacío",
				id_doc:"El id de documento no puede estar vacío",
				country:"El país no puede estar vacío",
				alias:null

		};
		$(document).ready(function() {
			$('.phone').mask('(0000) 000-0000', {
				placeholder : "(0000) 000-0000"
			});
		});
		this.operator_id=null;
		this.mensaje = "";
		this.dataShow = "Cargando servicios de inicio";
		this.ser.setCurrency('BS');
		if(this.ser.getAccessToken()==null){
			doLogout();
			this.router.navigate(['/init']);
		}else{
			this.getLoginDevice();
		}
	}
	
	app.AppsComponent.prototype.keypressNumeros=function(event){
		return keypressNumbersInteger(event);
	}
	app.AppsComponent.prototype.completeDoc=function(data){
		if(!(data==null || data==undefined || data=="")){
			if(!utils_keyNumber(data.trim())){
				this.mensaje="El formato del número de identificación es inválido";
				this.msg.warning();
				return;
			}
			if(data.trim().length<9){
				var numero=9-data.trim().length;
				var texto="";
				for(var i=0;i<numero;i++){
					texto=texto+"0";
				}
				this.dataProfile.id_doc=texto+this.dataProfile.id_doc;
			}else{
				this.dataProfile.id_doc=data;
			}
		}
	}
	app.AppsComponent.prototype.autorizate=function(){
		var contexto=this;
		var params = {}
		params.fingerprint = this.fingerprint;
		params.auth_code = this.codigo;
		if(!(this.nombre_new==null || this.nombre_new==undefined || this.nombre_new=="")){
		params.name = this.nombre_new.trim().toUpperCase();
		}
		// console.log(params);

		var mensajeAll="Error al obtener estatus de la autorización del dispositivo";
		var request=this.ser.callServicesHttp('autorize-device',null,params);
		request.subscribe(data=>{
			if(!(data==null || data==undefined || data=="")){
				if(data.status_http==200){
					delete data['status_http'];
					var aux8=JSON.stringify(data);
					this.ser.setDeviceActual(aux8);
					this.ser.setFingerPrint(this.fingerprint);
					this.getRoles();
				}else{
					this.mensaje=this.ser.processMessageError(data,mensajeAll);
					$("#msgErrorApps").modal();
					setTimeout(function() {
						$("#msgErrorApps").modal('hide');
						doLogout();
						contexto.router.navigate(['/init']);
					}, 3000);
				}
			}
		},err=>{
			this.mensaje=this.ser.processError(err,mensajeAll);
			setTimeout(function() {
				$("#msgErrorApps").modal('hide');
					doLogout();
					contexto.router.navigate(['/init']);
			}, 3000);
		});
	}
	app.AppsComponent.prototype.reenviarCorreo=function(){
		this.mensajeReenvio=null;
		this.showMessageResend=false;
		var mensajeAll="Error al enviar correo electrónico de autorización";
		var querys="?fingerprint="+this.fingerprint;
		var request=this.ser.callServicesHttp('resend-code',querys,null,mensajeAll);
		request.subscribe(data2=>{
			if(!(data2==null || data2==undefined || data2=="")){
				if(data2.status_http==200){
					delete data2['status_http'];
					this.mensajeReenvio = "Correo electrónico enviado con éxito";
					this.showMessageResend=true;
				}else{
					this.mensajeReenvio=this.ser.processMessageError(data2,mensajeAll)
					this.showMessageResend=true;
				}
			}
		},err=>{
			this.showMessageResend=true;
			this.mensajeReenvio=this.ser.processError(err,mensajeAll);
		});
	}
	app.AppsComponent.prototype.devolver=function(){
		doLogout();
		var link = ['/init'];
		this.router.navigate(link);
	}
	app.AppsComponent.prototype.getData=function(){
		this.user=this.ser.getEmail();
		this.dataProfile.email=this.user;
		this.realm=this.ser.getRealm();
		this.user_id=this.ser.getUserId();
	}
	app.AppsComponent.prototype.getLoginDevice=function() {
		var parametros={};
		parametros.fingerprint=this.ser.getFingerPrint();
		this.fingerprint=this.ser.getFingerPrint();
		var aux9=returnClientjs();
		if(aux9!=null){
			parametros.features={};
			if(aux9.hasOwnProperty("device")){
				parametros.features.device=JSON.stringify(aux9.device);
				if(!(aux9.device==null || aux9.device==undefined || aux9.device=="")){
					if(aux9.device.hasOwnProperty("type")){
						this.device_type=aux9.device.type;
						parametros.type=aux9.device.type;
					}
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
		if(this.ser.getFingerPrint()==null || this.ser.getFingerPrint()==undefined || this.ser.getFingerPrint()==""){
			doLogout();
			this.router.navigate(['/init']);
		}else{
			parametros.fingerprint=this.ser.getFingerPrint();
			this.fingerprint=parametros.fingerprint;
			this.iniciarSesionDevice(parametros);
		}
		
	}
	app.AppsComponent.prototype.iniciarSesionDevice=function(parametros){
		var contexto=this;
		var mensajeAll="Error al iniciar en el dispositivo";
		var request = this.ser.callServicesHttp("login-device",null, parametros);
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
				$("#msgErrorApps").modal()
				setTimeout(function() {
					$("#msgErrorApps").modal('hide');
						doLogout();
						contexto.router.navigate(['/init']);
					}, 3000);
				}else{
					if(data.status_http==200){
						delete data['status_http'];
						var aux8=JSON.stringify(data);
						this.ser.setDeviceActual(aux8);
						this.ser.setFingerPrint(this.fingerprint);
						this.getRoles();
					}else{
						if(data.hasOwnProperty("message")){
							if(data.message==null || data.message==""  || data.message==undefined){
								this.mensaje=mensajeAll;
								$("#msgErrorApps").modal()
								setTimeout(function() {
									$("#msgErrorApps").modal('hide');
									doLogout();
									this.router.navigate(['/init']);
								}, 3000);
							}else{
								if(data.message.toUpperCase()=="DEVICE NOT AUTHORIZED" || data.message.toUpperCase()=="AUTHORIZATION_EMAIL_SENDED"){
									this.nombre_new=null;
									this.codigo=null;
									$("#autorizar").modal();
								}else{
									this.mensaje=this.ser.processMessageError(data,mensajeAll);
									$("#msgErrorApps").modal()
									setTimeout(function() {
										$("#msgErrorApps").modal('hide');
										doLogout();
										contexto.router.navigate(['/init']);
									}, 3000);
								}
							}
						}else{
							this.mensaje=mensajeAll;
							$("#msgErrorApps").modal()
							setTimeout(function() {
								$("#msgErrorApps").modal('hide');
								doLogout();
								contexto.router.navigate(['/init']);
							}, 3000);
						}
					}
				}
			},err=>{
				this.mensaje=this.ser.processError(err,mensajeAll);
				$("#msgErrorApps").modal()
					setTimeout(function() {
						$("#msgErrorApps").modal('hide');
						doLogout();
						contexto.router.navigate(['/init']);
					}, 3000);
			}
		);
	}
	app.AppsComponent.prototype.getRoles=function(){
		let mensajeAll = "Error al obtener roles";
		var contexto=this;
		let request = this.ser.callServicesHttp("roles-auth", null, null);
		request.subscribe(data => {
			if (data == null || data == undefined || data == "") {
				this.mensaje = mensajeAll;
				this.msg.error();
			} else {
				if (data.status_http == 200) {
					delete data['status_http'];
					let init=null;
					this.newProfile=false;
					if(data.hasOwnProperty("profile")){
						if(!(data.profile==null || data.profile==undefined || data.profile=="")){
							init=data.profile;
							if(data.hasOwnProperty("country")){
								if(!(data.country==null || data.country==undefined || data.country=="")){
									init.country=data.country;
								}
							}
							this.ser.setInit(init);
						}
					}
					if(data.hasOwnProperty("roles")){
						if(!(data.roles==null || data.roles==undefined || data.roles=="")){
							let aux1=null;
							try{
								aux1=data.roles;
							}catch(er){
								aux1=null;
							}
							if(aux1!=null){
								var objeto={};
								this.apps=[];
								this.wallet_data=[];
								for(var i=0;i<aux1.length;i++){
									objeto=this.formattedRole(aux1[i]);
									if(objeto!=null){
										if(objeto.app_name=="WALLET"){
											this.wallet_data.push(objeto);
										}
										this.apps.push(objeto);
									}
								}
								if(this.ser.getBackUrl()!=null){
									if(this.wallet_data!=null && this.wallet_data.length!=0){
										if(this.wallet_data.length==1){
											this.ser.setRole(this.wallet_data[0]);
											window.location.href=this.ser.getBackUrl();
										}else{
											this.hayMasDeUnWallet=true;
										}
									}
								}
							}
						}
					}
				} else {
					this.mensaje = this.ser.processMessageError(data, mensajeAll);
					this.redirectLogin();
				}
			}
		}, err => {
			this.mensaje = this.ser.processError(err, mensajeAll);
			$("#msgErrorApps").modal()
			setTimeout(function() {
				$("#msgErrorApps").modal('hide');
				doLogout();
				contexto.router.navigate(['/init']);
			}, 3000);
		});
	}
	app.AppsComponent.prototype.formattedRole=function(data){
		if(data==null || data==undefined  || data==""){
			return null;
		}else{
			if(data.app_name=="ACCOUNT"){
				return null;
			}
			var user={};
			if(data.hasOwnProperty("user_email")){
				if(!(data.user_email==null || data.user_email==undefined || data.user_email=="")){
					this.email_usuario=data.user_email;
					user.email=data.user_email;
				}
				if(!(data.user_name==null || data.user_name==undefined || data.user_name=="")){
					this.nombre_usuario=data.user_name;
					user.name=data.user_name;
				}
				this.ser.setDataUser(user);
			}
			if(data.hasOwnProperty("owner_name")){
				if(!(data.owner_name==null || data.owner_name==undefined || data.owner_name=="")){
					data.formatted_owner_name=data.owner_name;
				}
			}
			if(data.hasOwnProperty('app_name')){
				if(!(data.app_name==null || data.app_name==undefined || data.app_name=="")){
					data.formatted_app_name=translate(data.app_name,"ES").toUpperCase();
				}
			}
			if(data.hasOwnProperty("app_icon")){
				if(!(data.app_icon==null || data.app_icon===undefined || data.app_icon==="")){
					data.app_icon=getStatic()+data.app_icon;
				}
			}
			return data;
		}
	}	
	app.AppsComponent.prototype.selectedRedirect=function(data){
		this.ser.removeKey('role');
		this.ser.removeKey('menu_formatted');
		this.ser.setRole(data);
		window.location.href=data.app_url;
	}
	app.AppsComponent.prototype.rechazarPago=function(){
		this.hayMasDeUnWallet=false;
		removeCookie("back_url_wallet");
	}
	app.AppsComponent.prototype.redirectLogin = function() {
		if(this.ser.getAccessToken()==null){
			doLogout();
			this.router.navigate(['/init']);
		}else{
			var mensajeAll="Error al cerrar sesión";
			var contexto=this;
			var request=this.ser.callServicesHttp('logout',null,null);
			request.subscribe(data=>{
				if(data==null || data==undefined || data==""){
					doLogout();
					this.router.navigate(['/init']);
				}else{
					if(data.status_http==200){
						delete data['status_http'];
						doLogout();
						this.router.navigate(['/init']);
					}else{
						this.mensaje=this.ser.processMessageError(data,mensajeAll);
						this.msg.error();
						setTimeout(function() {
							doLogout();
							contexto.router.navigate(['/init']);
						}, 2000);
					}
				}
			},err=>{
				this.mensaje=this.ser.processError(err,mensajeAll);
				this.msg.error();
				setTimeout(function() {
							doLogout();
							contexto.router.navigate(['/init']);
						}, 2000);
			});
		}
	}
})(window.app || (window.app = {}));