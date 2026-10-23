const inputPw = document.getElementById("password");
const mata = document.getElementById("mata");

// lihat / sembunyikan password
mata.addEventListener("click", function () {
  if (inputPw.type === "password") {
    inputPw.type = "text";
    mata.className = "bx bx-hide";
  } else {
    inputPw.type = "password";
    mata.className = "bx bx-show";
  }
});