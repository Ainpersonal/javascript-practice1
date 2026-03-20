// ============================================
// SECTION 1: Toggle Switch (true / false)
// ============================================

const switchState = {
  lampu: false,
  pintu: false,
  login: false,
};

const switchData = {
  lampu: {
    icons:   ['💡', '🌟'],
    labels:  ['Lampu: <strong>MATI</strong>', 'Lampu: <strong>MENYALA</strong>'],
    varName: 'lampu',
    btnText: ['Nyalakan', 'Matikan'],
  },
  pintu: {
    icons:   ['🚪', '🚶'],
    labels:  ['Pintu: <strong>TERTUTUP</strong>', 'Pintu: <strong>TERBUKA</strong>'],
    varName: 'pintu',
    btnText: ['Buka', 'Tutup'],
  },
  login: {
    icons:   ['🔒', '🔓'],
    labels:  ['Login: <strong>BELUM</strong>', 'Login: <strong>SUDAH</strong>'],
    varName: 'sudahLogin',
    btnText: ['Login', 'Logout'],
  },
};

function toggleSwitch(name) {
  // Balik nilai boolean
  switchState[name] = !switchState[name];

  const isTrue = switchState[name];
  const data   = switchData[name];
  const card   = document.getElementById('card-' + name);

  card.classList.toggle('is-true', isTrue);
  document.getElementById('icon-'  + name).textContent = isTrue ? data.icons[1]  : data.icons[0];
  document.getElementById('label-' + name).innerHTML   = isTrue ? data.labels[1] : data.labels[0];

  const valSpan = isTrue
    ? `<span class="val-true">true</span>`
    : `<span class="val-false">false</span>`;

  document.getElementById('code-' + name).innerHTML = `let ${data.varName} = ${valSpan};`;
  card.querySelector('.btn-toggle').textContent = isTrue ? data.btnText[1] : data.btnText[0];
}


// ============================================
// SECTION 2: Operator && (AND)
// ============================================

function updateAnd() {
  const umur18     = document.getElementById('chk-umur').checked;
  const punyaTiket = document.getElementById('chk-tiket').checked;
  const hasilAnd   = umur18 && punyaTiket;

  const resultBox = document.getElementById('result-and');
  resultBox.classList.toggle('is-true', hasilAnd);

  if (hasilAnd) {
    resultBox.querySelector('.result-icon').textContent = '✅';
    resultBox.querySelector('.result-text').textContent = 'Boleh masuk!';
  } else {
    resultBox.querySelector('.result-icon').textContent = '🚫';
    resultBox.querySelector('.result-text').textContent = 'Tidak boleh masuk';
  }

  const valSpan = hasilAnd
    ? `<span class="val-true">true</span>`
    : `<span class="val-false">false</span>`;
  document.getElementById('code-and').innerHTML = `umur18 &amp;&amp; punyaTiket = ${valSpan}`;
}


// ============================================
// SECTION 3: Operator || (OR)
// ============================================

function updateOr() {
  const pelajar = document.getElementById('chk-pelajar').checked;
  const lansia  = document.getElementById('chk-lansia').checked;
  const hasilOr = pelajar || lansia;

  const resultBox = document.getElementById('result-or');
  resultBox.classList.toggle('is-true', hasilOr);

  if (hasilOr) {
    resultBox.querySelector('.result-icon').textContent = '🎉';
    resultBox.querySelector('.result-text').textContent = 'Dapat diskon 50%!';
  } else {
    resultBox.querySelector('.result-icon').textContent = '❌';
    resultBox.querySelector('.result-text').textContent = 'Tidak dapat diskon';
  }

  const valSpan = hasilOr
    ? `<span class="val-true">true</span>`
    : `<span class="val-false">false</span>`;
  document.getElementById('code-or').innerHTML = `pelajar || lansia = ${valSpan}`;
}


// ============================================
// SECTION 4: Operator ! (NOT)
// ============================================

function updateNot() {
  const input    = document.getElementById('input-not').value;
  const original = !!input;
  const notVal   = !input;
  const notNot   = !!input;

  const displayInput = input === '' ? '""' : `"${input}"`;

  document.getElementById('val-original').textContent  = displayInput;
  document.getElementById('bool-original').innerHTML   = `→ ${boolSpan(original)}`;
  document.getElementById('val-not').textContent       = `!${displayInput}`;
  document.getElementById('bool-not').innerHTML        = `→ ${boolSpan(notVal)}`;
  document.getElementById('val-not2').textContent      = `!!${displayInput}`;
  document.getElementById('bool-not2').innerHTML       = `→ ${boolSpan(notNot)}`;
}

function boolSpan(val) {
  return val
    ? `<span class="val-true">true</span>`
    : `<span class="val-false">false</span>`;
}

updateNot();


// ============================================
// SECTION 5: Loop FOR
// ============================================

function runFor() {
  const start  = parseInt(document.getElementById('for-start').value) || 1;
  const end    = parseInt(document.getElementById('for-end').value)   || 5;
  const step   = parseInt(document.getElementById('for-step').value)  || 1;

  // Batasi agar tidak terlalu banyak output
  const maxIterasi = 20;

  // Tampilkan kode yang akan dijalankan
  document.getElementById('for-code-display').textContent =
    `for (let i = ${start}; i <= ${end}; i += ${step}) {\n  console.log(i);\n}`;

  // Jalankan loop dan kumpulkan hasilnya
  const output = document.getElementById('for-output');
  output.innerHTML = '';

  let count = 0;
  for (let i = start; i <= end; i += step) {
    if (count >= maxIterasi) break;

    // Buat sebuah "pil" untuk setiap angka
    const pill = document.createElement('span');
    pill.className = 'out-pill highlight';
    pill.textContent = i;

    // Animasi masuk satu per satu
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(4px)';
    output.appendChild(pill);

    // Tunda tampilan setiap pil agar terlihat satu per satu
    setTimeout(() => {
      pill.style.transition = 'opacity 0.2s, transform 0.2s';
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    }, count * 80);

    count++;
  }

  if (count === 0) {
    output.innerHTML = '<span style="color:var(--text2);font-family:var(--font-mono);font-size:0.82rem">Tidak ada output (cek nilai mulai dan sampai)</span>';
  }
}


// ============================================
// SECTION 6: Loop WHILE
// ============================================

function runWhile() {
  const start = parseInt(document.getElementById('while-start').value) || 10;
  const minus = parseInt(document.getElementById('while-minus').value) || 3;

  const maxIterasi = 30;

  document.getElementById('while-code-display').textContent =
    `let nilai = ${start};\nwhile (nilai > 0) {\n  console.log(nilai);\n  nilai -= ${minus};\n}`;

  const output = document.getElementById('while-output');
  output.innerHTML = '';

  let nilai = start;
  let count = 0;

  // Kumpulkan semua hasil dulu, baru tampilkan
  const hasil = [];
  while (nilai > 0 && count < maxIterasi) {
    hasil.push(nilai);
    nilai -= minus;
    count++;
  }

  hasil.forEach((angka, i) => {
    const pill = document.createElement('span');
    pill.className = 'out-pill highlight';
    pill.textContent = angka;
    pill.style.opacity = '0';
    output.appendChild(pill);

    setTimeout(() => {
      pill.style.transition = 'opacity 0.2s, transform 0.2s';
      pill.style.opacity = '1';
    }, i * 80);
  });

  // Tambahkan info berapa putaran
  setTimeout(() => {
    const info = document.createElement('span');
    info.style.cssText = 'font-size:0.75rem;color:var(--text2);font-family:var(--font-mono);width:100%;margin-top:4px';
    info.textContent = `→ ${hasil.length} putaran, berhenti saat nilai = ${nilai} (sudah ≤ 0)`;
    output.appendChild(info);
  }, hasil.length * 80 + 100);
}


// ============================================
// SECTION 7: BREAK
// ============================================

function runBreak() {
  const target = parseInt(document.getElementById('break-target').value) || 4;
  const max    = parseInt(document.getElementById('break-max').value)    || 10;

  document.getElementById('break-code-display').textContent =
    `for (let i = 1; i <= ${max}; i++) {\n  if (i === ${target}) {\n    break; // STOP!\n  }\n  console.log(i);\n}`;

  const output = document.getElementById('break-output');
  output.innerHTML = '';

  let found = false;

  for (let i = 1; i <= max; i++) {
    const pill = document.createElement('span');

    if (i === target) {
      // Ini putaran saat break terjadi
      pill.className = 'out-pill found';
      pill.textContent = `${i} 🛑 BREAK`;
      found = true;

      pill.style.opacity = '0';
      output.appendChild(pill);
      const delay = (i - 1) * 100;
      setTimeout(() => {
        pill.style.transition = 'opacity 0.3s';
        pill.style.opacity = '1';
      }, delay);
      break;

    } else {
      // Putaran normal sebelum break
      pill.className = 'out-pill highlight';
      pill.textContent = i;
      pill.style.opacity = '0';
      output.appendChild(pill);
      const delay = (i - 1) * 100;
      setTimeout(() => {
        pill.style.transition = 'opacity 0.2s';
        pill.style.opacity = '1';
      }, delay);
    }
  }

  if (!found) {
    const info = document.createElement('span');
    info.style.cssText = 'font-size:0.8rem;color:var(--text2);font-family:var(--font-mono)';
    info.textContent = `Angka ${target} tidak ada dalam rentang 1–${max}`;
    output.appendChild(info);
  } else {
    setTimeout(() => {
      const skipped = [];
      for (let j = target + 1; j <= max; j++) skipped.push(j);

      if (skipped.length > 0 && skipped.length <= 10) {
        skipped.forEach(n => {
          const pill = document.createElement('span');
          pill.className = 'out-pill skipped';
          pill.textContent = n;
          output.appendChild(pill);
        });
      } else if (skipped.length > 10) {
        const pill = document.createElement('span');
        pill.className = 'out-pill skipped';
        pill.textContent = `... ${skipped.length} angka dilewati`;
        output.appendChild(pill);
      }
    }, target * 100 + 200);
  }
}


// ============================================
// SECTION 8: CONTINUE
// ============================================

function runContinue() {
  const max  = parseInt(document.getElementById('cont-max').value)  || 10;
  const skip = parseInt(document.getElementById('cont-skip').value) || 3;

  document.getElementById('cont-code-display').textContent =
    `for (let i = 1; i <= ${max}; i++) {\n  if (i % ${skip} === 0) {\n    continue; // lewati\n  }\n  console.log(i);\n}`;

  const output = document.getElementById('cont-output');
  output.innerHTML = '';

  let delay = 0;

  for (let i = 1; i <= max; i++) {
    const pill = document.createElement('span');
    const isSkipped = (i % skip === 0);

    if (isSkipped) {
      // Angka yang dilewati — tampilkan sebagai abu-abu
      pill.className = 'out-pill skipped';
      pill.textContent = `${i} ⏭`;
    } else {
      // Angka yang dicetak
      pill.className = 'out-pill highlight';
      pill.textContent = i;
    }

    pill.style.opacity = '0';
    output.appendChild(pill);

    setTimeout(() => {
      pill.style.transition = 'opacity 0.2s';
      pill.style.opacity = '1';
    }, delay);

    delay += 60;
  }
}


// ============================================
// SECTION 9: CONTROL FLOW (if/else)
// ============================================

function runControlFlow() {
  const nilai = parseInt(document.getElementById('cf-nilai').value) || 0;

  // Update tampilan angka di slider dan kode
  document.getElementById('cf-val-display').textContent = nilai;
  document.getElementById('cf-code-val').textContent    = nilai;
  document.getElementById('cf-result-nilai').textContent = nilai;

  const panel = document.getElementById('cf-result-panel');
  const icon  = document.getElementById('cf-result-icon');
  const grade = document.getElementById('cf-result-grade');

  // Hapus semua class grade dulu
  panel.classList.remove('grade-a', 'grade-b', 'grade-c', 'grade-d', 'grade-e');

  // Logika if/else — sama persis dengan kode yang ditampilkan
  if (nilai >= 90) {
    panel.classList.add('grade-a');
    icon.textContent  = '🏆';
    grade.textContent = 'A — Sempurna!';
  } else if (nilai >= 80) {
    panel.classList.add('grade-b');
    icon.textContent  = '⭐';
    grade.textContent = 'B — Bagus!';
  } else if (nilai >= 70) {
    panel.classList.add('grade-c');
    icon.textContent  = '📝';
    grade.textContent = 'C — Cukup';
  } else if (nilai >= 60) {
    panel.classList.add('grade-d');
    icon.textContent  = '📖';
    grade.textContent = 'D — Perlu usaha';
  } else {
    panel.classList.add('grade-e');
    icon.textContent  = '😓';
    grade.textContent = 'E — Remedial';
  }
}

// Jalankan sekali saat halaman dimuat
runControlFlow();


// ============================================
// SECTION 10: QUIZ (Boolean + Loops)
// ============================================

const quizData = [
  { soal: 'true && true',              jawaban: true  },
  { soal: 'true && false',             jawaban: false },
  { soal: 'false || true',             jawaban: true  },
  { soal: 'false || false',            jawaban: false },
  { soal: '!true',                     jawaban: false },
  { soal: '!false',                    jawaban: true  },
  { soal: '10 > 5 && 3 < 7',          jawaban: true  },
  { soal: '"halo" || false',           jawaban: true  },
  { soal: '0 && true',                 jawaban: false },
  { soal: 'null || "default"',         jawaban: true  },
  // Soal loop baru
  { soal: 'for (i=0; i<3; i++) → berapa putaran?  [jawab: true = 3 putaran]', jawaban: true },
  { soal: 'while (false) { ... } → kode di dalam pernah jalan?', jawaban: false },
  { soal: 'i=1; i<=5; i++ → i terakhir sebelum stop adalah 5?',  jawaban: true  },
  { soal: 'break menghentikan HANYA putaran saat ini?',          jawaban: false },
  { soal: 'continue melewati putaran saat ini lalu lanjut?',     jawaban: true  },
];

let score    = 0;
let answered = 0;

function buildQuiz() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  score    = 0;
  answered = 0;
  document.getElementById('quiz-score').textContent = '';
  document.getElementById('btn-reset-quiz').style.display = 'none';

  quizData.forEach((q, i) => {
    const item = document.createElement('div');
    item.className = 'quiz-item';
    item.id = 'quiz-' + i;

    item.innerHTML = `
      <div class="quiz-question">${q.soal}</div>
      <div class="quiz-btns">
        <button class="quiz-btn true-btn"  onclick="checkAnswer(${i}, true)">true</button>
        <button class="quiz-btn false-btn" onclick="checkAnswer(${i}, false)">false</button>
      </div>
      <div class="quiz-feedback" id="feedback-${i}"></div>
    `;

    container.appendChild(item);
  });
}

function checkAnswer(index, jawaban) {
  const q        = quizData[index];
  const item     = document.getElementById('quiz-' + index);
  const feedback = document.getElementById('feedback-' + index);
  const btns     = item.querySelectorAll('.quiz-btn');

  btns.forEach(b => b.disabled = true);
  answered++;

  if (jawaban === q.jawaban) {
    score++;
    item.classList.add('correct');
    feedback.innerHTML = `<span class="val-true">✓ Benar!</span>`;
  } else {
    item.classList.add('wrong');
    feedback.innerHTML = `<span class="val-false">✗ Salah! → ${boolSpan(q.jawaban)}</span>`;
  }

  if (answered === quizData.length) {
    const scoreEl = document.getElementById('quiz-score');
    const persen  = Math.round((score / quizData.length) * 100);
    let emoji = persen === 100 ? '🏆' : persen >= 80 ? '⭐' : persen >= 60 ? '📝' : '💪';
    scoreEl.textContent = `${emoji} Skor kamu: ${score} / ${quizData.length}  (${persen}%)`;
    document.getElementById('btn-reset-quiz').style.display = 'inline-block';
  }
}

// Jalankan quiz saat halaman dimuat
buildQuiz();