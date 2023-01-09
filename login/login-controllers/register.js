(function(app) {
	app.RegisterComponent =
		ng.core.Component({
		selector: 'register',
		templateUrl: 'views/register_v6.html'
		})
		.Class({
		  constructor: [ng.router.ActivatedRoute,
		                ng.router.Router, app.AppCallService,app.MsgComponent,
		  function(active,router,ser,msg) {
			  this.active=this.active;
			  this.router=router;
			  this.ser=ser;
			  this.msg=msg;
		  }],
			getValueMsg:function(){
                var link = ['/init'];
                this.router.navigate(link);
			}
		});
	app.RegisterComponent.prototype.keyupsearch=function(event){
		try{
			if (event.keyCode == 13) {
				this.send();
			}
		}catch(err){
			
		}
	}
	app.RegisterComponent.prototype.setMask=function(){
		$(document).ready(function() {
			$('.phone').mask('(000) 000-0000', {
				placeholder : "(000) 000-0000"
			});
		});
	}
	app.RegisterComponent.prototype.keyPress=function(event){
		return keyPressValidarLetrasNumerosSimplesGuionesPisos(event);
	}
	app.RegisterComponent.prototype.keypressNumeros=function(event){
		return keypressNumbersInteger(event);
	}
	app.RegisterComponent.prototype.completeDoc=function(data){
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
	app.RegisterComponent.prototype.ngOnInit=function(){
		$(document).ready(function() {
			$('.phone').mask('(000) 000-0000', {
				placeholder : "(000) 000-0000"
			});
		});
		this.aceptarTerminos=false;
		this.itemNatural=true;
		this.itemJuridica=false;
		this.listDocType=returnListDocType();
		this.dataProfile={};
		this.dataProfile.name=null;
		this.dataProfile.lastName=null;
		this.dataProfile.email=null;
		this.dataProfile.phone=null;
		this.dataProfile.business_name=null;
		this.dataProfile.name=null;
		this.dataProfile.id_doc_type=null;
		this.dataProfile.id_doc=null;
		this.validacionProfile={
				nombre:"El campo nombre de la persona no puede estar vacío",
				apellido:"El campo apellido no puede estar vacío",
				business_name:"La razón social no puede estar vacío",
				id_doc:"El id de documento no puede estar vacío",
				country:"El país no puede estar vacío",
				alias:null

		};
		this.listCountry = [ {
			value : 'VE',
			name : 'VENEZUELA'
		} ];
		this.icon_eye_nueva="fas fa-eye-slash";
		this.icon_eye_confirm="fas fa-eye-slash";
		this.icon_eye_pregunta1="fas fa-eye-slash";
		this.icon_eye_pregunta2="fas fa-eye-slash";
		this.email=null;
		this.password=null;
		this.confirm_password=null;
		this.question1="EN QUE CIUDAD NACISTE";
		this.response1=null;
		this.question2="CUAL ES EL NOMBRE DE SU ABUELA MATERNA";
		this.response2=null;
		this.active=null;
		this.questionList = ['En que ciudad naciste','Cuál es el nombre de su abuela materna', 'Cuál es el nombre de su mejor amigo(a) de la infancia'];
		if(localStorage.getItem("register_data")==null){
			this.getQuestions(2,null);
		}else{
			try{
				this.active="active";
				var aux1=JSON.parse(localStorage.getItem("register_data"));
				this.dataProfile.id_doc_type=aux1.payer.id_doc.charAt(0);
				this.dataProfile.id_doc=aux1.payer.id_doc.substring(1,aux1.payer.id_doc.length);
				this.ser.removeKey("register_data");
			}catch(er1){
				console.log(er1);
			}
			this.getQuestions(2,null);
		}
		
	}
	app.RegisterComponent.prototype.getQuestions=function(q,indice){
		var mensajeAll="Error al obtener preguntas de seguridad";
		var request=this.ser.callServicesHttp('get-questions',"&amount="+q,null);
		request.subscribe(data=>{
			if(data==null || data==undefined  || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					delete data['status_http'];
					if(data.hasOwnProperty("body")){
						if(!(data.body==null || data.body==undefined || data.body.length==0)){
							this.questionList=[];
							if(data.body.length==2){
								try{
									this.question1=data.body[0].question;
									this.question2=data.body[1].question;
								}catch(err){
								}
							}else{
								if(data.body.length==1){
									try{
										if(indice==1){
											this.question1=data.body[0].question;
										}else{
											this.question2=data.body[0].question;
										}
									}catch(err){
									}
								}
							}
							/*for(var i=0;i<data.body.length;i++){
								if(data.body[i]!=null){
									this.questionList.push(data.body[i].question);
								}
							}*/
						}
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
	app.RegisterComponent.prototype.clean=function(){
		this.email=null;
		this.password=null;
		this.confirm_password=null;
		this.question1=null;
		this.response1=null;
		this.question2=null;
		this.response2=null;
	}
	app.RegisterComponent.prototype.selectedIdDoc=function(){
		this.itemNatural=!this.itemNatural;
		this.itemJuridica=!this.itemJuridica;
		this.dataProfile.name=null;
		this.dataProfile.lastName=null;
		this.dataProfile.business_name=null;
		if(this.itemNatural){
			this.active_n="active";
			this.active_j=null;
		}else{
			this.active_j="active";
			this.active_n=null;
		}
	}
	app.RegisterComponent.prototype.send=function(){
		var parametros = {};
		if(this.email==null || this.email==undefined || this.email==""){
			this.mensaje="Debe ingresar el correo electrónico";
			this.msg.warning();
			return;
		}else{
			if(!validarEmail(this.email.trim())){
				this.mensaje = "El correo electrónico ingresado es inválido";
				this.msg.warning();
				return;
			}else{
				parametros.email=this.email.trim().toLowerCase();
			}
		}
		if(this.password==null || this.password==undefined || this.password==""){
			this.mensaje="Debe ingresar la contraseña";
			this.msg.warning();
			return;
		}else{
			if(checkPwd(this.password)==null){
				var $key = RSA.getPublicKey(publicKey());
				parametros.password=RSA.encrypt(this.password.trim(),$key);
			}else{
				this.mensaje=checkPwd(this.password);
				this.msg.warning();
				return;
			}
		}
		if(this.confirm_password==null || this.confirm_password==undefined || this.confirm_password==""){
			this.mensaje="Debe repetir la contraseña";
			this.msg.warning();
			return;
		}
		if (this.password.trim() != this.confirm_password.trim()) {
			this.mensaje = "La confirmación de la contraseña no concuerda";
			this.msg.warning();
			return;
		}
		var questions=[];
		var objeto={};
		if(this.question1==null || this.question1==undefined || this.question1==""){
			this.mensaje="Debe ingresar la primera pregunta de seguridad";
			this.msg.warning();
			return;
		}else{
			objeto.question=this.question1;
		}
		if(this.response1==null || this.response1==undefined || this.response1==""){
			this.mensaje="Debe ingresar la primera respuesta de seguridad";
			this.msg.warning();
			return;
		}else{
			objeto.answer=this.response1.trim().toLowerCase();
		}
		questions.push(objeto);
		objeto={};
		if(this.question2==null || this.question2==undefined || this.question2==""){
			this.mensaje="Debe ingresar la segunda pregunta de seguridad";
			this.msg.warning();
			return;
		}else{
			objeto.question=this.question2;
		}
		if(this.response2==null || this.response2==undefined || this.response2==""){
			this.mensaje="Debe ingresar la segunda respuesta de seguridad";
			this.msg.warning();
			return;
		}else{
			objeto.answer=this.response2.trim().toLowerCase();
		}
		if(this.question1==this.question2){
			this.mensaje="Debe seleccionar diferentes preguntas";
			this.msg.warning();
			return;
		}
		questions.push(objeto);
		if(questions==null || questions.length==0){
			this.mensaje="Debe ingresar las preguntas de seguridad";
			this.msg.warning();
			return;
		}else{
			parametros.security_questions=questions;
		}
		if(this.dataProfile==null || this.dataProfile==undefined || this.dataProfile==""){
			this.mensaje="Debe ingresar los datos del perfil";
			this.msg.warning();
			return;
		}else{
			if(this.dataProfile.id_doc==null || this.dataProfile.id_doc==undefined || this.dataProfile.id_doc==""){
				this.mensaje="El número de documento no puede estar vacío";
				this.msg.warning();
				return;
			}else{
				if(utils_keyNumber(this.dataProfile.id_doc.trim())){
					var texto1="";
					if(this.dataProfile.id_doc_type==null || this.dataProfile.id_doc_type==undefined || this.dataProfile.id_doc_type==""){
						this.mensaje="El tipo de documento no puede estar vacío";
						this.msg.warning();
						return;
					}else{
						var texto=this.dataProfile.id_doc_type.trim();
						this.completeDoc(this.dataProfile.id_doc);
						parametros.id_doc=texto+this.dataProfile.id_doc;
					}
				}else{
					this.mensaje="El número de documento, sólo acepta números";
					this.msg.warning()
					return;
				}
			}
			if(this.itemNatural){
				parametros.type="NATURAL_PERSON";
				parametros.id_doc_type="CI";
				if(this.dataProfile.name==null || this.dataProfile.name==undefined || this.dataProfile.name==""){
					this.mensaje="El campo nombre de la persona no puede estar vacío";
					this.msg.warning();
					return;
				}else{
					if(validarOnlyLetrasBoolean(this.dataProfile.name.trim())){
						parametros.first_name=this.dataProfile.name.trim().toUpperCase();
						dataDevice=parametros.first_name;
					}else{
						this.mensaje="El formato del nombre de la persona es incorrecto";
						this.msg.warning();
						return;
					}
				}
				if(this.dataProfile.lastName==null || this.dataProfile.lastName==undefined || this.dataProfile.lastName==""){
					this.mensaje="El campo apellido no puede estar vacío";
					this.msg.warning();
					return;
				}else{
					if(validarOnlyLetrasBoolean(this.dataProfile.lastName.trim())){
						parametros.last_name=this.dataProfile.lastName.trim().toUpperCase();
						if(dataDevice!=null){
							dataDevice=dataDevice+" "+parametros.last_name;
						}
					}else{
						this.mensaje="El formato del apellido es incorrecto";
						this.msg.warning();
						return;
					}
				}
			}else{
				parametros.type="LEGAL_PERSON";
				parametros.id_doc_type="RIF";
				if(this.dataProfile.business_name==null || this.dataProfile.business_name==undefined || this.dataProfile.business_name==""){
					this.mensaje="La razón social no puede estar vacía";
					this.msg.warning();
					return;
				}else{
					parametros.business_name=this.dataProfile.business_name.trim().toUpperCase();
					dataDevice=parametros.business_name;
				}
			}
			if(!(this.dataProfile.phone==null || this.dataProfile.phone==undefined || this.dataProfile.phone=="")){
				var telefono = $('#phone').val();
				telefono = telefono.replace("(","").replace(")","").replace("-","").replace(" ","").trim()
				if (!validateIsPhone(telefono)) {
					this.mensaje="El número de teléfono no es valido";
					this.msg.warning();
					return;
				}
				if(telefono<10){
					this.mensaje=`El número de teléfono esta incompleto`;
					this.msg.warning();
					return;
				}
				parametros.phone= telefono;
			}
			if(this.country==null || this.country==undefined || this.country==""){
				this.mensaje="Debe ingresar el país";
				this.msg.warning();
				return;
			}else{
				parametros.country=this.country;
			}
			if(!(this.alias==null || this.alias==undefined || this.alias=="")){
				parametros.alias=this.alias.toUpperCase().trim();	
			}
		}
		if(!this.aceptarTerminos){
			this.mensaje="Debe aceptar los términos y condiciones";
			this.msg.warning();
			return;
		}
		var mensajeAll="Error al crear usuario";
		var request=this.ser.callServicesHttp('register',null,parametros);
		request.subscribe(data=>{
			if(data==null || data==undefined  || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
			}else{
				if(data.status_http==200){
					delete data['status_http'];
					this.ser.removeKey("register_data");
					this.mensaje = "Usuario creado con exito. Fue enviado un correo electrónico, tiene 24 horas para realizar la activación, de lo contrario tendra que realizar de nuevo el registro";
					this.msg.info();
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
	app.RegisterComponent.prototype.showPasswordNueva=function(){
		this.icon_eye_nueva="fa-eye";
		try{
			document.getElementById("pass").type="text";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.calcYearCopy=function(){
		return calcYearCopy()
	}
	app.RegisterComponent.prototype.showPasswordNuevaOut=function(){
		this.icon_eye_nueva="fas fa-eye-slash";
		try{
			document.getElementById("pass").type="password";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.showPasswordConfirm=function(){
		this.icon_eye_confirm="fa-eye";
		try{
			document.getElementById("pass2").type="text";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.showPasswordConfirmOut=function(){
		this.icon_eye_confirm="fas fa-eye-slash";
		try{
			document.getElementById("pass2").type="password";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.showPregunta1=function(){
		this.icon_eye_pregunta1="fa-eye";
		try{
			document.getElementById("respuesta1").type="text";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.showPregunta1Out=function(){
		this.icon_eye_pregunta1="fas fa-eye-slash";
		try{
			document.getElementById("respuesta1").type="password";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.showPregunta2=function(){
		this.icon_eye_pregunta2="fa-eye";
		try{
			document.getElementById("respuesta2").type="text";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.showPregunta2Out=function(){
		this.icon_eye_pregunta2="fas fa-eye-slash";
		try{
			document.getElementById("respuesta2").type="password";
		}catch(er){
			console.log("er");
		}
	}
	app.RegisterComponent.prototype.keyPressCtrlZ=function(event){
		return disabledCtlZ(event);
	}
	app.RegisterComponent.prototype.validarEmail= function(event,data){
		return keypressvalidarEmail(event,data);
	}
	app.RegisterComponent.prototype.openModalTerminos=function(){
		$("#modalTerminos").modal();
	}
	app.RegisterComponent.prototype.back=function(){
		this.ser.removeKey("register_data");
		window.history.back();
	}
})(window.app || (window.app = {}));