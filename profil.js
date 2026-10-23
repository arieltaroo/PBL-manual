const pill = document.getElementById("userPill");
const dropdown = document.getElementById("dropdown");
const modal = document.getElementById("modalProfil");
const inNama = document.getElementById("inNama");
const inNim = document.getElementById("inNim");

// simpan per peran, jadi bendahara dan anggota tidak saling menimpa
const peran = document.querySelector(".user-role").textContent.trim();
const KUNCI = "profil_" + peran;

function inisial(nama) {
  return nama.trim().split(/\s+/).slice(0, 2).map(k => k[0]).join("").toUpperCase();
}

function terapkan(p) {
  document.getElementById("namaTop").textContent = p.nama;
  document.getElementById("ddNama").textContent = p.nama;
  document.getElementById("ddNim").textContent = p.nim ? "NIM " + p.nim : "NIM belum diisi";
  document.querySelector(".user-name").textContent = p.nama;
  document.querySelector(".avatar").textContent = inisial(p.nama);
  const sapa = document.getElementById("sapa");   // ada di dashboard anggota
  if (sapa) sapa.textContent = p.nama;
}

// muat profil tersimpan (kalau ada)
let profil = { nama: document.getElementById("namaTop").textContent.trim(), nim: "" };
try {
  const tersimpan = JSON.parse(localStorage.getItem(KUNCI));
  if (tersimpan) profil = tersimpan;
} catch (e) {}
terapkan(profil);

// buka / tutup menu kecil
pill.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdown.classList.toggle("show");
});
document.addEventListener("click", function () {
  dropdown.classList.remove("show");
});

// buka popup edit profil
function bukaModal() {
  inNama.value = profil.nama;
  inNim.value = profil.nim;
  modal.classList.add("show");
  dropdown.classList.remove("show");
}
function tutupModal() {
  modal.classList.remove("show");
}

document.getElementById("btnEditProfil").addEventListener("click", function (e) {
  e.preventDefault();
  bukaModal();
});
document.querySelector(".user-profile").addEventListener("click", bukaModal);
document.getElementById("tutupProfil").addEventListener("click", tutupModal);
document.getElementById("batalProfil").addEventListener("click", tutupModal);
modal.addEventListener("click", function (e) {
  if (e.target === modal) tutupModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") tutupModal();
});

// simpan
document.getElementById("simpanProfil").addEventListener("click", function () {
  const nama = inNama.value.trim();
  if (!nama) {
    alert("Nama tidak boleh kosong");
    return;
  }
  profil = { nama: nama, nim: inNim.value.trim() };
  try { localStorage.setItem(KUNCI, JSON.stringify(profil)); } catch (e) {}
  terapkan(profil);
  tutupModal();
});