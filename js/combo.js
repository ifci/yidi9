/*
 * Copyright (c) 2015 JKD TEAM (9koudai.net)
 * @Author: fcdcyy@sina.cn
 *
 * @DateTime: 2015-03-07 15:38:32
 */

$(function(){
	// 选择收货地址
	$("#path_list dl:not(.add)").bind({
	    click: function() {
	        $(this).addClass('default').siblings('dl').removeClass('default');
	    },
	    mouseover: function() {
	        $(this).children('.ubtn').show();
	        $(this).find('.def').show();
	    },
	    mouseout: function() {
	        $(this).children('.ubtn').hide();
	        $(this).find('.def').hide();
	    }
	});

	// 添加新地址
	function path_add() {
	    var ow = $(window).width();
	    var oh = $(window).height();
	    var iw = $("#path_window").width();
	    var ih = $("#path_window").height();
	    $("#path_window > h3").text('创建收货地址');
	    $("#path_window,#lock").show();
	    $("#path_window").css({
	        'left': (ow - iw) / 2,
	        'top': (oh - ih) / 2
	    });
	}
	$("#path_list dl.add").click(function() {
	    path_add();
	});

	// 修改收货地址
	$("#path_list .ubtn .update").bind('click', function(event) {
	    path_add();
	    $("#path_window > h3").text('编辑收货地址');
	});

	// 关闭弹出层
	$("#path_window i.close,#lock").bind('click', function(event) {
	    $("#path_window,#lock").hide();
	});

	// 快递配送时间修改
	$(".time .update").bind('click', function(event) {
	    $(this).hide().parent().next().hide().next().show();
	});

	// 快递配送时间选择
	$("#time_opened dl").bind('click', function(event) {
	    $(this).parent().hide().prev().show().prev().children('b').show();
	    $(this).addClass('on').siblings('dl').removeClass('on');
	    var oText = $(this).children('dt').text();
	    $(this).parent().prev().children('p').text(oText);
	});

	// 支付方式手风琴效果
	$(".info .bank-list:gt(0)").css('border-top-style', 'none');
	$(".info .bank-list h3").bind('click', function(event) {
		$(".info h3").removeClass("bank_lion");
		$(this).addClass('bank_lion');
		var lion = $('.bank_lion').parent().index();
	    //if ($(this).find('.bank_radio').attr('checked')) {
	        $(this).parent('.bank-list').addClass('bank_on').siblings('.bank-list').removeClass('bank_on');
	        $(this).parent('.bank_on').css({
	            'border-top-style': 'solid',
	            'border-bottom-style': 'solid'
	        }).siblings('.bank-list').css({
	            'border-top-style': 'none'
	        });
	        $(".info .bank-list:eq(0)").css('border-top-style', 'solid');
	        /*$(".info .bank-list:eq(2)").css('border-bottom-style', 'solid');*/
	    // }
	});

	// 支付方式选择
	$(".info .bank-list li").bind('click', function(event) {
	    $(this).addClass('selected').siblings('li').removeClass('selected');
	});

	// 是否开具发票
	$("#invoice .update").bind('click', function(event) {
	    $(this).hide();
	    $("#invoice_need_save,#time_closed").hide();
	    $('#invoice_need').show();
	});
	$("#invoice_need_edit .save").bind('click', function(event) {
	    var invoice_title = $('#invoice_need_edit_cop_title').val() ? $('#invoice_need_edit_cop_title').val() : $("input[name='invoice[title]']:checked").val();
	    var invoice_con = $('input:radio[name=invoice_need_edit_content]:checked').val();
	    $("#invoice_need_save_title").text(invoice_title);
	    $("#invoice_need_save_content").text(invoice_con);
	    $("#invoice_need_save").show();
	    $("#invoice_need").hide();
	    $(this).parents("#invoice_need").siblings('h3').children('.update').show();
	});
	$(".invoice_no").bind('click', function(event) {
	    $(this).parents("#invoice_need").hide().siblings('#time_closed').show().siblings('h3').children('.update').show();
	});
	$("#invoices").on('click', function() {
	    if ($("input[name='invoice[title]']:checked").val() == '公司') {
	        $("#invoice_need_edit_cop_title").show();
	    } else {
	        $("#invoice_need_edit_cop_title").hide();
	    }
	})






	$(".textbox_ui input").focus(function(){
		$(this).parent().removeClass('error_ui');
	})
	//购物车全选全不选
    $("#toggle-checkboxes_up").bind('click', function(event) {
        var $this = $(this);
        if ($this.is(':checked')) {
            $(".checkbox,.jdcheckbox").attr('checked', true).prop('checked', true);
        } else {
            $(".checkbox,.jdcheckbox").attr('checked', false).prop('checked', false);
        }
    });

    $("#toggle-checkboxes_down").bind('click', function(event) {
        var $this = $(this);
        if ($this.is(':checked')) {
            $(".checkbox,#toggle-checkboxes_up").attr('checked', true).prop('checked', true);
        } else {
            $(".checkbox,#toggle-checkboxes_up").attr('checked', false).prop('checked', false);
        }
    });
    var allcheck = $("#toggle-checkboxes_up,.jdcheckbox");
    $(".checkbox").click(function(event) {
        if ($(".checkbox").length > $(".checkbox:checked").length) {
            allcheck.attr('checked', false).prop('checked', false);
        } else if ($(".checkbox").length == $(".checkbox:checked").length) {
            allcheck.attr('checked', true).prop('checked', true);
        }
    });

    //购物车数量加减
    $(".buynub").Spinner();
    /*$(".increment").click(function() {
        //num = parseInt(num) + 1;
        $(this).siblings(".quantity-text").val(parseInt($(this).siblings(".quantity-text").val()) + 1);
    })

    $(".decrement").click(function() {
        if ($(this).siblings(".quantity-text").val() > 1) {
            $(this).siblings(".quantity-text").val(parseInt($(this).siblings(".quantity-text").val()) - 1);
        }
    });*/
})

$.fn.extend({
	// 数量加减插件
	Spinner: function(opts){
		var stock;
		var defaults = {
			value:1,
			min:1,
			len:3,
			max:stock
		}, options = $.extend(defaults, opts), keyCodes = { up : 38, down : 40 };
		return this.each(function() {

			options.max = $('.stock').val();
			var a = $(this).find('.sub');
			var c = $(this).find('.add');
			var b = $(this).find('#buy_num');
			cv(0);	//值

			$(this).append(a).append(b).append(c);
			a.click(function(){
				cv(-1);
			});
			b.keyup(function(){
				cv(0);
			});
			c.click(function(){
				cv(+1);

			});
			b.bind('keyup paste change',function(e){
				e.keyCode==keyCodes.up&&cv(+1);
				e.keyCode==keyCodes.down&&cv(-1);
			});

			function cv(n){
				b.val(b.val().replace(/[^\d]/g,''));
				bv = parseInt( b.val() || options.min ) + n;
				bv >= options.min && bv <= options.max && b.val( bv );
				if( bv <= options.min ){
					b.val( options.min );
					a.addClass('pd_reduce_s');
					// f(a,2,"DisDe","Decrease");
				}else{
					a.removeClass('pd_reduce_s');
					// f(a,2,"Decrease","DisDe");
				}
				if( bv >= options.max ){
					b.val(options.max);
					c.addClass('pd_add_s');
				}else{
					c.removeClass('pd_add_s');
				}
			}
		});
		/*function f(o,t,c,s){
			t == 0 && o.addClass(c).attr("href","javascript:void(0)").append("<i></i>").find("i").append(s);
			t == 1 && o.addClass(c).attr({"value":options.value,"autocomplete":"off","maxlength":options.len});
			t == 2 && o.addClass(c).removeClass(s);
		}*/
	}
})