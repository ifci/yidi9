$(function(){
  var val,url;
  $(".spec").on('click','.item:not(.sold-out)', function(event) {
      $(".attrEmpty").hide();
      $(this).toggleClass('selected').siblings('.item').removeClass('selected');
      var spec = [];
      for(var i = 0; i < $(".spec").length; i++){
        // spec = '.yd_' + val;
          val = $(".spec").eq(i).find('.selected').data('value');
        // spec = spec + '_' + val;
          spec.push(val);
      }
      url = $("#setImg li[data-key='" + spec + "']").children('.img').val();
      $(".jqzoom").attr('src', url);

      var dv = $(this).data('value');

      //alert(String($("#setImg li[data-key='" + spec + "']")))
      /*if(!($("#setImg li[data-key='" + spec + "']").length > 0)){
        alert(1)
      }*/

      var arr = [];
      $("#setImg li[data-key*='" + dv + "']").each(function(index, el) {
          arr.push($(this).data('key'));
      });
      var oArr = [];
      oArr = arr.join(',');
      oa = oArr.split(',');

    /*console.log(oa);
    console.log(dv);
    console.log($.inArray(dv, oa));*/
      $(".spec .item").removeClass('sold-out');
      $(this).parents('.spec').siblings('.spec').find(".item").each(function(i, el) {
            // $(this).removeClass('sold-out');
          var dval = $(this).data('value');
          if($.inArray(dval, oa) == '-1'){
                // alert(dval);
              $(this).addClass('sold-out');
          }
      });
  });


  $(".buyNub-buy").on('click', '.u-buy', function(event) {
      $(".spec").each(function(index, el) {
          var oId = $('.spec').eq(index);
          var oSize = oId.find('.selected').length;
          if(!oSize){
              $(".attrEmpty").show();
          }
      });
  });
});