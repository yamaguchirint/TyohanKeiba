let a_oe_input = 0, b_oe_input = 0, c_oe_input = 0;
let a_oe_out = 0, b_oe_out = 0, c_oe_out = 0;
let select_cup = ["n", "n", "n"];
let ticket_type = 0, bet_value = 0;
let status_count = 0, back_money = 0;
let wallet = 3000;
let isSelect = false, isWin = true, isResult = false, isPrepHukusyo = false;

function ButtonPUSH(bt) {
    let i = 0;

    var ticket_type_obj = document.getElementById("TicketType");
    var wallet_obj = document.getElementById("wallet");
    var bet_money_obj = document.getElementById("Bet_Money");
    var back_money_obj = document.getElementById("Back_Money");
    var start_button = document.getElementById("StartButton");

    var a_oe_text_input = document.getElementById("oe_a");
    var b_oe_text_input = document.getElementById("oe_b");
    var c_oe_text_input = document.getElementById("oe_c");
    var a_oe_text_out = document.getElementById("oe_a_out");
    var b_oe_text_out = document.getElementById("oe_b_out");
    var c_oe_text_out = document.getElementById("oe_c_out");

    var cup_a_img = document.getElementById("cup_image_a");
    var cup_b_img = document.getElementById("cup_image_b");
    var cup_c_img = document.getElementById("cup_image_c");

    var dice_a_l = document.getElementById("dice_a_1");
    var dice_a_r = document.getElementById("dice_a_2");
    var dice_b_l = document.getElementById("dice_b_1");
    var dice_b_r = document.getElementById("dice_b_2");
    var dice_c_l = document.getElementById("dice_c_1");
    var dice_c_r = document.getElementById("dice_c_2");

    if (bt === 0) {
        a_oe_input++;
        switch (a_oe_input) {
            case 0:
                a_oe_text_input.innerHTML = "　";
                select_cup[0] = "n";
                break;
            case 1:
                a_oe_text_input.innerHTML = "奇";
                select_cup[0] = "a";
                break;
            case 2:
                a_oe_text_input.innerHTML = "偶";
                a_oe_input = -1;
                select_cup[0] = "a";
                break;
            default:
                a_oe_input = 0;
                select_cup[0] = "n";
                break;
        }
    } else if (bt === 1) {
        b_oe_input++;
        switch (b_oe_input) {
            case 0:
                b_oe_text_input.innerHTML = "　";
                select_cup[1] = "n";
                break;
            case 1:
                b_oe_text_input.innerHTML = "奇";
                select_cup[1] = "b";
                break;
            case 2:
                b_oe_text_input.innerHTML = "偶";
                b_oe_input = -1;
                select_cup[1] = "b";
                break;
            default:
                b_oe_input = 0;
                select_cup[1] = "n";
                break;
        }
    } else if (bt === 2) {
        c_oe_input++;
        switch (c_oe_input) {
            case 0:
                c_oe_text_input.innerHTML = "　";
                select_cup[2] = "n";
                break;
            case 1:
                c_oe_text_input.innerHTML = "奇";
                select_cup[2] = "c";
                break;
            case 2:
                c_oe_text_input.innerHTML = "偶";
                c_oe_input = -1;
                select_cup[2] = "c";
                break;
            default:
                c_oe_input = 0;
                select_cup[2] = "n";
                break;
        }
        //複勝選択
    } else if (bt === 3) {
        if (isPrepHukusyo&&ticket_type===3) {
            console.log("aa");
            ticket_type_obj.value = "三連単";
            ticket_type_obj.style.color = "black";
            ticket_type_obj.style.textDecoration = "underline";
            ticket_type = 3
            bet_value = 3;
            isSelect = true;
            if (parseInt(bet_money_obj.value) > 0) {
                start_button.removeAttribute("disabled");
                start_button.style.color = "red";
            }
        } else if(!isPrepHukusyo&&ticket_type===3){
            isPrepHukusyo = true;
        }

        //決定ボタン押下
    } else if (bt === 4) {

        if ((wallet - parseInt(bet_money_obj.value, 10) < 0) || (wallet < parseInt(bet_money_obj.value, 10)) || ticket_type !== 0) {
            start_button.setAttribute("disabled", true);
            start_button.style.color = "lightgray";
        }
        if (!isResult) {
            wallet -= bet_money_obj.value;
            DiceRandom(cup_a_img, cup_b_img, cup_c_img, a_oe_text_input, b_oe_text_input, c_oe_text_input, dice_a_l, dice_a_r, dice_b_l, dice_b_r, dice_c_l, dice_c_r);
            OeRep(a_oe_text_out, b_oe_text_out, c_oe_text_out);

            if (IsHit()) {
                back_money_obj.innerHTML = back_money = Math.floor(parseInt(bet_money_obj.value, 10) * bet_value);
            } else {
                back_money = 0
            }

            wallet += back_money;
            wallet_obj.innerHTML = wallet;

            //スコアによるおまけ要素
            if (wallet >= 10000) {
                wallet_obj.style.color = "gold";
            }
            if (wallet >= 100000) {
                wallet_obj.style.color = "darkviolet";
            }
            if (wallet >= 1000000) {
                wallet_obj.style.color = "red";
            }

            if (wallet <= 0) {
                isWin = false;
                a_oe_text_out.style.opacity = 1;
                b_oe_text_out.style.opacity = 1;
                c_oe_text_out.style.opacity = 1;

                a_oe_text_out.innerHTML = "ま";
                b_oe_text_out.innerHTML = "け";
                c_oe_text_out.innerHTML = "。";
                start_button.setAttribute("disabled", true);
                start_button.style.color = "lightgray";

            } else {
                start_button.value = "もう一度";
                isResult = true;
            }
        } else {
            back_money_obj.innerHTML = back_money = 0;
            cup_a_img.style.opacity = 1;
            cup_b_img.style.opacity = 1;
            cup_c_img.style.opacity = 1;

            dice_a_l.style.opacity = 0;
            dice_a_r.style.opacity = 0;
            dice_b_l.style.opacity = 0;
            dice_b_r.style.opacity = 0;
            dice_c_l.style.opacity = 0;
            dice_c_r.style.opacity = 0;

            a_oe_text_input.style.opacity = 1;
            b_oe_text_input.style.opacity = 1;
            c_oe_text_input.style.opacity = 1;

            a_oe_text_out.style.opacity = 0;
            b_oe_text_out.style.opacity = 0;
            c_oe_text_out.style.opacity = 0;

            SetImageDice(1, dice_a_l);
            SetImageDice(1, dice_a_r);
            SetImageDice(1, dice_b_l);
            SetImageDice(1, dice_b_r);
            SetImageDice(1, dice_c_l);
            SetImageDice(1, dice_c_r);
            start_button.value = "開始";
            isResult = false;
        }

    } else {
        console.log("oh");
    }


    //おためしコンソール
    console.log(select_cup);
    //console.log("a"+a_oe_input);


    //掛金入力、削除したとき
    bet_money_obj.onkeyup = function () {
        back_money = 0;
        back_money_obj.innerHTML = back_money = 0;
        //back_money_obj.innerHTML+="円";
        if (isSelect) {
            start_button.removeAttribute("disabled");
            start_button.style.color = "red";
            bet_money_obj.style.color = "black";
        } else {
            start_button.setAttribute("disabled", true);
            start_button.style.color = "lightgray";
            bet_money_obj.style.color = "red";
        }

        if (parseInt(bet_money_obj.value, 10) <= 0 || isNaN(parseInt(bet_money_obj.value, 10)) || (wallet < parseInt(bet_money_obj.value, 10)) || wallet - parseInt(bet_money_obj.value, 10) < 0) {
            start_button.setAttribute("disabled", true);
            start_button.style.color = "lightgray";
            bet_money_obj.style.color = "red";
        } else {
            start_button.removeAttribute("disabled");
            start_button.style.color = "red";
            bet_money_obj.style.color = "black";
        }
    };

    //馬券表示入れ替え
    if (isWin)
        TicketReplace(ticket_type_obj, bet_money_obj);
    if (parseInt(bet_money_obj.value) <= 0 || isNaN(parseInt(bet_money_obj.value, 10)) || (wallet < parseInt(bet_money_obj.value, 10))) {
        start_button.setAttribute("disabled", true);
        start_button.style.color = "lightgray";
        bet_money_obj.style.color = "red";
    }

    
    
    //おためしコンソール2
    console.log(ticket_type);
}

function IsHit() {
    if (ticket_type === 3) {
        if (((a_oe_input == a_oe_out) + (b_oe_input == b_oe_out) + (c_oe_input == c_oe_out)) == 3)
            return 1;
        else
            return 0;
    }else if(ticket_type===2){
        if((a_oe_input+b_oe_input+c_oe_input)===(a_oe_out+b_oe_out+c_oe_out)){
            return 1;
        }else{
            return 0;
        }
    }
    if (select_cup[0] === "a")
        return (a_oe_input == a_oe_out);
    else if (select_cup[1] === "b")
        return (b_oe_input == b_oe_out);
    else if (select_cup[2] === "c") {
        return (c_oe_input == c_oe_out);
    } else {
        return 0;
    }
    /*
    switch (select_cup) {
        case "a":
            return (a_oe_input == a_oe_out);
            break;
        case "b":
            return (b_oe_input == b_oe_out);
            break;
        case "c":
            
            break;
        default:
            console.log("ohaaa");
            return 0;
            break;
    }
    */
}

function DiceRandom(cup_a_img, cup_b_img, cup_c_img, a_oe_input_t, b_oe_input_t, c_oe_input_t, dice_a_l, dice_a_r, dice_b_l, dice_b_r, dice_c_l, dice_c_r) {

    let num_a = [0, 0];
    let num_b = [0, 0];
    let num_c = [0, 0];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 2; j++) {
            num_a[j] = Math.floor(Math.random() * 6) + 1;
            num_b[j] = Math.floor(Math.random() * 6) + 1;
            num_c[j] = Math.floor(Math.random() * 6) + 1;
        }
    }

    a_oe_out = num_a[0] + num_a[1];
    b_oe_out = num_b[0] + num_b[1];
    c_oe_out = num_c[0] + num_c[1];

    a_oe_input_t.style.opacity = 0;
    b_oe_input_t.style.opacity = 0;
    c_oe_input_t.style.opacity = 0;

    if (ticket_type === 3||ticket_type===2) {

        cup_a_img.style.opacity = 0;
        cup_b_img.style.opacity = 0;
        cup_c_img.style.opacity = 0;

        SetImageDice(num_a[0], dice_a_l);
        SetImageDice(num_a[1], dice_a_r);
        SetImageDice(num_b[0], dice_b_l);
        SetImageDice(num_b[1], dice_b_r);
        SetImageDice(num_c[0], dice_c_l);
        SetImageDice(num_c[1], dice_c_r);

        EnableDice(dice_a_l, dice_a_r, dice_b_l, dice_b_r, dice_c_l, dice_c_r);

    } else {
        if (select_cup[0] === "a") {
            SetImageDice(num_a[0], dice_a_l);
            SetImageDice(num_a[1], dice_a_r);
            cup_a_img.style.opacity = 0;
            dice_a_l.style.opacity = 1;
            dice_a_r.style.opacity = 1;
        } else if (select_cup[1] === "b") {
            SetImageDice(num_b[0], dice_b_l);
            SetImageDice(num_b[1], dice_b_r);
            cup_b_img.style.opacity = 0;
            dice_b_l.style.opacity = 1;
            dice_b_r.style.opacity = 1;
        } else if (select_cup[2] === "c") {
            SetImageDice(num_c[0], dice_c_l);
            SetImageDice(num_c[1], dice_c_r);
            cup_c_img.style.opacity = 0;
            dice_c_l.style.opacity = 1;
            dice_c_r.style.opacity = 1;
        } else {
            console.log("dicerandom");
        }
    }
}

function TicketReplace(ticket_type_obj, bet_money_obj) {

    back_money = 0;
    let start_button = document.getElementById("StartButton");

    if ((wallet - parseInt(bet_money_obj.value, 10) < 0) || (wallet < parseInt(bet_money_obj.value, 10))) {
        start_button.setAttribute("disabled", true);
        start_button.style.color = "lightgray";
    }
    if (isPrepHukusyo) {
        ticket_type_obj.value = "複勝";
        ticket_type_obj.style.color = "black";
        ticket_type_obj.style.textDecoration = "underline";
        ticket_type = 2
        bet_value = 1.5;
        isSelect = true;
        if (parseInt(bet_money_obj.value) > 0) {
            start_button.removeAttribute("disabled");
            start_button.style.color = "red";
        }
        isPrepHukusyo=false;
    } else if (a_oe_input != 0 && b_oe_input != 0 && c_oe_input != 0) {
        ticket_type_obj.value = "三連単";
        ticket_type_obj.style.color = "black";
        ticket_type_obj.style.textDecoration = "underline";
        ticket_type = 3
        bet_value = 3;
        isSelect = true;
        if (parseInt(bet_money_obj.value) > 0) {
            start_button.removeAttribute("disabled");
            start_button.style.color = "red";
        }
    } else if ((a_oe_input != 0 && c_oe_input != 0) || (a_oe_input != 0 && b_oe_input != 0) || (b_oe_input != 0 && c_oe_input != 0) || (a_oe_input == 0 && b_oe_input == 0 && c_oe_input == 0)) {
        ticket_type_obj.value = "なし";
        ticket_type_obj.style.color = "red";
        ticket_type_obj.style.textDecoration = "none";
        ticket_type = 0;
        bet_value = 0;
        isSelect = false;
        start_button.setAttribute("disabled", true);
        start_button.style.color = "lightgray";
    } else if (a_oe_input != 0 || b_oe_input != 0 || c_oe_input != 0) {
        ticket_type_obj.value = "単勝";
        ticket_type_obj.style.color = "black";
        ticket_type_obj.style.textDecoration = "none";
        ticket_type = 1;
        bet_value = 1.3;
        isSelect = true;
        if (parseInt(bet_money_obj.value) > 0) {
            start_button.removeAttribute("disabled");
            start_button.style.color = "red";
        }
    } else {
        ticket_type_obj.value = "EROOR";
        ticket_type_obj.style.color = "red";
        ticket_type_obj.style.textDecoration = "none";
        ticket_type = 0;
        bet_value = 0;
        start_button.setAttribute("disabled", true);
        start_button.style.color = "lightgray";
    }
}

function OeRep(a_oe_text_out, b_oe_text_out, c_oe_text_out) {
    if (select_cup[0] == "a" || ticket_type == 3) {
        a_oe_text_out.style.opacity = 1;
        if (a_oe_out % 2 == 0) {
            a_oe_out = -1;
            a_oe_text_out.innerHTML = "偶";
        } else {
            a_oe_out = 1;
            a_oe_text_out.innerHTML = "奇";
        }
    }
    if (select_cup[1] == "b" || ticket_type == 3) {
        b_oe_text_out.style.opacity = 1;
        if (b_oe_out % 2 == 0) {
            b_oe_out = -1;
            b_oe_text_out.innerHTML = "偶";
        } else {
            b_oe_out = 1;
            b_oe_text_out.innerHTML = "奇";
        }
    }
    if (select_cup[2] == "c" || ticket_type == 3) {
        c_oe_text_out.style.opacity = 1;
        if (c_oe_out % 2 == 0) {
            c_oe_out = -1;
            c_oe_text_out.innerHTML = "偶";
        } else {
            c_oe_out = 1;
            c_oe_text_out.innerHTML = "奇";
        }
    }
}

function SetImageDice(num, dice) {
    switch (num) {
        case 1:
            dice.src = "./images/sai1.png";
            break;
        case 2:
            dice.src = "./images/sai2.png";
            break;
        case 3:
            dice.src = "./images/sai3.png";
            break;
        case 4:
            dice.src = "./images/sai4.png";
            break;
        case 5:
            dice.src = "./images/sai5.png";
            break;
        case 6:
            dice.src = "./images/sai6.png";
            break;
        default:
            console.log("saisai");
            break;
    }
}

function EnableDice(dice_a_l, dice_a_r, dice_b_l, dice_b_r, dice_c_l, dice_c_r) {
    dice_a_l.style.opacity = 1;
    dice_a_r.style.opacity = 1;
    dice_b_l.style.opacity = 1;
    dice_b_r.style.opacity = 1;
    dice_c_l.style.opacity = 1;
    dice_c_r.style.opacity = 1;
}

/*

        if (a_oe_input == a_oe_out) {
        a_oe_text_input.innerHTML = "●";
    } else {
        a_oe_text_input.innerHTML = "×";
    }
    if (b_oe_input == b_oe_out) {
        b_oe_text_input.innerHTML = "●";
    } else {
        b_oe_text_input.innerHTML = "×";
    }
    if (c_oe_input == c_oe_out) {
        c_oe_text_input.innerHTML = "●";
    } else {
        c_oe_text_input.innerHTML = "×";
    }
    */

/*
        switch (select_cup) {
        case "a":
            DiceShow(num_a[0], dice_a_l);
            DiceShow(num_a[1], dice_a_r);
            cup_a_img.style.opacity = 0;
            dice_a_l.style.opacity = 1;
            dice_a_r.style.opacity = 1;
            break;
        case "b":
            DiceShow(num_b[0], dice_b_l);
            DiceShow(num_b[1], dice_b_r);
            cup_b_img.style.opacity = 0;
            dice_b_l.style.opacity = 1;
            dice_b_r.style.opacity = 1;
            break;
        case "c":
            DiceShow(num_c[0], dice_c_l);
            DiceShow(num_c[1], dice_c_r);
            cup_c_img.style.opacity = 0;
            dice_c_l.style.opacity = 1;
            dice_c_r.style.opacity = 1;
            break;
        default:
            console.log(select_cup);
            break;
    }

*/