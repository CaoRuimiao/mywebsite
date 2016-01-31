
//加载页
window.onload=function(){
    $(".preloader").delay(500).fadeOut("slow");
}


$(function(){

    var clientX=$(window).width();
    console.log(clientX);
    //小屏时得下拉菜单
    $(".toggle-menu").click(function(){
        $(".show-menu").slideToggle(200);
    });

    var flag1=false;
    $(".main-menu").find("a").click(function(e){
        //e.stopPropagation();
        var name=$(this).attr("class");
        var index=name.split("-")[1];
        //首次点击首页
        if(index==1){
            if(!flag1){
                flag1=true;
                return;
            }
        }
        $(".content").finish();
        //本块内容显示，点击无效果
        if($(".content")[index-1].style.display=="block"){
            return;
        }
        $(".content").slideUp("slow");
        $($(".content")[index-1]).slideDown("slow");
        //隐藏小屏的菜单
        $(".show-menu").fadeOut(100);
    });



    $(".home-box").attr("data-a","animate-shanshuo");
    $(".home-box:not(.home-what-box)").click(function(){
        $(".home-section").slideUp();
        $(".about-section").show();
    });
    // 首页鼠标经过效果
    var zhezhao;
    $(".home-box").hover(function(){
        zhezhao=$(this).find(".zhezhao");
        zhezhao.finish();
        zhezhao.animate({left:zhezhao.width()+"px"},200).fadeOut(600);
    },function(){
        zhezhao.animate({left:0},400).fadeIn(600);
    });


    //gallery  作品展示鼠标悬停效果

    $(".gallery-block").hover(function(){
        $(this).find(".gallery-mask").fadeOut(100);
        $(this).find(".hang").animate({width:'0%',height:'1px'},2000);
        $(this).find(".shu").animate({width:'1px',height:'0%'},2000);
    },function(){
        $(this).find(".gallery-mask").finish();
        $(this).find(".gallery-mask").fadeIn(100);
        $(this).find(".hang").finish();
        $(this).find(".shu").finish();
        $(this).find(".hang").animate({width:'100%',height:'1px'},2000);
        $(this).find(".shu").animate({width:'1px',height:'100%'},2000);
    });

    //查看更多
    var flag2=true;
    $(".moreBtn").click(function(){
        if(flag2){
            $(".gallery-more").removeAttr("data-a");
            $(".gallery-more").css({display:"block",transform:"scale(0.5,0.5)",transition:"all 1s ease"});
            setTimeout(function(){
                $(".gallery-more").css({display:"block",transform:"scale(1,1)",transition:"all 1s ease"});
            },800);
            $(".moreBtn").html("收起");
           flag2=false;
        }else{
            $(".gallery-more").attr("data-a","animate-xuanzhuan");
            setTimeout(function(){
                $(".gallery-more").css({display:"none"});
            },800);
            $(".moreBtn").html("查看更多");
            flag2=true;
        }
    });
    $(".moreBtn").hover(function(){
        $(this).attr("data-a","animate-shanshuo");
    },function(){
        $(this).removeAttr("data-a");
    });



    //--------------------------seemore------------------------------
    $(".seemore").click(function(){
        clearInterval(aitimerId);
        $(".wflunbo").fadeOut("slow");
        $(".web-section").fadeIn("slow");
        $(".wflunbo").css({display:"none"});
        $("#menu-3 .font-color h2.subtitle").css({display:"block"});
        $(".web-section").css({transform:"scale(0,0)"});
        setTimeout(function(){
            $(".web-section").css({transform:"scale(1,1)"});
        },600);
    });
    $(".seemore").hover(function(){
        $(this).attr("data-a","animate-shanshuo");
    },function(){
        $(this).removeAttr("data-a");
    });
    //----------------AI作品集 无缝轮播---------------------------------
    $(".gallery-ai").click(function(){
        $(".wflunbo").fadeIn("slow");
        $("#menu-3 .font-color h2.subtitle").css({display:"none"});
        $(".web-section").css({display:"none"});
        aitimerId=setInterval(ailunbo,2000);
        //$(".content-con").hide();
    });
    var aitimerId,aiindex=1;
    ailunbo=function(){
        if(clientX<768){
            if(aiindex==$('.aiwork').length-2){
                $('.aiwork-area').animate({marginLeft:-$('.aiwork').outerWidth()*(aiindex)},function(){
                    $('.aiwork-area').css({"margin-left":"0"},0);
                });
                aiindex=0;
            }else{
                $('.aiwork-area').animate({marginLeft:-$('.aiwork').outerWidth()*(aiindex)},600);
            }
            aiindex++;
        }else{
            if(aiindex==$('.aiwork').length-4){
                $('.aiwork-area').animate({marginLeft:-$('.aiwork').outerWidth()*(aiindex)},function(){
                    console.log(aiindex);
                    $('.aiwork-area').css({"margin-left":"0"},0);
                });
                aiindex=0;
            }else{
                $('.aiwork-area').animate({marginLeft:-$('.aiwork').outerWidth()*(aiindex)},600);
            }
            aiindex++;
        }
    };
    // 鼠标经过时
    //$(".aiwork-area").hover(function(){
    //    clearInterval(aitimerId);
    //    $(".aiclose").fadeIn(300);
    //},function(){
    //    $(".aiclose").fadeOut(300);
    //    aitimerId=setInterval(ailunbo,2000);
    //});
    var index;
    $(".aiwork").hover(function(){
        clearInterval(aitimerId);
        index=$(this).index(".aiwork");
        $(".aiwork .ai-mask").slideDown();
        $($(".aiwork .ai-mask")[index]).slideUp();
    },function(){
        $(".aiwork .ai-mask").finish();
        $(".aiwork .ai-mask").slideDown();
        aitimerId=setInterval(ailunbo,2000);
    });















    // pswork 大图预览(轮播)
    $(".gallery-ps").click(function(){
        $(".ps").css({display:"block"});
        pstimerId=setInterval(pslunbo,2000);
        $(".content-con").hide();
    });
    var psi= 0,pstimerId;
    pslunbo=function(){
        $(".pswork").removeClass("psworkshow");
        if(psi==$(".pswork").length){
            psi=0;
        }
        $($(".pswork")[psi]).addClass("psworkshow");
        psi++;
    };

    // 鼠标经过时
    $(".pswork-area").hover(function(){
        clearInterval(pstimerId);
        $(".psbtn").fadeIn(100);
    },function(){
        if(document.getElementsByClassName("ps")[0].style.display=="block"){
            pstimerId=setInterval(pslunbo,2000);
        }
        $(".psbtn").fadeOut(100);
    });
    // 左键
    $(".psleftbtn").click(function(){
        clearInterval(pstimerId);
        $(".pswork").removeClass("psworkshow");
        if(psi==0){
            psi=$(".pswork").length-1;
        }
        $($(".pswork")[psi]).addClass("psworkshow");
        psi--;
    });
    // 右键
    $(".psrightbtn").click(function(){
        clearInterval(pstimerId);
        $(".pswork").removeClass("psworkshow");
        psi++;
        if(psi==$(".pswork").length){
            psi=0;
        }
        $($(".pswork")[psi]).addClass("psworkshow");

    });
    // 关闭
    $(".psclose").click(function(){
        $(".detail").hide();
        $(".content-con").show();
        clearInterval(pstimerId)
    });




        //----------------------------------------------------------------
        // aiwork 大图预览轮播
        //$(".gallery-ai").click(function(){
        //    $(".ai").show();
        //    aitimerId=setInterval(ailunbo,2000);
        //    $(".content-con").hide();
        //});
        //var aii= 0,aitimerId;
        //ailunbo=function(){
        //    $(".aiwork").removeClass("aiworkshow");
        //    if(aii==$(".aiwork").length){
        //        aii=0;
        //    }
        //    $($(".aiwork")[aii]).addClass("aiworkshow");
        //    aii++;
        //};
        //// 鼠标经过时
        //$(".aiwork-area").hover(function(){
        //    clearInterval(aitimerId);
        //    $(".aibtn").fadeIn(100);
        //},function(){
        //    $(".aiclose").fadeOut(300);
        //    if(document.getElementsByClassName("ai")[0].style.display=="block"){
        //        aitimerId=setInterval(ailunbo,2000);
        //    }
        //});
        //// 左键
        //$(".aileftbtn").click(function(){
        //    clearInterval(aitimerId);
        //    $(".aiwork").removeClass("aiworkshow");
        //    if(aii==0){
        //        aii=$(".aiwork").length-1;
        //    }
        //    $($(".aiwork")[aii]).addClass("aiworkshow");
        //    aii--;
        //});
        //// 右键
        //$(".airightbtn").click(function(){
        //    clearInterval(aitimerId);
        //    $(".aiwork").removeClass("aiworkshow");
        //    aii++;
        //    if(aii==$(".aiwork").length){
        //        aii=0;
        //    }
        //    $($(".aiwork")[aii]).addClass("aiworkshow");
        //});
        //// 关闭
        //$(".aiclose").click(function(){
        //    $(".detail").hide();
        //    $(".content-con").show();
        //    clearInterval(aitimerId)
        //});
































})