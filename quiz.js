(() => {
  const MOUNT_ID = 'stove-quiz';
  const rootHost = document.getElementById(MOUNT_ID);
  if (!rootHost) { console.error('[stove-quiz] mount element not found'); return; }

  // Shadow DOM 격리
  const shadow = rootHost.attachShadow({ mode: 'open' });

  // ===== 데이터 =====
  const ALL_QUESTIONS = [
 {type:'객관식', q:'[두근두근 야심작]의 시작을 함께한 첫번째 타이틀을 고르시오', options:['A. 동아리','B. 러브 리플레이','C. 러브 스티치','D. 러브인 로그인', 'E. 러브 딜리버리'], answer:'E'},
  {type:'객관식', q:'2025년 진행했던 스토브 이벤트 중 이름이 잘못된 것을 고르시오.', options:['A. 할인이 왔당근','B. 새로 시작했나봄','C. 구구 후기 이벤트','D. 방구석 겜캉스', 'E. 리얼썸머 얼리썸머'], answer:'A'},
  {type:'객관식', q:'다음 중 2025년에 스토브에 새로 출시된 게임이 아닌 것을 고르시오.', options:['A. 슈퍼 판타지 킹덤','B. 캐틀 컨트리','C. 헤비 레인','D. 후즈 앳 더 도어', 'E. 이프선셋'], answer:'E'},
  {type:'객관식', q:'다음 중 게임의 주요 배경이 학교가 아닌 것을 고르시오.', options:['A. 방과후 운동장','B. 서머 리버스','C. 랜덤채팅의 그녀','D. 러브 리플레이', 'E. 리프 인 부트스트랩'], answer:'D'},
  {type:'객관식', q:'<고독방송>의 주인공 유나가 게임 속에서 입은 적 없는 옷을 고르시오.', options:['A. 바니걸룩','B. 간호사복','C. 테니스스커트','D. 환자복', 'E. 경찰복'], answer:'E'},
  {type:'객관식', q:'<폭풍의 메이드>에 등장하는 주요인물 6인이 아닌 것을 고르시오.', options:['A. 카렌','B. 벨','C. 모니카','D. 스칼렛', 'E. 보라'], answer:'D'},
  {type:'객관식', q:'다음 중 스토브의 비주얼 노벨 큐레이션, [두근두근 야심작]에 해당하는 게임을 고르시오.', options:['A. 시켜주세요 산책!','B. 두근두근 라면집','C. 계약x연애','D. 고독방송', 'E. 하모닉스'], answer:'C'},
  {type:'객관식', q:'다음 중 2025년에 정식 출시한 [두근두근 야심작]이 아닌 것을 고르시오.', options:['A. 프렌치커넥션','B. 푸른 달빛 속에서','C. 서머 리버스','D. 사니양 연구실', 'E. 블랙 하트'], answer:'D'},
  { 
    type: '객관식', 
    q: '다음의 게임 주인공들 중 머리색이 다른 한 명을 고르시오.', 
    options: ['A. 병원x생활-하미나', 'B. 푸른 달빛 속에서-은랑', 'C. 아르티스 임팩트-아카네', 'D. 서큐하트-이에', 'E. 스칼렛 크로스-엘리엇'], 
    answer: 'B' 
  },
  { 
    type: '객관식', 
    q: '다음 공포 게임들 중 게임의 이름이 올바르지 않은 것을 고르시오.', 
    options: ['A. 고독방송', 'B. 공포의 섹시 물귀신', 'C. 후즈 앳 더 도어', 'D. 언더월드', 'E. SAEKO'], 
    answer: 'D' 
  },
  { 
    type: '객관식', 
    q: '다음 중 도트로 디자인된 게임이 아닌 것을 고르시오.', 
    options: ['A. 캐틀 컨트리', 'B. 리듬 마녀: 죽음과 함께 춤을', 'C. 폭풍의 메이드', 'D. 리서치 스토리', 'E. 아르티스 임팩트'], 
    answer: 'B' 
  },
  { 
    type: '객관식', 
    q: '9월에 진행 되었던 구구 후기 이벤트에서 "후기 작성" 대상 게임이 아닌 것을 고르시오.', 
    options: ['A. 다크 데이티 2', 'B. 푸른 달빛 속에서', 'C. 디트로이트: 비컴 휴먼', 'D. 사무라이 쇼다운 II', 'E. 하모닉스'], 
    answer: 'D' 
  },
  { 
    type: '객관식', 
    q: "비주얼 노벨 명가 '테일즈샵'의 감성 로맨스 신작, <사랑 한 잔 말아주세요!>이 12월 23일 정식출시 예정입니다. 게임 속에서 주인공은 어느 술집의 바텐더로 일하게 되는데, 다음 중 '술'과 관련이 없는 게일을 고르시오.", 
    options: ['A. 프렌치커넥션', 'B. 내 일상에 스며든 비늘', 'C. 헌드레드 데이즈', 'D. 술도 사랑도 어려운 아가씨', 'E. 과몰입금지2: 여름포차'], 
    answer: 'B' 
  },
  { 
    type: '객관식', 
    q: '<골목길 : 귀흔>의 주인공 "소연"의 가문과 관련이 깊은 단어를 고르시오.', 
    options: ['A. 염화', 'B. 연화', 'C. 이화', 'D. 예화', 'E. 유화'], 
    answer: 'B' 
  },
  { 
    type: '객관식', 
    q: '<골목길 : 귀흔>의 지하 불상 퍼즐과 관련이 없는 것을 고르시오.', 
    options: ['A. 나무', 'B. 불', 'C. 빛', 'D. 흙', 'E. 물'], 
    answer: 'C' 
  },
  { 
    type: '객관식', 
    q: '<고독방송>의 주인공 유나는 스트리머입니다. 그녀의 팬네임을 고르시오.', 
    options: ['A. 유나닷치', 'B. 유나도치', 'C. 유나하치', 'D. 유나둠치', 'E. 유나해치'], 
    answer: 'A' 
  },
  { 
    type: '객관식', 
    q: '<폭풍의 메이드>와 콜라보 DLC의 출시가 빠른 순서대로 나열된 것을 고르시오. [보기] 1.블랙 하트 2.썸썸 편의점 3.서큐하트 4.러브 스티치 5.프렌치 커넥션 6.기적의 분식집', 
    options: ['A. 3>4>2>6>1>5', 'B. 2>6>1>3>5>4', 'C. 1>3>4>2>6>5', 'D. 5>3>4>6>2>1'], 
    answer: 'A' 
  },
  { 
    type: '객관식', 
    q: "다음 중 '스토브 한글화'로 출시한 게임이 아닌 것을 고르시오.", 
    options: ['A. 하요와 잡화점', 'B. 아르티스 임팩트', 'C. 슈퍼 판타지 킹덤', 'D. 요그 소토스의 정원', 'E. 보더 타운'], 
    answer: 'A' 
  },
  { 
    type: '객관식', 
    q: "다음 중 지금까지 초특가 할인 이벤트 '빅딜'을 진행한 적 없는 게임을 고르시오.", 
    options: ['A. 천사의 제국4', 'B. 서큐하트', 'C. 칼리스', 'D. 스플래셔', 'E. 스웜프 키퍼'], 
    answer: 'E' 
  },
  { 
    type: '주관식', 
    q: '한국의 주택가와 길거리를 사실적으로 묘사하여 큰 화제가 된 아래 공포 게임의 이름 중 빈칸에 해당하는 부제를 적으시오.[보기] <골목길 : OO>(※한국어 명칭 띄어쓰기 없이 기입)', 
    answer: '귀흔' 
  },
  { 
    type: '주관식', 
    q: '<골목길 : 귀흔>에서 귀신의 장난을 뜻하는 단어를 적으시오.', 
    answer: '허깨비' 
  },
  { 
    type: '주관식', 
    q: '서부 개척지의 모험과 낭만이 가득한 시뮬레이션 게임으로, 10월 31일 스토브 한글화로 출시된 이 게임의 이름을 적으시오.(※한국어 명칭 띄어쓰기 없이 기입)', 
    answer: '캐틀컨트리' 
  },
  { 
    type: '주관식', 
    q: '<고독방송> 속 게임 대결 합방에서 유나를 0대 33으로 완패시켰던 요리 스트리머의 이름을 적으시오.(※한국어 명칭 띄어쓰기 없이 기입)', 
    answer: '귀신든램쥐' 
  },
  { 
    type: '주관식', 
    q: '<고독방송>에서 유나는 게임 대결 합방에서 패배한 벌칙으로 흉가 체험 라이브 방송을 하게 됩니다. 흉가 체험을 위해 찾아간 장소의 이름을 적으시오.(※한국어 명칭 띄어쓰기 없이 기입)', 
    answer: '신처럼정신병원' 
  },
  { 
    type: '주관식', 
    q: '<클레르 옵스퀴르: 33 원정대>에서 일 년에 한번씩 잠에서 깨어나 거석 위에 저주받은 숫자를 적는 "이것"의 이름을 적으시오.(※한국어 명칭 띄어쓰기 없이 기입)', 
    answer: '페인트리스' 
  },
  { 
    type: '주관식', 
    q: '<아르티스 임팩트>의 주인공 아카네가 속한 AI 저항조직의 이름을 적으시오.(※한국어 명칭 띄어쓰기 없이 기입)', 
    answer: '리트' 
  },
  { 
    type: '주관식', 
    q: "2022년부터 일 년에 한 번, 스마일게이트 주체로 진행되었던 인디게임 축제 '버닝비버'가 2025을 맞이하여 새로운 이름으로 개최됩니다. 인디게임 창작자들의 열정과 창의성을 공유하는 이 축제의 새로운 이름을 적으시오.(※한국어 명칭 띄어쓰기 없이 기입)", 
    answer: '비버롹스' 
  } 
  ];

  const LIMIT = 9, POINT = 10, T = 60;
  const ORANGE = '#ff6b00';

  // ===== 스타일 & HTML 템플릿 =====
  const style = document.createElement('style');
  style.textContent = `
  :host { all: initial; }
  .wrap{ font-family:Pretendard,system-ui,-apple-system,Segoe UI,Roboto,"Noto Sans KR",sans-serif;
         background:#f7f7fb; color:#0f172a; max-width:760px; margin:40px auto; padding:0 16px; }
  .card{ background:#fff; border:1px solid #e6e9f4; border-radius:16px; padding:28px;
         box-shadow:0 8px 28px rgba(17,24,39,.08); }
  .center{text-align:center}
  h1{ margin:0 0 12px; font-size:28px; font-weight:900; letter-spacing:-.2px; color:${ORANGE}; }
  .muted{ color:#0B0B0D; }
  .start-actions{ display:flex; gap:12px; justify-content:center; margin-top:24px; }
  .btn{ appearance:none; border:0; border-radius:12px; padding:12px 18px; font-weight:800; cursor:pointer;
        background:#111827; color:#fff; box-shadow:0 6px 18px rgba(0,0,0,.12); }
  .btn.secondary{ background:#eef1f7; color:#111827; }
  .btn:active{ transform:translateY(1px); }
  .quiz-box{ display:none; }
  .q-meta{ display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;
           font-size:15px; color:#4b5563; }
  #timeLabel{ font-weight:900; color:${ORANGE}; }
  .question{ font-size:22px; font-weight:900; margin:10px 0 16px; color:#0f172a; }
  .options button{
    display:block; width:100%; text-align:left; padding:14px 16px; margin:12px 0;
    border-radius:12px; border:1px solid #e1e4f0; background:#fafcff; cursor:pointer;
    font-size:17px; font-weight:700; color:#111827; box-shadow:0 2px 6px rgba(0,0,0,.03);
  }
  .options button:hover{ background:#f2f6ff; border-color:#d8defa; }
  .input-wrap{ display:none; }
  .input-wrap input{ width:100%; padding:14px; border-radius:12px; border:1px solid #d9ddea;
                     font-size:17px; background:#fafbff; }
  .actions{ display:flex; justify-content:flex-end; margin-top:16px; }
  .actions .btn{ padding:10px 18px; }
  .result{ display:none; }
  .score{ font-size:26px; font-weight:900; margin-bottom:8px; color:${ORANGE}; }
  .time-total{ color:#4b5563; margin-bottom:16px; font-weight:700; }
  .congrats{ display:none; margin-top:12px; padding:14px; border-radius:12px; background:#fff8db; }
  .congrats a{ color:${ORANGE}; font-weight:900; text-decoration:none; }
  `;

  const tpl = document.createElement('template');
  tpl.innerHTML = `
  <div class="wrap">
    <div id="start" class="card center">
      <h1>스토브 능력시험</h1>
      <div class="muted">문항당 30초, 총 9문제 · 문제당 10점</div>
      <p style="margin:18px 0 0; font-weight:800;">스토브능력시험을 시작하겠습니까?</p>
      <div class="start-actions">
        <button type="button" class="btn" id="btnYes">네</button>
        <button type="button" class="btn secondary" id="btnNo">아니오</button>
      </div>
    </div>

    <div id="quiz" class="card quiz-box">
      <div class="q-meta">
        <div id="progress">1 / 9</div>
        <div id="timeLabel">남은시간: 60초</div>
      </div>
      <div class="question" id="question"></div>
      <div class="options" id="options"></div>
      <div class="input-wrap" id="inputWrap">
        <input type="text" id="answerInput" placeholder="정답을 입력하세요"/>
      </div>
      <div class="actions">
        <button type="button" class="btn" id="submitBtn">제출하기</button>
      </div>
    </div>

    <div id="result" class="card result center">
      <div class="score" id="scoreText">당신의 점수는 0점입니다.</div>
      <div class="time-total" id="timeText">총 소요 시간: 0초</div>
      <div class="muted" id="detailTimes" style="font-size:13px;"></div>
      <div class="congrats" id="congrats">
        🎉 <strong>축하합니다! 만점을 획득하셨어요.</strong><br/>
        <a href="https://store.onstove.com" target="_blank" rel="noopener">스토브 스토어 바로가기</a>
      </div>
    </div>
  </div>
  `;

  shadow.append(style, tpl.content.cloneNode(true));

  // ===== JS 로직 =====
  const $ = sel => shadow.querySelector(sel);
  const shuffle = arr => { for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; };

  let quizData=[], current=0, score=0, timer=null, qStartTs=0, perTimes=[];
  const elStart=$('#start'), elQuiz=$('#quiz'), elResult=$('#result'),
        elProgress=$('#progress'), elTimeLabel=$('#timeLabel'),
        elQuestion=$('#question'), elOptions=$('#options'),
        elInputWrap=$('#inputWrap'), elAnswer=$('#answerInput'),
        elSubmit=$('#submitBtn'), elScoreText=$('#scoreText'),
        elTimeText=$('#timeText'), elDetail=$('#detailTimes'),
        elCongrats=$('#congrats');

  $('#btnYes').addEventListener('click', startQuiz);
  $('#btnNo').addEventListener('click', startQuiz);
  elSubmit.addEventListener('click', ()=>{
    const q=quizData[current];
    if(q && q.type==='주관식') submitAnswer('USER_TYPED');
    else submitAnswer(null);
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
    const q=quizData[current];
    elProgress.textContent=`${current+1} / ${quizData.length}`;
    elQuestion.textContent=q.q;
    elOptions.innerHTML=''; elAnswer.value='';

    if(q.type==='객관식'){
      elInputWrap.style.display='none';
      q.options.forEach(o=>{
        const btn=document.createElement('button');
        btn.textContent=o;
        btn.addEventListener('click',()=>submitAnswer(o[0]));
        elOptions.appendChild(btn);
      });
    }else{
      elInputWrap.style.display='block';
    }
  }

  function startTimer(){
    clearInterval(timer);
    qStartTs=Date.now(); tick();
    timer=setInterval(tick,200);
  }

  function tick(){
    const elapsed=Math.floor((Date.now()-qStartTs)/1000);
    const left=Math.max(0,T-elapsed);
    elTimeLabel.textContent=`남은시간: ${left}초`;
    if(left<=0) submitAnswer(null,true);
  }

  function submitAnswer(val,timeout=false){
    if(!timer) return;
    clearInterval(timer); timer=null;
    const elapsedSec=Math.min(T,Math.round((Date.now()-qStartTs)/1000));
    perTimes.push(elapsedSec);
    const q=quizData[current];
    if(!timeout){
      const ans=(q.type==='주관식')?(elAnswer.value||'').trim():val;
      if(ans && q.type==='객관식'){
        if(String(ans).toUpperCase()===String(q.answer).toUpperCase()) score+=POINT;
      }else if(q.type==='주관식'){
        if(ans.toLowerCase()===String(q.answer).trim().toLowerCase()) score+=POINT;
      }
    }
    nextQuestion();
  }

  function nextQuestion(){
    current++;
    if(current<quizData.length){ showQuestion(); startTimer(); }
    else showResult();
  }

  function showResult(){
    elQuiz.style.display='none';
    elResult.style.display='block';
    const total=perTimes.reduce((a,b)=>a+b,0);
    elScoreText.textContent=`당신의 점수는 ${score}점입니다. (총 ${quizData.length}문항, 문항당 ${POINT}점)`;
    elTimeText.textContent=`총 소요 시간: ${total}초`;
    elDetail.textContent=`문항별 소요(초): ${perTimes.join(' / ')}`;
    if(score===POINT*quizData.length) elCongrats.style.display='block';
  }
})();

