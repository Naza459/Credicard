(function(app) {
	app.VoucherComponent =
		ng.core.Component({
		selector: 'voucher',
		templateUrl: 'views/voucher-v2.html'
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
	app.VoucherComponent.prototype.ngOnInit=function(){
		var aux=null;
		try{
			aux=JSON.parse(localStorage.getItem("operacion"));
		}catch(err){
			aux=null;
		}
		if(aux==null){
			this.router.navigate(['/init']);
		}else{
			this.formattedData(aux);
		}
	}
	app.VoucherComponent.prototype.formattedData= function(data){
		if(!(data==null || data==undefined || data=="")){
			if(data.hasOwnProperty("alias")){
				this.alias=data.alias;
			}
			if(data.hasOwnProperty("state")){
				if(!(data.state==null || data.state==undefined || data.state=="")){
					this.formatted_status=capitalizeOnly(translate(data.state,'ES'));
					if(data.state=="PENDING_APPROVAL"){
						//this.icono_status="far fa-clock pending"
					}else{
						if(data.state=="APPROVED"){
							//this.icono_status="far fa-check-circle approved"
						}
					}
				}
			}
			if(data.hasOwnProperty("amount")){
				try{
					this.amount=amountFormattingObject(data.amount*100);
					this.amount=this.amount.integerPart+","+this.amount.decimalPart;
				}catch(er){
					this.amount="0,00";
				}
			}else{
				this.amount="0,00";
			}
			if(data.hasOwnProperty("credicard")){
				if(!(data.credicard==null || data.credicard==undefined || data.credicard=="")){
					if(data.credicard.hasOwnProperty("approval")){
						if(!(data.credicard.approval==null || data.credicard.approval==undefined || data.credicard.approval=="" || data.credicard.approval=="null")){
							this.nro_aprobacion=data.credicard.approval;
						}
					}
					if(data.credicard.hasOwnProperty("lot")){
						if(!(data.credicard.lot==null || data.credicard.lot==undefined || data.credicard.lot=="" || data.credicard.lot=="null")){
							this.lot=data.credicard.lot;
						}
					}
					if(data.credicard.hasOwnProperty("sequence")){
						if(!(data.credicard.sequence==null || data.credicard.sequence==undefined || data.credicard.sequence=="" || data.credicard.sequence=="null")){
							this.sequence=data.credicard.sequence;
						}
					}
					if(data.credicard.hasOwnProperty("trace")){
						if(!(data.credicard.trace==null || data.credicard.trace==undefined || data.credicard.trace=="" || data.credicard.trace=="null")){
							this.trace=data.credicard.trace;
						}
					}
					if(data.credicard.hasOwnProperty("id")){
						if(!(data.credicard.id==null || data.credicard.id==undefined || data.credicard.id=="" || data.credicard.id=="null")){
							this.nro_orden=data.credicard.id;
						}
					}
				}
			}
			if(data.hasOwnProperty("reason")){
				this.reason=data.reason;
			}
			/*if(data.hasOwnProperty("currency_info")){
				if(!(data.currency_info==null || data.currency_info==undefined || data.currency_info=="")){
					if(data.currency_info.hasOwnProperty("symbol")){
						if(!(data.currency_info.symbol==null || data.currency_info.symbol==undefined || data.currency_info.symbol=="")){
							this.moneda=data.currency_info.symbol;
						}
					}
				}
			}*/
			if(data.hasOwnProperty("currency")){
				if(!(data.currency==null || data.currency==undefined  || data.currency=="")){
					this.moneda=data.currency;
				}
			}
			
			if(data.hasOwnProperty("payer_reference")){
				if(!(data.payer_reference==null || data.payer_reference==undefined || data.payer_reference=="")){
					this.referencia=data.payer_reference;
				}
			}
			
			if(data.hasOwnProperty("collector")){
				if(!(data.collector==null || data.collector==undefined || data.collector=="")){
					if(data.collector.hasOwnProperty("name")){
						if(!(data.collector.name==null || data.collector.name==undefined || data.collector.name=="")){
							this.para=data.collector.name.toUpperCase();
						}
					}
					if(data.collector.hasOwnProperty("id_doc")){
						if(!(data.collector.id_doc==null || data.collector.id_doc==undefined || data.collector.id_doc=="")){
							this.para_document=data.collector.id_doc;
						}
					}
				}
			}
			if(data.hasOwnProperty("payer")){
				if(!(data.payer==null || data.payer==undefined || data.payer=="")){
					if(data.payer.hasOwnProperty("name")){
						if(!(data.payer.name==null || data.payer.name==undefined || data.payer.name=="")){
							this.de=data.payer.name.toUpperCase();
						}
					}
					if(data.payer.hasOwnProperty("id_doc")){
						if(!(data.payer.id_doc==null || data.payer.id_doc==undefined || data.payer.id_doc=="")){
							this.de_document=data.payer.id_doc;
						}
					}
				}
			}
			if(data.hasOwnProperty("info")){
				if(!(data.info==null || data.info==undefined  || data.info=="")){
					if(data.info.hasOwnProperty("created_at")){
						if(!(data.info.created_at==undefined || data.info.created_at==null || data.info.created_at=="")){
							this.fecha=formattingDate(data.info.created_at);
						}
					}
				}
			}
			if(data.hasOwnProperty("collect_method")){
				if(!(data.collect_method==null ||data.collect_method==undefined || data.collect_method=="")){
					if(data.collect_method.hasOwnProperty("product_name")){
						if(!(data.collect_method.product_name==null ||data.collect_method.product_name==undefined || data.collect_method.product_name=="" )){
							if(data.collect_method.hasOwnProperty("bank_collector")){
								if(!(data.collect_method.bank_collector==null || data.collect_method.bank_collector==undefined || data.collect_method.bank_collector=="")){
									if(data.collect_method.bank_collector.hasOwnProperty("masked_account_number")){
										if(!(data.collect_method.bank_collector.masked_account_number==undefined || data.collect_method.bank_collector.masked_account_number==null || data.collect_method.bank_collector.masked_account_number=="")){
											this.banco={};
											this.banco.number=formatearNumeroCuenta(data.collect_method.bank_collector.masked_account_number);
											if(data.collect_method.bank_collector.hasOwnProperty("bank_thumbnail")){
												if(data.collect_method.bank_collector.bank_thumbnail==undefined || data.collect_method.bank_collector.bank_thumbnail==null || data.collect_method.bank_collector.bank_thumbnail==""){
													this.banco.imagen=getStatic()+"images/imagen_no_disponible.png";
												}else{
													this.banco.imagen=getStatic()+data.collect_method.bank_collector.bank_thumbnail;
												}
											}else{
												this.banco.imagen=getStatic()+"images/imagen_no_disponible.png";
											}
											if(data.collect_method.bank_collector.hasOwnProperty("type")){
												if(!(data.collect_method.bank_collector.type==null || data.collect_method.bank_collector.type==undefined || data.collect_method.bank_collector.type=="")){
													this.banco.formatted_type=translate(data.collect_method.bank_collector.type,'ES').toUpperCase();
												}
											}
										}
									}
									if(data.collect_method.hasOwnProperty("masked_affiliation_number")){
										if(!(data.collect_method.masked_affiliation_number==null || data.collect_method.masked_affiliation_number==undefined || data.collect_method.masked_affiliation_number=="")){
											this.nro_afiliacion=data.collect_method.masked_affiliation_number;
										}
									}
								}
							}
							switch(data.collect_method.product_name){
								case 'OFFLINE_PAYMENT':{
									this.metodo="Transferencia/depósito";

								}break;
								case 'PAY_BUTTON':{
									this.metodo="";
									if(data.hasOwnProperty("payment_method")){
										if(!(data.payment_method==null || data.payment_method==undefined || data.payment_method=="")){
											if(data.payment_method.hasOwnProperty("payment_card")){
												if(!(data.payment_method.payment_card==null || data.payment_method.payment_card==undefined ||data.payment_method.payment_card=="")){
													if(data.payment_method.payment_card.hasOwnProperty("masked_account_number")){
														this.metodo=data.payment_method.payment_card.masked_account_number;
													}
													if(data.payment_method.payment_card.hasOwnProperty("issuing_bank_id")){
														this.metodo=data.payment_method.payment_card.issuing_bank_id+" - "+this.metodo;
													}
													if(data.payment_method.payment_card.hasOwnProperty("bank")){
														if(!(data.payment_method.payment_card.bank==null || data.payment_method.payment_card.bank==undefined || data.payment_method.payment_card.bank=="")){
															if(data.payment_method.payment_card.bank.hasOwnProperty("thumbnail")){
																if(!(data.payment_method.payment_card.bank.thumbnail==null || data.payment_method.payment_card.bank.thumbnail==undefined || data.payment_method.payment_card.bank.thumbnail=="")){
																	this.imagen_banco=getStatic()+data.payment_method.payment_card.bank.thumbnail;
																}
															}
														}
													}
												}
											}
										}
									}
									if(data.hasOwnProperty("device")){
										if(!(data.device==null || data.device==undefined || data.device=="")){
											this.dispositivo=data.device;
										}
									}
								}break;
								case 'MOBILE_PAYMENT':{
									this.metodo="Pago con: ";
									if(data.hasOwnProperty("payment_method")){
										if(!(data.payment_method==null || data.payment_method==undefined || data.payment_method=="")){
											if(data.payment_method.hasOwnProperty("phone")){
												if(!(data.payment_method.phone==null || data.payment_method.phone==undefined || data.payment_method.phone=="")){
													var aux=data.payment_method.phone+" - ";
													if((data.payment_method.hasOwnProperty("bank_payer"))){
														if(!(data.payment_method.bank_payer==null || data.payment_method.bank_payer==undefined || data.payment_method.bank_payer=="")){
															if(data.payment_method.bank_payer.hasOwnProperty("masked_account_number")){
																if(!(data.payment_method.bank_payer.masked_account_number==null || data.payment_method.bank_payer.masked_account_number==undefined || data.payment_method.bank_payer.masked_account_number=="")){
																	aux=aux+data.payment_method.bank_payer.masked_account_number;
																}
															}
														}
													}
													this.metodo=aux;
												}
											}	
										}
									}
								}break;
							}
						}
					}
				}
			}
		}
	}
	app.VoucherComponent.prototype.calcYearCopy=function(){
		return calcYearCopy();
	}
	app.VoucherComponent.prototype.back=function(){
		this.ser.removeKey("operacion");
		this.router.navigate(['/init']);
	}
	app.VoucherComponent.prototype.registrarse=function(){
		var aux=localStorage.getItem("operacion");
		this.ser.removeKey("operacion");
		localStorage.setItem("register_data",aux);
		this.router.navigate(['/register']);
	}
})(window.app || (window.app = {}));