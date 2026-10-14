// Login screen: name is free-form, class is selected from the supplied list.
const loginScreen = document.getElementById("loginScreen");
const learningApp = document.getElementById("learningApp");
const loginForm = document.getElementById("loginForm");
const studentNameInput = document.getElementById("studentName");
const studentClassSelect = document.getElementById("studentClass");
const loginError = document.getElementById("loginError");
const studentSession = document.getElementById("studentSession");
const studentGreeting = document.getElementById("studentGreeting");

function enterLearning(name, studentClass) {
  loginScreen.hidden = true;
  learningApp.hidden = false;
  studentGreeting.textContent = `${name} • ${studentClass}`;
  studentSession.hidden = false;
  document.title = `MPI Berpikir Kritis | ${studentClass}`;
  window.scrollTo({top: 0, behavior: "instant"});
}
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = studentNameInput.value.trim();
  const studentClass = studentClassSelect.value;
  if (!name) {
    loginError.textContent = "Nama harus diisi terlebih dahulu.";
    studentNameInput.focus();
    return;
  }
  if (!["XI-8", "XI-9", "XII-6", "XII-7", "XII-8"].includes(studentClass)) {
    loginError.textContent = "Silakan pilih kelas yang tersedia.";
    studentClassSelect.focus();
    return;
  }
  loginError.textContent = "";
  enterLearning(name, studentClass);
});
document.getElementById("changeStudent").addEventListener("click", () => {
  learningApp.hidden = true;
  loginScreen.hidden = false;
  studentSession.hidden = true;
  window.scrollTo({top: 0, behavior: "instant"});
});

const $ = (id) => document.getElementById(id);

const modalContent = {
  definisi: {title:"Apa itu berpikir kritis?", body:`<p><strong>Berpikir kritis</strong> adalah proses menilai informasi dan argumen secara rasional, terbuka, dan reflektif sebelum membuat kesimpulan atau keputusan.</p><p>Dalam Informatika, kemampuan ini membantu kita memecahkan masalah, menilai kualitas data, memeriksa informasi digital, serta memahami dampak teknologi.</p><ul><li>Ajukan pertanyaan yang jelas.</li><li>Gunakan bukti yang relevan dan dapat diperiksa.</li><li>Periksa asumsi dan kemungkinan sudut pandang lain.</li><li>Bersedia memperbaiki kesimpulan ketika ada bukti baru.</li></ul>`},
  sumber: {title:"Memeriksa informasi dan sumber", body:`<p>Informasi yang terlihat meyakinkan belum tentu benar. Lakukan pemeriksaan sederhana sebelum mempercayai atau menyebarkannya.</p><ul><li><strong>Penulis/lembaga:</strong> siapa yang bertanggung jawab atas informasi?</li><li><strong>Tanggal:</strong> apakah konteks waktunya masih relevan?</li><li><strong>Bukti:</strong> apakah klaim didukung data atau dokumen asli?</li><li><strong>Perbandingan:</strong> apakah sumber tepercaya lain melaporkan hal serupa?</li><li><strong>Konteks:</strong> apakah gambar, kutipan, atau data digunakan secara utuh?</li></ul>`},
  bias: {title:"Argumen, fakta, opini, dan bias", body:`<p><strong>Fakta</strong> dapat diperiksa kebenarannya; <strong>opini</strong> adalah penilaian atau pandangan. <strong>Argumen</strong> menghubungkan klaim dengan alasan dan bukti.</p><ul><li><strong>Bias konfirmasi:</strong> cenderung mencari informasi yang mendukung keyakinan sendiri.</li><li><strong>Generalisasi berlebihan:</strong> menarik kesimpulan luas dari contoh yang terlalu sedikit.</li><li><strong>Serangan pribadi:</strong> menyerang orangnya, bukan menilai argumennya.</li></ul><p>Tanyakan: apakah alasan benar-benar mendukung kesimpulan? Bukti apa yang mungkin membantahnya?</p>`},
  solusi: {title:"Langkah pemecahan masalah", body:`<ol><li><strong>Definisikan masalah:</strong> apa yang perlu diselesaikan?</li><li><strong>Kumpulkan data:</strong> pilih informasi yang relevan dan tepercaya.</li><li><strong>Susun alternatif:</strong> jangan terpaku pada satu solusi.</li><li><strong>Evaluasi:</strong> bandingkan manfaat, risiko, biaya, dan dampak.</li><li><strong>Putuskan dan tinjau:</strong> pilih solusi terbaik berdasarkan alasan, lalu evaluasi hasilnya.</li></ol><p>Dalam pemrograman, pola ini serupa dengan mengurai masalah, menganalisis input dan output, merancang algoritma, menguji, lalu memperbaiki solusi.</p>`}
};
document.querySelectorAll("[data-modal]").forEach(btn => btn.addEventListener("click", () => {
  const data = modalContent[btn.dataset.modal];
  $("modalTitle").textContent = data.title;
  $("modalBody").innerHTML = data.body;
  $("modalBackdrop").hidden = false;
}));
function closeModal(){ $("modalBackdrop").hidden = true; }
$("modalClose").addEventListener("click", closeModal);
$("modalDone").addEventListener("click", closeModal);
$("modalBackdrop").addEventListener("click", e => { if(e.target === $("modalBackdrop")) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });
$("menuToggle").addEventListener("click", () => $("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));

const cases = [
 {title:"Berita viral", intro:"Sebuah pesan berantai menyebutkan bahwa sekolah akan diliburkan selama satu minggu.", question:"Apa langkah pertama yang paling tepat?", options:["Langsung membagikan pesan agar teman-teman tahu.","Memeriksa pengumuman resmi sekolah dan mengonfirmasi kepada pihak berwenang.","Mempercayainya karena pesan dikirim oleh teman dekat."], answer:1, explain:"Periksa sumber primer seperti pengumuman resmi sekolah. Pesan berantai dan kedekatan pengirim tidak otomatis membuktikan kebenaran."},
 {title:"Pilihan aplikasi", intro:"Kelompokmu akan memilih aplikasi untuk menyimpan tugas. Salah satu aplikasi populer meminta izin akses yang luas.", question:"Bagaimana kelompok sebaiknya menentukan pilihan?", options:["Pilih aplikasi paling populer tanpa pemeriksaan.","Pilih aplikasi dengan tampilan paling menarik.","Bandingkan fitur, keamanan, kebijakan privasi, kebutuhan, dan alternatifnya."], answer:2, explain:"Keputusan teknologi perlu mempertimbangkan kebutuhan dan risiko. Popularitas atau tampilan saja tidak cukup."},
 {title:"Grafik menyesatkan", intro:"Sebuah unggahan menunjukkan grafik kenaikan pengguna internet, tetapi sumbu vertikalnya dimulai dari angka yang tinggi.", question:"Apa yang perlu dilakukan sebelum menyimpulkan?", options:["Periksa skala, sumber data, periode, dan konteks grafik.","Percaya karena grafik terlihat ilmiah.","Simpulkan kenaikannya sangat besar dari tampilan visual saja."], answer:0, explain:"Skala sumbu dapat memengaruhi persepsi. Periksa data, label, rentang waktu, dan sumber sebelum menafsirkan grafik."},
 {title:"Komentar di media sosial", intro:"Seseorang menulis, “Program ini pasti gagal karena pembuatnya tidak kompeten.”", question:"Apa kelemahan utama pernyataan tersebut?", options:["Pernyataan terlalu singkat.","Menyerang pribadi tanpa memberikan bukti tentang program.","Pernyataan menggunakan bahasa Indonesia."], answer:1, explain:"Serangan terhadap pribadi tidak membuktikan program akan gagal. Nilai argumen dengan data, kriteria, dan bukti yang relevan."},
 {title:"Keputusan kelompok", intro:"Dua solusi ditawarkan untuk masalah jaringan kelas. Solusi A murah tetapi sering terputus; solusi B lebih mahal tetapi lebih stabil.", question:"Langkah berpikir kritis yang paling tepat adalah ...", options:["Selalu memilih solusi paling murah.","Memilih solusi B karena lebih mahal berarti lebih baik.","Membandingkan biaya, kebutuhan, keandalan, risiko, dan dampak sebelum memutuskan."], answer:2, explain:"Keputusan yang baik mempertimbangkan beberapa kriteria. Solusi terbaik adalah yang paling sesuai dengan kebutuhan dan bukti, bukan semata-mata murah atau mahal."}
];
let caseIndex=0, caseAnswered=Array(cases.length).fill(false);
function renderCase(){
 const c=cases[caseIndex];
 $("caseTitle").textContent=c.title; $("caseIntro").textContent=c.intro;
 $("questionText").textContent=c.question; $("caseNumber").textContent=String(caseIndex+1).padStart(2,"0");
 $("caseCount").textContent=`TANTANGAN ${caseIndex+1} DARI ${cases.length}`;
 $("caseProgress").style.width=`${((caseIndex+1)/cases.length)*100}%`;
 $("caseDots").innerHTML=cases.map((_,i)=>`<span class="case-dot ${i===caseIndex?"active":caseAnswered[i]?"done":""}"></span>`).join("");
 $("caseFeedback").textContent="";
 $("nextCase").disabled=!caseAnswered[caseIndex];
 $("nextCase").textContent=caseIndex===cases.length-1?"Lihat ringkasan ✓":"Kasus berikutnya →";
 $("answerList").innerHTML="";
 c.options.forEach((opt,i)=>{
  const b=document.createElement("button"); b.className="answer-option";
  b.innerHTML=`<span class="letter">${String.fromCharCode(65+i)}</span><span>${opt}</span>`;
  b.addEventListener("click",()=>answerCase(i)); $("answerList").appendChild(b);
 });
 if(caseAnswered[caseIndex]) {
  [...$("answerList").children].forEach((b,i)=>{b.disabled=true;if(i===c.answer)b.classList.add("correct");});
  $("caseFeedback").textContent=c.explain;
 }
}
function answerCase(index){
 if(caseAnswered[caseIndex])return;
 caseAnswered[caseIndex]=true; const c=cases[caseIndex];
 [...$("answerList").children].forEach((b,i)=>{b.disabled=true;if(i===c.answer)b.classList.add("correct");if(i===index&&i!==c.answer)b.classList.add("wrong");});
 $("caseFeedback").textContent=(index===c.answer?"Tepat! ":"Belum tepat. ")+c.explain;
 $("nextCase").disabled=false; $("caseDots").children[caseIndex].classList.add("done");
}
$("nextCase").addEventListener("click",()=>{
 if(caseIndex<cases.length-1){caseIndex++;renderCase();}
 else {$("caseFeedback").textContent=`Laboratorium selesai: ${caseAnswered.filter(Boolean).length} dari ${cases.length} tantangan telah dikerjakan. Pilih “Ulangi” untuk berlatih kembali.`;$("nextCase").textContent="Kembali ke awal ↺";$("nextCase").onclick=()=>{caseIndex=0;caseAnswered=Array(cases.length).fill(false);$("nextCase").onclick=null;renderCase();};}
});
$("resetCase").addEventListener("click",()=>{caseAnswered[caseIndex]=false;renderCase();});
renderCase();

$("showChecklist").addEventListener("click",()=>{$("checklist").classList.remove("highlight");void $("checklist").offsetWidth;$("checklist").classList.add("highlight");$("checklist").scrollIntoView({behavior:"smooth",block:"center"});});

const questions=[
 {q:"Apa tujuan utama berpikir kritis?",o:["Membantah semua pendapat orang lain.","Menerima informasi yang paling populer.","Menilai informasi dan alasan secara logis sebelum menyimpulkan.","Menghafal sebanyak mungkin informasi.","Mengambil keputusan secepat mungkin."],a:2,e:"Berpikir kritis menilai klaim, alasan, dan bukti secara rasional; bukan sekadar membantah atau menerima."},
 {q:"Kamu menerima berita yang mengejutkan dari grup percakapan. Tindakan terbaik adalah ...",o:["Meneruskannya agar tidak terlambat.","Memeriksa sumber asli dan membandingkan dengan sumber tepercaya lain.","Mempercayainya jika banyak yang membagikan.","Mengubah judul agar lebih menarik.","Menghapus semua berita dari grup."],a:1,e:"Verifikasi sumber primer dan konfirmasi independen membantu mengurangi risiko menyebarkan informasi keliru."},
 {q:"Pernyataan manakah yang paling jelas merupakan opini?",o:["Satu byte terdiri atas delapan bit dalam sistem komputasi umum.","File tersebut berukuran 2 MB menurut informasi properti file.","Komputer itu memiliki RAM 8 GB.","Menurut saya, aplikasi ini paling nyaman digunakan.","Rapat dimulai pukul 08.00 sesuai undangan."],a:3,e:"Frasa “menurut saya” menunjukkan penilaian subjektif. Opini dapat didukung alasan, tetapi bukan fakta yang sama untuk semua orang."},
 {q:"Seseorang mencoba aplikasi sekali, lalu menyimpulkan semua aplikasi sejenis buruk. Ini contoh ...",o:["Verifikasi silang.","Algoritma efisien.","Bukti primer.","Analisis seimbang.","Generalisasi berlebihan."],a:4,e:"Satu pengalaman terbatas tidak cukup untuk membuat kesimpulan tentang seluruh kelompok aplikasi."},
 {q:"Mengapa tanggal publikasi perlu diperiksa saat membaca informasi teknologi?",o:["Informasi teknologi dan konteksnya dapat berubah seiring waktu.","Tanggal selalu membuktikan informasi benar.","Artikel lama pasti salah.","Tanggal lebih penting daripada isi.","Agar tulisan tampak lebih resmi."],a:0,e:"Informasi lama bisa tidak lagi relevan. Tanggal perlu dipertimbangkan bersama sumber, bukti, dan konteks."},
 {q:"Apa yang dimaksud bias konfirmasi?",o:["Menguji semua kemungkinan secara seimbang.","Mengubah data agar sesuai standar.","Cenderung mencari atau menerima informasi yang mendukung keyakinan sendiri.","Menunda keputusan sampai data lengkap.","Membandingkan beberapa sumber independen."],a:2,e:"Bias konfirmasi membuat orang lebih memperhatikan bukti yang mendukung keyakinan awal dan mengabaikan bukti yang bertentangan."},
 {q:"Dalam memecahkan masalah, setelah masalah dirumuskan, langkah yang paling masuk akal adalah ...",o:["Memilih solusi pertama yang muncul.","Menyalahkan orang lain.","Mengabaikan data yang tidak cocok.","Mengumpulkan informasi dan bukti yang relevan.","Langsung menyatakan masalah selesai."],a:3,e:"Data yang relevan membantu memahami penyebab dan mengevaluasi alternatif solusi."},
 {q:"Grafik dapat menyesatkan jika ...",o:["Memiliki judul yang jelas.","Skala sumbu dipotong tanpa penjelasan sehingga perbedaan tampak berlebihan.","Sumber datanya dicantumkan.","Label sumbu mudah dipahami.","Rentang waktunya dijelaskan."],a:1,e:"Skala sumbu yang tidak proporsional atau tidak dijelaskan dapat mendistorsi persepsi terhadap besarnya perubahan."},
 {q:"Argumen yang kuat seharusnya ...",o:["Menggunakan huruf kapital sebanyak mungkin.","Didukung banyak tanda seru.","Menyerang orang yang tidak setuju.","Mengandalkan popularitas pembicara saja.","Memiliki klaim yang jelas, alasan relevan, dan bukti yang dapat diperiksa."],a:4,e:"Argumen yang kuat menghubungkan klaim dengan alasan dan bukti yang relevan, bukan sekadar gaya bahasa atau popularitas."},
 {q:"Apa tindakan paling bertanggung jawab ketika menemukan kesalahan pada informasi yang sudah kamu bagikan?",o:["Mengoreksi atau menarik informasi tersebut dan menjelaskan sumber koreksinya.","Membiarkannya agar tidak malu.","Menyalahkan orang yang pertama mengirim.","Menyebarkan informasi lain untuk mengalihkan perhatian.","Menghapus komentar orang lain."],a:0,e:"Tanggung jawab digital mencakup mengoreksi kesalahan secara terbuka agar dampak informasi keliru dapat dikurangi."}
];
let quizIndex=0, quizAnswers=Array(questions.length).fill(null), quizSubmitted=false;
function renderQuiz(){
 const q=questions[quizIndex], area=$("quizArea");
 $("quizProgress").style.width=`${((quizIndex+1)/questions.length)*100}%`;
 $("quizCounter").textContent=`SOAL ${quizIndex+1} DARI ${questions.length}`;
 $("liveScore").textContent=quizSubmitted?`${calcScore()}/100`:"—";
 $("prevQuestion").disabled=quizIndex===0;
 $("nextQuestion").disabled=quizAnswers[quizIndex]===null&&!quizSubmitted;
 $("nextQuestion").textContent=quizIndex===questions.length-1?(quizSubmitted?"Ulangi kuis ↺":"Lihat hasil ✓"):"Selanjutnya →";
 area.innerHTML=`<div class="question-text">${quizIndex+1}. ${q.q}</div><div class="quiz-options">${q.o.map((o,i)=>`<button class="quiz-option ${quizAnswers[quizIndex]===i?"selected":""}" data-answer="${i}"><span class="letter">${String.fromCharCode(65+i)}</span><span>${o}</span></button>`).join("")}</div>${quizSubmitted?`<div class="quiz-explanation"><strong>Pembahasan:</strong> ${q.e}</div>`:""}`;
 area.querySelectorAll(".quiz-option").forEach(btn=>btn.addEventListener("click",()=>{if(quizSubmitted)return;quizAnswers[quizIndex]=Number(btn.dataset.answer);renderQuiz();}));
 if(quizSubmitted){area.querySelectorAll(".quiz-option").forEach((btn,i)=>{btn.disabled=true;if(i===q.a)btn.classList.add("correct");if(quizAnswers[quizIndex]===i&&i!==q.a)btn.classList.add("wrong");});}
 $("quizResult").innerHTML=quizSubmitted&&quizIndex===questions.length-1?`<div class="result-score">${calcScore()}/100</div><p class="result-details">${resultMessage()}<br>Skor dihitung dari jawaban benar. Baca pembahasan pada setiap soal untuk memperdalam pemahaman.</p><button class="btn secondary" id="reviewWrong">Tinjau semua soal</button>`:"";
 const review=$("reviewWrong"); if(review)review.addEventListener("click",()=>{quizIndex=0;renderQuiz();});
}
function calcScore(){return Math.round(quizAnswers.reduce((sum,a,i)=>sum+(a===questions[i].a?1:0),0)/questions.length*100);}
function resultMessage(){const n=quizAnswers.filter((a,i)=>a===questions[i].a).length;return n>=9?"Sangat baik! Kamu menunjukkan pemahaman yang kuat tentang berpikir kritis.":n>=7?"Bagus! Periksa kembali pembahasan pada soal yang belum tepat.":n>=5?"Cukup baik. Pelajari kembali materi sumber informasi, bias, dan evaluasi bukti.":"Terus berlatih. Baca modul materi, kerjakan studi kasus, lalu coba kuis lagi.";}
$("prevQuestion").addEventListener("click",()=>{if(quizIndex>0){quizIndex--;renderQuiz();}});
$("nextQuestion").addEventListener("click",()=>{
 if(quizSubmitted){quizSubmitted=false;quizAnswers=Array(questions.length).fill(null);quizIndex=0;renderQuiz();return;}
 if(quizAnswers[quizIndex]===null)return;
 if(quizIndex<questions.length-1){quizIndex++;renderQuiz();}
 else if(quizAnswers.every(a=>a!==null)){quizSubmitted=true;quizIndex=0;renderQuiz();$("quizResult").innerHTML=`<div class="result-score">${calcScore()}/100</div><p class="result-details">${resultMessage()}<br>Skor dihitung dari jawaban benar. Gunakan tombol selanjutnya untuk membaca pembahasan setiap soal.</p><button class="btn secondary" id="reviewWrong">Lihat pembahasan soal →</button>`;$("reviewWrong").addEventListener("click",()=>{quizIndex=0;renderQuiz();});}
});
renderQuiz();

$("saveReflection").addEventListener("click",()=>{
 const val=$("reflectionText").value.trim();
 $("reflectionMessage").textContent=val?"Refleksi tersedia pada kolom ini selama halaman tetap terbuka. Untuk menyimpan permanen, gunakan tombol Unduh refleksi.":"Tuliskan refleksi terlebih dahulu.";
});
$("downloadReflection").addEventListener("click",()=>{
 const val=$("reflectionText").value.trim();
 if(!val){$("reflectionMessage").textContent="Tuliskan refleksi terlebih dahulu sebelum mengunduh.";return;}
 const blob=new Blob([`REFLEKSI BERPIKIR KRITIS - INFORMATIKA XI\nTanggal: ${new Date().toLocaleDateString("id-ID")}\n\n${val}\n`],{type:"text/plain;charset=utf-8"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="refleksi-berpikir-kritis.txt";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
 $("reflectionMessage").textContent="File refleksi berhasil disiapkan untuk diunduh.";
});
