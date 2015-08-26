$(function () {

    //    alert(stories.length);

    var stroyNum = stories.length;

    //    故事選單讀取
    var $storyUl = $("#storyUl"),
        $slogan = $(".slogan");

    for (i = 0; i < stroyNum; i++) {
        if (stories[i].active == true) {
            $storyUl.append("<li class='storiesLi storyAct'>" + stories[i].name + "</li>");
        } else {
            $storyUl.append("<li class='storiesLi storyDis'>" + stories[i].name + "</li>");
        }
    }

    $("li:first").addClass("storySelect");

    //    故事初始化
    storyCall(0);

    //    故事呼叫
    function storyCall(Vol) {
        var thisStory = stories[Vol];
        $("#bgImg").attr("src", thisStory.edImg);
        $("#slideImg").attr("src", thisStory.opImg);
        $("#introBox").html(thisStory.intro);

        var chapterNum = thisStory.chapter.length,
            $chapter_Ul = $("#chapter_Ul");

        $chapter_Ul.empty();

        for (i = 0; i < chapterNum; i++) {
            $chapter_Ul.append("<li class='chapterLi'><a href='./" + thisStory.file + "/" + thisStory.chapter[i].fileName + "'>" + thisStory.chapter[i].chapterName + "</a></li>");
        }
    }

    //    故事切換
    $("#storyUl > .storyAct").click(function () {
        $(this).addClass("storySelect").siblings().removeClass("storySelect");
        var Vol = $(this).index() - 1;
        storyCall(Vol);
    })

    //召喚
    function reSummon(SB, SO, CalorClo) {
        SB.addClass("summonAct").before(SB.clone(true)).last().remove();
        if (CalorClo == "call") {
            SO.addClass("summonOut");
        } else {
            SO.removeClass("summonOut");
        }
    }

    var $bgImg = $("#bgImg"),
        $stUlBox = $("#stories_UlBox"),
        $chapterNav = $(".chapterNav"),
        $introBox = $("#introBox"),
        $TSandAS = $("#thrillSlide,#authorSlide"),
        $SSsSO = $('#storySlide>.slideOut');
    //開始故事選單
    function storyStart() {
        $TSandAS.hide();
        $bgImg.fadeTo(1000, 0.8);
        var $SSsSB = $("#storySlide>.summonBox");
        reSummon($SSsSB, $SSsSO, "call");
        $stUlBox.addClass("sUlBoxAct");
        $chapterNav.addClass('chapterAct');
        $introBox.delay(4000).fadeIn(1000);
    }
    //結束故事選單
    function storyReset() {
        var $SSsSB = $("#storySlide>.summonBox");
        reSummon($SSsSB, $SSsSO, "close");
        $bgImg.delay(1500).fadeOut(1500);
        $stUlBox.removeClass("sUlBoxAct");
        $chapterNav.removeClass('chapterAct');
        $introBox.fadeOut(500);
    }





    var $thrillSlide = $("#thrillSlide"),
        $TSsSO = $('#thrillSlide>.slideOut');
    //開始about Trill
    function thrillCall(delaySec) {
        var $TSsSB = $("#thrillSlide>.summonBox");
        $thrillSlide.delay(delaySec).show(function () {
            reSummon($TSsSB, $TSsSO, "call");
        });
    }

    //結束about Trill
    function thrillReset() {
        var $TSsSB = $("#thrillSlide>.summonBox");
        reSummon($TSsSB, $TSsSO, "close");
    }




    var $authorSlide = $("#authorSlide"),
        $ASsSO = $('#authorSlide>.slideOut');

    //開始about Author
    function authorCall(delaySec) {
        $authorSlide.delay(delaySec).show(function () {
            var $ASsSB = $("#authorSlide>.summonBox");
            reSummon($ASsSB, $ASsSO, "call");
        });
    }

    //結束about Author
    function authorReset() {
        var $ASsSB = $("#authorSlide>.summonBox");
        reSummon($ASsSB, $ASsSO, "close");
    }



    var $folders = $(".folder");

    var $folder = $("#folderUl").find("li");

    //0:展開,1:thrill介紹,2:故事介紹,3:作者介紹
    var folderState = 0;

    function stateProtect(nowState) {
        folderState = 5;
        setTimeout(function () {
            folderState = nowState;
        }, 2000)
    }


    $returnBtm = $("#returnBtm");

    $returnBtm.click(function () {
        $slogan.delay(3000).fadeIn(1500);
        folderState = 0;
        authorReset();
        storyReset();
        thrillReset();
        $(this).hide(500, function () {
            $folders.removeClass("folderAct");
        });
    });

    var clickType = 'click';
    if (/iPad/i.test(navigator.userAgent)){
        clickType = 'click touchstart';
    }


    $folders.bind(clickType,function () {
        $slogan.fadeOut();



        var folderSelection = $(this).index() + 1;
        //資料夾展開時
        if (folderState == 0) {
            $folders.addClass("folderAct");
            $returnBtm.show();
        }


        //關於Thrill
        //        folderSelection 1:Thrill 2:stories 3:author
        //        folderState 0:開頭 1:Thrill 2:stories 3:author
        if (folderState == 0) {
            switch (folderSelection) {
            case 1:
                thrillCall(0);
                stateProtect(1);
                break;
            case 2:
                storyStart();
                stateProtect(2);
                break;
            case 3:
                authorCall(0);
                stateProtect(3);
                break;
            }

        } else if (folderState == 5) {

        } else {
            if (folderSelection != folderState) {
                switch (folderSelection) {
                case 1:
                    authorReset();
                    storyReset();
                    thrillCall(1500);
                    stateProtect(1);
                    break;
                case 2:
                    storyStart();
                    stateProtect(2);
                    break;
                case 3:
                    thrillReset();
                    storyReset();
                    authorCall(1500);
                    stateProtect(3);
                    break;
                }
            }
        }

    });

})
