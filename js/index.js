(function($){
	$.fn.extend({
		// coffee方法,事件管理
		coffee: function(obj){
		    for(var eName in obj)
		    for(var selector in obj[eName])
		        $(this).on(eName, selector, obj[eName][selector]);
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
			});
		},
		// 返回顶部
		bTop: function(){
			this.click(function() {
				$("html,body").stop(true).animate({scrollTop: 0}, 200);
			});
		},
		// 点击定位跳转
		mScroll: function(id){
			$("html,body").stop(true).animate({scrollTop: $("#"+id).offset().top}, 1000);
		},
		// 图片自适应的方法
		imgAuto: function(){
			var w,t = this.prop('tagName') == 'IMG' ? this : this.find('img');
			t.each(function(){
				w = $(this).width() >= $(this).height() ? 0 : 1;
				if( !w ){
					$(this).css({'width':'100%','height':'auto'});
				}else{
					$(this).css({'width':'auto','height':'100%'});
				}
			});
		},
		// 数量加减插件
		Spinner: function(opts){
			var stock = $("#stock").val();
			var defaults = {
				value:1,
				min:1,
				len:3,
				max:stock
			}, options = $.extend(defaults, opts), keyCodes = { up : 38, down : 40 };
			return this.each(function() {

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
						a.addClass('buyNub-nub-blus');
						// f(a,2,"DisDe","Decrease");
					}else{
						a.removeClass('buyNub-nub-blus');
						// f(a,2,"Decrease","DisDe");
					}
					if( bv >= options.max ){
						b.val(options.max);
						c.addClass('buyNub-nub-top-s');
					}else{
						c.removeClass('buyNub-nub-top-s');
					}
				}
			});
			function f(o,t,c,s){
				t == 0 && o.addClass(c).attr("href","javascript:void(0)").append("<i></i>").find("i").append(s);
				t == 1 && o.addClass(c).attr({"value":options.value,"autocomplete":"off","maxlength":options.len});
				t == 2 && o.addClass(c).removeClass(s);
			}
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
			});
		},
		// 弹出层效果
		layer: function(opts){
			var defaults = {
				trigger : 'click'
			}, options = $.extend(defaults, opts);
			return this.each(function(){
				// var
			});
		}
	});
})(jQuery);



$(function(){
	$(".ydmBar_ac").not('.ydmBar_qcode').homeTip();
	$('.ydmBar_qcode').hover(function(){
		$('.ydmBar_qc').toggle();
	});
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


	/*列表页*/
	$("#nav").hover(function(){
		$(this).find('.tit').toggle();
	});

	$("#screen dl:last").addClass("screen_more");

	$(".tit > li").hover(function(){
        var subTop = $(this).position().top;
        $(".tit li").find(".mod_subcate").stop(true).animate({top:subTop},400);
		$(this).toggleClass('on').find('.mod_subcate').toggle();
	});


	$(".pbar_rank li").first().children('.rank-unfold').show().siblings().hide();
    $(".pbar_rank li:gt(2)").find('.rUnfold-nub').addClass('rUnfold-nub2');
    $(".pbar_rank li").hover(function(){
        $(this).children('.rank-unfold').show().siblings().hide();
        $(this).siblings('li').children('.rank-unfold').hide().siblings().show();
    });

    $("#plist li").hover(function(){
        $(this).toggleClass('popwarp');
    });

    // 详情页放大图片
    $("#thumblist li a").hover(function() {
        $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
        $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
        $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
    });
    $("#thumblist li:first").addClass('tb-selected');
    $("#buynub").Spinner();

    // 详情页切换卡效果
	$(".pdtabs").tabs({
		'hd' : '.hd li',
		'bd' : '.bd > div',
		'on' : 'on'
	});

	// 购物成功弹出层
	$(".u-buy-close,.u-buy-goa").on("click",function(){
        $(this).parents('.u-buy-lay').hide();
    });
    $(".detailCode-on").hover(function() {
        $(".detailCode-t").toggle();
    });
	/*评价分数*/
    var f = $("#Fraction").val() || 5;
    $(".d-evaluate-l em").text(f);
    $(".d-evaluate-list").append('<span>' + f + '</span>');
    $(".d-evaluate-list").children('span').css('left', 90 * f - 12);


    // 销量排行榜
    $(".dLeft-ranking li").first().children('.rank-unfold').show().siblings().hide();
    $(".dLeft-ranking li:gt(2)").find('.rUnfold-nub').addClass('rUnfold-nub2');
    $(".dLeft-ranking li").hover(function() {
        $(this).children('.rank-unfold').show().siblings().hide();
        $(this).siblings('li').children('.rank-unfold').hide().siblings().show();
    });
    /*$(".choose .item").on('click', function(event) {
		$(this).addClass('selected').siblings('.item').removeClass('selected');
	});*/
});

