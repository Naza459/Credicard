(function(app) {
	app.RequestRecoveryPasswordComponent =
		ng.core.Component({
			selector: 'request-recovery-password',
			templateUrl: 'views/request-recovery-password-v2.html',
			outputs: ['salida']
			
		})
		.Class({
			constructor: [app.AppCallService, ng.router.ActivatedRoute,app.MsgComponent, ng.router.Router,app.LoadingServiceComponent,
				function(ser,active, msg, router, loading) {
					this.msg = msg;
					this.mensaje = "";
					this.router = router;
					this.loading = loading;
					this.active = active;
					this.ser=ser;
				} 
			],
			getValueMsg: function() {
				doLogout();
				this.router.navigate(['/init']);
			}
		});
	app.RequestRecoveryPasswordComponent.prototype.ngOnInit = function() {
		this.recoveryPassword = {
			email : '',
			security_questions : [ {
				"question" : '',
				"answer" : null,
				"icon_eye":"fas fa-eye-slash"
			}, {
				"question" : '',
				"answer" : null,
				"icon_eye":"fas fa-eye-slash"
			} ]
		};
		this.flagQuestion=false;
		this.listQuestion=[];
		this.data_to_recuperar=null;
		this.itemPrincipal=true;
		this.itemSegundario=false;
		this.othermail=null;
	}
	app.RequestRecoveryPasswordComponent.prototype.selectEmail=function(){
		this.itemPrincipal=!this.itemPrincipal;
		this.itemSegundario=!this.itemSegundario;
		if (this.itemPrincipal) {
			this.other_email_to_send=null;
		}
	}
	app.RequestRecoveryPasswordComponent.prototype.keyupsearch=function(data,event){
		try{
			if (event.keyCode == 13) {
			    if(!this.flagQuestion && (this.listQuestion==null || this.listQuestion.length==0)){
					if(data.hasOwnProperty("email")){
						if(!(data.email==null || data.email==undefined || data.email=="")){
							this.searchQuestion(data.email);
						}
					}
				}else{
					if(this.flagQuestion && this.listQuestion!=null && this.listQuestion.length!=0){
						this.reset(data);
					}
				}
			}
		}catch(err){
			
		}
	}
	app.RequestRecoveryPasswordComponent.prototype.clean = function() {
		this.recoveryPassword.email=null;
		this.flagQuestion=false;
		this.listQuestion=[];
	}
	app.RequestRecoveryPasswordComponent.prototype.searchQuestion=function(data){
		if(data==null || data==undefined || data==""){
			this.mensaje="Debe ingresar el correo electrónico";
			this.msg.warning();
			return;
		}else{
			if (!(validarEmail(data))) {
				this.recoveryPassword.email = "";
				this.mensaje = "Formato de correo electrónico inválido";
				this.msg.warning();
				return;
			}
			var querys="?email="+data.toLowerCase().trim();
			var mensajeAll="Error al consultar preguntas asociadas";
			var request=this.ser.callServicesHttp('search-question',querys,null);
			request.subscribe(data=>{
				if(!(data==null || data==undefined || data=="")){
					if(data.status_http==200){
						delete data['status_http'];
						this.flagQuestion=true;
						this.listQuestion=[];
						var objeto={};
						if(data.hasOwnProperty("body")){
							if(!(data.body==null || data.body==undefined || data.body.length==0)){
								for(var i=0; i<data.body.length;i++){
									objeto={};
									objeto.name=data.body[i];
									objeto.value=null;
									objeto.icon_eye="fas fa-eye-slash";
									this.listQuestion.push(objeto);
								}
							}else{
								this.mensaje="Se envió un correo electrónico para continuar";
								this.msg.info();
							}
						}else{
							this.mensaje="Se envió un correo electrónico para continuar";
							this.msg.info();
						}
					}else{
						this.mensaje=this.ser.processMessageError(data,mensajeAll);
						this.mensaje="Se envió un correo electrónico para continuar";
						this.msg.info();
					}
				}
			},err=>{
				this.mensaje=this.ser.processError(err,mensajeAll);
				this.mensaje="Se envió un correo electrónico para continuar";
				this.msg.info();
			});
		}
	}
	app.RequestRecoveryPasswordComponent.prototype.calcYearCopy=function(){
		return calcYearCopy()
	}
	app.RequestRecoveryPasswordComponent.prototype.reset = function(data) {
		this.flagQuestion=false;
		var question = {};
		if (data == null || data == undefined || data == "") {
			this.mensaje = "Error al recuperar cuenta del usuario";
			this.msg.warning();
			return;
		} else {
			if(this.itemSegundario==true){
				if(this.othermail==null || this.othermail==undefined || this.othermail.length==0){
					this.mensaje="Debe ingresar el correo al que sera enviado la informacion";
					this.msg.warning();
					return;
				}
				if (!(validarEmail(this.othermail))) {
					this.recoveryPassword.email = "";
					this.mensaje = "Formato de correo electrónico inválido";
					this.msg.warning();
					return;
				}
			}
			if (data.hasOwnProperty('email')) {
				if (data.email == null || data.email == undefined || data.email == "") {
					this.mensaje = "Para recuperar la contraseña debe ingresar el correo electrónico";
					this.msg.warning();
					return;
				} else {
					if (!(validarEmail(data.email))) {
						this.recoveryPassword.email = "";
						this.mensaje = "Formato de correo electrónico inválido";
						this.msg.warning();
						return;
					}
				}
			} else {
				this.mensaje = "Para recuperar la contraseña debe ingresar el correo electrónico";
				this.msg.warning();
				return;
			}
			if(this.listQuestion==null || this.listQuestion==undefined || this.listQuestion.length==0){
				this.mensaje="Debe ingresar las preguntas de seguridad";
				this.msg.warning();
				return;
			}else{
				var listAux=[];
				var aux0={};
				for(var i=0; i<this.listQuestion.length;i++){
					if(this.listQuestion[i]!=null){
						aux0={};
						if(this.listQuestion[i].hasOwnProperty('name')){
							aux0.question=this.listQuestion[i].name;
						}
						if(this.listQuestion[i].hasOwnProperty('value')){
							if(this.listQuestion[i].value!=null){
								if(!validarLetrasyOtrosCaracteres(this.listQuestion[i].value)){
									this.mensaje="El formato de la respuesta "+(i+1)+" es incorrecta";
									this.msg.warning();
									return;
								}else{
									this.listQuestion[i].value=this.listQuestion[i].value.toLowerCase().trim();
								}
							}
							aux0.answer=this.listQuestion[i].value;
						}
						listAux.push(aux0);
					}
				}
			}
			let param={
				"email":data.email.toLowerCase().trim(),
				"emails_to_send_url": this.itemSegundario == true ? [this.othermail] : [data.email.toLowerCase().trim()],
				security_questions:listAux
			};

			var mensajeAll="Error al enviar solicitud de recuperación de contraseña";
			var request=this.ser.callServicesHttp('reset',null,param);
			request.subscribe(data=>{
				if(!(data==null || data==undefined || data=="")){
					if(data.status_http==200){
						this.recoveryPassword = {
							email : '',
							security_questions : [ {
								"question" : '',
								"answer" : null
							}, {
								"question" : '',
								"answer" : null
							} ]
						};
						this.flagQuestion=false;
						this.listQuestion=[];
						this.data_to_recuperar=null;
						this.itemPrincipal=true;
						this.itemSegundario=false;
						this.othermail=null;
						delete data['status_http'];
						this.mensaje = "Correo de recuperación enviado";
						this.msg.info();
					}else{
						this.flagQuestion=false;
						this.listQuestion=[];
						this.data_to_recuperar=null;
						this.itemPrincipal=true;
						this.itemSegundario=false;
						this.othermail=null;
						this.mensaje=this.ser.processMessageError(data,mensajeAll);
						this.msg.error();
					}
				}
			},err=>{
				this.mensaje=this.ser.processError(err,mensajeAll);
				this.msg.error();
			});
		}
	}
	app.RequestRecoveryPasswordComponent.prototype.mostrarIcon=function(index){
		try{
			this.listQuestion[index].icon_eye="fa-eye";
			document.getElementById("pregunta"+index).type="text";
		}catch(er){
		}
	}
	app.RequestRecoveryPasswordComponent.prototype.ocultarIcon=function(index){
		try{
			this.listQuestion[index].icon_eye="fas fa-eye-slash";
			document.getElementById("pregunta"+index).type="password";
		}catch(er){
		}
	}
	app.RequestRecoveryPasswordComponent.prototype.validarEmail= function(event,data){
		return keypressvalidarEmail(event,data);
	}
	app.RequestRecoveryPasswordComponent.prototype.back = function() {
		window.history.back();
	}
})(window.app || (window.app = {}));