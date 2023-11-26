var PhoneUser = /** @class */ (function () {
    function PhoneUser(_carica, _numeroChiamate, _durataChiamate) {
        this.carica = _carica;
        this.numeroChiamate = _numeroChiamate;
        this.durataChiamate = _durataChiamate;
    }
    PhoneUser.prototype.ricarica = function (unaRicarica) {
        this.carica += unaRicarica;
    };
    PhoneUser.prototype.chiamata = function (minutiDurata) {
        this.carica -= minutiDurata * 0.2;
        this.numeroChiamate++;
        this.durataChiamate.push(minutiDurata);
    };
    PhoneUser.prototype.numero404 = function () {
        return Number(this.carica.toFixed(3));
    };
    PhoneUser.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    PhoneUser.prototype.azzeraChiamate = function () {
        this.numeroChiamate = 0;
        this.durataChiamate = [];
    };
    return PhoneUser;
}());
var FirstUser = new PhoneUser(0, 0, []);
FirstUser.ricarica(20);
var totalSeconds = 0;
var refreshIntervalId;
var divTime = document.getElementById("div-time");
var interruptCall = document.getElementById("interrupt-call");
var registerScreen = document.getElementById("calls-register");
var button404 = document.getElementById("call-404");
var spanRemainingTime = document.querySelector("#remaining-credit span");
var divRemainingCredit = document.getElementById("remaining-credit");
var a = document.getElementById("return-previews");
var callScreen = document.getElementById("call-screen");
var callButton = document.getElementById("call-button");
var numbCallsSpan = document.querySelector("#number-calls span");
var interruptCallButtonAction = function () {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    numbCallsSpan.innerHTML = "".concat(FirstUser.getNumeroChiamate());
    console.log("".concat(minutesLabel.innerHTML, ":").concat(secondsLabel.innerHTML));
    FirstUser.chiamata(totalSeconds / 60);
    console.log(typeof (totalSeconds / 60));
    interruptCall.style.display = "none";
    divTime.style.display = "none";
    callButton.disabled = false;
    totalSeconds = 0;
    clearInterval(refreshIntervalId);
    var callDiv = document.createElement("div");
    callDiv.className = "d-flex justify-content-between px-2";
    registerScreen.appendChild(callDiv);
    var span1 = document.createElement("span");
    span1.innerText = "Chiamata";
    var span2 = document.createElement("span");
    span2.innerText = "".concat(minutesLabel.innerHTML, ":").concat(secondsLabel.innerHTML);
    callDiv.appendChild(span1);
    callDiv.appendChild(span2);
    console.log(FirstUser.getNumeroChiamate());
};
var button404Action = function () {
    divRemainingCredit.style.display = "block";
    spanRemainingTime.innerHTML = "Il credito residuo \u00E8 di: ".concat(FirstUser.numero404().toFixed(2), "\u20AC");
    console.log(FirstUser.numero404());
};
a.onclick = function () {
    callScreen.style.display = "none";
    registerScreen.style.display = "block";
    numbCallsSpan.innerHTML = "".concat(FirstUser.getNumeroChiamate(), " ");
    console.log("".concat(FirstUser.getNumeroChiamate(), " "));
};
var goCallButton = document.getElementById("go-call");
goCallButton.onclick = function () {
    callScreen.style.display = "block";
    registerScreen.style.display = "none";
};
var callButtonIstructions = function (callButton) {
    divRemainingCredit.style.display = "none";
    callButton.setAttribute("disabled", "true");
    divTime.style.display = "block";
    refreshIntervalId = setInterval(setTime, 10);
    interruptCall.style.display = "block";
    function setTime() {
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        ++totalSeconds;
        secondsLabel.innerHTML = pad(Number(Math.ceil(totalSeconds % 60)));
        minutesLabel.innerHTML = pad(Number(Math.ceil(totalSeconds / 60)));
    }
};
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}
callButton.addEventListener("click", function () { return callButtonIstructions(callButton); });
interruptCall.addEventListener("click", interruptCallButtonAction);
button404.onclick = button404Action;
// const FirstUser = new PhoneUser(0, 0, []);
// const secondUser = new PhoneUser(0, 0, []);
// const thirdUser = new PhoneUser(0, 0, []);
// FirstUser.ricarica(20);
// console.log("Credito Residuo: " + FirstUser.numero404());
// FirstUser.chiamata(10);
// FirstUser.chiamata(3);
// console.log(
//   "Il numero di chiamate effettuate: " + FirstUser.getNumeroChiamate()
// );
// console.log("Credito Residuo: " + FirstUser.numero404());
// console.log(FirstUser.durataChiamate);
// secondUser.ricarica(30);
// console.log("Credito Residuo 2nd User: " + secondUser.numero404());
// secondUser.chiamata(20);
// secondUser.chiamata(10);
// secondUser.chiamata(30);
// console.log(
//   "Il numero di chiamate effettuate dal 2nd User: " +
//     secondUser.getNumeroChiamate()
// );
// console.log("Credito Residuo 2nd User: " + secondUser.numero404());
// console.log(secondUser.durataChiamate);
// thirdUser.ricarica(15);
// console.log("Credito Residuo 2nd User: " + thirdUser.numero404());
// thirdUser.chiamata(2);
// thirdUser.chiamata(5);
// thirdUser.chiamata(15);
// thirdUser.chiamata(11);
// console.log(
//   "Il numero di chiamate effettuate dal 3th User: " +
//     thirdUser.getNumeroChiamate()
// );
// console.log("Credito Residuo 3th User: " + thirdUser.numero404());
// console.log(thirdUser.durataChiamate);
