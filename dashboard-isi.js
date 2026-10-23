/* dashboard-isi.js — isi halaman Beranda (kartu ringkasan, grafik, status iuran, transaksi terbaru) */
/* FITUR: isi kartu ringkasan dari data (FR-06) */
$('saldo').textContent=rp(saldo());$('masuk').textContent=rp(jml('masuk'));$('keluar').textContent=rp(jml('keluar'));
/* FITUR: grafik batang 6 bulan (CSS murni, tanpa library) */
const mx=Math.max(1,...BULAN6.map(b=>Math.max(perBulan(b).i,perBulan(b).o)));
$('grafik').innerHTML=BULAN6.map(b=>{const {i,o}=perBulan(b);return `<div><i style="height:${i/mx*140}px;background:#3b82f6"></i><i style="height:${o/mx*140}px;background:#f08a4b"></i><br>${NAMA_BULAN[b-1].slice(0,3)}</div>`}).join('');
/* FITUR: status iuran bulan berjalan */
const belum=ANGGOTA.filter(a=>!sudahBayar(a,BULAN_INI)),lunas=ANGGOTA.length-belum.length;
$('ringkas').textContent=`${lunas} dari ${ANGGOTA.length} anggota sudah lunas`;$('progres').style.width=lunas/ANGGOTA.length*100+'%';
$('belum').innerHTML=belum.map(a=>`<p style="margin:6px 0">${a.nama} <span class="lbl no">Belum Bayar</span></p>`).join('');
/* FITUR: 5 transaksi terbaru */
$('isi').innerHTML=urut().slice(0,5).map(t=>`<tr><td>${tglId(t.tgl)}</td><td><span class="lbl ${t.jenis==='keluar'?'no':''}">${t.jenis==='masuk'?'Pemasukan':'Pengeluaran'}</span></td><td>${nama(t.nim)}</td><td>${t.ket}</td><td class="${t.jenis==='masuk'?'masuk':'keluarc'}">${t.jenis==='masuk'?'+':'−'} ${rp(t.nom)}</td></tr>`).join('');