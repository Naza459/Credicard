//var domain="localhost";
var domain="demo.paguetodo.com";
var base="https://"+domain+"/";
function getDomain(){
	return domain;
}
function getUrlBase(){
	return base;
}
function doLogout(){
	localStorage.clear();
	sessionStorage.clear();
}
function getClient(){
	return '99475e85-9623-40b5-8f45-0dfbc78adb77';
}
function getRealm(){
	return "cuyawa";
}
function getApi(){
	return "https://apid.paguetodo.com/demo/";
}
function getEnlaceAuthV2(){
  return "deeglev2_auth";
}
function getPaguetodoId(){
  return "dfb8aca9-5259-4582-ad81-9ffe0ae75ad3"
}
function getEnlaceAuth(){
	return "deegle_auth";
}
function getEnlaceApi(){
	return "deegle";
}
function getStatic(){
	return "https://staticd.paguetodo.com/"
}
function redirectUri(){
	return encodeURIComponent(redirectUriBase());
}
function redirectUriBase(){
	return "/login/init";
}
function redirectLogin(){
	var response_type="code";
	var redirect_uri=redirectUri();
	var scope="profile%2Bopenid";
	return url=base+"/login/?response_type="+response_type+"&redirect_uri="+redirect_uri+"&client_id="+getClient()+"&scope="+scope;
}
function goInit() {
  	var link=['/apps'];
  	return link;
}
function publicKey(){
	return "-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAo2R/WgKI1Bn1gshmmPbNeblJl1ya9vnKW+txqKbnFi7q4SvO+EMubbIwbpnszMceDTJkLgvybXAjxIzurGArHpykQ/2+L3NWJAxm2u46BwpTIExaZNjj8mKwuQlPu3ewLBhNNc2mdZxWeDqPSIvtw0L13D8zcvS2sX4liHJZnycb5E7fIVThDo75TGZtDna/TI9CZS/dVuKimNks8ouHBOdfm7H0Bqf695Uc4spd7Xh49FoU2gAFUZ//bzLiS8fSFkvdUUzPaOAd5FKKAYfObyMEz31FzIicJLTIAmTTT4q1L0lUuqkWpwkIkeCdfBNwrWDPormsDDdgPThkbiOj5sXulODCsc7rNzk6QDXA0zRSd8Lqemx7Os/m18dax8MiU6KOfT2hU90FnTcenngHyCmecYQEgAWyCPgWsb5dd8631BnY/6iHMjFyfrLxNljU/ZJpgqjNOme2VqNsF2wxzbajcOk6BsbS+15CwlHf179100NojF22UHq+ZNK87xqZJyStJ6hq7tKpiI32icX7oiK+nbHzsLFScQsz+u82aNBaad+BMMc/Xdx+3BkZGz1LgOcZTLuV1vbw1fJLSAQcKZRf9HKIP9+nSZ9IwK/Gt3InlpyUSgVPlWTh5PZVah7zsAT7uAzLXC+BibjaW8elRs8FZpZ/eK5KMH8clzdVGG0CAwEAAQ==-----END PUBLIC KEY-----";
}
function publicKeyPay(){
	return "-----BEGIN PUBLIC KEY-----"+
"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlZsOvWornKePU+ssZl3V"+
"hOy8vExZTRSosd4bgmsj4dRCAs9Uosw4i47go+aABkmbVW1wrvNxhJmUvtbBk9IH"+
"ueunWR7bd4ZmRQvxldPeo1QQBaFdR9a9xGGLvpLdHJHf8EqQeJj85a5+kKmjjNA3"+
"pXUZejiAOR6c7LnzVImaZbgSSvghmeN7jg6gJ+yL4a3t6xK9CcBD8EKkVnD7Ry4/"+
"6nhV9v8r1lfRgECSBPdpNCSdQxJeCGUz0Zrb7QIp6ccjNRGCQga6F/XuPAoG/5qo"+
"kPrjW6FD35DxUx5DGKWGj9VnBAKsD13cW8rcTZB60BzZX39QTbNRNJ6o+Am/dhcZ"+
"VNzv9F6lJJ0T50kVzUsN8tDDDnW8LCe7U1O1vLGN8/kLVFW4XjaJDJmKISLqEmS+"+
"ydLM/9zHLdOG/gHHXn8yVK8/TpXI8rOKo/B8VRHVqGKeVSWEmuFM4FxsgUD9xLMi"+
"kZFIzd4pJVJBePU8GihrjhtBs8Xve/NWg2i8HN3qm7E7Z8E5iwM1R5YFSLVbfIRz"+
"E4QDCAVQgUhNk+WkM4sYVXjOSdzg8w8qVedOsNH6REpZsN5+u5Xof9+/KogujsVb"+
"EiOVmxrty2hXh73G5yfLlIaxQZO3YwUoE/UGN7qx2HnNChdP/LsexthuIjLcDdXP"+
"uESdH/bsClMcj7N/gC7gRO0CAwEAAQ=="+
"-----END PUBLIC KEY-----";
}
