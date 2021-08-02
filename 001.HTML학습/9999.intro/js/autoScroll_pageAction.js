// 자동 스크롤 기능 - autoScroll_pageAction.js

///// 전역변수구역 ///////////////////
// 현재 페이지 번호
let pno = 0;
// 전체 페이지 개수(상수로 변경불가!)
const totnum = 4;
// 광스크롤막기(0-허용,1-불허용)
let psts = 0;

////////////////////////////////////
// 초기화함수
let init;
// 페이지액션함수
let pageAction;
/////////////////////////////////////

$(function () { /// jQB ////////////////////////


    $("html,body").animate({
        scrollTop: "0px"
    }, 100, "easeOutQuint");

    /*//////////////////////////////////////////
        함수명: init(전역변수구역에 선언!)
        기능: 각 페이지액션 대상 요소 초기화
    */ //////////////////////////////////////////
    init = function () {

        // 호출확인
        // console.log("초기화!");

        // HOME
        $(".slidebox1").css({
            minHeight: "0vh"
        }); ///////// css ///////////

        // Contact
        $("#pg4,.minfo").css({
            left: "150%"
        }); ///////// css ///////////


    }; ///////////// init함수 ///////////////////
    ////////////////////////////////////////////

    // init함수 최초호출!(함수아래서호출)
    init();

    /*/////////////////////////////////////////////
        함수명: pageAction(전역변수구역에 선언)
        기능: 각 페이지 도착시 요소 등장액션 실행
    */ /////////////////////////////////////////////
    pageAction = function () {

        // 호출확인
        // console.log("액션!");

        init(); // 초기화호출!


        // HOME
        if (pno === 0) {
            $(".slidebox1").delay(5000)
                .animate({
                    minHeight: "30vh"
                },7000, "easeInSine")
        } ////// if ///////////////
        

        // Contact
        else if (pno === 3) {
            $("#pg4 .minfo")
                .animate({
                    left: "50%"
                }, 800, "easeInSine"); //// animate ///;
        } ////// else if ///////////////


        // 위로이동 TOP버튼
        if (pno === 0) $(".tbtn").fadeOut(200);
        else $(".tbtn").fadeIn(200);


    }; ////////// pageAction함수 ///////////////////
    ////////////////////////////////////////////////

    function pageAction2() {
        if (pno === 1) {
            pFn(0, 94);
            pFn(1, 89);
            pFn(2, 79);
            pFn(3, 84);

        } else {
            $(".c1").attr("style", "");
            $(".ptxt").text("");
        }


    } /////////// pageAction2 ////////////////


    // pageAction함수 최초호출!
    pageAction();


    /////////////// 자동스크롤 구현 ////////////////////
    // 사용메서드: on(이벤트명, 함수) 
    $(document).on("mousewheel DOMMouseScroll",
        function (e) { //e-이벤트 전달변수


            ////// 광스크롤막기 /////////////
            if (psts) return; //돌아가!
            psts = 1; //불허용상태변경!
            setTimeout(() => {
                psts = 0;
            }, 1000);
            // 1.2초애니시간후 허용상태변경 //



            //////////////////////////////
            // 1. 마우스휠 방향 알아내기!///
            //////////////////////////////

            e = window.event || e;

            let delta = e.detail ? e.detail : e.wheelDelta;

            // console.log("휠델타정보:"+delta);

            ///////////////////////////////////////////
            ///// 파이어폭스 일때 델타값 반대로 하기 /////

            // // console.log("브라우저정보:"+navigator.userAgent);
            // // console.log("정보여부:"+
            // (/Firefox/i.test(navigator.userAgent)));

            //// 파이어폭스 브라이우저 이면 델타값 부호를 반대로 한다!!!
            if (/Firefox/i.test(navigator.userAgent)) {
                delta = -delta; // 변수앞에 마이너스는 부호반대!
            } ///////// 파이어폭스여부 if문 /////////////



            //////////////////////////////////////////////
            // 2. 마우스휠 방향에 따라 페이지번호 증감하기!//
            //////////////////////////////////////////////

            // 페이지 액션 함수 호출여부
            let callFn = 1; //1-허용,0-불허용

            if (delta < 0) { // -120 아랫방향 스크롤(다음페이지)
                pno++;
                if (pno === totnum) {
                    pno = totnum - 1;
                    callFn = 0;
                } else {
                    callFn = 1;
                }
                // 마지막페이지에 고정하기!
            } ////// if ///////////
            else { // 120 윗방향 스크롤(이전페이지)
                pno--;
                if (pno === -1) {
                    pno = 0;
                    callFn = 0;
                } else {
                    callFn = 1;
                }
                // 첫페이지에 고정하기!
            } /////// else ////////

            // console.log("페이지번호:" + pno);



            //////////////////////////////////////////////
            // 3. 이동할 페이지(.page)의 위치값 알아내기 ///
            //////////////////////////////////////////////

            // 방법: .page의 순서로 위치를 알아냄!
            let pos = $(".page").eq(pno).offset().top;
            // offset().top 은 현재 선택요소의 top위치값

            // console.log("이동위치:" + pos);



            //////////////////////////////////////////////
            // 4. 실제 이동위치로 스크롤 애니메이션 하기 ////
            //////////////////////////////////////////////

            $("html,body").stop().animate({
                scrollTop: pos + "px"
            }, 800, "easeOutQuint",pageAction2);
            // 애니메이션 이동후 pageAction함수 호출하기!!!

            if (callFn) pageAction();


            
            ///////////////////////////////////////////////
            // 5. 페이지번호(pno)에 맞는 GNB 메뉴 변경하기 //
            ///////////////////////////////////////////////
            // 변경대상: .gnb li, .indic li
            $(".gnb li").eq(pno).addClass("on")
                .siblings().removeClass("on");
            $(".indic li").eq(pno).addClass("on")
                .siblings().removeClass("on");
            // 선택된 li 이외의 li형제들 class="on"제거하기



        }); //////////// 자동스크롤 /////////////////////////
    ///////////////////////////////////////////////////


}); //////////////// jQB /////////////////////