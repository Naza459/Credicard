(function(app) {
	app.RapidPayComponent =
		ng.core.Component({
		selector: 'rapid-pay',
		templateUrl: 'views/rapid-pay_v22.html'
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
		app.RapidPayComponent.prototype.devolverEvent=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(event.keyCode==8){
					if(this.monto!=null){
						if(this.monto==""){
							this.monto="0,00";
						}else{
							if(this.monto.length==3){
								this.monto="0,"+this.monto.charAt(0)+this.monto.charAt(2);
							}
						}
					}else{
						this.monto="0,00";
					}
				}
			}
		}
		app.RapidPayComponent.prototype.keyDown=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(event.keyCode==37 || event.keyCode==38){
					return false;
				}
			}
		}
		app.RapidPayComponent.prototype.getEventMonto=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(this.regex.test(event.key)){
					if(this.monto!=null){
						if(this.monto.length==4){
							if(this.monto=="0,00"){
								if(event.key==0 || event.key=="0"){
									return false;
								}else{
									this.monto="0,0"+event.key;
									return false;
								}
							}else{
								if(this.monto.substring(0,3)=="0,0"){
									this.monto="0,"+this.monto.charAt(this.monto.length-1)+event.key;
									return false;
								}else{
									if(this.monto.charAt(0)=="0" || this.monto.charAt(0)==0){
										this.monto=this.monto.charAt(2)+","+this.monto.charAt(3)+event.key;
										return false;
									}
								}
							}
						}
					}
				}else{
					return false;
				}
			}
		}
		app.RapidPayComponent.prototype.moveCursorToEnd=function() {
			var el=document.getElementById("monto");
			if (typeof el.selectionStart == "number") {
				el.selectionStart = el.selectionEnd = el.value.length;
			} else if (typeof el.createTextRange != "undefined") {
				el.focus();
				var range = el.createTextRange();
				range.collapse(false);
				range.select();
			}
		}
		app.RapidPayComponent.prototype.changeAmount=function(event){
			if(!(this.monto==null || this.monto==undefined || this.monto=="")){
				if(this.monto.length==1){
					this.monto="0,0"+this.monto;
				}else{
					if(this.monto.length==2){
						this.monto="0,"+this.monto;
					}
				}
			}
		}
		app.RapidPayComponent.prototype.inputEvent=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(!(event.data==null || event.data==undefined || event.data=="")){
					if(this.regex.test(event.data)){
						if(this.monto!=null){
							if(this.monto.length==4){
								if(this.monto=="0,00"){
									if(event.data==0 || event.data=="0"){
										document.getElementById("monto").value="0,00";
										return false;
									}else{
										document.getElementById("monto").value="0,0"+event.data;
										return false;
									}
								}else{
									if(this.monto.substring(0,3)=="0,0"){
										document.getElementById("monto").value="0,"+this.monto.charAt(this.monto.length-1)+event.data;
										return false;
									}else{
										if(this.monto.charAt(0)=="0" || this.monto.charAt(0)==0){
											document.getElementById("monto").value=this.monto.charAt(2)+","+this.monto.charAt(3)+event.data;
											return false;
										}
									}
								}
							}
						}
					}else{
						return false;
					}
				}else{
					if(event.inputType=="deleteContentBackward"){
							if(this.monto!=null){
							if(this.monto==""){
								document.getElementById("monto").value="0,00";
							}else{
								if(this.monto.length==3){
									document.getElementById("monto").value="0,"+this.monto.charAt(0)+this.monto.charAt(2);
								}
							}
						}else{
							document.getElementById("monto").value="0,00";
						}
					}
				}
			}
		}
		app.RapidPayComponent.prototype.devolverEventToken=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(event.keyCode==8){
					if(this.token!=null){
						if(this.token==""){
							this.token="0,00";
						}else{
							if(this.token.length==3){
								this.token="0,"+this.token.charAt(0)+this.token.charAt(2);
							}
						}
					}else{
						this.token="0,00";
					}
				}
			}
		}
		app.RapidPayComponent.prototype.getEventMontoToken=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(this.regex.test(event.key)){
					if(this.token!=null){
						if(this.token.length==4){
							if(this.token=="0,00"){
								if(event.key==0 || event.key=="0"){
									return false;
								}else{
									this.token="0,0"+event.key;
									return false;
								}
							}else{
								if(this.token.substring(0,3)=="0,0"){
									this.token="0,"+this.token.charAt(this.token.length-1)+event.key;
									return false;
								}else{
									if(this.token.charAt(0)=="0" || this.token.charAt(0)==0){
										this.token=this.token.charAt(2)+","+this.token.charAt(3)+event.key;
										return false;
									}
								}
							}
						}
					}
				}else{
					return false;
				}
			}
		}
		app.RapidPayComponent.prototype.moveCursorToEndToken=function() {
			var el=document.getElementById("token_ccr");
			if (typeof el.selectionStart == "number") {
				el.selectionStart = el.selectionEnd = el.value.length;
			} else if (typeof el.createTextRange != "undefined") {
				el.focus();
				var range = el.createTextRange();
				range.collapse(false);
				range.select();
			}
		}
		app.RapidPayComponent.prototype.changeAmountToken=function(event){
			if(!(this.token==null || this.token==undefined || this.token=="")){
				if(this.token.length==1){
					this.token="0,0"+this.token;
				}else{
					if(this.token.length==2){
						this.token="0,"+this.token;
					}
				}
			}
		}
		app.RapidPayComponent.prototype.inputEventToken=function(event){
			if(!(event==null || event==undefined || event=="")){
				if(!(event.data==null || event.data==undefined || event.data=="")){
					if(this.regex.test(event.data)){
						if(this.token!=null){
							if(this.token.length==4){
								if(this.token=="0,00"){
									if(event.data==0 || event.data=="0"){
										document.getElementById("token_ccr").value="0,00";
										return false;
									}else{
										document.getElementById("token_ccr").value="0,0"+event.data;
										return false;
									}
								}else{
									if(this.token.substring(0,3)=="0,0"){
										document.getElementById("token_ccr").value="0,"+this.token.charAt(this.token.length-1)+event.data;
										return false;
									}else{
										if(this.token.charAt(0)=="0" || this.token.charAt(0)==0){
											document.getElementById("token_ccr").value=this.token.charAt(2)+","+this.token.charAt(3)+event.data;
											return false;
										}
									}
								}
							}
						}
					}else{
						return false;
					}
				}else{
					if(event.inputType=="deleteContentBackward"){
							if(this.monto!=null){
							if(this.monto==""){
								document.getElementById("monto").value="0,00";
							}else{
								if(this.monto.length==3){
									document.getElementById("monto").value="0,"+this.monto.charAt(0)+this.monto.charAt(2);
								}
							}
						}else{
							document.getElementById("monto").value="0,00";
						}
					}
				}
			}
		}
		app.RapidPayComponent.prototype.ngOnInit=function(){
			this.moneda_tarjeta=null;
			this.listMonedasCard=getListMonedas();
			this.monto_maximo=null;
			this.bank_type=null;
			this.stream=null;
			this.tag_turn="Apagar cámara";
			this.imagen=null;
			this.banco_tarjeta=null;
			this.email=null;
			this.monto="0,00";
			this.numero_telefono=null;
			this.description=null;
			this.titular=null;
			this.id_doc_type="V";
			this.doc=null;
			this.nro_tarjeta=null;
			this.nro_tarjeta2=null;
			this.cvv=null;
			this.expiracion=null;
			this.token=null;
			this.regex=/^\d+$/;
			this.currency="VED";
			this.icon_eye2="fas fa-eye-slash";
			this.clave_debito=null;
			payform.expiryInput(document.getElementById('expiracion'));
			this.listCurrency=returnListCurrency();
			this.listType=returnListTypesDocument('VE');
			this.listTiposCuenta=["PRINCIPAL","AHORRO","CORRIENTE"];
			this.icon_eye="fas fa-eye-slash";
			$('.phone').mask('(000) 000-0000', {
				placeholder : "(4xx) 000-0000"
			});
			$("#monto").mask("#.##0,00", {reverse: true});
			this.tipoTarjeta="CREDIT";
			this.tipoTarjetaCreditBoolean=true;
			this.tipoTarjetaDebitBoolean=false;
			this.bankSelected=null;
			this.mostrarBotonEnviarToken=false;
			this.mostrarTelefono=false;
			this.mostrarToken="NONE";
			var contexto=this;
			this.etiqueta=null;
			this.config_boton_pago=null;
			this.total_boton_pago=null;
			this.email_boton_pago=null;
			var newDate=new Date();
			var date1 = new Date('2021-09-30');
			var date2 = new Date('2021-11-01');
			if(newDate.getTime()>=date1.getTime() && newDate.getTime()<date2.getTime()){
				$("#modalRepresion").modal();
			}
			if(this.ser.getFingerPrint()==null || this.ser.getFingerPrint()==undefined || this.ser.getFingerPrint()==""){
				this.fingerprint=create_UUID();
			}else{
				this.fingerprint=this.ser.getFingerPrint();
			}
			if(this.ser.getBackUrl()!=null){
				this.processBotonPago();
			}
			
			this.keyPressNroTarjeta();
		}

		app.RapidPayComponent.prototype.keyPressNroTarjeta = function(){
			const card = document.getElementById("nro");
			card.onkeypress = (event) => {
				let val = event.target.value;
				const array = [];
				if(val.length >= 5){
				val = val.split("");
				val = val.map((d, i) => {
					if(i > 5){
					d = "*";
					return d;
					}else{
					return d;
					}
				});if (val.length >= 16) {
					return event;
				}
			}
				let result = val.join("").replace(",", "");
				card.value = result;
			}
		} 
		app.RapidPayComponent.prototype.blurNroTarjeta=function(){
			const input = document.querySelector('#nro');

			input.addEventListener('blur', (e) => {
				
			})
		}
		app.RapidPayComponent.prototype.processBotonPago=function(){
			var aux=this.ser.getBackUrl();
			try{
				aux=decodeURI(aux);
				aux=aux.split("?");
				if((aux[0].indexOf("wallet#/checkout-payment")>-1) || (aux[0].indexOf("wallet/#/checkout-payment")>-1)){
					return;
				}
				aux=aux[1];
				aux=aux.split("|");
				var objeto=null;
				for(var i=0;i<aux.length;i++){
					objeto=aux[i].split("=");
					if(objeto[0]=="email"){
						this.email_boton_pago=objeto[1];
					}
					if(objeto[0]=="config_id"){
						this.config_boton_pago=objeto[1];
					}
					if(objeto[0]=="total"){
						this.total_boton_pago=objeto[1];
					}
				}
				this.getConfiguration();
				
			}catch(er){
			}	
		}
		app.RapidPayComponent.prototype.rechazaPago=function(){
			if(this.ser.getBackUrl()!=null){
				removeCookie('back_url_wallet');
			}
			if(this.error_back_url!=null){
				window.location.href=this.error_back_url+"?msg="+encodeURI("Pago rechazado");
			}else{
				window.history.back();
			}
		}
		app.RapidPayComponent.prototype.payWithBotonPago=function(){
			this.monto=((this.total_boton_pago*100)/100).toFixed(2);
			this.monto=this.monto.replace(/\./g,",");
			this.claseMonto="active";
			this.disabledMonto=true;
			this.email=this.email_boton_pago;
			if(!(this.currenciesBoton==null || this.currenciesBoton==undefined || this.currenciesBoton=="" || this.currenciesBoton.length==0)){
				var objeto=null;
				this.listCurrency=[];
				for(var i=0;i<this.currenciesBoton.length;i++){
					if(this.currenciesBoton[i]!=null){
						objeto={};
						objeto.value=this.currenciesBoton[i];
						objeto.label=translate(this.currenciesBoton[i]).toUpperCase();
						this.listCurrency.push(objeto);
					}
				}
			}
		}
		app.RapidPayComponent.prototype.getConfiguration=function(){
			let request=this.ser.callServicesHttp('get-config',"&collector="+this.email_boton_pago+"&operation_config_id="+this.config_boton_pago,null);
			var mensajeAll="Error al obtener datos de la configuración del botón de pago";
			request.subscribe(data=>{
				if(data==null || data==undefined || data==""){
					this.mensaje=mensajeAll;
					this.msg.error();
					}else{
						if(data.status_http==200){
							delete data['status_http'];
							if(data.hasOwnProperty("error_back_url")){
								if(!(data.error_back_url==null || data.error_back_url==undefined || data.error_back_url=="")){
									this.error_back_url=data.error_back_url;
								}
								if(!(data.success_back_url==null || data.success_back_url==undefined || data.success_back_url=="")){
									this.success_back_url=data.success_back_url;
								}
							}
							if(data.hasOwnProperty("allowed_currencies")){
								if(!(data.allowed_currencies==null ||data.allowed_currencies==undefined || data.allowed_currencies=="" || data.allowed_currencies.length==0)){
									this.currenciesBoton=data.allowed_currencies;
								}
							}
							$("#aceptar_pago").modal();
						}else{
							this.mensaje=this.ser.processMessageError(data,mensajeAll);
							this.msg.error();
						}
					}
				},err=>{
					this.mensaje=this.ser.processError(err,mensajeAll);
					this.msg.error();
					return;
				});
		}
		app.RapidPayComponent.prototype.clean=function(){
			this.token=null;
			this.moneda_tarjeta=null;
			this.mostrarOtp="NONE";
			this.bank_type=null;
			this.numero_telefono=null;
			this.expiracion=null;
			this.cvv=null;
			this.description=null;
			this.titular=null;
			this.id_doc_type=null;
			this.doc=null;
			this.clave_debito=null;
			this.nro_tarjeta=null;
			this.nro_tarjeta2=null;
			this.tipoTarjeta="CREDIT";
			this.tipo_cuenta=null;
			this.tipoTarjetaCreditBoolean=true;
			this.tipoTarjetaDebitBoolean=false;
			this.mostrarBotonEnviarToken=false;
			this.mostrarTelefono=false;
			this.mostrarToken="NONE";
			this.bankCodeSelected=null;
			this.banco_tarjeta=null;
			this.imagen=null;
			if(!this.disabledMonto){
				this.monto="0,00";
				this.currency="VED";
				this.email=null;
			}
		}
		app.RapidPayComponent.prototype.changeTipoT=function(){
			this.tipoTarjetaCreditBoolean=!this.tipoTarjetaCreditBoolean;
			this.tipoTarjetaDebitBoolean=!this.tipoTarjetaDebitBoolean;
			if(this.tipoTarjetaCreditBoolean){
				this.tipoTarjeta="CREDIT";
			}
			if(this.tipoTarjetaDebitBoolean){
				this.tipoTarjeta="DEBIT";
			}
			if(this.status_tarjeta=="LOCKED"){
				this.mensaje="Tarjeta bloqueada";
				this.msg.warning();
				return;
			}
			if(this.bank_type=="INTERNATIONAL" && this.tipoTarjeta=="DEBIT"){
				this.mensaje="La tarjeta seleccionada sólo puede ser procesada como Crédito";
				this.msg.warning();
				return;
			}
			this.checkVerificar1();
		}
		app.RapidPayComponent.prototype.checkVerificar1=function(){
			this.mostrarBotonEnviarToken=false;
			this.mostrarTelefono=false;
			this.mostrarOtp="NONE";
			if(this.configuracion_otp!=null){
				if(this.tipoTarjeta=="CREDIT"){
					if(this.configuracion_otp.TDC!=null && this.configuracion_otp.TDC!=undefined){
							this.mostrarOtp=this.configuracion_otp.TDC;
							if(this.mostrarOtp=="OTP_BANK"){
								this.token=null;
							}else{
								if(this.mostrarOtp=="OTP_CCR"){
									this.token="0,00";
								}
							}
						}
				}else{
					if(this.configuracion_otp.TDD!=null && this.configuracion_otp.TDD!=undefined){
						this.mostrarOtp=this.configuracion_otp.TDD;
						if(this.mostrarOtp=="OTP_BANK"){
							this.token=null;
						}else{
							if(this.mostrarOtp=="OTP_CCR"){
								this.token="0,00";
							}
						}
					}
				}
			}else{
				this.mostrarOtp="OTP_CCR";
				this.token="0,00";
			}
			if(this.mostrarOtp!="NONE"){
				this.showFields(this.bankAcronymSelected);
			}else{
			}
			if(!(this.nueva_tarjeta_cvc==null || this.nueva_tarjeta_cvc==undefined || this.nueva_tarjeta_cvc=="")){
				this.etiqueta1="active";
			}
		}
		app.RapidPayComponent.prototype.setMaskMonto=function(){
			$("#token_ccr").mask("#.##0,00", {reverse: true});	
			var el=document.getElementById("token_ccr");
			if (typeof el.selectionStart == "number") {
				el.selectionStart = el.selectionEnd = el.value.length;
			} else if (typeof el.createTextRange != "undefined") {
				el.focus();
				var range = el.createTextRange();
				range.collapse(false);
				range.select();
			}
		}
		app.RapidPayComponent.prototype.validarEmail= function(event,data){
			return keypressvalidarEmail(event,data);
		}
		app.RapidPayComponent.prototype.showPassword1=function(){
			this.icon_eye="fa fa-eye";
			try{
				document.getElementById("clave1").type="text";
			}catch(er){
				console.log("er");
			}
		}
		app.RapidPayComponent.prototype.showPassword1Out=function(){
			this.icon_eye="fas fa-eye-slash";
			try{
				document.getElementById("clave1").type="password";
			}catch(er){
				console.log("er");
			}
		}
		app.RapidPayComponent.prototype.showPassword2=function(){
		this.icon_eye2="fa fa-eye";
		try{
			document.getElementById("cvv").type="text";
		}catch(er){
			console.log("er");
		}
	}
		app.RapidPayComponent.prototype.showPassword2Out=function(){
			this.icon_eye2="fas fa-eye-slash";
			try{
				document.getElementById("cvv").type="password";
			}catch(er){
				console.log("er");
			}
		}
		app.RapidPayComponent.prototype.showPassword3=function(){
			this.icon_eye2="fa fa-eye";
			try{
				document.getElementById("nro").type="text";
			}catch(er){
				console.log("er");
			}
		}
		app.RapidPayComponent.prototype.showPassword3Out=function(){
				this.icon_eye2="fas fa-eye-slash";
				try{
					document.getElementById("nro").type="text";
				}catch(er){
					console.log("er");
				}
			}
		app.RapidPayComponent.prototype.keyPress=function(event){
			return keypressNumbersInteger(event);
		}
		app.RapidPayComponent.prototype.changeCard=function(data){
			
			this.mostrarBotonEnviarToken=false;
			this.mostrarTelefono=false;
			this.mostrarToken=false;
			this.bank_type=null;
			this.bankCodeSelected=null;
			this.nro_tarjeta
			if(!(data==null || data==undefined || data=="")){
				if(data.trim().length<13){
					return;
				}
				if(!utils_keyNumber(data.trim())){
					this.mensaje="El formato del número de tarjeta es incorrecto";
					this.msg.warning();
					return;
				}
				var request=null;
				var mensajeAll="Error al validar tarjeta";
				this.bankCodeSelected=null;
				this.tarjetaBuscar=data.trim();
				this.imagen=null;
				this.banco_tarjeta=null;
				this.status_tarjeta=null;
				this.monto_maximo=null;	
				request=this.ser.callServicesHttp('get-bin',"&fingerprint="+this.fingerprint+"&card_number="+data.trim(),null);
				request.subscribe(data=>{
					if(data==null || data==undefined || data==""){
						this.mensaje=mensajeAll;
						this.msg.error();
					}else{
						if(data.status_http==200){
							delete data['status_http'];
							if(data.hasOwnProperty("otp_ccr_config")){
								if(Boolean(data.otp_ccr_config)){
									if(data.otp_ccr_config.hasOwnProperty("code_max_integer")){
										if(Boolean(data.otp_ccr_config.code_max_integer)){
											try{
												this.monto_maximo=amountFormattingObject(data.otp_ccr_config.code_max_integer*100);
												this.monto_maximo=this.monto_maximo.integerPart+","+this.monto_maximo.decimalPart+" VED";
											}catch(er){
											}
										}
									}
								}
							}
							if(data.hasOwnProperty("bank_info")){
								if(!(data.bank_info==null || data.bank_info==undefined || data.bank_info=="")){
									if(data.bank_info.hasOwnProperty("thumbnail")){
										if(!(data.bank_info.thumbnail==null || data.bank_info.thumbnail==undefined || data.bank_info.thumbnail=="")){
											this.imagen=getStatic()+data.bank_info.thumbnail;
										}
									}
									if(data.bank_info.hasOwnProperty("name")){
										this.banco_tarjeta=data.bank_info.name;
									}
									if(data.bank_info.hasOwnProperty("emitter")){
										if(data.bank_info.emitter==false){
											this.mensaje="El banco de la tarjeta seleccionada no es un emisor permitido";
											this.msg.warning();
											return;
										}
									}
									if(data.bank_info.hasOwnProperty("code")){
										this.bankCodeSelected=data.bank_info.code;
									}
									if(data.bank_info.hasOwnProperty("bank_type")){
										this.bank_type=data.bank_info.bank_type;
									}
									if(data.bank_info.hasOwnProperty("acronym")){
										this.acronimo=data.bank_info.acronym;
										this.bankAcronymSelected=data.bank_info.acronym;
									}
									if(data.bank_info.hasOwnProperty("card_validation_config")){
										this.configuracion_otp=data.bank_info.card_validation_config;
									}
									if(data.bank_info.hasOwnProperty("tdd_pin_required")){
										this.tdd_pin_required=data.bank_info.tdd_pin_required;
									}
									if(data.hasOwnProperty("card_status")){
										if(!(data.card_status==null || data.card_status==undefined || data.card_status=="")){
											this.status_tarjeta=null;
											this.status_tarjeta=data.card_status;
										}
									}
									this.checkVerificar1();
								}
							}else{
								this.bank_type="INTERNATIONAL";
								if(data.hasOwnProperty("card_status")){
									if(data.card_status==null || data.card_status==undefined || data.card_status==""){
										this.mensaje="Error al leer estatus de la tarjeta";
										this.msg.warning();
										return;
									}else{
										this.status_tarjeta=null;
										this.status_tarjeta=data.card_status;
										switch(data.card_status){
											case "PENDING_VALIDATION":{
												this.mensaje="La tarjeta requiere ser validada antes de realizar cualquier pago. Para eso debe ingresar a la cuenta asociada a la tarjeta y colocar en el campo OTP el monto descontado";
												this.msg.warning();
											}break;
											case "VALIDATED":{
											}break;
											case "LOCKED":{
												this.mensaje="Tarjeta bloqueada. Llamar a nuestro contact center: 0501-999-9999";
												this.msg.warning();
												return;
											}break;
											default:{
												this.mensaje="Error al leer estatus de la tarjeta";
												this.msg.warning();
												return;
											}
										}
									}
								}
								if(data.hasOwnProperty("financial_card_emitter")){
									if(data.financial_card_emitter==null || data.financial_card_emitter==undefined || data.financial_card_emitter==""){
										this.mensaje="Formato de tarjeta incorrecto";
										this.msg.warning();
										return;
									}else{
										if(data.financial_card_emitter.hasOwnProperty("name")){
											this.tipo=data.financial_card_emitter.name;
										}
										if(data.financial_card_emitter.hasOwnProperty("thumbnail")){
											this.imagen=getStatic()+data.financial_card_emitter.thumbnail;
										}
										if(!data.hasOwnProperty("card_status")){
											this.mensaje="La tarjeta requiere ser validada antes de realizar cualquier pago. Para eso debe llenar los datos completos del formulario y presionar el botón “Solicitar  token”, el cual generará una transacción por un monto máximo de "+this.monto_maximo+".Debe ingresar a la cuenta asociada a la tarjeta y colocar en el campo OTP el monto descontado de su cuenta";
											this.msg.warning();
										}
										this.configuracion_otp=null;
										this.checkVerificar1();
									}
								}else{
									this.mensaje="Formato de tarjeta incorrecto";
									this.msg.warning();
									return;
								}
								if(this.bank_type=="INTERNATIONAL" && this.tipoTarjeta=="DEBIT"){
									this.mensaje="La tarjeta seleccionada sólo puede ser procesada como Crédito";
									this.msg.warning();
									return;
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
		}
		app.RapidPayComponent.prototype.showFields=function(data){
			this.numero_telefono=null;
			this.token=null;
			this.mostrarBotonEnviarToken=false;
			this.mostrarTelefono=false;
			this.mostrarToken=false;
			if(!(data==null || data==undefined || data=="")){
				switch(this.mostrarOtp){
					case "OTP_BANK":{
						switch(data){
							case "BANCAMIGA":{
								this.mostrarBotonEnviarToken=true;
								this.mostrarTelefono=false;
								this.mostrarToken=true;
								this.bankSelected="BANCAMIGA";
							}break;
							case "BDV":{
								this.mostrarBotonEnviarToken=true;
								this.mostrarTelefono=false;
								this.mostrarToken=true;
								this.bankSelected="BDV";
							}break;
							case "BANCRECER":{
								this.mostrarBotonEnviarToken=true;
								this.mostrarTelefono=false;
								this.mostrarToken=true;
								this.bankSelected="BANCRECER";
							}break;
							case "TESORO":{
								this.mostrarBotonEnviarToken=true;
								this.mostrarTelefono=false;
								this.mostrarToken=true;
								this.bankSelected="TESORO";
							}break;
							case "BANFANB":{
								this.mostrarBotonEnviarToken=true;
								this.mostrarTelefono=false;
								this.mostrarToken=true;
								this.bankSelected="BANFANB";
							}break;
							case "BANCARIBE":{
								this.mostrarBotonEnviarToken=false;
								this.mostrarTelefono=false;
								this.mostrarToken=true;
								this.bankSelected="BANCARIBE";
							}break;
							case "MIBANCO":{
								this.mostrarBotonEnviarToken=false;
								this.mostrarTelefono=true;
								this.mostrarToken=true;
								$('.phone').mask('(0000) 000-0000', {
									placeholder : "(04xx) 000-0000"
								});
								this.bankSelected="MIBANCO";
							}break;
							default:{};
						}
					}break;
					case "OTP_CCR":{
						this.token="0,00";
						this.mostrarBotonEnviarToken=true;
						this.mostrarToken=true;
						if(this.status_tarjeta!=null){
							switch(this.status_tarjeta){
								case "PENDING_VALIDATION":{
									this.mensaje="La tarjeta requiere ser validada antes de realizar cualquier pago. Para eso debe ingresar a la cuenta asociada a la tarjeta y colocar en el campo OTP el monto descontado";
									this.msg.warning();
								}break;
								case "VALIDATED":{
									this.mostrarBotonEnviarToken=false;
									this.mostrarToken=false;
								}break;
								case "LOCKED":{
									this.mostrarBotonEnviarToken=false;
									this.mostrarToken=false;
									this.mensaje="Tarjeta bloqueada. Llamar a nuestro contact center: 0501-999-9999";
									this.msg.warning();
									return;
								}break;
								default:{
									this.mensaje="Error al leer estatus de la tarjeta";
									this.msg.warning();
									return;
								}
							}
						}
						
					}break;
					default:{}
				}
			}else{
				this.token="0,00";
				this.mostrarBotonEnviarToken=true;
				this.mostrarToken=true;
				if(this.status_tarjeta=="VALIDATED"){
					this.mostrarBotonEnviarToken=false;
					this.mostrarToken=false;
				}
			}
		}
	app.RapidPayComponent.prototype.blurTelefono=function(){
		$('.phone').mask('(000) 000-0000', {
			placeholder : "(4xx) 000-0000"
		});
	}
	app.RapidPayComponent.prototype.sendToken=function(){
		let parametros={};
		let request=null;
		var objeto={};
		if(this.mostrarOtp=="OTP_CCR"){
			if(this.titular==null || this.titular==undefined || this.titular==""){
				this.mensaje="Debe ingresar el nombre impreso en la tarjeta";
				this.msg.warning();
				return;
			}else{
				if(this.titular.trim()==""){
					this.mensaje="Debe ingresar el nombre impreso en la tarjeta";
					this.msg.warning();
					return;
				}else{
					objeto.holder_name=this.titular.trim().toUpperCase();
				}
			}
			if(this.nro_tarjeta==null || this.nro_tarjeta==undefined || this.nro_tarjeta==""){
				this.mensaje="Debe ingresar el número de la tarjeta";
				this.msg.warning();
				return;
			}else{
				if(this.nro_tarjeta.trim().length<13){
					this.mensaje="El número de la tarjeta esta incompleto";
					this.msg.warning();
					return;
				}else{
					if(utils_keyNumber(this.nro_tarjeta.trim())){
						objeto.card_number=this.nro_tarjeta.trim();
					}else{
						this.mensaje="El formato de número de tarjeta es incorrecto";
						this.msg.warning();
						return;
					}
				}
			}
			var aux3="";
			if(this.id_doc_type==null || this.id_doc_type==undefined || this.id_doc_type==""){
				this.mensaje="Para enviar el token debe ingresar el tipo de documento";
				this.msg.warning();
				return;
			}else{
				aux3=this.id_doc_type;
				if(this.doc==null || this.doc==undefined || this.doc==""){
					this.mensaje="Para enviar el token debe ingresar el número de documento";
					this.msg.warning();
					return;
				}else{
					if(utils_keyNumber(this.doc.trim())){
						if(this.doc.length<9){
							while(this.doc.length<9){
								this.doc="0"+this.doc;
							}
						}
						aux3=aux3+this.doc;
					}else{
						this.mensaje="El formato del número de documento es incorrecto";
						this.msg.warning();
						return;
					}
				}
			}
			objeto.holder_id=aux3;
			objeto.holder_id_doc="RIF";
			try{
				var aux=this.expiracion.split("/");
				if(!(aux==null || aux.length==0)){
					if(aux.length==2){
						var aux1=aux[0];
						var aux2=aux[1];
						if(aux1==null || aux1==undefined || aux1=="" || aux1==0 || aux1=="0" || aux1=="null" || aux1==NaN){
							this.mensaje="Debe ingresar el mes de expiración de la tarjeta";
							this.msg.warning();
							return;
						}
						if(aux2==null || aux2==undefined || aux2=="" || aux2==0 || aux2=="0" || aux2=="null" || aux2==NaN){
							this.mensaje="Debe ingresar el año de expiración de la tarjeta";
							this.msg.warning();
							return;
						}
						aux1=parseInt(aux1);
						aux2=parseInt(aux2);
						if(aux1<1 || aux1>12){
							this.mensaje="El mes expiración es incorrecto (1-12)";
							this.msg.warning();
							return;
						}
						var newDate = new Date();
						var mes=newDate.getMonth() + 1;
						var anno= newDate.getFullYear();
						anno=parseInt((anno+"").substring(2,(anno+"").length));
						if(aux1<10){
							aux1="0"+aux1;
						}
						if(aux2<10){
							aux2="0"+aux2;
						}
						if(aux1==null || aux1==undefined || aux1=="" || aux1==0 || aux1=="0" || aux1=="null" || aux1==NaN){
							this.mensaje="Debe ingresar el mes de expiración de la tarjeta";
							this.msg.warning();
							return;
						}
						if(aux2==null || aux2==undefined || aux2=="" || aux2==0 || aux2=="0" || aux2=="null" || aux2==NaN){
							this.mensaje="Debe ingresar el año de expiración de la tarjeta";
							this.msg.warning();
							return;
						}
						objeto.expiration_month=parseInt(aux1);
						objeto.expiration_year=parseInt(aux2);
					}else{
						this.mensaje="Debe ingresar mes de expiración y año válidos";
						this.msg.warning();
						return;
					}
				}else{
					this.mensaje="Debe ingresar mes de expiración y año válidos";
					this.msg.warning();
					return;
				}
			}catch(et){
				this.mensaje="Debe ingresar mes de expiración y año válidos";
				this.msg.warning();
				return;
			}
			if(this.cvv==null || this.cvv==undefined || this.cvv==""){
				this.mensaje="Debe ingresar el CVC  de la tarjeta";
				this.msg.warning();
				return;
			}else{
				if(this.cvv.length<3){
					this.mensaje="El CVC de la tarjeta esta incompleto";
					this.msg.warning();
					return;
				}else{
					if(utils_keyNumber(this.cvv.trim())){
						objeto.cvc=this.cvv.trim();
					}else{
						this.mensaje="El formato del CVC es incorrecto";
						this.msg.warning();
						return;
					}
				}
			}
			if(this.mostrarOtp=="OTP_CCR"){
				if(this.moneda_tarjeta==null || this.moneda_tarjeta==undefined || this.moneda_tarjeta=="" || this.moneda_tarjeta=="null"){
					this.mensaje="Debe ingresar la moneda a la que pertenece la tarjeta";
					this.msg.warning();
					return;
				}else{
					objeto.currency=this.moneda_tarjeta;
				}
			}
			if(this.tipoTarjeta=="CREDIT"){
				objeto.card_type="CREDIT";
				parametros["credit_card"]=objeto;
			}else{
				if(this.tipo_cuenta==null || this.tipo_cuenta==undefined || this.tipo_cuenta=="" || this.tipo_cuenta=="null"){
					this.mensaje="Debe seleccionar el tipo de cuenta";
					this.msg.warning();
					return;
				}else{
					objeto.account_type=this.tipo_cuenta;
				}
				if(this.tdd_pin_required == true && this.tipoTarjeta=="DEBIT"){
					if(this.clave_debito==null || this.clave_debito==undefined || this.clave_debito==""){
						this.mensaje="Debe ingresar el PIN/Clave de la tarjeta de débito";
						this.msg.warning();
						return;
					}else{
						var $key = RSA.getPublicKey(publicKeyPay());
						var h=RSA.encrypt(this.clave_debito.trim(),$key);
						objeto.pin=h;
					}
				}
				objeto.card_type="DEBIT";
				parametros["debit_card"]=objeto;				
			}
			request=this.ser.callServicesHttp('get-token-ccr',"&fingerprint="+this.fingerprint,parametros);
		}else{
			var aux3="";
			if(this.id_doc_type==null || this.id_doc_type==undefined || this.id_doc_type==""){
				this.mensaje="Para enviar el token debe ingresar el tipo de documento";
				this.msg.warning();
				return;
			}else{
				aux3=this.id_doc_type;
				if(this.doc==null || this.doc==undefined || this.doc==""){
					this.mensaje="Para enviar el token debe ingresar el número de documento";
					this.msg.warning();
					return;
				}else{
					if(utils_keyNumber(this.doc.trim())){
						if(this.doc.length<9){
							while(this.doc.length<9){
								this.doc="0"+this.doc;
							}
						}
						aux3=aux3+this.doc;
					}else{
						this.mensaje="El formato del número de documento es incorrecto";
						this.msg.warning();
						return;
					}
				}
			}
			parametros.rif=aux3;
			if(this.mostrarTelefono){
				var phone=null;
				try {
					phone = $("#numero_telefono").unmask();
					if (phone != null) {
						phone = phone[0].value;
					}
				} catch (err) {
					phone = null;
				}
				$('.phone').mask('(000) 000-0000', {
					placeholder : "(4xx) 000-0000"
				});
				if(phone==null || phone==undefined || phone==""){
					$('.phone').mask('(000) 000-0000', {
						placeholder : "(4xx) 000-0000"
					});
					this.numero_telefono=null;
					this.mensaje="El número de teléfono no puede estar vacío";
					this.msg.warning();
					return;
					flag=true;
				}else{
					if(phone.length<10){
						$('.phone').mask('(000) 000-0000', {
							placeholder : "(4xx) 000-0000"
						});
						flag=true;
						this.mensaje="El número de teléfono esta incompleto";
						this.msg.warning();
						return;
					}else{
						var auxp=phone.substring(0,3);
						if(auxp!="414" && auxp!="424" && auxp!="416" && auxp!="426" && auxp!="412"){
							flag=true;
							this.mensaje="El número de teléfono debe ser 414 | 424 | 416 | 426 | 412";
							this.msg.warning();
							return;
						}else{
							parametros.phone=phone;
						}
					}
				}
			}
			request=this.ser.callServicesHttp('get-token-bank',this.bankCodeSelected,parametros);
		}
		var mensajeAll="Error al enviar token de validación";
		request.subscribe(data=>{
			if(data==null || data==undefined || data==""){
				this.mensaje=mensajeAll;
					this.msg.error();
				}else{
					if(data.status_http==200){
						delete data['status_http'];
						this.mensaje="Token enviado con éxito";
						this.msg.info();
					}else{
						this.mensaje=this.ser.processMessageError(data,mensajeAll);
						this.msg.error();
					}
				}
			},err=>{
				this.mensaje=this.ser.processError(err,mensajeAll);
				this.msg.error();
				return;
		});
	}
	app.RapidPayComponent.prototype.send=function(){
		var parametros={};
		$("#confirmarPago").modal("hide");
		if(this.currency==null || this.currency==undefined || this.currency==""){
			this.mensaje="Debe ingresar la moneda de la transacción";
			this.msg.warning();
			return;
		}else{
			parametros.currency=this.currency;
		}
		var monto="";
		try{
			var a=null;
			try{
				a = $('#monto').val();
				a=a.replace(/\./g,"").replace(/,/g,"");
				a=(replaceAll(a," ","")+"").trim();
			}catch(e){
				a=null;
			}
			if(a==null || a==undefined || a=="" || a==0){
				this.mensaje="El monto no puede estar vacío";
				this.msg.warning();
				return;
			}
			try{
				monto=(parseInt(a)/100).toFixed(2);
			}catch(er3){
				monto=0;
			}
			 if(monto==""){
				this.mensaje="Monto vacío";
				this.msg.warning();
				return;
			}
		}catch(er1){
			monto="";
		}
		if(monto==null || monto==undefined || monto=="" || monto==0){
			this.mensaje="Debe ingresar el monto a pagar";
			this.msg.warning();
			return;
		}else{
			parametros.amount=parseFloat(monto);
		}
		if(this.email==null || this.email==undefined || this.email==""){
			this.mensaje="Debe ingresar el correo electrónico";
			this.msg.warning();
			return;
		}else{
			if(!validarEmail(this.email.trim())){
				this.mensaje = "El correo electrónico ingresado es inválido";
				this.msg.warning();
				return;
			}
		}
		if(!(this.description==null || this.description==undefined || this.description=="")){
			parametros.reason=this.description.trim().toUpperCase();
		}
		parametros.country=this.ser.getCountry();
		var dataTarjeta={};
		if(this.titular==null || this.titular==undefined || this.titular==""){
			this.mensaje="Debe ingresar el nombre impreso en la tarjeta";
			this.msg.warning();
			return;
		}else{
			if(this.titular.trim()==""){
				this.mensaje="Debe ingresar el nombre impreso en la tarjeta";
				this.msg.warning();
				return;
			}else{
				dataTarjeta.holder_name=this.titular.trim().toUpperCase();
				parametros.payer_name=dataTarjeta.holder_name;
			}
		}
		
		var aux3=null;
		if(this.id_doc_type==null || this.id_doc_type==undefined || this.id_doc_type==""){
			this.mensaje="Debe ingresar el tipo de documento";
			this.msg.warning();
			return;
		}else{
			aux3=this.id_doc_type;
			if(this.doc==null || this.doc==undefined || this.doc==""){
				this.mensaje="Debe ingresar el número de documento";
				this.msg.warning();
				return;
			}else{
				if(utils_keyNumber(this.doc.trim())){
					if(this.doc.length<9){
						while(this.doc.length<9){
							this.doc="0"+this.doc;
						}
					}
					aux3=aux3+this.doc;
					dataTarjeta.holder_id=aux3;
					dataTarjeta.holder_id_doc="RIF";
				}else{
					this.mensaje="El formato del número de documento es incorrecto";
					this.msg.warning();
					return;
				}
			}
		}
		if(this.nro_tarjeta==null || this.nro_tarjeta==undefined || this.nro_tarjeta==""){
			this.mensaje="Debe ingresar el número de la tarjeta";
			this.msg.warning();
			return;
		}else{
			if(this.nro_tarjeta.trim().length<13){
				this.mensaje="El número de la tarjeta esta incompleto";
				this.msg.warning();
				return;
			}else{
				if(utils_keyNumber(this.nro_tarjeta.trim())){
					dataTarjeta.card_number=this.nro_tarjeta.trim();
				}else{
					this.mensaje="El formato de número de tarjeta es incorrecto";
					this.msg.warning();
					return;
				}
			}
		}
		if(this.cvv==null || this.cvv==undefined || this.cvv==""){
			this.mensaje="Debe ingresar el CVC  de la tarjeta";
			this.msg.warning();
			return;
		}else{
			if(this.cvv.length<3){
				this.mensaje="El CVC de la tarjeta esta incompleto";
				this.msg.warning();
				return;
			}else{
				if(utils_keyNumber(this.cvv.trim())){
					dataTarjeta.cvc=this.cvv.trim();
				}else{
					this.mensaje="El formato del CVC es incorrecto";
					this.msg.warning();
					return;
				}
			}
		}
		try{
			var aux=this.expiracion.split("/");
			if(!(aux==null || aux.length==0)){
				if(aux.length==2){
					var aux1=aux[0];
					var aux2=aux[1];
					if(aux1==null || aux1==undefined || aux1=="" || aux1==0 || aux1=="0" || aux1=="null" || aux1==NaN){
						this.mensaje="Debe ingresar el mes de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
					if(aux2==null || aux2==undefined || aux2=="" || aux2==0 || aux2=="0" || aux2=="null" || aux2==NaN){
						this.mensaje="Debe ingresar el año de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
					aux1=parseInt(aux1);
					aux2=parseInt(aux2);
					if(aux1<1 || aux1>12){
						this.mensaje="El mes expiración es incorrecto (1-12)";
						this.msg.warning();
						return;
					}
					var newDate = new Date();
					var mes=newDate.getMonth() + 1;
					var anno= newDate.getFullYear();
					anno=parseInt((anno+"").substring(2,(anno+"").length));
					if(aux1<10){
						aux1="0"+aux1;
					}
					if(aux2<10){
						aux2="0"+aux2;
					}
					if(aux1==null || aux1==undefined || aux1=="" || aux1==0 || aux1=="0" || aux1=="null" || aux1==NaN){
						this.mensaje="Debe ingresar el mes de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
					if(aux2==null || aux2==undefined || aux2=="" || aux2==0 || aux2=="0" || aux2=="null" || aux2==NaN){
						this.mensaje="Debe ingresar el año de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
					dataTarjeta.expiration_month=parseInt(aux1);
					dataTarjeta.expiration_year=parseInt(aux2);
				}else{
					this.mensaje="Debe ingresar mes de expiración y año válidos";
					this.msg.warning();
					return;
				}
			}else{
				this.mensaje="Debe ingresar mes de expiración y año válidos";
				this.msg.warning();
				return;
			}
		}catch(et){
			this.mensaje="Debe ingresar mes de expiración y año válidos";
			this.msg.warning();
			return;
		}
		if(this.mostrarTelefono){
			var phone=null;
			try {
				phone = $("#numero_telefono").unmask();
				if (phone != null) {
					phone = phone[0].value;
				}
			} catch (err) {
				phone = null;
			}
			$('.phone').mask('(000) 000-0000', {
				placeholder : "(4xx) 000-0000"
			});
			if(phone==null || phone==undefined || phone==""){
				$('.phone').mask('(000) 000-0000', {
					placeholder : "(4xx) 000-0000"
				});
				this.numero_telefono=null;
				this.mensaje="El número de teléfono no puede estar vacío";
				this.msg.warning();
				return;
				flag=true;
			}else{
				if(phone.length<10){
					$('.phone').mask('(000) 000-0000', {
						placeholder : "(4xx) 000-0000"
					});
					flag=true;
					this.mensaje="El número de teléfono esta incompleto";
					this.msg.warning();
					return;
				}else{
					var auxp=phone.substring(0,3);
					if(auxp!="414" && auxp!="424" && auxp!="416" && auxp!="426" && auxp!="412"){
						flag=true;
						this.mensaje="El número de teléfono debe ser 414 | 424 | 416 | 426 | 412";
						this.msg.warning();
						return;
					}else{
						dataTarjeta.bank_card_validation={};
						dataTarjeta.bank_card_validation.phone=phone;
					}
				}
			}
		}
		if(this.mostrarOtp!=null && this.mostrarOtp!="NONE"){
			if(this.token==null || this.token==undefined|| this.token==""){
				this.mensaje="Debe ingresar el OTP del banco";
				this.msg.warning();
				return;
			}else{
				if(this.mostrarOtp=="OTP_BANK"){
					if(utils_keyNumber(this.token.trim())){
						if(dataTarjeta.bank_card_validation==null || dataTarjeta.bank_card_validation==undefined ){
							dataTarjeta.bank_card_validation={};
						}
						dataTarjeta.bank_card_validation.token=this.token.trim();
					}else{
						this.mensaje="El formato del OTP del banco es incorrecto";
						this.msg.warning();
						return;
					}
				}else{
					if(this.status_tarjeta!="VALIDATED"){
						 var a = null;
						 try {
								a = $("#token_ccr").val();
								a = a.replace(/\./g, "").replace(/,/g, "");
								a = (replaceAll(a, " ", "") + "").trim();
						} catch (e) {
								a = null;
						}
						 if (a == null || a == undefined || a == "" || a == 0) {
								this.mensaje = "El token no puede estar vacío ni ser 0";
								this.msg.warning();
								return;
						 }
						 var monto = "";
						 try {
							monto = (parseInt(a) / 100).toFixed(2);
						 } catch (er3) {
								monto = 0;
						 }
						 if (monto == "") {
								this.mensaje = "El token no puede estar vacio";
								this.msg.warning();
								return;
						 }
						 monto = (replaceAll(monto, ".", "") + "").trim();
						 if(dataTarjeta.bank_card_validation==null || dataTarjeta.bank_card_validation==undefined ){
							dataTarjeta.bank_card_validation={};
						}
						dataTarjeta.bank_card_validation.token=monto
					}
				}
			}
		}
		if(this.tipoTarjeta=="CREDIT"){
			dataTarjeta.card_type="CREDIT";
			parametros.credit_card=dataTarjeta;
		}else{
			if(this.bankCodeSelected==null){
				this.mensaje="La tarjeta seleccionada no pertenece a ningún banco nacional";
				this.msg.warning();
				return;
			}
			if(this.tipo_cuenta==null || this.tipo_cuenta==undefined || this.tipo_cuenta=="" || this.tipo_cuenta=="null"){
				this.mensaje="Debe seleccionar el tipo de cuenta";
				this.msg.warning();
				return;
			}else{
				dataTarjeta.card_type="DEBIT";
				dataTarjeta.account_type=this.tipo_cuenta;
			}
			if(this.tdd_pin_required == true && this.tipoTarjeta=="DEBIT"){
				if(this.clave_debito==null || this.clave_debito==undefined || this.clave_debito==""){
					this.mensaje="Debe ingresar el PIN/Clave de la tarjeta de débito";
					this.msg.warning();
					return;
				}else{
					var $key = RSA.getPublicKey(publicKeyPay());
					var h=RSA.encrypt(this.clave_debito.trim(),$key);
					dataTarjeta.pin=h;
				}
			}
			parametros.debit_card=dataTarjeta;
		}
		if(Boolean(this.fingerprint)){
			parametros.fingerprint=this.fingerprint;
		}
		var mensajeAll="Error al procesar pago";
		var request=this.ser.callServicesHttp('pay-rapid',"&collector="+this.email.trim().toLowerCase(),parametros);
		request.subscribe(data=>{
			if(data==null || data==undefined  || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
				return;
			}else{
				if(data.status_http==200){
					delete data['status_http'];
					if(this.disabledMonto){
						window.location.href=this.success_back_url+"?msg="+id;
					}else{
						localStorage.setItem("operacion",JSON.stringify(data));
						this.clave_debito=null;
						this.router.navigate(['/voucher'], { queryParams: { id: data.id} });
					}
				}else{
					if(this.disabledMonto){
						if(!(this.error_back_url==null || this.error_back_url==undefined || this.error_back_url=="")){
							window.location.href=this.error_back_url+"?msg="+encodeURI(this.ser.processMessageError(data,mensajeAll));
						}
					}else{
						this.mensaje=this.ser.processMessageError(data,mensajeAll);
						this.msg.error();
						return;
					}
				}
			}
		},err=>{
			if(this.disabledMonto){
				if(!(this.error_back_url==null || this.error_back_url==undefined || this.error_back_url=="")){
					window.location.href=this.error_back_url+"?msg="+encodeURI(this.ser.processError(err,mensajeAll));						
				}
			}else{
				this.mensaje=this.ser.processError(err,mensajeAll);
				this.msg.error();
				return;
			}
		});
	}
	app.RapidPayComponent.prototype.confirmar=function(){
		let querys="&product_name=PAY_BUTTON";
		if(this.currency==null || this.currency==undefined || this.currency==""){
			this.mensaje="Debe ingresar la moneda de la transacción";
			this.msg.warning();
			return;
		}else{
			querys=querys+"&currency="+this.currency;
		}
		var monto="";
		try{
			var a=null;
			try{
				a = $('#monto').val();
				a=a.replace(/\./g,"").replace(/,/g,"");
				a=(replaceAll(a," ","")+"").trim();
			}catch(e){
				a=null;
			}
			if(a==null || a==undefined || a=="" || a==0){
				this.mensaje="El monto no puede estar vacío";
				this.msg.warning();
				return;
			}
			try{
				monto=(parseInt(a)/100).toFixed(2);
			}catch(er3){
				monto=0;
			}
			 if(monto==""){
				this.mensaje="Monto vacío";
				this.msg.warning();
				return;
			}
		}catch(er1){
			monto="";
		}
		if(monto==null || monto==undefined || monto=="" || monto==0){
			this.mensaje="Debe ingresar el monto a pagar";
			this.msg.warning();
			return;
		}else{
			querys=querys+"&amount="+parseFloat(monto);
		}
		if(this.email==null || this.email==undefined || this.email==""){
			this.mensaje="Debe ingresar el correo electrónico";
			this.msg.warning();
			return;
		}else{
			if(!validarEmail(this.email.trim())){
				this.mensaje = "El correo electrónico ingresado es inválido";
				this.msg.warning();
				return;
			}
		}
		if(this.titular==null || this.titular==undefined || this.titular==""){
			this.mensaje="Debe ingresar el nombre impreso en la tarjeta";
			this.msg.warning();
			return;
		}else{
			if(this.titular.trim()==""){
				this.mensaje="Debe ingresar el nombre impreso en la tarjeta";
				this.msg.warning();
				return;
			}
		}
		
		if(this.id_doc_type==null || this.id_doc_type==undefined || this.id_doc_type==""){
			this.mensaje="Debe ingresar el tipo de documento";
			this.msg.warning();
			return;
		}else{
			if(this.doc==null || this.doc==undefined || this.doc==""){
				this.mensaje="Debe ingresar el número de documento";
				this.msg.warning();
				return;
			}else{
				if(utils_keyNumber(this.doc.trim())){
					if(this.doc.length<9){
						while(this.doc.length<9){
							this.doc="0"+this.doc;
						}
					}
				}else{
					this.mensaje="El formato del número de documento es incorrecto";
					this.msg.warning();
					return;
				}
			}
		}
		if(this.nro_tarjeta==null || this.nro_tarjeta==undefined || this.nro_tarjeta==""){
			this.mensaje="Debe ingresar el número de la tarjeta";
			this.msg.warning();
			return;
		}else{
			if(this.nro_tarjeta.trim().length<13){
				this.mensaje="El número de la tarjeta esta incompleto";
				this.msg.warning();
				return;
			}else{
				if(utils_keyNumber(this.nro_tarjeta.trim())){
				}else{
					this.mensaje="El formato de número de tarjeta es incorrecto";
					this.msg.warning();
					return;
				}
			}
		}
		if(this.cvv==null || this.cvv==undefined || this.cvv==""){
			this.mensaje="Debe ingresar el CVC  de la tarjeta";
			this.msg.warning();
			return;
		}else{
			if(this.cvv.length<3){
				this.mensaje="El CVC de la tarjeta esta incompleto";
				this.msg.warning();
				return;
			}else{
				if(utils_keyNumber(this.cvv.trim())){
				}else{
					this.mensaje="El formato del CVC es incorrecto";
					this.msg.warning();
					return;
				}
			}
		}
		try{
			var aux=this.expiracion.split("/");
			if(!(aux==null || aux.length==0)){
				if(aux.length==2){
					var aux1=aux[0];
					var aux2=aux[1];
					if(aux1==null || aux1==undefined || aux1=="" || aux1==0 || aux1=="0" || aux1=="null" || aux1==NaN){
						this.mensaje="Debe ingresar el mes de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
					if(aux2==null || aux2==undefined || aux2=="" || aux2==0 || aux2=="0" || aux2=="null" || aux2==NaN){
						this.mensaje="Debe ingresar el año de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
					aux1=parseInt(aux1);
					aux2=parseInt(aux2);
					if(aux1<1 || aux1>12){
						this.mensaje="El mes expiración es incorrecto (1-12)";
						this.msg.warning();
						return;
					}
					var newDate = new Date();
					var mes=newDate.getMonth() + 1;
					var anno= newDate.getFullYear();
					anno=parseInt((anno+"").substring(2,(anno+"").length));
					if(aux1<10){
						aux1="0"+aux1;
					}
					if(aux2<10){
						aux2="0"+aux2;
					}
					if(aux1==null || aux1==undefined || aux1=="" || aux1==0 || aux1=="0" || aux1=="null" || aux1==NaN){
						this.mensaje="Debe ingresar el mes de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
					if(aux2==null || aux2==undefined || aux2=="" || aux2==0 || aux2=="0" || aux2=="null" || aux2==NaN){
						this.mensaje="Debe ingresar el año de expiración de la tarjeta";
						this.msg.warning();
						return;
					}
				}else{
					this.mensaje="Debe ingresar mes de expiración y año válidos";
					this.msg.warning();
					return;
				}
			}else{
				this.mensaje="Debe ingresar mes de expiración y año válidos";
				this.msg.warning();
				return;
			}
		}catch(et){
			this.mensaje="Debe ingresar mes de expiración y año válidos";
			this.msg.warning();
			return;
		}
		if(this.mostrarTelefono){
			var phone=null;
			try {
				phone = $("#numero_telefono").unmask();
				if (phone != null) {
					phone = phone[0].value;
				}
			} catch (err) {
				phone = null;
			}
			$('.phone').mask('(000) 000-0000', {
				placeholder : "(4xx) 000-0000"
			});
			if(phone==null || phone==undefined || phone==""){
				$('.phone').mask('(000) 000-0000', {
					placeholder : "(4xx) 000-0000"
				});
				this.numero_telefono=null;
				this.mensaje="El número de teléfono no puede estar vacío";
				this.msg.warning();
				return;
				flag=true;
			}else{
				if(phone.length<10){
					$('.phone').mask('(000) 000-0000', {
						placeholder : "(4xx) 000-0000"
					});
					flag=true;
					this.mensaje="El número de teléfono esta incompleto";
					this.msg.warning();
					return;
				}else{
					var auxp=phone.substring(0,3);
					if(auxp!="414" && auxp!="424" && auxp!="416" && auxp!="426" && auxp!="412"){
						flag=true;
						this.mensaje="El número de teléfono debe ser 414 | 424 | 416 | 426 | 412";
						this.msg.warning();
						return;
					}
				}
			}
		}
		if(this.mostrarOtp!=null && this.mostrarOtp!="NONE"){
			if(this.token==null || this.token==undefined|| this.token==""){
				this.mensaje="Debe ingresar el OTP del banco";
				this.msg.warning();
				return;
			}else{
				if(this.mostrarOtp=="OTP_BANK"){
					if(!utils_keyNumber(this.token.trim())){
						this.mensaje="El formato del OTP del banco es incorrecto";
						this.msg.warning();
						return;
					}
				}else{
					if(this.status_tarjeta!="VALIDATED"){
						 var a = null;
						 try {
								a = $("#token_ccr").val();
								a = a.replace(/\./g, "").replace(/,/g, "");
								a = (replaceAll(a, " ", "") + "").trim();
						} catch (e) {
								a = null;
						}
						 if (a == null || a == undefined || a == "" || a == 0) {
								this.mensaje = "El token no puede estar vacío ni ser 0";
								this.msg.warning();
								return;
						 }
						 var monto = "";
						 try {
							monto = (parseInt(a) / 100).toFixed(2);
						 } catch (er3) {
								monto = 0;
						 }
						 if (monto == "") {
								this.mensaje = "El token no puede estar vacio";
								this.msg.warning();
								return;
						}
					}
				}
			}
		}
		if(this.tipoTarjeta=="CREDIT"){
			querys=querys+"&card_type=TDC";
			if(this.bankCodeSelected==null){
				querys=querys+"&bank_type=INTERNATIONAL";
			}else{
				querys=querys+"&bank_type="+this.bank_type;
			}
		}else{
			querys=querys+"&card_type=TDD";
			if(this.bankCodeSelected==null){
				this.mensaje="La tarjeta seleccionada no pertenece a ningún banco nacional";
				this.msg.warning();
				return;
			}else{
				querys=querys+"&bank_type="+this.bank_type;
			}
			if(this.tipo_cuenta==null || this.tipo_cuenta==undefined || this.tipo_cuenta=="" || this.tipo_cuenta=="null"){
				this.mensaje="Debe seleccionar el tipo de cuenta";
				this.msg.warning();
				return;
			}
			if(this.tdd_pin_required == true && this.tipoTarjeta=="DEBIT"){
				if(this.clave_debito==null || this.clave_debito==undefined || this.clave_debito==""){
					this.mensaje="Debe ingresar el PIN/Clave de la tarjeta de débito";
					this.msg.warning();
					return;
				}
			}
		}
		var mensajeAll="Error al confirmar pago";
		this.data_pagar=null;
		var request=this.ser.callServicesHttp('get-card-holder-commision',querys,null);
		request.subscribe(data=>{
			if(data==null || data==undefined  || data==""){
				this.mensaje=mensajeAll;
				this.msg.error();
				return;
			}else{
				if(data.status_http==200){
					this.data_pagar=data;
					$("#confirmarPago").modal();
				}else{
					if(data.message=="CARD_HOLDER_COMMISSION_CONFIG_NOT_FOUND"){
						this.send();
					}else{
						this.mensaje=this.ser.processMessageError(data,mensajeAll);
						this.msg.error();
						return;
					}
					
				}
			}
		},err=>{
			if(this.disabledMonto){
				if(!(this.error_back_url==null || this.error_back_url==undefined || this.error_back_url=="")){
					window.location.href=this.error_back_url+"?msg="+encodeURI(this.ser.processError(err,mensajeAll));						
				}
			}else{
				this.mensaje=this.ser.processError(err,mensajeAll);
				this.msg.error();
				return;
			}
		});
	}
	app.RapidPayComponent.prototype.formattearMonto=function(data){
		try{
			data=amountFormattingObject(data*100);
			return data.integerPart+","+data.decimalPart;
		}catch(er){
			return "";
		}
	}
	app.RapidPayComponent.prototype.back=function(){
		window.history.back();
	}
})(window.app || (window.app = {}));
