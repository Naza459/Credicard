(function(app) {
    app.AppCallService = ng.core.
    Injectable().Class({
        constructor: [ng.http.Http, app.LoadingServiceComponent,ng.router.Router,app.MsgComponent, function(http, loading,router,msg) {
            this._url = getApi();
            this.http = http;
            this.loading = loading;
			this.timeout="60000";
			this.timeout_long="120000";
			this.router=router;
			this.msg=msg;
			this.enlace=getEnlaceAuth();
			this.enlace1=getEnlaceApi();
			this.enlace_deglee_V2=getEnlaceAuthV2();
        }]
	});
	app.AppCallService.prototype.callServices=function(path, method, parameters, head, auth, format_out,format_in){
		let url=this._url;
		let headers=new Headers();
		if(!(head==null || head==undefined || head=="")){
			headers=head;
		}
		var parametros="";
		if (path == undefined || path == '' || path == null) {
            url = '';
        } else {
            url = url+path;
        }
		if(format_in==null || format_in==undefined || format_in==""){
			//headers['Content-Type']='application/json';
		}else{
			headers['Content-Type']=format_in.trim().toLowerCase();
		}
		if(auth){
			headers['Authorization']='bearer '+this.getAccessToken();
		}
		if(format_in==null && !auth && head==null){
			headers=null;
		}
		if(format_in=="application/json"){
			if (!(parameters == undefined || parameters == null || parameters == '')) {
				if (jQuery.isEmptyObject(parameters)) {
					parametros = parameters;
				}else {
					parametros = JSON.stringify(parameters);
				}
			}
		}else{
			parametros=parameters;
		}
		this.loading.showPleaseWait();
		let peticion=null;
        switch (method) {
            case 'GET':{
				if(headers!=null){
					peticion = this.http.get(url,{headers});
				}else{
					peticion = this.http.get(url);
				} 
            }break;
            case 'POST':{
				if(headers==null){
					 peticion = this.http.post(url, parametros,null);
				}else{
					 peticion = this.http.post(url, parametros,{headers});
				}
            }break;
            case 'PUT':{
                peticion = this.http.put(url, parametros,{headers});
            }break;
            case 'DELETE':{
				if(headers!=null){
					peticion = this.http.delete(url,{headers});
				}else{
					peticion = this.http.delete(url);
				} 
            }break;
            default:{
                return null;
            }
        }
		let resultado = peticion.timeout(this.timeout, new Error('TIMEOUT'))
		.map(res => {
            this.loading.hidePleaseWait();
			return this.processResponse(format_out,res);
        });
		return resultado;
	}
	app.AppCallService.prototype.processResponse=function(format,res){
		try{
			var aux=res.json();
			var status=null;
			status=res.status;
				if(status==202 || status=="202" || status==403 || status==401){
					if(aux.hasOwnProperty("message")){
						if(!(aux.message==undefined || aux.message==null || aux.message=="")){
							if(aux.message=="UNAUTHORIZED_SESSION" || aux.message=="SESSION_CLOSED" 
							|| aux.message=="SESSION_EXPIRED" || aux.message=="SESSION_NOT_FOUND" || aux.message=="INVALID_AUTHORIZATION" || aux.message=="INVALID_SESSION" ){
								var contexto=this;
								mensaje=(translate(aux.message,"ES").toUpperCase());
									setTimeout(function() {
									doLogout();
									contexto.router.navigate(['/init']);
								}, 2000);	
							}else{
								if(status==202 || status=="202"){
									if(this.getTimeSession()!=null){
										detenerSetInterval1()
										asyncSqrt(this.getTimeSession(),function(value, result) {});
									}
								}
							}
						}
					}	
				}
		}catch(e){
			res = {
				status_http:500,
				message:"ERROR",
                typeSys: 'ERROR',
                 value: 'NOT_JSON'
            };
             return res;
		}
		if (format == "JSON" || format=="application/json") {
			res=res.json();
			if(this.getTimeSession()!=null){
				detenerSetInterval1()
				asyncSqrt(this.getTimeSession(),function(value, result) {});
			}
				try{
                    var valor=Array.isArray(res);
					if(valor){
                        var aux=res;
                        res={
                            body:aux,
                            status_http:status
                        };
                    }else{
                        res.status_http=status; 
                    }
                }catch(err1){
                    console.log('Error al procesar',err1);
                }
                res.status_http=status;
				return res;
			
        }else {
            try {
				if(this.getTimeSession()!=null){
					detenerSetInterval1()
					asyncSqrt(this.getTimeSession(),function(value, result) {});
				}
				res = res._body;
                return res.toString();
            } catch (err) {
                res = "Error";
                return res;
            }
        }
	}
	app.AppCallService.prototype.callServicesHttp=function(ser,querys,param){
		let request=null;
		var headers=new Headers();
		headers['X-Paguetodo-ID']=getPaguetodoId();
		headers['app-id']=getClient();
		switch(ser){
			case 'login':{
				request=this.callServices(this.enlace_deglee_V2+'/password_grant'+querys,"POST",param,headers,false,"JSON","application/json");
				return request;
			}break;
			case 'autorize-device':{
				request=this.callServices(this.enlace_deglee_V2+"/device","PUT",param,headers,true,"JSON",null);
				return request;
			}break;
			case 'login-device':{
				request=this.callServices(this.enlace_deglee_V2+'/device',"POST",param,headers,true,"JSON",null);
				return request;
			}break;
			case 'roles-auth':{
				request=this.callServices(this.enlace_deglee_V2+'/roles',"GET",null,headers,true,"JSON",null);
				return request;
			}break;
			case 'search-question':{
				request=this.callServices(this.enlace_deglee_V2+'/recovery_questions'+querys,"GET",null,headers,false,"JSON",null,true,null);
				return request;
			}break;
			case 'recovery':{
				request=this.callServices(this.enlace_deglee_V2+'/recovery'+querys,"PUT",param,headers,false,"JSON",null);
				return request;
			}break;
			case 'reset':{
				request=this.callServices(this.enlace_deglee_V2+'/recovery?app-id='+getClient(),"POST",param,headers,false,"JSON","application/json");
				return request;
			}break;

			case 'logout':{
				request=this.callServices(this.enlace_deglee_V2+'/close_session',"PUT",null,headers,true,"JSON",null,true,null);
				return request;
			}break;




			case 'active':{
				request=this.callServices(this.enlace+'/self_sign_up?client_id='+getClient()+querys,"PUT",param,null,false,"JSON","application/json");
				return request;
			}break;
			case 'refresh':{
				request=this.callServices(this.enlace+'/refresh?refresh_token='+this.getRefreshToken(),"PUT",param,null,true,"JSON",null);
				return request;
			}break;
			case 'autorize-device-gravitee':{
				request=this.callServices(this.enlace+"/oauth/authorization_code/device"+querys,"PUT",null,null,true,"JSON",null);
				return request;
			}break;
			case "expired-password":{
				request=this.callServices(this.enlace_deglee_V2+'/password_expired'+querys,"PUT",param,headers,false,"JSON","application/json");
				return request;
			}break;
			
			case 'get-account-rol':{
				request=this.callServices(this.enlace1+'/role?realm='+this.getRealm()+querys,"GET",null,null,true,"JSON",null);
				return request;
			}break;
			case 'get-questions':{
				request=this.callServices(this.enlace_deglee_V2+'/register_security_questions?app-id='+getClient()+querys,"GET",null,headers,false,"JSON",null,true,null);
				return request;
			}break;
			case 'register':{
				request=this.callServices(this.enlace_deglee_V2+'/self_sign_up?app-id='+getClient(),"POST",param,headers,true,"JSON",null);
				return request;
			}break;
			
			
			
			case 'resend-activation':{
				request=this.callServices(this.enlace_deglee_V2+'/self_sign_up_resend_code'+querys,"GET",null,headers,false,"JSON",null,true,null);
				return request;
			}break;
			
			
			case 'login-gravitee':{
				request=this.callServices(this.enlace+'/oauth/authorization_code/login',"POST",param,null,false,"JSON","application/json");
				return request;
			}break;
		
			
			case 'login-device-gravitee':{
				request=this.callServices(this.enlace+'/oauth/authorization_code/device'+querys,"POST",param,null,true,"JSON",null);
				return request;
			}break;
			
			
			case 'resend-code':{
				request=this.callServices(this.enlace_deglee_V2+"/resend_code"+querys,"GET",null,headers,true,"JSON",null);
				return request;
			}break;
			case 'session-auth-token':{
				request=this.callServices(this.enlace+"/session/auth_code","POST",param,null,true,"JSON","application/json");
				return request;
			}break;
			case 'close-all-session':{
				request=this.callServices(this.enlace+"/auth_code"+querys,"POST",param,null,true,"JSON","application/json");
				return request;
			}break;
			case 'session-resend-auth-token':{
				request=this.callServices(this.enlace+"/session/auth_code","PUT",param,null,true,"JSON","application/json");
				return request;
			}break;
			case 'profile-register':{
				request=this.callServices(this.enlace1+'/register',"POST",param,null,true,"JSON","application/json");
				return request;
			}break;
			case 'profile-register-gravitee':{
				request=this.callServices(this.enlace+'/oauth/authorization_code/register'+querys,"POST",param,null,false,"JSON","application/json");
				return request;
			}break;
			
			case 'get-bin':{
				request=this.callServices("fast_payment/card_info?country="+this.getCountry()+querys,"GET",null,headers,false,"JSON",null);
				return request;
			}break;
			case 'get-token-bank':{
				request=this.callServices("fast_payment/send_token/"+getClient()+"/"+querys,"POST",param,null,false,"JSON",null);
				return request;
			}break;
			case 'get-token-ccr':{
				request=this.callServices("fast_payment/send_token_with_card?client_id="+getClient()+"&country="+this.getCountry()+querys,"POST",param,null,false,"JSON","application/json");
				return request;
			}break;
			case 'pay-rapid':{
				request=this.callServices('fast_payment/'+getClient()+"?country="+this.getCountry()+querys,"POST",param,null,false,"JSON","application/json");
				return request;
			}break;
			case 'extend-sesion':{
				request=this.callServices(this.enlace+"/refresh?refresh_token="+this.getRefreshToken(),"GET",null,true,false,"JSON",null);
				return request;
			}break;
			case 'get-config':{
				request=this.callServices('fast_payment/operation_config?client_id='+getClient()+"&country="+this.getCountry()+querys,"GET",null,null,false,"JSON",null);
				return request;
			}break;
			case 'get-card-holder-commision':{
				request=this.callServices('fast_payment/card_holder_commission?realm='+getRealm()+"&country="+this.getCountry()+"&client_id="+getClient()+querys,"GET",null,headers,false,"JSON",null);
				return request;
			}break;
			case 'register-with-email':{
				request=this.callServices(this.enlace_deglee_V2+'/password_questions?realm='+this.getRealm(),"PUT",param,headers,true,"JSON","application/json",true,null);
				return request;
			}break;
			default:{
			}
		}
	}
	app.AppCallService.prototype.removeKey=function(key){
		var aux=localStorage.getItem(key);
		if(aux!=null && aux!=undefined && aux!=""){
			try{
				localStorage.removeItem(key);
				sessionStorage.removeItem(key);
			}catch(Er){
			}
		}
		
	}
	app.AppCallService.prototype.getUrlBackWallet=function(){
		var aux=localStorage.getItem('back_url_wallet');
		if(aux==null){
			var aux=sessionStorage.getItem('back_url_wallet');
			if(aux==null){
				return null;
			}else{
				return aux;
			}
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.setRole=function(data){
		data=JSON.stringify(data);
		localStorage.setItem('role', data);
		sessionStorage.setItem('role', data);
	}
	app.AppCallService.prototype.getRole=function(data){
		var aux=localStorage.getItem("role");
		if(aux==null){
			return null;
		}else{
			try{
				aux=JSON.parse("role");
				return aux;
			}catch(er){
				return null;
			}
		}
	}
	app.AppCallService.prototype.getApps=function(){
		var aux=localStorage.getItem("apps");
		if(aux==null || aux==undefined || aux==""){
			return null;
		}else{
			try{
				aux=JSON.parse(aux);
				return aux;
			}catch(er){
				return null
			}
		}
	}
	app.AppCallService.prototype.setApps=function(data){
		localStorage.setItem("apps",JSON.stringify(data));
	}
	app.AppCallService.prototype.setCurrency=function(data){
		localStorage.setItem('currency_code', "BsS");
		sessionStorage.setItem('currency_code', "BsS");
	}
	app.AppCallService.prototype.getCurrency=function(){
		let aux=localStorage.getItem('currency_code');
		if(aux==null){
			aux=sessionStorage.getItem('currency_code');
			if(aux==null){
				return null;
			}else{
				return aux;
			}
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.getUserId=function(){
		let aux=localStorage.getItem('init');
		if(aux==null){
			return null;
		}else{
			try{
				aux=JSON.parse(aux);
				aux=aux.id;
			}catch(er4){
				aux=null;
			}
			return aux;
		}
	}
	app.AppCallService.prototype.setDeviceActual=function(data){
		sessionStorage.setItem('device-actual', data);
		localStorage.setItem('device-actual', data);
	}
	app.AppCallService.prototype.getDeviceActual=function(){
		let aux=localStorage.getItem('device-actual');
		if(aux==null){
			return null
		}else{
			try{
				aux=JSON.parse(aux);
			}catch(er4){
				aux=null;
			}
			return aux;
		}
	}
	app.AppCallService.prototype.setScope=function(data){
		localStorage.setItem('scope', data);	
		sessionStorage.setItem('scope', data);	
	}
	app.AppCallService.prototype.getScope=function(){
		let aux=localStorage.getItem('scope');
		if(aux==null){
			aux=sessionStorage.getItem('scope');
			if(aux==null){
				return null;
			}else{
				return aux;
			}
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.setResponseType=function(data){
		localStorage.setItem('response_type', data);	
		sessionStorage.setItem('response_type', data);	
	}
	app.AppCallService.prototype.getResponseType=function(){
		let aux=localStorage.getItem('response_type');
		if(aux==null){
			if(sessionStorage.getItem('response_type')==null){
				 return null;
			}else{
				var aux2=null;
				try{
					aux2=JSON.parse(sessionStorage.getItem('response_type'));
				}catch(er4){
					aux2=null;
				}
				return aux2;
			}
		}else{
			var aux2=null;
			try{
				aux2=JSON.parse(localStorage.getItem('response_type'));
			}catch(er4){
				aux2=null;
			}
			return aux2;
		}
	}
	app.AppCallService.prototype.setRedirectUri=function(data){
		localStorage.setItem('redirect_uri', data);	
		sessionStorage.setItem('redirect_uri', data);	
	}
	app.AppCallService.prototype.getRedirectUri=function(){
		let aux=localStorage.getItem('redirect_uri');
		if(aux==null){
			if(sessionStorage.getItem('redirect_uri')==null){
				 return null;
			}else{
				var aux2=null;
				try{
					aux2=JSON.parse(sessionStorage.getItem('redirect_uri'));
				}catch(er4){
					aux2=null;
				}
				return aux2;
			}
		}else{
			var aux2=null;
			try{
				aux2=JSON.parse(localStorage.getItem('redirect_uri'));
			}catch(er4){
				aux2=null;
			}
			return aux2;
		}
	}
	app.AppCallService.prototype.setClientId=function(data){
		localStorage.setItem('client_id', data);	
		sessionStorage.setItem('client_id', data);	
	}
	app.AppCallService.prototype.getIdDoc=function(){
		var aux=this.getInit();
		if(aux==null){
			return null;
		}else{
			if(aux.hasOwnProperty("id_doc")){
				if(aux.id_doc==null || aux.id_doc==undefined || aux.id_doc==""){
					return null;
				}else{
					return aux.id_doc;
				}
			}else{
				return null;
			}
		}
	}
	app.AppCallService.prototype.getName=function(){
		var aux=this.getDataUser();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.name;
				return aux;
			}catch(to){
				return null;
			}
		}
	}
	app.AppCallService.prototype.getEmail=function(){
		var aux=this.getDataUser();
		if(aux==null){
			return null;
		}else{
			try{
				aux=aux.email;
				return aux;
			}catch(to){
				return null;
			}
		}
	}
	app.AppCallService.prototype.getClientId=function(){
		let aux=localStorage.getItem('client_id');
		if(aux==null){
			if(sessionStorage.getItem('client_id')==null){
				 return null;
			}else{
				return sessionStorage.getItem('client_id');
			}
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.setDataUser=function(data){
		data=JSON.stringify(data);
		localStorage.setItem('user_data',data);
		sessionStorage.setItem('user_data',data);
	}
	app.AppCallService.prototype.getDataUser=function(){
		var aux=localStorage.getItem("user_data");
		if(aux==null){
			return null;
		}else{
			try{
				return JSON.parse(aux);
			}catch(er){
				return null;
			}
		}
	}
	app.AppCallService.prototype.setRealm=function(data){
		localStorage.setItem('realm', getRealm());	
		sessionStorage.setItem('realm', getRealm());	
	}
	app.AppCallService.prototype.getRealm=function(){
		let aux=localStorage.getItem('realm');
		if(aux==null){
			if(sessionStorage.getItem('realm')==null){
				 return null;
			}else{
				return sessionStorage.getItem('realm');
			}
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.setAccessToken=function(data){
		this.removeKey("access_token");
		this.removeKey("refresh_token");
		this.removeKey("init");
		this.removeKey("role");
		localStorage.setItem('access_token',data);
		localStorage.setItem('realm', getRealm());	
	}

	app.AppCallService.prototype.getAccessToken=function(){
		return localStorage.getItem('access_token');
	}
	app.AppCallService.prototype.setRefreshToken=function(data){
		localStorage.setItem('refresh_token',data);
	}
	app.AppCallService.prototype.getRefreshToken=function(){
		let aux=localStorage.getItem('refresh_token');
		if(aux==null){
			return null;
		}else{
			return aux;
		}
	}
	app.AppCallService.prototype.setTimeSession=function(data){
		localStorage.setItem('session',data);
	}
	app.AppCallService.prototype.getTimeSession=function(){
		return localStorage.getItem('session');
	}
	app.AppCallService.prototype.getBackUrl=function(){
		return getCookie("back_url_wallet");
	}
	app.AppCallService.prototype.getFingerPrint=function(){
		return getCookie("_secPrint");
	}
	app.AppCallService.prototype.setFingerPrint=function(data){
		setCookie("_secPrint",data,3000);
	}
	app.AppCallService.prototype.setUserRol=function(data){
		data=JSON.stringify(data);
		localStorage.setItem('role',data);
		sessionStorage.setItem('role',data);
	}
	app.AppCallService.prototype.setInit=function(data){
		data=JSON.stringify(data);
		localStorage.setItem("init",data);
	}
	app.AppCallService.prototype.getCountry=function(){
		return "VE";
	}
	app.AppCallService.prototype.processError=function(err,msg){
		let mensaje=msg;
		this.loading.hidePleaseWait();
		try {
			var status = "";
			if (err.hasOwnProperty('status')) {
				var contexto=this;
				status = err.status + ', ';
				if(err.status==401){
					mensaje="Sesión cerrada";
					setTimeout(function() {
						doLogout();
						contexto.router.navigate(['/init']);
					}, 2000);
				}else{
					if(err.status==403){
						mensaje="Sesión expirada";
						setTimeout(function() {
						doLogout();
						contexto.router.navigate(['/init']);
					}, 2000);
					}else{
						if (err.hasOwnProperty('_body')) {
							var aux = JSON.parse(err._body);
							if (aux.hasOwnProperty('message')) {
								if(aux.message==null || aux.message==undefined || aux.message==""){
									mensaje=msg;
								}else{
									if(aux.message.toUpperCase()=="FAILED_REQUEST"){
										mensaje=msg;
									}else{
										mensaje= status + translate(aux.message, 'ES').toUpperCase();
									}
								}
							} else {
								if (err.hasOwnProperty('statusText')) {
									mensaje = status + err.statusText;
								} else {
									mensaje = msg;
								}
							}
						} else {
							mensaje = msg;
						}
					}
				}
			}else{
				mensaje=msg;
			}
		} catch (err1) {
			mensaje = msg;
		}
		return mensaje;
	}
	app.AppCallService.prototype.processMessageError=function(data,mensaje){
		if (data.hasOwnProperty('message')) {
			var auxMsg = "";
			var titleMsg = "";
			if (data.message == null || data.message == undefined || data.message == "") {
				titleMsg =mensaje;
			} else {
				titleMsg = capitalizeOnly(translate(data.message, 'ES'));
			}
			if (data.hasOwnProperty('cause')) {
				if (!(data.cause == null || data.cause == undefined || data.cause == "" || data.cause.length == 0)) {
					for (var i = 0; i < data.cause.length; i++) {
						auxMsg = auxMsg+ " "+ translate(data.cause[i],'ES');
					}
					if (auxMsg != "") {
						titleMsg = titleMsg+ ": " + auxMsg;
					}
				}
			}
			mensaje = titleMsg;
			return mensaje;
		} else {
			return mensaje;
		}
	}
})(window.app || (window.app = {}));