var SDK_loaded=false;
var data={}, count=0, style_data=false, editor=false;  
var SDK=false;

console.log("Widget");


(function($){
    $(document).ready(function(){
        var $body=$("body");
        console.log('Widget Ready');            
        console.log('Widget Next');        

        loadPublicData();
        loadStyleData();

        Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, onSettingsUpdate);
        // You can get the style params programmatically, un-comment the following snippet to see how it works:

        function onSettingsUpdate(update) {
           // update = stringify(update);
            //$('.sample-settings-title').show();
           // $('.json').html(update);
           // updateCompHeight();
            console.log("Widget Setting Update");
            console.log(update);
            //data={}; count=0; style_data=false; editor=true;         
            //loadData();
        }
        Wix.addEventListener(Wix.Events.PUBLIC_DATA_CHANGED, onPublicUpdate); 

        function onPublicUpdate(update) {        
            console.log("----------------------------------------------------------"); 
            console.log("---------------------PUBLIC DATA : WIDGET---------------"); 
            data={}; count=0; style_data=false; editor=true;  
            console.log("SDK"); console.log(SDK);
            loadPublicData();        
            loadStyleData();
            $.each(update, function(i, v){
                if(i=="_buttonPosition") {_buttonPosition(v);}                
                else if(i=="_buttonAlignment") {_buttonAlignment(v);}
                else if(i=="_floatingBar") {style_data.booleans._floatingBar=v;}
                else if(i=="_floatingBar") {style_data.booleans._floatingBar=v;}
                console.log("update: "+i+' : '+v); 
                console.log(style_data);    
            })           
            console.log(update);            
            console.log(data);     
        }
      
        // You can also get the style every time it changes, try this:
       /* Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, style => {
            console.log("----------------------------------------------------------"); 
            console.log("---------------------STYLES DATA : WIDGET---------------");            
            console.log(style);
            data={}; count=0; style_data=false; editor=true;             
            //loadData();
        });*/
        function loadPublicData(){
            // Wix.Data.Public.get("startCounter", { scope: 'APP' }, function(d){console.log(d); data.counter=d.startCounter; run();}, function(f){console.log(f)});
            Wix.Data.Public.get("_businessID", { scope: 'APP' }, function(d){console.log(d); data._businessID=d._businessID; count++; run();}, function(f){console.log(f)});
            Wix.Data.Public.get("_buttonText", { scope: 'APP' }, function(d){console.log(d); data._buttonText=d._buttonText; count++; run();}, function(f){console.log(f)});            
        }
        function loadStyleData(){         
            Wix.Styles.getStyleParams(style => {
                style_data=style;
                console.log(style);                
                _buttonAlignment(style_data.numbers._buttonAlignment);
                _buttonPosition(style_data.numbers._buttonPosition);
                run();            
            });
        }
        function _buttonAlignment(v){             
            var v_='';         
            if(v==1){
                v_='left';
            }else if(v==2){
                v_='center';
            }else if(v==3){
                v_='right';
            }
            style_data._buttonAlignment=v_;
        } 
        function _buttonPosition(v){             
            var v_='';  
            if(v==1){
               v_='top';
            }else if(v==2){
                v_='bottom';
            }
            style_data._buttonPosition=v_;
        } 
        function run(){  
            console.log(data);          
            if(count==2 && style_data)  {
                //console.log("Widget STYLE DATA");
                console.log(style_data);
                //console.log("Widget DATA");
                console.log(data);
                create();
            }
        }       
        
        function create(){ 
           
            if(!window['StorefrontSDK']){
                !(function (e, t, r, n) {
                    console.log("SDK SCRIPT 2| WIDGET");   
                
                    var o, c, s;               

                    o = e.document;
                    s = o.createElement("script");
                    
                    s.async = 1;
                    s.src = "https://web-apps.cdn4dd.com/webapps/sdk-storefront/latest/sdk.js";

                    c = t.children[0];
                    t.insertBefore(s, c);

                    e.StorefrontSDKObject = "StorefrontSDK";
                    e[e.StorefrontSDKObject] = {
                        executeCommand: function (t, r) {
                            console.log("SDK EXECUTE | WIDGET");
                            e[e.StorefrontSDKObject].buffer.push([t, r]);
                        },
                        buffer: [],
                    };

                
                    

                })(window, document.head); 
            }
            
            SDK_loaded=true;

            var prop={
                businessId: data._businessID,
                buttonText: data._buttonText,
                position: style_data._buttonPosition,
                buttonBackgroundColor: style_data.colors._buttonBackgroundColor.value,
                buttonTextColor: style_data.colors._buttonTextColor.value,
                buttonAlignment: style_data._buttonAlignment,
                floatingBar: style_data.booleans._floatingBar,
                backgroundColor: style_data.colors._floatingBarColor.value,
                urlParams: { utm_medium: "wix_app" },
            };

            if(window['StorefrontSDK']){
                $body.html(" FASTY ");
                console.log("SDK EXISTS");
                console.log(window['StorefrontSDK']);
                var SDK_=window['StorefrontSDK'];
                if(SDK_['executeCommand']){
                    console.log("SDK FIRST");
                    SDK_['executeCommand']("renderFloatingButton", prop);
                } else if(SDK_['executeCmd']){
                    console.log("SDK NEXT");
                    SDK_['executeCmd']("renderFloatingButton", prop);
                }           
            }  

            /*StorefrontSDK.executeCommand("renderFloatingButton", {
                businessId: data._businessID,
                buttonText: data._buttonText,
                position: style_data._buttonPosition,
                buttonBackgroundColor: style_data.colors._buttonBackgroundColor.value,
                buttonTextColor: style_data.colors._buttonTextColor.value,
                buttonAlignment: style_data._buttonAlignment,
                floatingBar: style_data.booleans._floatingBar,
                backgroundColor: style_data.colors._floatingBarColor.value,
                urlParams: { utm_medium: "wix_app" },
            });*/

            /*StorefrontSDK.executeCommand("renderFloatingButton", {
                businessId: 1234,
                buttonText: "Order Online 3",
                position: "",
                buttonBackgroundColor: "#ff0000",
                buttonTextColor: "#ffffff",
                buttonAlignment: "",
                floatingBar: 1,
                backgroundColor: "",
                urlParams: { utm_medium: "wp_plugin" },
            });*/
        }
       
    });
    console.log('Widget jQuery');
})(jQuery);
