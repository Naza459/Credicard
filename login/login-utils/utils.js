function validarOnlyLetrasBoolean(data) {
	var patron = /^([a-zA-Z-Z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FAs\s])*$/;
	if (patron.test(data))
	   return true;
	else
	   return false;
}
function utils_keyNumber(data) {
	var patron = /^[0-9]*$/;
	if (patron.test(data))
	    return true;
	  else
	    return false;
}
function returnListDocType(data){
	if(data==null || data==undefined || data==""){
		return ['V','E','P','J','G','F','I'];
	}else{
		switch(data){
			case 'VE':{
				return ['V','E','P','J','G','F','I'];
			}break;
			default:{
				return ['V','E','P','J','G','F','I'];
			}
		}
	}
}
function returnListTypesDocument(pais){
	if(!(pais==null || pais==undefined || pais=="")){
		switch(pais){
			case 'VE':{
				return ['V','E','P','J','G','F','I'];
			}break;
			default:{
				return [];
			}
		}
	}else{
		return [];
	}
}
function keypressvalidarEmail(event, data) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "abcdefghijklmnopqrstuvwxyz0123456789";
  var especiales = [8, 38, 45, 46, 64, 95];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      if (key == 64) {
        if (data.indexOf(tecla) > -1) {
          tecla_especial = false;
          break;
        }
      }
      if (key == 46) {
        if (data != null) {
          if (data.charAt(data.length - 1) == tecla) {
            tecla_especial = false;
            break;
          }
        }
      }
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function validarEmail(valor) {
  if (valor.indexOf('&') >= 0) {
    return false;
  }
  if (valor.indexOf('/') >= 0) {
    return false;
  }
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(valor)) {
    return true;
  } else {
    return false;
  }
}
function keyPressValidarLetrasNumerosSimplesGuionesPisos(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "abcdefghijklmnopqrstuvwxyz0123456789";
  var especiales = [8,45,95,64,46,42,32];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function validarLetrasNumerosSimplesGuionesPiso(data) {
	  var patron = /^([a-zA-Z-Z]|[0-9]|-|_|\\*|\\.|\\,|;)*$/;
	  if (patron.test(data))
	    return true;
	  else
	    return false;
}
function validarOnlyLetras(event) {
	var key = event.keyCode || event.which;
	var tecla = String.fromCharCode(key).toLowerCase();
	var letras = "abcdefghijklmnopqrstuvwxyz\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FAs";
	var especiales = [8, 32];
	var tecla_especial = false
	for (var i in especiales) {
		if (key == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) == -1 && !tecla_especial)
		return false;
}
function keyPressValidarLetrasyOtrosCaracteres(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "abcdefghijklmnopqrstuvwxyz0123456789\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA";
  var especiales = [8, 32, 35, 36, 37, 38, 64, 45, 46, 95];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function validarLetrasyOtrosCaracteres(data) {
	var patron = /^([a-zA-Z-Z\u00D1\u00F1\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FAs\s]|[0-9]|-|_|&|%|@|.|,|;)*$/;
	if (patron.test(data))
	   return true;
	else
	   return false;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return null;
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
	var domain="domain="+getDomain();
    document.cookie = cname + "=" + cvalue + "; " + expires+"; "+domain+"; path=/";
}
var getBrowserInfo = function() {
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
};
function getDeviceType(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return 'MOBILE';
	}else{
		return 'DESKTOP';
	}
}
function getVersionOs(){
	var ua = navigator.userAgent;
	var x = ua.indexOf("MSIE");
	var y = 4;
	if (x == -1){
		x = ua.indexOf("Firefox");
		y = 7;
		if(x == -1) {
			if(x == -1){
				x = ua.indexOf("Chrome");
				y = 6;
				if(x == -1){
					x = ua.indexOf("Opera");
					y = 5;
					if(x == -1){
						x = ua.indexOf("Safari");
						if( x != -1){
							x = ua.indexOf("Version");
							y = 7;
						}
					}
				}
			}
		}
	}
	if(x != -1) {
		y ++;
		ua = ua.substring(x + y);
		x = ua.indexOf(" ");
		var x2 = ua.indexOf("(");
		if(x2 > 0 && x2 < x) 
			x = x2;
	    x2 = ua.indexOf(";");
	    if(x2 > 0 && x2 < x) 
	    	x = x2;
	    if (x == -1)
	    	return null;
	    var v = ua.substring(0, x);
	    return v;
	}
}
function returnClientjs(){
    var data=null;
    var client = null;
    var browser={};
    browser.app_code_name=navigator.appCodeName ;
    browser.app_name=navigator.appName ;
    browser.app_version=navigator.appVersion ;
    browser.language=navigator.language ;
    browser.platform=navigator.platform ;
    browser.user_agent=navigator.userAgent ;
    browser.onLine=navigator.onLine;
    var aux1=getBrowserInfo();
    browser.name=aux1;
    if(!(aux1==null || aux1==undefined || aux1=="")){
    	aux1=aux1.toUpperCase();
    	if(aux1.indexOf('CHROME')>-1){
    		browser.image_uri='images/chrome.png';
    	}else{
    		if(aux1.indexOf('FIREFOX')>-1){
        		browser.image_uri='images/firefox.png';
        	}else{
        		if(aux1.indexOf('OPERA')>-1){
            		browser.image_uri='images/opera.png';
            	}else{
            		if(aux1.indexOf('INTERNET EXPLORER')>-1){
                		browser.image_uri='images/ie.png';
                	}else{
                		if(aux1.indexOf('SAFARI')>-1){
							browser.image_uri='images/safari.png';
						}else{
							browser.image_uri=null;
						}
                	}
            	}
        	}
    	}
    }
    browser.version=getVersionOs();
    client={};
    client.browser=browser;
    var OSName="UNDEFINED OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
    if (navigator.appVersion.indexOf("Android")!=-1) OSName="Android";
    var device={};
    device.type=getDeviceType();
    device.name=OSName;
    client.device=device;
    return client;
}
function create_UUID(){
	var dt = new Date().getTime();
    if(!(dt==null || dt==undefined || dt=="")){
		 var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}else{
		return null;
	}
}
function convertEpochToDate(data){
	if(data==null || data==undefined || data=="" || data==0){
		return null;
	}else{
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds(data);
		return d;
	}
}
function getTimeExpiredSession(data){
	var fechaActual=new Date();
	var fechaSiguiente=convertEpochToDate(data);
	try{
		var resta=fechaSiguiente.getTime()-fechaActual.getTime()-30000;
		localStorage.setItem("expired_in",resta);
	}catch(er){
		return null
	}
}
function capitalizeOnly(data) {
  if (data == null || data == undefined) {
    return "";
  } else {
    var aux = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    return aux;
  }
}
function checkPwd(str) {
	var t=/[ !#$%&()*+,\-./:;?@[\\\]^_{}]/;
	var excepto=/[ = | ; “ ” ´" '< >~*]/;
	var mayu=/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    if(str==null || str==undefined || str==""){
		return "Contraseña vacía";
	}else{
		str=str.trim();
		if (str.length < 8) {
           return "Contraseña debe tener minimo 8 digitos";
       } else if (str.length > 20) {
           return "Contraseña no debe ser mayor a 20 digitos";
       } else if (str.search(/\d/) == -1) {
            return "Contraseña debe tener al menos un número";
       }else if (!mayu.test(str)){
		    return "La contraseña debe contener al menos una mayúscula";
	   } else if (str.search(/[a-zA-Z]/) == -1) {
           return "Contraseña debe tener al menos un letra";
       } else if (str.search(/[a-z]/) == -1) {
           return "Contraseña debe tener al menos una letra minúscula";
       }
	   else if (!t.test(str)) {
           return "Contraseña debe tener al menos un caracter especial de los siguientes !#$%&()+/\-.//:?@_{}";
       }else if (excepto.test(str)){
		    return "La contraseña no permite los siguientes caracteres especiales = | ; “ ” ´\" '< >~ *";
	   }
       return null;
	}   
}
function disabledCtlZ(e){
	if(e.ctrlKey==true){
		return false;
	}else{
		return true;
	}
}
function keypressNumbersInteger(event) {
  var key = event.keyCode || event.which;
  var tecla = String.fromCharCode(key).toLowerCase();
  var letras = "0123456789";
  var especiales = [8];
  var tecla_especial = false
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
function replaceAll(text, busca, reemplaza) {
  if (text == null || text == undefined) {
    return text;
  } else {
    while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca, reemplaza);
    return text;
  }
}
function returnListCurrency(){
	return [{value:"VED",label:"Bs"}];
}
function formattingDate(date) {
	if(date==null || date==undefined || date==""){
		return null;
	}
  date = replaceAll(date, "T", " ");
  var newDate = new Date(date);
  var hora = "00";
  var minutos = "00";
  if (newDate.getHours() < 10) {
    hora = "0" + newDate.getHours();
  } else {
    hora = newDate.getHours();
  }
  if (newDate.getMinutes() < 10) {
    minutos = "0" + newDate.getMinutes();
  } else {
    minutos = newDate.getMinutes();
  }
  var dia = newDate.getDate();
  if (dia < 10) {
    dia = "0" + newDate.getDate();
  }
  var mes=newDate.getMonth() + 1;
  if (mes < 10) {
    mes = "0" + mes;
  }
  var dateFormatting = dia + '-' + mes + '-' + newDate.getFullYear() + ' ' + hora + ':' + minutos;
  return dateFormatting;
}
function formatearNumeroCuenta(cuenta) {
  var numeroCtaFormt;
  if (cuenta != undefined) {
    if (cuenta.length >= 12) {
      var aux = cuenta;
      numeroCtaFormt = aux.substring(0, 4) + ' ' + aux.substring(4, 8) + ' ' + aux.substring(8, 10) + ' ' + aux.substring(10, aux.length);
    } else {
      numeroCtaFormt = cuenta;
    }
    return numeroCtaFormt;
  }
}
function formattingIntegerPart(integerPart) {
  var auxCaracter = "";
  var isNegative = false;
  auxCaracter = integerPart.charAt(0);
  var enteroAux = integerPart;
  if (auxCaracter == '-') {
    integerPart = integerPart.substring(1, integerPart.length);
    isNegative = true;
  }
  var cadena = '';
  var posicion = 0;
  if (integerPart.length > 3) {
    for (var i = 0; i < integerPart.length; i++) {
      if (i == 0) {
        posicion = integerPart.length;
      }
      if (posicion <= 3) {
        cadena = integerPart.substring(0, posicion) + cadena;
        if (isNegative) {
          cadena = '-' + cadena;
        }
        return cadena;
      } else {
        cadena = '.' + integerPart.substring(posicion - 3, posicion) + cadena;
        posicion = posicion - 3;
      }
    }
  } else {
    cadena = integerPart;
  }
  if (isNegative) {
    cadena = '-' + cadena;
  }
  return cadena;
}
function amountFormattingObject(amount) {
  var retorno = {
    integerPart: '',
    decimalPart: ''
  };
  var monto = amount / 100;
  var parteDecimal = '';
  var parteEntera = '';
  if (monto.toString().indexOf('.') > 0) {
    var array = monto.toString().split('.');
    parteEntera = array[0];
    if (array[1].length < 2) {
      parteDecimal = array[1] + '0';
    } else {
      parteDecimal = array[1];
    }
  } else {
    parteEntera = monto.toString();
    parteDecimal = '00';
  }
  retorno.integerPart = formattingIntegerPart(parteEntera);
  retorno.decimalPart = parteDecimal;
  return retorno;
}
function getListMonedas(){
	return [
		{value:"VED",name:"Bolivar"},
		{value:"USD",name:"Dolar americano"},
		{value:"EUR",name:"Euro"},
		{value:"CLP",name:"Peso chileno"},
		{value:"COP",name:"Peso colombiano"},
		{value:"DOP",name:"Peso Dominicano"},
		{value:"ARS",name:"Peso argentino"},
		{value:"BOB",name:"Bolivian Boliviano"},
		{value:"BRL",name:"Real brasilero"},
		{value:"MXN",name:"Peso mexicano"},
		{value:"UYU",name:"Peso Uruguayo"},
		{value:"AUD",name:"Dólar Australiano"},
		{value:"CAD",name:"Dólar canadiense"},
		{value:"CHF",name:"Franco suizo"},
		{value:"GBP",name:"Libra británica"},
		{value:"CNY",name:"Yuan chino"},
		{value:"JPY",name:"Yen Japones"},
		{value:"SEK",name:"Corona sueca"},
		{value:"AED",name:"Dírham de los Emiratos Árabes Unidos"},
		{value:"AFN",name:"Afghanistan Afghani"},
		{value:"ALL",name:"Lek albanés"},
		{value:"AMD",name:"Dram armenio"},
		{value:"AOA",name:"Kwanza angoleño"},
		{value:"AWG",name:"Florín de Aruba"},
		{value:"AZN",name:"Manat de Azerbaiyán"},
		{value:"BAM",name:"Bosnian Convertible"},
		{value:"BBD",name:"Dólar de Barbados"},
		{value:"BDT",name:"Bangladesh Taka"},
		{value:"BGN",name:"Bulgarian Lev"},
		{value:"BHD",name:"Bahrain Dinar"},
		{value:"BIF",name:"Franco de Burundi"},
		{value:"BMD",name:"Dólar bermudeño"},
		{value:"BND",name:"Dólar de Brunei"},
		{value:"BSD",name:"Dólar bahameño"},
		{value:"BTN",name:"DBhutan Ngultrum"},
		{value:"BWP",name:"Botswana Pula"},
		{value:"BYN",name:"Belarusian Ruble"},
		{value:"BZD",name:"Dólar de belize"},
		{value:"CDF",name:"Franco Congoleño"},
		{value:"CRC",name:"Colon de Costa rica"},
		{value:"CVE",name:"Escudo de Cabo Verde"},
		{value:"CYP",name:"Libra chipriota"},
		{value:"CZK",name:"Corona Checa"},
		{value:"DJF",name:"Franco Djibouti"},
		{value:"DKK",name:"Corona Danesa"},
		{value:"DZD",name:"Dinar argelino"},
		{value:"EEK",name:"Corona de Estonia"},
		{value:"EGP",name:"Libra Egipcia"},
		{value:"ERN",name:"Nakfa de Eritrea"},
		{value:"ETB",name:"Birr Etíope"},
		{value:"FJD",name:"Dólar Fiji"},
		{value:"FKP",name:"Libra Islas Malvinas"},
		{value:"GEL",name:"Lari georgiano"},
		{value:"GHS",name:"Cedi de Ghana"},
		{value:"GIP",name:"Libra de Gibraltar"},
		{value:"GMD",name:"Gambia Dalasi"},
		{value:"GNF",name:"Franco de Guinea"},
		{value:"GQE",name:"Eqguinea Ekwele"},
		{value:"GTQ",name:"Quetzal de Guatemala"},
		{value:"GWP",name:"Peso GuineaBissau"},
		{value:"GYD",name:"Dólar Guyana"},
		{value:"HKD",name:"Dólar Hong Kong"},
		{value:"HNL",name:"Hondura Lempira"},
		{value:"HRK",name:"Croatian Kuna"},
		{value:"HTG",name:"Haiti Gourde"},
		{value:"HUF",name:"Florín Hungaro"},
		{value:"IDR",name:"Rupia de Indonesia"},
		{value:"ILS",name:"Nuevo shekel israelí"},
		{value:"INR",name:"Rupia india"},
		{value:"IQD",name:"Dinar iraquí"},
		{value:"IRR",name:"Rial Iraní"},
		{value:"ISK",name:"Corona Islandesa"},
		{value:"JMD",name:"Dólar jamaicano"},
		{value:"JOD",name:"Dinar Jordano"},
		{value:"KES",name:"Chelín Keniano"},
		{value:"KGS",name:"Kyrgyzstan Som"},
		{value:"KHR",name:"Riel Camboyano"},
		{value:"KMF",name:"Franco Comorano"},
		{value:"KRW",name:"Won Surcoreano"},
		{value:"KWD",name:"Dinar Kuwaiti"},
		{value:"KYD",name:"Dólar Islas Caimán"},
		{value:"KZT",name:"Kazakhstan Tenge"},
		{value:"LAK",name:"Laotian Kip"},
		{value:"LBP",name:"Libra libanesa"},
		{value:"LKR",name:"Rupia de Sri Lanka"},
		{value:"LRD",name:"Dólar liberiano"},
		{value:"LSL",name:"Lesotho Loti"},
		{value:"LTL",name:"Lithuanian Litas"},
		{value:"LVL",name:"Latvian Lats"},
		{value:"LYD",name:"Dinar Libio"},
		{value:"MAD",name:"Dírham marroquí"},
		{value:"MDL",name:"Leu moldavo"},
		{value:"MGA",name:"Malagasy Ariary"},
		{value:"MKD",name:"Macedonian Denar"},
		{value:"MMK",name:"Myanmar Kyat"},
		{value:"MNT",name:"Mongolia Tugrik"},
		{value:"MOP",name:"Macau Pataca"},
		{value:"MRO",name:"Mauritania Ouguiya"},
		{value:"MRU",name:"Mauritania Ouguiya"},
		{value:"MTL",name:"Lira Maltesa"},
		{value:"MUR",name:"Rupia de Mauricio"},
		{value:"MVR",name:"Maldives Rufiyaa"},
		{value:"MWK",name:"Malawi Kwacha"},
		{value:"MYR",name:"Malaysian Ringgit"},
		{value:"MZN",name:"Mozambique Metical"},
		{value:"NAD",name:"Dólar de Namibia"},
		{value:"NGN",name:"Nigeria Naira"},
		{value:"NIO",name:"Nicarag Cordoba Oro"},
		{value:"NOK",name:"Norwegian Krone"},
		{value:"NPR",name:"Rupia Nepalí"},
		{value:"NZD",name:"Dolar de Nueva Zelanda"},
		{value:"OMR",name:"Oman Rial"},
		{value:"PAB",name:"Balboa de Panama"},
		{value:"PEN",name:"Peru Nuevo Sol"},
		{value:"PGK",name:"Papua Ng Kina"},
		{value:"PHP",name:"Peso Filipino"},
		{value:"PKR",name:"Rupia de Pakistán"},
		{value:"PLN",name:"Polish New Zloty"},
		{value:"PYG",name:"Paraguay Guarani"},
		{value:"QAR",name:"Qatar Rial"},
		{value:"RON",name:"Romanian Lei"},
		{value:"RSD",name:"Serbia Dinar"},
		{value:"RUB",name:"Rublo ruso"},
		{value:"RWF",name:"Franco Rwanda"},
		{value:"SAR",name:"Saudi Riyal"},
		{value:"SBD",name:"Dólar Is."},
		{value:"SCR",name:"Rupia Seychelles"},
		{value:"SDG",name:"Libra sudanesa"},
		{value:"SEK",name:"Corona sueca"},
		{value:"SGD",name:"Dólar de Singapur"},
		{value:"SHP",name:"Libra St. Helena"},
		{value:"SIT",name:"Tólar esloveno"},
		{value:"SKK",name:"Corona Eslovaca"},
		{value:"SLL",name:"Sierra L Leone"},
		{value:"SOS",name:"Chelín Somali"},
		{value:"SRD",name:"Dólar Surinam"},
		{value:"SSP",name:"Libra South Sudanese"},
		{value:"STD",name:"Sao Tome Dobra"},
		{value:"STN",name:"Sao Tome Dobra"},
		{value:"SVC",name:"Colón El Salvador"},
		{value:"SYP",name:"Libra siria"},
		{value:"SZL",name:"Swazi Lilangeni"},
		{value:"THB",name:"Thai Baht"},
		{value:"TJS",name:"Tajikistan Somoni"},
		{value:"TMT",name:"Turkmenistan Manat"},
		{value:"TND",name:"Tunisian Dinar"},
		{value:"TOP",name:"Tonga Paanga"},
		{value:"TRY",name:"Lira Turca"},
		{value:"TTD",name:"TrinidadTobago Dol."},
		{value:"TWD",name:"Dólar New Taiwan"},
		{value:"TZS",name:"Chelín Tanzano"},
		{value:"UAH",name:"Ukranian Hryvnia"},
		{value:"UGX",name:"Chelín ugandés"},
		{value:"UZS",name:"Uzbekistan Sum"},
		{value:"VND",name:"Viet Nam Dong"},
		{value:"VUV",name:"Vanuatu Vatu"},
		{value:"WST",name:"Samoa Tala"},
		{value:"XAF",name:"Cfa Franc Beac"},
		{value:"XCD",name:"Dólar E. Caribbean"},
		{value:"XOF",name:"Cfa Franc Bceao"},
		{value:"XPF",name:"Cfp Franc"},
		{value:"YER",name:"Yemeni Rial"},
		{value:"ZAR",name:"South African Rand"},
		{value:"ZMW",name:"Zambian Kwacha"},
		{value:"ZWL",name:"Dólar Zimbabwe"},
	];
}
function removeCookie(data){
	if(!(data==null || data==undefined || data=="")){
		try{
			setCookie(data, '', -1); 
		}catch(er){
		}
	}
}
var tiempo;
var timeout;
var n=0
function asyncSqrt(value,callback) {
	detenerSetInterval1();
    timeout=setTimeout(function() {
		if(!(localStorage.getItem("access_token")==null || localStorage.getItem("access_token")==undefined || localStorage.getItem("access_token")=="")){
			tiempo=setInterval(function(){
				n++;
				if(n>=30){
					detenerSetInterval();
				}
			}, 998);
			app.CreateBarMenuComponent.prototype.openModal();
		}
    }, (value-30)*1000);
}
function detenerSetInterval1(){
	n=0;
	clearTimeout(timeout);
	clearInterval(tiempo);
}
function detenerSetInterval(){
	clearTimeout(timeout);
	clearInterval(tiempo);
	doLogout();
	window.location.href="/init";
}
function detenerCamara(){
	// console.log("navigator",navigator.getMedia);
	if(localStorage.getItem("stream_id")!=null){
		var track = new MediaStream();
		// console.log("track",track);
	}
}
function whatCardIs(data){
	if(isVisa(data)==null){
		if(isMaster(data)==null){
			if(isAmex(data)==null){
				if(isDiscover(data)==null){
					if(isDiners(data)==null){
						return null;
					}else{
						return isDiners(data);
					}
				}else{
					return isDiscover(data);
				}
			}else{
				return isAmex(data);
			}
		}else{
			return isMaster(data);
		}
	}else{
		return isVisa(data);
	}
}
function isVisa(data){
	var patron = /^4[0-9]{12}([0-9]{3})?$/;
	if (patron.test(data)){
		var objeto={};
		objeto.image=getStatic()+"images/thumbnails/issuingBank/visa.png";
		objeto.marca="VISA";
		return objeto;
	}else{
		return null;
	}
}
function isMaster(data){
	var patron = /^5[0-9]{15}$/;
	if (patron.test(data)){
		var objeto={};
		objeto.image=getStatic()+"images/thumbnails/issuingBank/master_card.png";
		objeto.marca="MASTERCARD";
		return objeto;
	}else{
		return null;
	}
}
function isAmex(data){
	var patron = /^3(4|7)[0-9]{13}$/;
	if (patron.test(data)){
		var objeto={};
		objeto.image=getStatic()+"images/thumbnails/issuingBank/american_express.png";
		objeto.marca="AMEX";
		return objeto;
	}else{
		return null;
	}
}
function isDiscover(data){
	var patron = /^6[0-9]{15}$/;
	if (patron.test(data)){
		var objeto={};
		objeto.image=getStatic()+"images/thumbnails/issuingBank/discover.jpg";
		objeto.marca="DISCOVER";
		return objeto;
	}else{
		return null;
	}
}
function isDiners(data){
	var patron = /^3(0|6|8)[0-9]{12}$/;
	if (patron.test(data)){
		var objeto={};
		objeto.image=getStatic()+"images/thumbnails/issuingBank/diners.png";
		objeto.marca="DINERS CLUB";
		return objeto;
	}else{
		return null;
	}
}
function validateIsPhone(data){
	var patron = /^(?:412|424|414|426|416)[0-9]{7}$/;
	if (patron.test(data)){
		return true;
	}else{
		return false;
	}
}
function calcYearCopy(){
	var year = new Date().getFullYear();
	return year;
}