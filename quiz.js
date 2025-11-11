// ===== 20문항 데이터 =====
const ALL_QUESTIONS = [
  {type:'객관식', q:'STOVE는 어떤 플랫폼인가요?', options:['A. 자동차','B. 게임','C. 식품','D. 교육'], answer:'B'},
  {type:'객관식', q:'STOVE의 커뮤니티 이름은?', options:['A. 라운지','B. 포럼','C. 살롱','D. 스퀘어'], answer:'A'},
  {type:'객관식', q:'스토브 스토어의 도메인 끝은?', options:['A. stove.com','B. onstove.com','C. mystove.net','D. stove.kr'], answer:'B'},
  {type:'주관식', q:'STOVE를 만든 회사(그룹)는?', answer:'스마일게이트'},
  {type:'주관식', q:'STOVE 커뮤니티의 명칭은 무엇인가요?', answer:'라운지'},
  {type:'객관식', q:'STOVE 회원이 구매할 수 있는 것은?', options:['A. 신선식품','B. 자동차 부품','C. 디지털 게임','D. 호텔 숙박'], answer:'C'},
  {type:'객관식', q:'쿠폰 중복 적용을 흔히 뭐라 하나요?', options:['A. 스택','B. 더블링','C. 스태킹','D. 콤보'], answer:'C'},
  {type:'주관식', q:'스토브 스토어 주소 끝(영문)만 입력하세요.', answer:'onstove.com'},
  {type:'객관식', q:'STOVE 로그인에 필요한 것은?', options:['A. 주민등록증','B. 이메일/계정','C. 공인인증서','D. 오프라인 카드'], answer:'B'},
  {type:'객관식', q:'STOVE 라운지에서 할 수 있는 활동은?', options:['A. 주식 거래','B. 게임 소식 공유','C. 부동산 검색','D. 택배 조회'], answer:'B'},
  {type:'주관식', q:'STOVE의 약자(영문 대문자) 하나만 적으라면? (힌트: 없음, 그대로 STOVE)', answer:'stove'},
  {type:'객관식', q:'스토브 스토어 결제 유형으로 적절한 것은?', options:['A. 조개','B. 포인트/쿠폰','C. 명예점수','D. 마일리지 전용만'], answer:'B'},
  {type:'객관식', q:'STOVE의 주 이용 디바이스는?', options:['A. 스마트 냉장고','B. PC/모바일','C. 자동차','D. TV 전용'], answer:'B'},
  {type:'주관식', q:'라운지에서 글을 올리는 행위를 한국어 한 단어로?', answer:'게시'},
  {type:'객관식', q:'스토브의 주요 카테고리는?', options:['A. 의류','B. 게임','C. 생필품','D. 악기'], answer:'B'},
  {type:'객관식', q:'다음 중 STOVE와 직접 연관된 것은?', options:['A. 토스트기','B. 커피머신','C. 인디게임','D. 청소기'], answer:'C'},
  {type:'주관식', q:'STOVE에서 게임 관련 토론을 하는 공간 이름은?', answer:'라운지'},
  {type:'객관식', q:'STOVE에서 자주 쓰는 이벤트 보상은?', options:['A. 플레이트','B. 플래그','C. 플레이크','D. 프랙'], answer:'C'},
  {type:'객관식', q:'STOVE 스토어 접속 프로토콜은?', options:['A. ftp://','B. file://','C. https://','D. ssh://'], answer:'C'},
  {type:'주관식', q:'STOVE를 한글 두 글자로 줄이면? (예: 스토브)', answer:'스토브'}
];

// ===== 유틸 =====
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

// ===== 상태 =====
let quizData=[], current=0, score=0, timer=null, qStartTs=0, perTimes=[];
const LIMIT=10, POINT=10, T=30; // 10문항, 문제당 10점, 30초 제한

// ===== DOM =====
let elStart, elQuiz, elResult, elProgress, elTimeLabel, elQuestion, elOptions, elInputWrap, elAnswer, elSubmit, elScoreText, elTimeText, elDetail, elCongrats;

// defer 덕분에 DOM이 이미 준비된 시점이나, 안전하게 다시 보장
document.addEventListener('DOMContentLoaded', () => {
  elStart = document.getElementById('start');
  elQuiz  = document.getElementById('quiz');
  elResult= document.getElementById('result');
  elProgress = document.getElementById('progress');
  elTimeLabel= document.getElementById('timeLabel');
  elQuestion = document.getElementById('question');
  elOptions  = document.getElementById('options');
  elInputWrap= document.getElementById('inputWrap');
  elAnswer   = document.getElementById('answerInput');
  elSubmit   = document.getElementById('submitBtn');
  elScoreText= document.getElementById('scoreText');
  elTimeText = document.getElementById('timeText');
  elDetail   = document.getElementById('detailTimes');
  elCongrats = document.getElementById('congrats');

  const btnYes = document.getElementById('btnYes');
  const btnNo  = document.getElementById('btnNo');
  btnYes.addEventListener('click', startQuiz);
  btnNo.addEventListener('click', startQuiz);

  elSubmit.addEventListener('click', () => {
    const q = quizData[current];
    if(q && q.type === '주관식') submitAnswer('USER_TYPED');
    else submitAnswer(null);
  });
});

function startQuiz(){
  quizData = shuffle([...ALL_QUESTIONS]).slice(0, LIMIT);
  elStart.style.display='none';
  elQuiz.style.display='block';
  current=0; score=0; perTimes=[];
  showQuestion();
  startTimer();
}

function showQuestion(){
  const q = quizData[current];
  elProgress.textContent = `${current+1} / ${quizData.length}`;
  elQuestion.textContent = q.q;

  elOptions.innerHTML = '';
  elAnswer.value = '';

  if(q.type === '객관식'){
    elInputWrap.style.display = 'none';
    q.options.forEach(o=>{
      const btn = document.createElement('button');
      btn.textContent = o;
      btn.addEventListener('click', ()=> submitAnswer(o[0]));
      elOptions.appendChild(btn);
    });
  }else{
    elInputWrap.style.display = 'block';
  }
}

function startTimer(){
  clearInterval(timer);
  qStartTs = Date.now();
  tick();
  timer = setInterval(tick, 200);
}

function tick(){
  const elapsed = Math.floor((Date.now()-qStartTs)/1000);
  const left = Math.max(0, T - elapsed);
  elTimeLabel.textContent = `남은시간: ${left}초`;
  if(left<=0){ submitAnswer(null, true); }
}

function submitAnswer(val, timeout=false){
  if(!timer) return;
  clearInterval(timer); timer=null;

  const elapsedSec = Math.min(T, Math.round((Date.now()-qStartTs)/1000));
  perTimes.push(elapsedSec);

  const q = quizData[current];
  if(!timeout){
    const ans = (q.type==='주관식') ? (elAnswer.value||'').trim() : val;
    if(ans && q.type==='객관식'){
      if(String(ans).toUpperCase() === String(q.answer).toUpperCase()) score += POINT;
    }else if(q.type==='주관식'){
      if(ans.toLowerCase() === String(q.answer).trim().toLowerCase()) score += POINT;
    }
  }
  nextQuestion();
}

function nextQuestion(){
  current++;
  if(current < quizData.length){
    showQuestion();
    startTimer();
  }else{
    showResult();
  }
}

function showResult(){
  elQuiz.style.display='none';
  elResult.style.display='block';
  const total = perTimes.reduce((a,b)=>a+b,0);
  elScoreText.textContent = `당신의 점수는 ${score}점입니다. (총 ${quizData.length}문항, 문항당 ${POINT}점)`;
  elTimeText.textContent  = `총 소요 시간: ${total}초`;
  elDetail.textContent    = `문항별 소요(초): ${perTimes.join(' / ')}`;
  if(score===POINT*quizData.length) elCongrats.style.display='block';
}
