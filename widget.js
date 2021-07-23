var SDK_loaded=false;
var data={}; count=0; style_data=false; editor=false;     

console.log("Widget");


(function($){
    $(document).ready(function(){
        var $body=$("body");
        console.log('Ready');            
        console.log('Next');        

        loadData();

        Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, onSettingsUpdate);
        // You can get the style params programmatically, un-comment the following snippet to see how it works:

        function onSettingsUpdate(update) {
           // update = stringify(update);
            //$('.sample-settings-title').show();
           // $('.json').html(update);
           // updateCompHeight();
            console.log("Setting Update");
            console.log(update);
            //data={}; count=0; style_data=false; editor=true;         
            //loadData();
        }

      
        // You can also get the style every time it changes, try this:
        Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, style => {
            console.log("Style Update");
            console.log(style);
            data={}; count=0; style_data=false; editor=true; 
            //$body.html(" ");        
            //loadData();
        });



        function loadData(){
            // Wix.Data.Public.get("startCounter", { scope: 'APP' }, function(d){console.log(d); data.counter=d.startCounter; run();}, function(f){console.log(f)});
            Wix.Data.Public.get("_businessID", { scope: 'APP' }, function(d){console.log(d); data._businessID=d._businessID; count++; run();}, function(f){console.log(f)});
            Wix.Data.Public.get("_buttonText", { scope: 'APP' }, function(d){console.log(d); data._buttonText=d._buttonText; count++; run();}, function(f){console.log(f)});
            Wix.Styles.getStyleParams(style => {
                style_data=style;
                console.log(style);
                if(style_data.numbers._buttonAlignment==1){
                    style_data._buttonAlignment='left';
                }else if(style_data.numbers._buttonAlignment==2){
                    style_data._buttonAlignment='center';
                }else if(style_data.numbers._buttonAlignment==3){
                    style_data._buttonAlignment='right';
                }else{
                    style_data._buttonAlignment='';
                }

                if(style_data.numbers._buttonPosition==1){
                    style_data._buttonPosition='top';
                }else if(style_data.numbers._buttonPosition==2){
                    style_data._buttonPosition='bottom';
                }else{
                    style_data._buttonPosition='';
                }
                run();            
            });
        }

        function run(){  
            console.log(data);          
            if(count==2 && style_data)  {
                console.log("DATA");
                console.log(style_data);
                console.log(data);
                create();
            }
        }  

        /*
        console.log( "Wix.Styles");
        console.log( Wix.Styles);
        $('.navtohome').click(() => {
            Wix.getSiteMap(pages => {
            Wix.navigateToPage(pages[0].pageId.substring(1));
            });
            console.log('navigated');
        });
        */
        
        
        function create(){           
            //if(typeof StorefrontSDK == "undefined"){
                !(function (e, t, r, n) {
                    var o, c, s;
                    (o = e.document),
                        (c = t.children[0]),
                        (s = o.createElement("script")),
                        (e.StorefrontSDKObject = "StorefrontSDK"),
                        (e[e.StorefrontSDKObject] = {
                            executeCommand: function (t, r) {
                                e[e.StorefrontSDKObject].buffer.push([t, r]);
                            },
                            buffer: [],
                        }),
                        (s.async = 1),
                        (s.src = "https://web-apps.cdn4dd.com/webapps/sdk-storefront/latest/sdk.js"),
                        t.insertBefore(s, c);
                })(window, document.head); 
                SDK_loaded=true;
            //}
            StorefrontSDK.executeCommand("renderFloatingButton", {
                businessId: data._businessID,
                buttonText: data._buttonText,
                position: style_data._buttonPosition,
                buttonBackgroundColor: style_data.colors._buttonBackgroundColor.value,
                buttonTextColor: style_data.colors._buttonTextColor.value,
                buttonAlignment: style_data._buttonAlignment,
                floatingBar: style_data.booleans._floatingBar,
                backgroundColor: style_data.colors._floatingBarColor.value,
                urlParams: { utm_medium: "wix_app" },
            });

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
    console.log('jQuery');
})(jQuery);
