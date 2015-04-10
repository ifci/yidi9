/*
 * Copyright (c) 2015 JKD TEAM (9koudai.net)
 * @Author: fcdcyy@sina.cn
 *
 * @DateTime: 2015-03-10 16:52:02
 */

 (function($){
 	$.fn.extend({
		// coffee方法,事件管理
		coffee: function(obj){
			for(var eName in obj)
				for(var selector in obj[eName])
					$(this).on(eName, selector, obj[eName][selector]);
			},
		// 返回顶部
		bTop: function(){
			this.click(function() {
				$("html,body").stop(true).animate({scrollTop: 0}, 200);
			});
		},
		// 首页右侧导航hover提示
		homeTip: function(){
			var $this = this;
			var tip = $(".ydmBar_tip");
			this.hover(function(){
				$(this).find(tip).show().stop(true).animate({'margin-left': '-90px','opacity': '1'}, 600,'swing', true);
			},function(){
				$(this).find(tip).stop(true).animate({'margin-left': '-120px','opacity': '0'}, 600, function(){
					$(this).hide();
				});
			})
		},
		// 切换卡效果
		tabs: function(opts){
			var defaults = {
				hd: '.hd li',
				bd: '.bd',
				on: 'on',
				trigger : 'click'
			}, options = $.extend(defaults, opts);
			return this.each(function(){
				var t = $(this);
				var s = 0;
				var hd = $(options.hd, t);
				var bd = $(options.bd, t);
				var on = $("." + options.on, t);
				bd.hide().eq(on.index()).show();
				hd.click( function(){
					s = $(this).index();
					hd.removeClass(options.on);
					$(this).addClass(options.on);
					bd.hide().eq(s).show();
				});
			})
		},
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
})(jQuery);
$(function(){
	$(".ydmBar_ac").not('.ydmBar_qcode').homeTip();
	$('.ydmBar_qcode').hover(function(){
		$('.ydmBar_qc').toggle();
	})
	$(".ydmBar_top").bTop();
	var ydat,ydct,ydbh;
	function mtcalc(){
		ydbh = $(".ydmBar").height();
		ydat = ydbh * 0.185;
		$(".ydmBar_a").css('margin-top', ydat);
	}
	mtcalc();
	$(window).resize(function(){
		mtcalc();
	});
	$('.ydmBar').coffee({
		click: {
			'.ydmBar_un': function(){
				var tTop = $(this).position().top;
				var loGin = $(".ydmBar_login");
				loGin.fadeIn().css('top', tTop);

			},
			'.ydmBar_login_con span': function(){
				$(this).siblings('input').val('');
			},
			'.ydmBar_login_con input': function(){
				$this = $(this);
				var setIn = setInterval(function(){
					if($this.val().length > 0){
						$this.siblings("span").show();
					}else{
						$this.siblings("span").hide();
					}
				}, 500);
			},
			'.ydmBar_close': function(){
				$(".ydmBar_login").hide();
			}
		}
	});
	$('.ydmBar').hover(function(){
		return false;
	},function(){
		$(".ydmBar_login").hide();
	});

	$("#shortcut .set").hover(function() {
		$(this).toggleClass('hover');
	});
	/*全部商品分类*/
	$("#nav").hover(function(){
		$(this).find('.tit').toggle();
	});
	$(".tit > li").hover(function(){
		var subTop = $(this).position().top;
		$(".tit li").find(".mod_subcate").stop(true).animate({top:subTop},400);
		$(this).toggleClass('on').find('.mod_subcate').toggle();
	});
	$(".article").tabs({
		'hd' : '.tabs_t li',
		'bd' : '.pn-article',
		'on' : 'article_on'
	});

	//退货数量加减
	$(".n-left").bind('click', function(event) {  //可退数量
		var istext = $(this).siblings(".n-num");
	    // 退货数量最少为1
	    if(istext.val() > 1){
	    	istext.val(parseInt(istext.val()) - 1);
	    }else{
	    	return false;
	    }
	});
	$(".n-right").bind('click', function(event) {
		var isNum = $(this).parent().siblings(".p-isNum").text();
		var istext = $(this).siblings(".n-num");
	    // 退货数量不超过可退数量
	    if(parseInt(isNum) > istext.val()){
	    	istext.val(parseInt(istext.val()) + 1);
	    }else{
	    	return false;
	    }
	});

	/*帮助中心*/
	$(".slideqa_c").on('click', function(event) {
		$(this).next('.slideqa_b').slideToggle();
	});

	/*我的积分*/
	$(".wdjf_dt").tabs({
		bd: '.bd > div'
	});

	/*优惠券*/
	$('.yhq').tabs({
		'bd': '.bd > div'
	});
	$('.from a,.from span').hover(function(){
		$(this).parent().children('span').show();
	},function(){
		$(this).parent().children('span').hide();
	});

	/*删除优惠券*/
	$('.yhq .del').on('click', function(event) {
		popup.confirm('确定要删除此优惠劵吗？删除后将无法恢复','意帝酒业');
	});

	$('.p-change-op').on('click', 'a', function(event) {
		var t = $(this).parents('li');
		var dialog = $("#dialog");
		var integral = $("#Integral", t).val();
		var cate = $("#Cate", t).val();
		var par = $("#Par", t).val();
		var condition = $("#Condition", t).val();
		var valid = $("#Valid", t).val();
		var Coupon = {
			integral : integral,
			cate : cate,
			par : par,
			condition : condition,
			valid : valid
		};
		$('.integral', dialog).html(integral);
		$('.cate', dialog).html(cate);
		$('.par', dialog).html(par);
		$('.condition', dialog).html(condition);
		$('.valid', dialog).html(valid);
		asyncbox.html({
			content : document.getElementById("dialog"),
			id : 'p-layer'
		});
	});

	$("body").delegate('.cancel', 'click', function(event) {
		asyncbox.close('p-layer');
	});



})