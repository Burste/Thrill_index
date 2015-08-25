$(function () {

    var $loading = $("#loading"),
        $skip = $("#skip"),
        $loadingBlock = $("#loadingBlock"),
        loadState = false,
        nowSec = 0,
        $viewHight = $('.viewHeight');

    var nowInterval = setInterval(function () {
        if (nowSec > 6 && loadState == false) {
            $loading.append(".");
        } else if (nowSec > 9 && loadState == true) {
            $viewHight.show();
            clearInterval(nowInterval);
            $loadingBlock.slideUp("slow");
        }
        nowSec++;
    }, 1000);


    //    圖片載入監控
    $viewHight.imagesLoaded()
        .fail(function () {
            console.log('all images loaded, at least one is broken');
        })
        .always(function (instance) {
            // console.log('all images successfully loaded');
            $skip.show();
            loadState = true;
            $loading.html("loading complete");

            //        開始執行preload
            $.preload("../images/poli1.png", function () {
                var stroyNum = stories.length;
                for (i = 0; i < stroyNum; i++) {
                    $.preload(stories[i].edImg, stories[i].opImg);
                }
            });

        });

    $skip.click(function () {
        $viewHight.show();
        clearInterval(nowInterval);
        $loadingBlock.slideUp("slow");
    });


})
