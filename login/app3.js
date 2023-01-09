(function(){
    'use strict';
    let a;
    const b=document.querySelector(".add-button");
    b.style.display="none",window.addEventListener("beforeinstallprompt",c=>{c.preventDefault(),a=c,b.style.display="block",b.addEventListener("click",()=>{b.style.display="none",a.prompt(),a.userChoice.then(b=>{"accepted"===b.outcome?console.log("User accepted the A2HS prompt"):console.log("User dismissed the A2HS prompt"),a=null})})})});

    var logger = function()
    {
        var oldConsoleLog = null;
        var pub = {};
    
        pub.disableLogger = function disableLogger()
          {
              oldConsoleLog = console.log;
              window['console']['log'] = function() {};
          };
    
        return pub;
    }();
        
    logger.disableLogger();
    
    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.getRegistration().then(function(registration) {
            
            if(registration){
              document.getElementById("loadingAppDialog").style.display = "none";
              document.getElementById("pleaseWait").style.display = "block";
            }
            else{
                document.getElementById("loadingAppDialog").style.display = "block";
                document.getElementById("pleaseWait").style.display = "none";
                navigator.serviceWorker.register('../service-worker.js');
            }
          
          });
    }