/* dashboard-anggota.js — isi Dashboard Anggota (hanya lihat, tidak ada tombol ubah data) */
const SAYA=ANGGOTA[2]; // anggota yang sedang login: Budi Utomo
const tglSkrg=new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
const lblStatus=ok=>`<span class="lbl ${ok?'':'no'}">${ok?'Lunas':'Belum Bayar'}</span>`;
/* FITUR: banner selamat datang + kartu saldo kas kelas */
$('sapa').textContent=SAYA.nama;$('saldo').textContent=rp(saldo());$('tgl').textContent='Per '+tglSkrg;
/* FITUR: status iuran saya bulan berjalan + nominal iuran bulanan */
$('stsaya').innerHTML=lblStatus(sudahBayar(SAYA,BULAN_INI));$('iuran').textContent='Iuran bulanan '+rp(IURAN);
/* FITUR: 5 pembayaran terakhir saya */
$('riwayat').innerHTML=urut().filter(t=>t.jenis==='masuk'&&t.nim===SAYA.nim).slice(0,5).map(t=>`<tr><td>${tglId(t.tgl)}</td><td>${t.ket}</td><td>${rp(t.nom)}</td></tr>`).join('')||'<tr><td colspan="3">Belum ada pembayaran.</td></tr>';
/* FITUR: 5 pengeluaran kas kelas terakhir */
$('kas').innerHTML=urut().filter(t=>t.jenis==='keluar').slice(0,5).map(t=>`<tr><td>${tglId(t.tgl)}</td><td>${t.ket}</td><td class="keluarc">− ${rp(t.nom)}</td></tr>`).join('');