
(function($){
  $(document).ready(function(){
    var $body=$("body");
    function advanced_settings(){
      var $el=$(".advanced_settings");
      var $btn=$(".advanced_settings_btn");
      $btn.click(function(){
        if($el.hasClass("active")){
          $el.removeClass("active");
          $btn.removeClass("active");
        }else{
          $el.addClass("active");
          $btn.addClass("active");
        }       
      });  
    }

    advanced_settings();
    attachListeners();

    /*Wix.Data.Public.set("startCounter",25, { scope: 'APP' },
      // function(d) { console.log(d) }, function(f) { console.log(f) }
    );*/    
  })
})(jQuery);


function attachListeners() {
  console.log("----------------------------------------------------------"); 
  console.log("---------------------GETTING DATA :SETTINGS---------------"); 
  $('[wix-ctrl]').each(function (index, element) {
    var $element = $(element);
    var ctrl = $element.getCtrl();

    getPublic($element, ctrl);  
    
    if ($.isFunction(ctrl.onChange)) {
      ctrl.onChange(function (value) {
        console.log("----------------------------------------------------------"); 
        console.log("---------------------UPDATE DATA :SETTINGS---------------"); 
        onUpdate($element.attr('wix-param'), value);
        //console.log("Settings ctrl onChange");  console.log(value);  
      })
    }     
    //console.log("Settings public ctrl"); console.log(index);   
  });
}

function onUpdate(key, value) { 
  //Wix.Settings.triggerSettingsUpdatedEvent({key: key, value: value});
  //Wix.Settings.triggerSettingsUpdatedEvent({key: key+'Fast', value: "123456"});
  //console.log(key);
  //console.log(value);
  //console.log(Wix);
  console.log("Settings : "+key+" : "+ value);
  Wix.Data.Public.set(key, value, { scope: 'APP' },
       function(d) { console.log(d) }, 
       function(f) { console.log(f) }
  );
  //Wix.Settings.triggerSettingsUpdatedEvent({key: 'dropdown2', value: 0});
  Wix.Styles.getStyleParams(style => {
    console.log("All styles");
    console.log(style);
  });  
  //Wix.UI.set('messagePlaceholder',"fast");  
}

function getPublic($element, ctrl) { 
  if($element.attr('wix-ctrl')!="Input") return;
  //console.log('Settings Input');
  var key=$element.attr('wix-model');
  if(!key) return;  
  console.log('Settings key : '+ key );
  Wix.Data.Public.get(key, { scope: 'APP' }, 
    function(d){console.log("Settings Public success : "+key);  console.log(d);  ctrl.setValue(d[key]);}, 
    function(f){console.log("Settings Public fail : "+key); console.log(f)}
  );
  //console.log(" Settings ctrl"); console.log(ctrl);  
}
