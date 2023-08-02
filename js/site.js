const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

let notlar = [
  {
    baslik: "Alışveriş Listesi",
    icerik: "Süt, ekmek, yumurta, meyve almayı unutma.",
  },
  {
    baslik: "Toplantı Hatırlatması",
    icerik: "Yarın saat 10:00'da müdürle toplantı var.",
  },
  {
    baslik: "Film Önerileri",
    icerik: "The Shawshank Redemption, Inception, Interstellar izlemeyi düşün.",
  },
  {
    baslik: "Doğum Günü Hediyesi",
    icerik: "Anne için doğum gününde çiçek veya kitap almayı planla.",
  },
];

let seciliNot = null;
$("#btnYeni").click(yeniTiklandi);
$("#btnSil").click(silTiklandi);
$("#frmNot").submit(formKabul);

function listele(secilecekNot = null) {
  $("#lstNotlar").html("");
  for (const not of notlar) {
    $("<a/>")
      .prop("not", not)
      .click(baslikTiklandi)
      .attr("href", "#")
      .text(not.baslik)
      .addClass("list-group-item list-group-item-action")
      .addClass(not == secilecekNot ? "active" : "")
      .appendTo("#lstNotlar");
  }
}

function baslikTiklandi(e) {
  e.preventDefault();
  let not = $(this).prop("not");
  seciliNot = not;
  $("#lstNotlar>a").removeClass("active");
  $(this).addClass("active");
  $("#txtBaslik").val(not.baslik);
  $("#txtIcerik").val(not.icerik);
}

function yeniTiklandi(e) {
  sifirla();
}

function silTiklandi(e) {
  if (seciliNot) {
    let index = notlar.indexOf(seciliNot);
    notlar.splice(index, 1);
    $("#lstNotlar>a.active").remove();
    verileriSakla();
  }
  sifirla();
}

function formKabul(e) {
  e.preventDefault();

  if (seciliNot) {
    seciliNot.baslik = $("#txtBaslik").val();
    seciliNot.icerik = $("#txtIcerik").val();
    $("#lstNotlar>a.active").text(seciliNot.baslik);
  } else {
    let yeniNot = {
      baslik: $("#txtBaslik").val(),
      icerik: $("#txtIcerik").val(),
    };
    notlar.unshift(yeniNot);
    listele(yeniNot);
    seciliNot = yeniNot;
  }
  verileriSakla();
}

function sifirla() {
  seciliNot = null;
  $("#lstNotlar>a").removeClass("active");
  $("#txtBaslik").val("").focus();
  $("#txtIcerik").val("");
}

function verileriSakla() {
  let json = JSON.stringify(notlar);
  localStorage["veri"] = json;
}

function verileriYukle() {
  let json = localStorage["veri"];
  if (localStorage["veri"]) {
    notlar = JSON.parse(json);
  }
}

listele();
