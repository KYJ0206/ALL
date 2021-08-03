// 마이아이템 회원가입 페이지 JS - member.js

$(function () { //// jQB ///////////////////////////////////

    ///////////////////////////////////////////////////////
    ////// 약관동의 전체 체크시 모든 체크박스 변경하기 ///////
    ///////////////////////////////////////////////////////
    // 체크박스 체크시 발생하는 이벤트는? change
    // 대상: 모두 동의 체크박스 -> #chk_all
    let chkall = $("#chk_all");
    // 개별체크박스
    let chkeach = $(".chk");

    chkall.change(function () {

        // 1. 체크박스 체크여부 확인하기
        let chk = $(this).prop("checked");
        // prop(속성명) -> attr(속성명)과 유사함(단, 리턴값이 다름!)
        // prop(속성명) 메서드는 제대로된 return값 true/false를 가져옴
        console.log("전체동의상태:" + chk);

        // 2. 전체체크박스가 체크상태(true)이면 개별체크도 모두 true
        //      미체크상태(false)이면 개별체크도 모두 false!
        // -> 개별체크박스는 모두 .chk 이므로 한번에 체크가능!
        chkeach.prop("checked", chk);
        // prop(속성명,속성값)
        // prop("checked", true/false) -> 체크를 하거나 안함!
        // attr(속성명,속성값) 을 사용해도됨! (값설정은 됨)


    }); ///////// change 함수 //////////////////
    ////////////////////////////////////////////

    //// 개별 체크박스 체크 변경시 전체 체크박스 변경하기 /////
    /// 원리: 개별체크박스가 모두 체크되면 전체체크에 체크하기!
    // 대상: .chk
    chkeach.change(function () {

        // 1. 체크개수 알아오기
        let num = $(".chk:checked").length;
        // console.log("몇개체크?"+num);

        // 2. 체크개수가 3일때만 전체체크박스 체크하기
        if (num === 3) chkall.prop("checked", true);
        else chkall.prop("checked", false);

    }); ///////////// change 함수 ///////////////////
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    /////// 동의/비동의 버튼 클릭시 처리하기 //////////
    ////////////////////////////////////////////////
    // 대상: .YNbox button
    $(".YNbox button").click(function () {

        // 1. 버튼종류 구분하기 : is("#btnY") 동의버튼이냐?
        let wbtn = $(this).is("#btnY");
        // console.log("동의버튼?"+wbtn);

        // 2. 동의버튼일 경우 : 처음 2가지 체크박스 모두체크확인
        if (wbtn) {

            /// 필수항목에 모두 체크된 경우 /////////////////
            if ($("#termsService").prop("checked") &&
                $("#termsPrivacy").prop("checked")) {

                // 동의/비동의 박스 숨기기
                $("#conf").fadeOut(300);

            } ////////// if문 /////////////////////////////
            else { // 필수체크가 안된경우 //////////////////

                alert("모든 필수항목에 체크하여야 합니다!");

            } //////// else문 //////////////////////////////

        } ///////////// if문 ///////////////

        //// 3. 비동의 버튼일 경우 ///////////////////////////////
        else {

            // 메시지
            alert("비동의 하였으므로 메인 페이지로 이동합니다!");

            // 페이지이동
            location.href = "index.html";

        } //////////// else문 //////////////////////////////////

    }); ////////////// click ////////////////////////
    /////////////////////////////////////////////////



    /* 
        [ 입력폼의 유효성 검사 ]
        - 검사원리 : 
        입력창에 클릭 또는 탭하여 입력 가능상태(커서가 깜박이는 상태)를
        포커스 상태라고 함. 이벤트로는 focus 이벤트임!
        이 포커스 상태에서 다른 부분을 클릭(탭)되면 포커스가 풀리게됨
        이 상태를 블러(blur)상태로고 함!
        이렇게 이벤트가 블러로 발생할때 유효성 검사를 시행함!
        - 이벤트 대상선정: 입력요소 중 input type이 text,password
            input[type=text],input[type=password]
            (유의사항: type=text인요소 중 아이디가 email2는 검사에서 제외함!)
            제외하기 위한 선택자 : input[type=text][id!=email2]
        - 제이쿼리 사용 메서드 : blur() 메서드
    */
    $("input[type=text][id!=email2],input[type=password]")
        .blur(function () {

            // 1. 블러가 발생한 아이디 알아오기
            let cid = $(this).attr("id");

            // 2. 입력된 값 알아오기 : val() 메서드
            let cv;
            // trim() 메서드 : 앞뒤공백제거+공백만 있어도 제거
            if (cid === "mnm") cv = $(this).val().trim();
            // 이름만 앞뒤공백만제거 -> trim() -> 내장함수
            else cv = groSpace($(this).val());
            // 나머지는 모든공백제거 -> groSpace() -> 구현함수

            // 공백 제거된 값을 다시 입력항목에 넣기!-> 서비스!
            $(this).val(cv);

            // //console.log("블러!" + cid + ":" + cv);

            // 3. 빈값일 경우 "필수입력" 메시지 띄우기!!!
            if (cv === "") {
                $(this).siblings(".msg")
                    .text("필수입력!")
                    .removeClass("on"); // 글자색 변경 제거

                // 통과여부 false
                pass = false;

            } //////////// if문 : 빈값일때 ///////////////

            // 4. 아이디일때 검사하기 /////////////////////
            else if (cid === "mid") {
                // 유효성 검사결과
                let res = vReg(cv, cid);
                //console.log("검사결과:" + res);

                // 결과가 false일 경우 메시지 띄우기
                if (!res) { // !(NOT연산자)로 결과 반대

                    $(this).siblings(".msg")
                        .text("영문자로 시작하는 6~20글자 영문자/숫자")
                        .removeClass("on"); //글자색 변경 제거

                    // 통과여부 false
                    pass = false;

                } /////////// if문 : 결과 false ////////
                else {
                    /* 
                        [ AJAX로 중복아이디 검사하기! ]
                        ajax처리 유형 2가지
                        
                        1) post 방식 처리 메서드
                        - $.post(URL,data,callback)
                        2) get 방식 처리 메서드
                        - $.get(URL,callback)
                        3) 위의 2가지 유형 중 선택처리 메서드
                        - $.ajax(URL,TYPE,DATA,DATA TYPE,ASYNC옵션,SUCCESS,ERROR)
                        - 상세 파라미터값:
                        $.ajax(
                            전송할 페이지,
                            전송방식(GET/POST),
                            보낼데이터,
                            전송할 데이터 타입,
                            ASYNC옵션(보통은 false),
                            결과값 리턴함수,
                            에러처리함수
                        )
                    */




                    $(this).siblings(".msg")
                        .text("훌륭한 아이디네요~!")
                        .addClass("on"); //글자색 변경 클래스
                } ////////// else문 : 결과 true ////////

            } /////////// else if문 : 아이디일때 //////////

            // 5. 비밀번호일때 검사하기 /////////////////////
            else if (cid === "mpw") {
                // 유효성 검사결과
                let res = vReg(cv, cid);
                //console.log("검사결과:" + res);

                // 결과가 false일 경우 메시지 띄우기
                if (!res) { // !(NOT연산자)로 결과 반대

                    $(this).siblings(".msg")
                        .text("특수문자,문자,숫자포함 형태의 5~15자리");

                    // 통과여부 false
                    pass = false;

                } /////////// if문 : 결과 false ////////
                else { // 통과시 내용비우기 - empty()

                    $(this).siblings(".msg").empty();

                } ////////// else문 : 결과 true ////////

            } //////////// else if문 : 비밀번호일때 /////////

            // 6. 비밀번호확인 검사하기 /////////////////////
            else if (cid === "mpw2") {

                // 비밀번호입력값과 불일치하면 메시지 출력
                if (cv !== $("#mpw").val()) {

                    $(this).siblings(".msg")
                        .text("비밀번호가 일치하지 않습니다!");

                    // 통과여부 false
                    pass = false;

                } /////////// if문 : 결과 false ////////
                else { // 통과시 내용비우기 - empty()

                    $(this).siblings(".msg").empty();

                } ////////// else문 : 결과 true ////////

            } //////////// else if문 : 비밀번호확인일때 /////////

            // 7. 이메일 입력창일 경우 이메일 검사하기 ///////////
            else if (cid === "email1") {

                // 이메일 주소 만들기
                let comp =
                    eml1.val() + "@" +
                    (seleml.val() === "free" ? eml2.val() : seleml.val());
                // 비?집:놀이동산; -> 직접입력이면 eml2값으로 검사
                // //console.log("결과:"+comp);

                // 이메일 검사처리함수 호출!
                resEml(comp);

            } //////////// else if문 : 이메일항목일때 ///////////

            // 8. 별도의 검사가 필요없는 경우 빈값 메시지 지우기 ///
            else {
                $(this).siblings(".msg").empty();
            } ///////////// else문 : 빈값이 아닐때 ///////////////


        }); ////////// 블러 이벤트 함수 /////////////////////////
    ////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////
    ////////////// 이메일 검사 결과처리함수 ///////////////////
    /////////////////////////////////////////////////////////
    let resEml = comp => { // comp - 조합된 이메일주소

        // 1. 이메일 정규식 검사하기!
        let res = vReg(comp, "eml");
        // //console.log("이멜검사결과:" + res);

        // 2. 이메일 검사결과 메시지 출력하기
        if (res) { // 통과시 /////////////////////////

            eml1.siblings(".msg")
                .text("적합한 이메일 형식입니다!")
                .addClass("on"); //글자색 변경

        } ///////// if문 : 결과가 true일때 //////////
        else { // 불통과시 /////////////////////////

            eml1.siblings(".msg")
                .text("맞지않는 이메일 형식입니다")
                .removeClass("on"); //글자색 복원

            // 통과여부 false
            pass = false;

        } ///////// else문 : 결과가 false일때 ////////

    }; ///////////////// resEml 함수 ////////////////////////
    /////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////
    ///////////// 키보드 입력시 이메일 체크하기 //////////////
    ////////////////////////////////////////////////////////
    // 키보드 관련 이벤트 종류: keypress, keyup, keydown
    // 1. keypress : 키가 눌려졌을때
    // 2. keyup : 키가 눌렸다가 올라올때
    // 3. keydown : 키가 눌려져 내려갈때
    // 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를 써야할까?
    // -> 현재 입력된 문자를 바로 반영하려면 "keyup" 이벤트사용!

    // 이메일 앞주소
    let eml1 = $("#email1");
    // 이메일 뒷주소
    let eml2 = $("#email2");
    // 이메일 선택박스
    let seleml = $("#seleml");

    // 이벤트 대상: #email1, #email2 ////////////
    $("#email1, #email2").on("keyup", function () {

        // 1. 현재 이벤트 대상 아이디 읽어오기
        let cid = $(this).attr("id");

        // 2. 현재 입력된 값 읽어오기
        let cv = $(this).val();

        // //console.log(cid + ":" + cv);

        // 3. 이메일 뒷주소 셋팅하기
        let backeml =
            cid === "email1" ?
            seleml.val() : eml2.val();
        // 조건연산자로 선택박스값 또는 직접입력값을 할당한다!
        // 비?집:놀이동산;

        // 4. 선택박스의 값이 "free"(직접입력)이면 이메일 뒷주소변경
        if (seleml.val() === "free") backeml = eml2.val();

        // 5. 이메일 전체주소 조합하기!
        let comp = eml1.val() + "@" + backeml;
        // //console.log("이멜주소:" + comp);

        // 6. 이메일 검사 결과처리함수 호출!
        resEml(comp);

    }); ////////////// 키보드 이벤트 함수 ///////////////////
    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    /////////// 선택박스 변경시 이메일 검사하기 ///////////////
    /////////////////////////////////////////////////////////
    // 검사시점: 선택박스 변경할때
    // 이벤트: change
    // 이벤트 대상: #seleml -> seleml변수
    seleml.change(function () {

        // 1. 선택박스의 변경된 값 읽어오기
        let cv = $(this).val();
        //console.log("선택값:" + cv);

        // 2. 선택옵션별 분기문
        if (cv === "init") { //"선택해주세요" 선택시
            // 메시지 출력
            eml1.siblings(".msg")
                .text("이메일 옵션 선택필수!")
                .removeClass("on"); //글자색 복원

            // 직접입력창 숨기기
            eml2.fadeOut(300);

        } /////////////// if문 ///////////////////
        else if (cv === "free") { //"직접입력" 선택시

            // 직접입력창 보이기
            eml2.fadeIn(300);

            // 이메일 주소 만들기
            let comp = eml1.val() + "@" + eml2.val();

            // 이메일 검사처리함수 호출
            resEml(comp);

        } /////////////// else if문 //////////////
        else { // 이메일 검사하기 ////

            // 1. 직접입력창 숨기기(나와있을 수 있음)
            eml2.fadeOut(300);

            // 2. 이메일 전체주소 조합하기!
            let comp = eml1.val() + "@" + cv;
            // //console.log("이멜주소:" + cv);

            // 3. 이메일 검사 결과처리함수 호출!
            resEml(comp);


        } ///////////////// else문 //////////////////

    }); ////////////// change 이벤트 함수 /////////////////////
    //////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////
    /////////// 가입하기(submit) 버튼 클릭시 처리하기 //////////
    //////////////////////////////////////////////////////////
    // 전체검사의 원리:
    // 전역변수 pass를 설정하여 true를 주고
    // 검사 중간에 문제가 생기면 false로 변경하여
    // 유효성검사 통과여부를 판단한다!
    //////////////////////////////////////////////////////////
    let pass; // 검사용변수
    $("#btnj").click(function (e) {

        // 1. 서브밋 기능막기
        e.preventDefault();

        // 2. pass 통과여부 변수에 true설정하기
        pass = true;

        // 3. 입력창  blur이벤트 발생시키기(전체검사)
        // 대상: input[type=text][id!=email2],input[type=password]
        // 이벤트발생 메서드: trigger(이벤트명)
        $("input[type=text][id!=email2],input[type=password]")
            .trigger("blur");

        // console.log("통과여부:" + pass);

        // 4. 검사 결과에 따라 메시지 보이기 및 처리 ////
        if (pass) { // 통과시 

            /* 
                [ ajax를 이용한 POST방식으로 DB에 데이터 입력하기 ]
                AJAX = Asynchronous Javascript and XML
                - 비동기통신이란? 쉽게 말해서 페이지가 새로 고쳐지지
                않고 그대로 있으면서 서버통신을 하는 것을 말한다!
                - 제이쿼리는 POST방식으로 ajax할 수 있다
                $.post(URL,data,callback);
                $.post(전송할 페이지주소,전송할 데이터,전송후 실행함수);
            */
            //////////////// ajax post 메서드 ////////////////
            $.post(
                // 1.전송할 페이지주소
                "process/ins.php",
                // 2.전송할 데이터
                {
                    // 1.아이디
                    "mid": $("#mid").val(),
                    // 2.비번
                    "mpw": $("#mpw").val(),
                    // 3.이름
                    "mnm": $("#mnm").val(),
                    // 4.성별
                    "gen": $(":radio[name=gen]:checked").val(),
                    // 5-1.이메일 앞주소
                    "email1": $("#email1").val(),
                    // 5-2.이메일 뒷주소
                    "seleml": $("#seleml").val(),
                    // 5-3.직접입력 이메일 뒷주소
                    "email2": $("#email2").val()
                },
                // 3. 전송후 실행함수
                function (res) { // res는 결과값
                    if (res === "ok") {
                        // 메시지 띄우기
                        alert("회원가입을 축하드립니다~! 짝짝짝!");

                        // 로그인 페이지로 이동
                        location.replace("login.php");
                        // location.href 뒤로가기 시 history가 살아있어서 보안상
                        // 문제가 될 수 있다!!!
                        // 따라서 현재페이지를 덮어쓰는 이동방법을 써야한다!
                        // -> location.replace(url주소)
                        // : 이 메서드는 페이지 캐싱을 지우고 이동하기 때문에
                        // 이전 페이지로 갈 수 없다!(회원가입 페이지를 볼 수 없음)

                    } /////// 성공시 if문 ///////
                    else {
                        // 메시지 띄우기
                        alert(res);
                        //alert("입력시 에러가 발생하였습니다!\n관리자에게 문의해주세요!");
                    } ///// 실패시 else문 ///////

                } /////////// 전송후 실행함수 //////

            ); //////////////// ajax post 메서드 ////////////////
            ///////////////////////////////////////////////////




        } /////////// if 문 //////////////////
        else { // 불통과시

            alert("입력을 수정하세요!");

        } //////////// else문 ///////////////


    }); ///////////////// 서브밋버튼 함수 /////////////////////
    //////////////////////////////////////////////////////////



}); ////////////// jQB //////////////////////////////////////
/////////////////////////////////////////////////////////////

/*//////////////////////////////////////////////////////
    함수명: groSpace
    기능: 문자의 모든 공백을 제거하여 리턴함
*/ //////////////////////////////////////////////////////
function groSpace(val) { // val - 전달변수(처리할값)
    // 정규식 문법 - 슬래쉬 사이에 표현함
    // \s 스페이스를 의미, g - 전역플래그(모두찾음)
    let newval = val.replace(/\s/g, "");
    return newval; // 호출한 곳으로 값을 가져감!
} ////////////// groSpace함수 ///////////////////////////
/////////////////////////////////////////////////////////

/*////////////////////////////////////////////////////////
    함수명: vReg
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*/ ////////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // //console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드 
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!

} //////////// vReg 함수 //////////////////////////////////
///////////////////////////////////////////////////////////