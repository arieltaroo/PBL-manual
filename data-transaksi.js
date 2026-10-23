/* data-transaksi.js — Data Transaksi: tab, filter, pencarian, form pemasukan/pengeluaran, ubah/hapus */
let tab='semua',hal=1,edit=null,mode='masuk';const PER=8;
/* isi pilihan dropdown anggota (nama + NIM) dan bulan iuran */
$('fa').innerHTML='<option value="">Semua anggota</option>'+ANGGOTA.map(a=>`<option value="${a.nim}">${a.nama}</option>`).join('');
$('fNim').innerHTML='<option value="">Pilih anggota...</option>'+ANGGOTA.map(a=>`<option value="${a.nim}">${a.nama} — ${a.nim}</option>`).join('');
$('fBln').innerHTML=NAMA_BULAN.map((n,i)=>`<option value="${i}">${n}</option>`).join('');
/* FITUR: Pencarian & filter transaksi (FR-05) */
function data(){const q=$('cari').value.toLowerCase(),d=$('dari').value,s=$('sampai').value,a=$('fa').value;
 return urut().filter(t=>(!q||(nama(t.nim)+' '+t.nim+' '+t.ket+' '+t.tgl).toLowerCase().includes(q))&&(!d||t.tgl>=d)&&(!s||t.tgl<=s)&&(!a||t.nim===a))}
/* FITUR: Tampilkan tabel + pagination */
function tampil(){const semua=data();$('n0').textContent=semua.length;$('n1').textContent=semua.filter(t=>t.jenis==='masuk').length;$('n2').textContent=semua.filter(t=>t.jenis==='keluar').length;
 const l=tab==='semua'?semua:semua.filter(t=>t.jenis===tab),maks=Math.max(1,Math.ceil(l.length/PER));if(hal>maks)hal=maks;
 $('isi').innerHTML=l.slice((hal-1)*PER,hal*PER).map(t=>`<tr><td>${tglId(t.tgl)}</td><td><span class="lbl ${t.jenis==='keluar'?'no':''}">${t.jenis==='masuk'?'↑ Pemasukan':'↓ Pengeluaran'}</span></td><td>${nama(t.nim)}</td><td>${t.ket}</td><td class="${t.jenis==='masuk'?'masuk':'keluarc'}">${t.jenis==='masuk'?'+':'−'} ${rp(t.nom)}</td><td><button class="ikon" title="Ubah" onclick="ubah(${t.id})"><i class="bx bx-pencil"></i></button><button class="ikon" title="Hapus" onclick="hapus(${t.id})"><i class="bx bx-trash" style="color:var(--danger)"></i></button></td></tr>`).join('')||'<tr><td colspan="6">Data tidak ditemukan.</td></tr>';
 $('hal').innerHTML=`<small>Menampilkan ${l.length?(hal-1)*PER+1:0}-${Math.min(hal*PER,l.length)} dari ${l.length} data</small><span>`+Array.from({length:maks},(_,i)=>`<button class="tab ${i+1===hal?'on':''}" onclick="hal=${i+1};tampil()">${i+1}</button>`).join('')+'</span>'}
document.querySelectorAll('.tab[data-t]').forEach(b=>b.onclick=()=>{tab=b.dataset.t;hal=1;document.querySelectorAll('.tab[data-t]').forEach(x=>x.classList.toggle('on',x===b));tampil()});
['dari','sampai','fa','cari'].forEach(id=>$(id).addEventListener('input',()=>{hal=1;tampil()}));
/* FITUR: Buka form pemasukan/pengeluaran (baru atau ubah) */
function buka(m,t){mode=m;edit=t?t.id:null;$('jdl').textContent=(t?'Ubah ':'Catat ')+(m==='masuk'?'Pemasukan':'Pengeluaran');
 $('gAng').style.display=$('gBln').style.display=m==='masuk'?'':'none';$('gKet').style.display=m==='masuk'?'none':'';
 $('fNim').value=t?t.nim:'';$('fTgl').value=t?t.tgl:new Date().toISOString().slice(0,10);$('fNom').value=t?t.nom:(m==='masuk'?IURAN:'');
 $('fBln').value=t?Math.max(0,NAMA_BULAN.findIndex(n=>t.ket.includes(n))):BULAN_INI-1;$('fKet').value=t&&m==='keluar'?t.ket:'';$('err').textContent='';$('mb').classList.add('buka')}
const tutup=()=>$('mb').classList.remove('buka');
$('batal').onclick=tutup;$('mb').onclick=e=>{if(e.target.id==='mb')tutup()};
/* FITUR: Simpan data + validasi nominal angka (NFR-05) */
$('simpan').onclick=()=>{const nim=$('fNim').value,tgl=$('fTgl').value,nom=$('fNom').value.replace(/\./g,'').trim();let e='';
 if(mode==='masuk'&&!nim)e='Pilih nama anggota.';else if(!tgl)e='Tanggal wajib diisi.';else if(!/^\d+$/.test(nom)||+nom<=0)e='Nominal harus berupa angka lebih dari 0.';else if(mode==='keluar'&&!$('fKet').value.trim())e='Keterangan wajib diisi.';
 if(e){$('err').textContent=e;return}
 const r={jenis:mode,tgl,nom:+nom,nim:mode==='masuk'?nim:'',ket:mode==='masuk'?`Iuran Bulan ${NAMA_BULAN[$('fBln').value]} 2026`:$('fKet').value.trim()};
 if(edit)Object.assign(TRX.find(t=>t.id===edit),r);else TRX.push({id:Date.now(),...r});tutup();tampil()};
/* FITUR: Ubah & hapus transaksi (hapus dengan konfirmasi, NFR-05) */
function ubah(id){const t=TRX.find(x=>x.id===id);buka(t.jenis,t)}
function hapus(id){if(confirm('Hapus transaksi ini?')){TRX=TRX.filter(t=>t.id!==id);tampil()}}
tampil();const aksi=new URLSearchParams(location.search).get('aksi');if(aksi==='masuk'||aksi==='keluar')buka(aksi);

/* FITUR: tombol X dan tombol Esc menutup form */
$('tutupx').onclick=tutup;document.addEventListener('keydown',e=>{if(e.key==='Escape')tutup()});