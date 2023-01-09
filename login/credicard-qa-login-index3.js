//index1 QA
var domain="appq.credicard.com.ve";
var base="https://"+domain+"/";
function getDomain(){
	return domain;
}
function doLogout(){
	localStorage.clear();
	sessionStorage.clear();
}
function getClient(){
	return '1797f6a6-500e-4461-b733-f21443e25cc2';
}
function getRealm(){
	return "credicard";
}
function getApi(){
	return "https://apiq.credicard.com.ve/";
}
function getEnlaceAuth(){
	return "auth";
}
function getEnlaceApi(){
	return "credicard";
}
function getStatic(){
	return "https://staticd.paguetodo.com/"
}
function redirectUri(){
	return encodeURIComponent(redirectUriBase());
}
function redirectUriBase(){
	return base+"login/init";
}
function redirectLogin(){
	var response_type="code";
	var redirect_uri=redirectUri();
	var scope="profile%2Bopenid";
	return url=base+"login/?response_type="+response_type+"&redirect_uri="+redirect_uri+"&client_id="+getClient()+"&scope="+scope;
}
function goInit() {
  	var link=['/apps'];
  	return link;
}
function publicKey(){
	return "-----BEGIN PUBLIC KEY-----"+
"MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsSzLmo9nQ7YUrzuQYwAm"+
"YPh4A15OKkTvHcuPZGu6jl0MOhDTrPFhF5ksB35mIM9lCA1U9/PzdLBMZ/2Fcqgj"+
"9UvN0+ga/c5v0Jw4/U9grmTxpk8WZ2EpLikCNyLp0QAVKupD5ObZjbCC6fJr2avZ"+
"+McQy+k65qnxXuqprm3FrE0cqn8sIQMnS2tbtB2WjKvXdk4SwWnjCs1gr5OgAL3P"+
"dAqcLGXCFmIZ27GohBqXYPKZgilwqQU+659YwJhN+a8l1Zv7mpFs7ZwjEdaK7D8M"+
"2Ixy1o8EjETVPEefpSAzV0JquBqv4Ny6RWVPpjW9eGngu+Zsu44J9Pvt40bPo3wE"+
"F2Zd2HVBMZcUXdkHAqdyQSRSN5owF8dhdv5n6U9sto02NgdkH0Sl6KXiPORbWx8W"+
"4Rd+FG9/Em6LJStsvgjZCBuuif7/2O7Dy+Gj+B2QM0E2mpiSpO7ubNYSYN4/Yzb0"+
"4Tu2BpDlSuV8Z/tXZCWL3J5A+wCsIFwTkNvzfhNQLGt9nbbcQB70/lf+MdAA2COf"+
"/xbUx5toYQXQ/bZpNOWw3bkSo3zoV/3/PL88mveAHIIb7vqvxHmW4OO8EFWrS3Ku"+
"pAAWFe1y+2OOGizHCKfkJSXKO/bTXr3nqBG+Dz6BZnhRgFjjlL4aT3p16pbiJq23"+
"NSeUSujrhXLjwdep64qZ0rECAwEAAQ=="+
"-----END PUBLIC KEY-----";
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