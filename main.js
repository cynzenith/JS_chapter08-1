// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
// 3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 4. 랜덤번호 < 유저번호 Down!!
// 5. 랜덤번호 < 유저번호 Up!!
// 6. Reset버튼을 누르면 게임이 리셋된다.
// 7. 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 8. 유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
// 9. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다
// 10. 맞추면 버튼 비활성화

let computerNum = 0;
let chances = 3;
let gameOver = false;
let history = [];

let resultArea = document.getElementById('result-area');
let chanceArea = document.getElementById('chance-area');
let userInput = document.getElementById('user-input');
let playButton = document.getElementById('play-button');
let resetButton = document.getElementById('reset-button');
let correctAnswer = document.getElementById('correct-answer');


playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function(){userInput.value=""});

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100)+1 ;
    console.log("컴퓨터 번호:",computerNum);
}

function play() {
    // 유효성 검사(1)
    if(userInput.value<1 || userInput.value>100) {
        resultArea.textContent = "0 ~ 100사이의 숫자를 입력해주세요";
        return ;
    }
    // 유효성 검사(2)
    if(history.includes(userInput.value)) {
        resultArea.textContent = "이미 입력한 숫자입니다.";
        return ;
    }

    history.push(userInput.value);
    console.log("유저 입력:", userInput.value)
    console.log(history)

    correctAnswer.textContent = `정답 : ( ${computerNum} )`

    chances --
    chanceArea.textContent = `남은 찬스 : ${chances}번`;

    if (computerNum > userInput.value) {
        // console.log("UP!!!");
        resultArea.textContent = "UP!!!"
    }
    else if (computerNum < userInput.value) {
        // console.log("DOWN!!!");
        resultArea.textContent = "DOWN!!!"
    }
    else {
        // console.log("정답입니다");
        resultArea.textContent = "정답입니다!!!"
        gameOver = true;
    }

    if (chances == 0 || gameOver == true) {
        playButton.disabled = true;
    }
    if (chances == 0 && gameOver == false) {
        resultArea.textContent = "Game Over!!!"
    }
}

function reset() {
    userInput.value=""
    pickRandomNum()
    resultArea.textContent = "새로운 게임을 시작합니다."
    chances = 3
    gameOver = false
    history = []
    playButton.disabled = false;
    chanceArea.textContent = `남은 찬스 : ${chances}번`;
}

pickRandomNum();