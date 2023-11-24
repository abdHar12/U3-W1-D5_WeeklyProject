interface Smartphone {
  carica: number;
  numeroChiamate: number;
  durataChiamate: number[];
}

class User implements Smartphone {
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

const FirstUser = new User(0, 0, []);
const secondUser = new User(0, 0, []);
const thirdUser = new User(0, 0, []);

FirstUser.ricarica(20);
console.log("Credito Residuo: " + FirstUser.numero404());
FirstUser.chiamata(10);
FirstUser.chiamata(3);
console.log(
  "Il numero di chiamate effettuate: " + FirstUser.getNumeroChiamate()
);
console.log("Credito Residuo: " + FirstUser.numero404());
console.log(FirstUser.durataChiamate);

secondUser.ricarica(30);
console.log("Credito Residuo 2nd User: " + secondUser.numero404());
secondUser.chiamata(20);
secondUser.chiamata(10);
secondUser.chiamata(30);
console.log(
  "Il numero di chiamate effettuate dal 2nd User: " +
    secondUser.getNumeroChiamate()
);
console.log("Credito Residuo 2nd User: " + secondUser.numero404());
console.log(secondUser.durataChiamate);

thirdUser.ricarica(15);
console.log("Credito Residuo 2nd User: " + thirdUser.numero404());
thirdUser.chiamata(2);
thirdUser.chiamata(5);
thirdUser.chiamata(15);
thirdUser.chiamata(11);
console.log(
  "Il numero di chiamate effettuate dal 3th User: " +
    thirdUser.getNumeroChiamate()
);
console.log("Credito Residuo 3th User: " + thirdUser.numero404());
console.log(thirdUser.durataChiamate);
