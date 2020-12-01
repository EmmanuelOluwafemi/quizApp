// Getting required dom Element
const start_btn = document.querySelector('.start_btn button');
const info_box = document.querySelector('.info_box');
const exit_btn = document.querySelector('.buttons .quit');
const continue_button = document.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
let option_list = document.querySelector('.option_list');
let timeCount = document.querySelector('.timer_sec');
let timeLine = document.querySelector('.time_line');

// If Start Button is clicked
start_btn.addEventListener("click", () => {
    info_box.classList.add("active_info")
})

// If Exit Button is clicked
exit_btn.addEventListener("click", () => {
    info_box.classList.remove("active_info")
})

// If Continue Button is clicked
continue_button.addEventListener("click", () => {
    info_box.classList.remove("active_info")
    quiz_box.classList.add("active_quiz")
    showQuestion(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
})

let que_count = 0;
let que_num = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');
const restart_btn = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

restart_btn.onclick = () => {
    quiz_box.classList.add("active_quiz")
    result_box.classList.remove("active_result")
    let que_count = 0;
    let que_num = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestion(que_count)
    queCounter(que_num);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = 'none';
}

quit_quiz.onclick = () => {
    window.location.reload();
}

// if next button is clicked
next_btn.addEventListener('click', ()=> {
    if (que_count < questions.length - 1) {
        que_count++;
        que_num++;
        showQuestion(que_count)
        queCounter(que_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = 'none';
    }
    else {
        console.log ("Question Completed")
        showResultBox();
    }
    
})

function showResultBox() {
    info_box.classList.remove("active_info")
    quiz_box.classList.remove("active_quiz")
    result_box.classList.add("active_result")
    let scoreText = result_box.querySelector('.score_text');
    if(userScore > 7) {
        let scoreTag = `<span>and congrat, you got <p>${userScore}</p> out of <p>${questions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    if(userScore > 5) {
        let scoreTag = `<span>and nice, you got <p>${userScore}</p> out of <p>${questions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
    if(userScore > 1) {
        let scoreTag = `<span>and sorry, you got <p>${userScore}</p> out of <p>${questions.length}</p></span>`
        scoreText.innerHTML = scoreTag;
    }
}

// getting question from array
function showQuestion(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].num + "." + questions[index].question + '</span>';
    let option_tag = 
                    `<div class="option"> <span>${questions[index].options[0]}</span></div>
                    <div class="option"> <span>${questions[index].options[1]}</span></div>
                    <div class="option"> <span>${questions[index].options[2]}</span></div>
                    <div class="option"> <span>${questions[index].options[3]}</span></div>`;


    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine)
    let userAns = answer.textContent;
    let correctAnswer = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns.trim() == correctAnswer.trim()) {
        answer.classList.add("correct");
        console.log("Correct Answer");
        answer.insertAdjacentHTML("beforeend", tickIcon);
        userScore += 1;
        console.log(userScore)
    }
    else {
        answer.classList.add("incorrect");
        console.log ("Wrong Answer")
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent.trim() == correctAnswer.trim()) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // ONce the user clicks disable
    for (let i = 0; i < allOptions; i++) {
        console.log("clicked")
        option_list.children[i].classList.add("disabled")
    }

    next_btn.style.display = 'block';
}


function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addzero = timeCount.textContent;
            timeCount.textContent = "0" + addzero;
        }

        if(time < 0) {
            clearInterval(counter)
            timeCount.textContent = "00";

            let correctAnswer = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent.trim() == correctAnswer.trim()) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                console.log("clicked")
                option_list.children[i].classList.add("disabled")
            }
        
            next_btn.style.display = 'block';
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + 'px';

        if(time > 549) {
            clearInterval(counterLine)
        }
    }
}


function queCounter(index) {
    const bottom_que_counter = document.querySelector(".total_que");
    let totalQuesCountTag = `<span><p>${index}</p>of<p>${questions.length}</p>Questions</span>`;
    bottom_que_counter.innerHTML = totalQuesCountTag;
}