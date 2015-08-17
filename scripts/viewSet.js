$(function () {
    //圖片遇載
    $.preload("../images/poli1.png", function () {
        var stroyNum = stories.length;
        for (i = 0; i < stroyNum; i++) {
            $.preload(stories[i].edImg,stories[i].opImg);
        }
    });



    viewAct();

    browserDetect();

    function viewAct() {

        var vw = window.innerWidth,
            vh = window.innerHeight;

        function vhSet(target, persent) {
            $(target).css({
                height: persent * vh
            })
        }

        function vwSet(target, persent) {
            $(target).css({
                width: persent * vw
            })
        }

        if (vw > vh) {
            land();
        } else {
            prot();
        }

        function land() {
            vhSet("body", 1);
            vwSet("body", 1);
        };

        function prot() {
            vwSet("body", 1);
            $("#thrillSlide,#authorSlide").show();
            $("#bgImg").hide();
        };

    };


    //    resize
    $(window).resize(function () {
        viewAct();
    })



    //    瀏覽器偵測
    function browserDetect() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //            alert("未提供最佳閱讀品質，抱歉目前不提供手機裝置瀏覽。");
        } else if (/Firefox|MSIE|Trident\/7\./i.test(navigator.userAgent)) {
            $(".folder_tag").css({
                height: "8rem"
            });
            $(".folder_tag>p").addClass("shitFirefox");
        } else {

        }
    }


})
