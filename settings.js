
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
   // $(attachListeners);


   Wix.Data.Public.set("startCounter",25, { scope: 'APP' },
        function(d) { console.log(d) }, function(f) { console.log(f) }
   );
    
  })
})(jQuery);


function onUpdate(key, value) { 
  //Wix.Settings.triggerSettingsUpdatedEvent({key: key, value: value});
  //Wix.Settings.triggerSettingsUpdatedEvent({key: key+'Fast', value: "123456"});
  console.log(key);
  console.log(value);
  console.log(Wix);
  Wix.Data.Public.set(key, value, { scope: 'APP' },
       function(d) { console.log(d) }, function(f) { console.log(f) }
  );
  //Wix.Settings.triggerSettingsUpdatedEvent({key: 'dropdown2', value: 0});
  Wix.Styles.getStyleParams(style => {
    console.log(style);
  });  
  //Wix.UI.set('messagePlaceholder',"fast");  

}
function getPublic($element, ctrl) { 
  if($element.attr('wix-ctrl')!="Input") return;
  console.log('Input');
  var key=$element.attr('wix-model');
  if(!key) return;
  console.log('key');
  console.log(key);   
  Wix.Data.Public.get(key, { scope: 'APP' }, 
    function(d){console.log(d);  ctrl.setValue(d[key]);}, 
    function(f){console.log(f)}
  );
  console.log(ctrl); 
 
}

function attachListeners() {
  $('[wix-ctrl]').each(function (index, element) {
    var $element = $(element);
    var ctrl = $element.getCtrl();
    if ($.isFunction(ctrl.onChange)) {
      ctrl.onChange(function (value) {
        onUpdate($element.attr('wix-param'), value);
      })
    } 
    getPublic($element, ctrl);  
    console.log("ctrl");   
    //console.log(ctrl);   
  });
}
