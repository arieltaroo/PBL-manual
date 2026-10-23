/* data.js — data contoh (dummy) + fungsi bantu hitung. Nanti diganti data MySQL lewat PHP. */
const NAMA_BULAN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const ANGGOTA=[['3312601044','Ariel'],['3312601045','Charisa Dwi Putri'],['3312601046','Budi Utomo'],['3312601047','Siti Aminah'],['3312601048','Rizky Pratama'],['3312601049','Dewi Lestari'],['3312601050','Andi Saputra'],['3312601051','Nur Halimah'],['3312601052','Fajar Nugroho']].map(([nim,nama])=>({nim,nama}));
const IURAN=50000, BULAN_INI=10, BULAN6=[5,6,7,8,9,10];
let TRX=[]; // {id,tgl,jenis:'masuk'|'keluar',nim,ket,nom}
/* FITUR: data contoh pemasukan iuran per bulan (jumlah anggota yang sudah bayar) */
[[5,7],[6,8],[7,9],[8,9],[9,8],[10,6]].forEach(([b,n])=>ANGGOTA.slice(0,n).forEach((a,i)=>TRX.push({tgl:`2026-${String(b).padStart(2,'0')}-0${i+1}`,jenis:'masuk',nim:a.nim,ket:`Iuran Bulan ${NAMA_BULAN[b-1]} 2026`,nom:IURAN})));
/* FITUR: data contoh pengeluaran kas (FR-04) */
[['2026-05-20','Beli spidol & penghapus',45000],['2026-07-15','Fotokopi materi',120000],['2026-09-10','Cetak banner kelas',150000],['2026-10-08','Konsumsi rapat kelas',85000]].forEach(([tgl,ket,nom])=>TRX.push({tgl,jenis:'keluar',nim:'',ket,nom}));
TRX.forEach((t,i)=>t.id=i+1);
/* ===== Fungsi bantu ===== */
const $=id=>document.getElementById(id);
const rp=n=>'Rp '+n.toLocaleString('id-ID');
const nama=nim=>(ANGGOTA.find(a=>a.nim===nim)||{nama:'-'}).nama;
const tglId=s=>s.split('-').reverse().join('/');
const bln=t=>+t.tgl.slice(5,7);
const urut=()=>[...TRX].sort((a,b)=>b.tgl.localeCompare(a.tgl)||b.id-a.id);
const jml=(j,f=()=>true)=>TRX.filter(t=>t.jenis===j&&f(t)).reduce((s,t)=>s+t.nom,0);
const saldo=()=>jml('masuk')-jml('keluar'); // FITUR: saldo otomatis = pemasukan - pengeluaran (FR-06, NFR-06)
const perBulan=b=>({i:jml('masuk',t=>bln(t)===b),o:jml('keluar',t=>bln(t)===b)});
const sudahBayar=(a,b)=>TRX.some(t=>t.jenis==='masuk'&&t.nim===a.nim&&t.ket.includes(NAMA_BULAN[b-1])); // status iuran per bulan
/* FITUR: pencarian di topbar — isi dari ?q= dan tekan Enter untuk membuka Data Transaksi (FR-05) */
if($('cari')){$('cari').value=new URLSearchParams(location.search).get('q')||'';
 if(!location.pathname.includes('data-transaksi'))$('cari').addEventListener('keydown',e=>{if(e.key==='Enter')location.href='data-transaksi.html?q='+encodeURIComponent($('cari').value)})}