interface Smartphone {
  carica: number;
  numeroChiamate: number;
  durataChiamate: number[];
}

class PhoneUser implements Smartphone {
  carica: number;
  numeroChiamate: number;
  durataChiamate: number[];

  constructor(
    _carica: number,
    _numeroChiamate: number,
    _durataChiamate: number[]
  ) {
    this.carica = _carica;
    this.numeroChiamate = _numeroChiamate;
    this.durataChiamate = _durataChiamate;
  }
  ricarica(unaRicarica: number): void {
    this.carica += unaRicarica;
  }
  chiamata(minutiDurata: number): void {
    this.carica -= minutiDurata * 0.2;
    this.numeroChiamate++;
    this.durataChiamate.push(minutiDurata);
  }
  numero404(): number {
    return Number(this.carica.toFixed(3));
  }
  getNumeroChiamate(): number {
    return this.numeroChiamate;
  }
  azzeraChiamate(): void {
    this.numeroChiamate = 0;
    this.durataChiamate = [];
  }
}

const FirstUser = new PhoneUser(0, 0, []);
FirstUser.ricarica(20);
let totalSeconds = 0;
let refreshIntervalId;
const divTime = document.getElementById("div-time") as HTMLLabelElement;
const interruptCall = document.getElementById(
  "interrupt-call"
) as HTMLButtonElement;
const registerScreen = document.getElementById(
  "calls-register"
) as HTMLDivElement;
const button404 = document.getElementById("call-404") as HTMLButtonElement;
const spanRemainingTime = document.querySelector(
  "#remaining-credit span"
) as HTMLSpanElement;
const divRemainingCredit = document.getElementById(
  "remaining-credit"
) as HTMLSpanElement;
const a = document.getElementById("return-previews") as HTMLAnchorElement;
const callScreen = document.getElementById("call-screen") as HTMLDivElement;
const callButton = document.getElementById("call-button") as HTMLButtonElement;
const numbCallsSpan = document.querySelector(
  "#number-calls span"
) as HTMLSpanElement;

const interruptCallButtonAction = (): void => {
  const minutesLabel = document.getElementById("minutes") as HTMLLabelElement;
  const secondsLabel = document.getElementById("seconds") as HTMLLabelElement;

  numbCallsSpan.innerHTML = `${FirstUser.getNumeroChiamate()}`;
  console.log(`${minutesLabel.innerHTML}:${secondsLabel.innerHTML}`);
  FirstUser.chiamata(totalSeconds / 60);
  console.log(typeof (totalSeconds / 60));
  interruptCall.style.display = "none";
  divTime.style.display = "none";
  callButton.disabled = false;
  totalSeconds = 0;
  clearInterval(refreshIntervalId);
  const callDiv = document.createElement("div") as HTMLDivElement;
  callDiv.className = "d-flex justify-content-between px-2";
  registerScreen.appendChild(callDiv);
  const span1 = document.createElement("span") as HTMLDivElement;
  span1.innerText = "Chiamata";
  const span2 = document.createElement("span") as HTMLDivElement;
  span2.innerText = `${minutesLabel.innerHTML}:${secondsLabel.innerHTML}`;
  callDiv.appendChild(span1);
  callDiv.appendChild(span2);
  console.log(FirstUser.getNumeroChiamate());
};
const button404Action = () => {
  divRemainingCredit.style.display = "block";
  spanRemainingTime.innerHTML = `Il credito residuo è di: ${FirstUser.numero404().toFixed(
    2
  )}€`;
  console.log(FirstUser.numero404());
};

a.onclick = () => {
  callScreen.style.display = "none";
  registerScreen.style.display = "block";
  numbCallsSpan.innerHTML = `${FirstUser.getNumeroChiamate()} `;
  console.log(`${FirstUser.getNumeroChiamate()} `);
};

const goCallButton = document.getElementById("go-call") as HTMLButtonElement;
goCallButton.onclick = () => {
  callScreen.style.display = "block";
  registerScreen.style.display = "none";
};

const callButtonIstructions = (callButton: HTMLButtonElement): void => {
  divRemainingCredit.style.display = "none";
  callButton.setAttribute("disabled", "true");
  divTime.style.display = "block";
  refreshIntervalId = setInterval(setTime, 10);
  interruptCall.style.display = "block";
  function setTime() {
    const minutesLabel = document.getElementById("minutes") as HTMLLabelElement;
    const secondsLabel = document.getElementById("seconds") as HTMLLabelElement;
    ++totalSeconds;
    secondsLabel.innerHTML = pad(Number(Math.floor(totalSeconds % 60)));
    minutesLabel.innerHTML = pad(Number(Math.floor(totalSeconds / 60)));
  }
};
function pad(val: number) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
callButton.addEventListener("click", () => callButtonIstructions(callButton));
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
