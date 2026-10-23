/* riwayat-iuran.js — Riwayat Iuran Anggota: hanya riwayat iuran milik anggota + riwayat pengeluaran kas */
const SAYA=ANGGOTA[2],PER=6;let naik=false,p1=1,p2=1; // Budi Utomo; naik = urutan tanggal
const bayar=()=>TRX.filter(t=>t.jenis==='masuk'&&t.nim===SAYA.nim);
/* FITUR: total iuran yang sudah dibayarkan */
$('total').textContent=rp(bayar().reduce((s,t)=>s+t.nom,0));
/* FITUR: pencarian (kata kunci di keterangan atau tanggal) */
const cocok=t=>{const q=$('cari').value.toLowerCase();return !q||(t.ket+' '+tglId(t.tgl)).toLowerCase().includes(q)};
/* FITUR: gambar satu tabel + pagination */
function gambar(isi,hal,data,baris,kolom,p,pindah){
 const maks=Math.max(1,Math.ceil(data.length/PER));p=Math.min(p,maks);
 $(isi).innerHTML=data.slice((p-1)*PER,p*PER).map(baris).join('')||`<tr><td colspan="${kolom}">Data tidak ditemukan.</td></tr>`;
 $(hal).innerHTML=`<small>Menampilkan ${data.length?(p-1)*PER+1:0}-${Math.min(p*PER,data.length)} dari ${data.length} data</small><span>`+Array.from({length:maks},(_,i)=>`<button class="tab ${i+1===p?'on':''}" onclick="${pindah}(${i+1})">${i+1}</button>`).join('')+'</span>'}
const h1=n=>{p1=n;tampil()},h2=n=>{p2=n;tampil()};
function tampil(){
 /* tabel 1: riwayat iuran saya */
 const a=bayar().filter(cocok).sort((x,y)=>naik?x.tgl.localeCompare(y.tgl):y.tgl.localeCompare(x.tgl));
 gambar('isi1','hal1',a,t=>`<tr><td>${tglId(t.tgl)}</td><td>${t.ket}</td><td><span class="lbl">Lunas</span></td><td>${rp(t.nom)}</td></tr>`,4,p1,'h1');
 /* tabel 2: riwayat pengeluaran kas kelas */
 const b=TRX.filter(t=>t.jenis==='keluar'&&cocok(t)).sort((x,y)=>y.tgl.localeCompare(x.tgl));
 gambar('isi2','hal2',b,t=>`<tr><td>${tglId(t.tgl)}</td><td>${t.ket}</td><td class="keluarc">− ${rp(t.nom)}</td></tr>`,3,p2,'h2')}
/* FITUR: klik judul Tanggal Pembayaran untuk mengurutkan naik/turun */
$('urut').onclick=()=>{naik=!naik;$('urut').textContent='Tanggal Pembayaran '+(naik?'▲':'▼');tampil()};
$('cari').addEventListener('input',()=>{p1=p2=1;tampil()});
tampil();