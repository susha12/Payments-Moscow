// тут будет логика конвертации валюты и добавлении элементов

// находим value списака предлогаемых банков и вкладываем в переменную
const banksListTransfersMoney = document.getElementById(
  "banks_list_from_where_we_transfer_money"
);

banksListTransfersMoney.addEventListener("change", PlayСonversion);



// находим списак предлогаемых банков и вкладываем в переменную
const banksTransfersMoney = document.getElementsByClassName(
  "banks_from_where_we_transfer_money"
);

// находим секцыю где отоброжаются те банки с которых можно перевести денги
let returnFinalValue = document.getElementById("returnFinalValue");

// находим input где записывается входяшие данные
let includesMoney = document.getElementById("includesMoney");

// очистить список предложенных банков
// returnFinalValue.innerHTML = "";

// при клике на входяший инпут обнуляем бокс ввода,комисию,курс конвертации и бокс получения
includesMoney.onclick = () => {
  includesMoney.value = "";
  conversionКate.innerHTML = "";
  commission.innerHTML =  "";
  goingOutMoney.innerHTML = "";
};

// при клике на входяший инпут запускается функцыя которая подставляет значения исходяших банков а также комисионные и валюту
let arrayVariable = "01";


// массывы которые показаны при выборе
const GroupOne = [
  "Наличные AED Дубаи",
  "Наличные USD Дубаи",
  "Любой банк AED",
  "Юрлицо AED",
  "Юрлицо USD",
];

const GroupTwo = [
  "Тинькофф RUB",
  "Альфабанк RUB",
  "Сбербанк RUB",
  "МИР RUB",
  "Любой банк RUB",
  "Юрлицо RUB",
];

const GroupThree = [
  "Наличные AED Дубаи",
  "Наличные USD Дубаи",
  "Любой банк AED",
];

const GroupFour = [
  "Юрлицо AED", 
  "Юрлицо USD"
];




// переменные выводяшего списка
let returnFinalOne = document.getElementById("returnFinalOne");
let returnFinalTwo = document.getElementById("returnFinalTwo");
let returnFinalThree = document.getElementById("returnFinalThree");
let returnFinalFour = document.getElementById("returnFinalFour");
let returnFinalFive = document.getElementById("returnFinalFive");
let returnFinalSix = document.getElementById("returnFinalSix");

function PlayСonversion() {
  returnFinalValue.value = returnFinalOne.value;
  finalSettlement();
  // определяем на каком масиве будем работать
  if (banksListTransfersMoney.value === "Наличные RUB РФ" || banksListTransfersMoney.value === "Наличные USD РФ"  || banksListTransfersMoney.value === "Наличные EUR РФ") {
    returnFinalOne.innerHTML = GroupOne[0];
    // returnFinalOne.value = "AED";
    returnFinalTwo.innerHTML = GroupOne[1];
    // returnFinalTwo.value = "USD";
    returnFinalThree.style.display = "flex";
    returnFinalThree.innerHTML = GroupOne[2];
    // returnFinalThree.value = "AED";
    returnFinalFour.style.display = "flex";
    returnFinalFour.innerHTML = GroupOne[3];
    // returnFinalFour.value = "AED";
    returnFinalFive.style.display = "flex";
    returnFinalFive.innerHTML = GroupOne[4];
    // returnFinalFive.value = "USD";
    returnFinalSix.style.display = "none";
    // console.log("01");
  } else if (banksListTransfersMoney.value === "Наличные USD Дубаи" || banksListTransfersMoney.value === "Наличные AED Дубаи" ) {
    returnFinalOne.innerHTML = GroupTwo[0];
    returnFinalTwo.innerHTML = GroupTwo[1];
    returnFinalThree.style.display = "flex";
    returnFinalThree.innerHTML = GroupTwo[2];
    returnFinalFour.style.display = "flex";
    returnFinalFour.innerHTML = GroupTwo[3];
    returnFinalFive.style.display = "flex";
    returnFinalFive.innerHTML = GroupTwo[4];
    returnFinalSix.style.display = "flex";
    returnFinalSix.innerHTML = GroupTwo[5];
    // console.log("02");
  } else if (banksListTransfersMoney.value === "Тинькофф RUB" || banksListTransfersMoney.value === "Альфабанк RUB" || banksListTransfersMoney.value === "Сбербанк RUB" || banksListTransfersMoney.value == "МИР RUB" || banksListTransfersMoney.value === "Любой банк RUB") {
    returnFinalOne.innerHTML = GroupThree[0];
    returnFinalTwo.innerHTML = GroupThree[1];
    returnFinalThree.style.display = "flex";
    returnFinalThree.innerHTML = GroupThree[2];
    returnFinalFour.style.display = "none";
    returnFinalFive.style.display = "none";
    returnFinalSix.style.display = "none";
    // console.log("03");
  } else if (banksListTransfersMoney.value === "Юрлицо RUB" || banksListTransfersMoney.value === "Юрлицо USD") {
    returnFinalOne.innerHTML = GroupFour[0];
    returnFinalTwo.innerHTML = GroupFour[1];
    returnFinalThree.style.display = "none";
    returnFinalFour.style.display = "none";
    returnFinalFive.style.display = "none";
    returnFinalSix.style.display = "none";
    // console.log("04");
  }
}

// box комиссия
let commission = document.getElementById("commission");

// box курс конверсии
let conversionКate = document.getElementById("conversionКate");

// input где показан расчет конвертации
let goingOutMoney = document.getElementById("goingOutMoney");

// кнопка обмена
let exchangeButton = document.getElementById("exchangeButton");

// по курсам валют RUB/AED
let CoursAED = 3.667;
console.log("CoursUSD in AED= " + CoursAED);
// по курсам валют RUB/USD
let CoursUSD;

function startCoursUSD() {
  fetch("https://garantex.io/api/v2/depth?market=usdtrub")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      CoursUSD = data.asks[0].price;
      console.log("CoursUSD in RUB garantex = " + CoursUSD);
    });
}
startCoursUSD();

// по курсам валют EUR/USD
let CoursEUR;

// Обновляем курс валют EUR/USD раз в 10 минут
setTimeout(startCoursEUR, 600000);

function startCoursEUR() {
  fetch("https://quotes.instaforex.com/api/quotesTick?q=eurusd")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      CoursEUR = data[0].ask;
      console.log("CoursEUR in  USD instaforex = " + CoursEUR);
    });
}
startCoursEUR();



// собираем работаюший код
// при изменение ввода цыфр в поле Вы отдаете срабатывает функцыя
includesMoney.addEventListener("input", finalSettlement);

// при изменение списка откуда переводим срабатывает функцыя куда переводим
banksListTransfersMoney.addEventListener("input", finalSettlement);

// при изменение списка куда переводим срабатывает функцыя куда переводим
returnFinalValue.addEventListener("input", finalSettlement);



function finalSettlement(){
  // функцыя startplayComissions запускается в фаиле commissions.js и высчитывает комисию каждый раз при вводе сумы для перевода
  startplayComissions();

  // проверка вводимой цыфры больше 500 и менше 10000
  if (commissions === 1){
    commission.innerHTML = "";
    conversionКate.innerHTML = "";
    // ошибку делаем в красный цвет
    goingOutMoney.style.color = "red";
    goingOutMoney.innerHTML = "Ошибка";

  }
  else{
      // курс конверсии
  conversionКate.innerHTML = "";

  // box комиссия
  let valueComisions = includesMoney.value / 100 * commissions ;

  // определяем в какой валюте комисионные
  let valueCOurseName;
  if(banksListTransfersMoney.value === "Наличные USD РФ" || banksListTransfersMoney.value === "Наличные USD Дубаи" || banksListTransfersMoney.value === "Юрлицо USD"){
    valueCOurseName = "USD";
    // console.log("yes")
  }
  else if(banksListTransfersMoney.value === "Наличные AED Дубаи"){
    valueCOurseName = "AED";
    // console.log("yes01")
  }
  else if(banksListTransfersMoney.value === "Наличные EUR РФ"){
    valueCOurseName = "EUR";
    // console.log("yes02")
  }
  else{
    valueCOurseName = "RUB";
    // console.log(banksListTransfersMoney.value)
  }
  // после определения выводим комисионные
  commission.innerHTML = valueComisions.toFixed(2) + " " + valueCOurseName ;

  // результат который выходит в конце обменна
  goingOutMoney.style.color = "#0c266c";
  goingOutMoney.innerHTML = "";


    // курс одного рубля к другим валютам
  const OneRubInUsd =  1  / CoursUSD;
  console.log("курс одного рубля к долару = " + OneRubInUsd.toFixed(4));
  // const OneRubInEur =  1  * CoursUSD * CoursEUR;
  // console.log("курс одного рубля к евро = " + OneRubInEur.toFixed(4) );
  const OneRubInAed =  OneRubInUsd.toFixed(4) * CoursAED;
  console.log("курс одного рубля к дирхаму = " + OneRubInAed.toFixed(4) );

  // курс одного долара к другим валютам
  const OneUsdInRub =  CoursUSD;
  console.log("курс одного долар к рублю = " + OneUsdInRub);
  // const OneUsdInEur =  CoursEUR;
  // // console.log("курс одного долар к евро = " + OneUsdInEur.toFixed(4));
  const OneUsdInAed = CoursAED;
  // console.log("курс одного долар к дирхаму = " + OneUsdInAed.toFixed(4));

  // курс одного евро к другим валютам
  // const OneEurInRub =  1  / CoursUSD / CoursEUR;
  // // console.log("курс одного evro к рублю = " + OneEurInRub.toFixed(4));
  const OneEurInUsd = CoursEUR;
  console.log("курс одного evro к долару = " + OneEurInUsd);
  const OneEurInAed = 1 * OneEurInUsd * CoursAED;
  console.log("курс одного evro к дирхаму = " + OneEurInAed.toFixed(4));

  // курс одного дирхама к рублю
  const OneAedInRub = 1 / CoursAED * CoursUSD;
  console.log("курс одного дирхама к rublu = " + OneAedInRub.toFixed(4));
  // const OneAedInUsd = 1 / CoursAED.toFixed(4);
  // // console.log("курс одного дирхама к dolars = " + OneAedInUsd.toFixed(4));
  // const OneAedInEur = 1 / CoursAED.toFixed(4) * CoursEUR;
  // // console.log("курс одного дирхама к euro = " + OneAedInEur.toFixed(4));
  
    // 1-1  1-3 1-5 12-1 USA in AED
  if((banksListTransfersMoney.value === "Наличные USD РФ" && returnFinalValue.value === "1" ) || (banksListTransfersMoney.value === "Наличные USD РФ" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Наличные USD РФ" && returnFinalValue.value === "4") || (banksListTransfersMoney.value === "Юрлицо USD" && returnFinalValue.value === "1")) {
    conversionКate.innerHTML = OneUsdInAed.toFixed(4);
    let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneUsdInAed;
    goingOutMoney.innerHTML = endResult.toFixed(2);
  }

    // 1-2 1-5 12-2 USA in USA
    else if((banksListTransfersMoney.value === "Наличные USD РФ" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Наличные USD РФ" && returnFinalValue.value === "5") || (banksListTransfersMoney.value === "Юрлицо USD" && returnFinalValue.value === "2")){
      conversionКate.innerHTML = "1";
      let endResult = includesMoney.value - (includesMoney.value / 100  * commissions);
      goingOutMoney.innerHTML = endResult.toFixed(2);
    }




    // 2-1 2-3 2-4 5-1 5-3 6-1 6-3 7-1 7-3 8-1 8-3 9-1 9-3 10-1 10-3 11-1 RUB in AED
    else if((banksListTransfersMoney.value === "Наличные RUB РФ" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Наличные RUB РФ" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Наличные RUB РФ" && returnFinalValue.value === "4") || (banksListTransfersMoney.value === "Тинькофф RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Тинькофф RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Альфабанк RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Альфабанк RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Сбербанк RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Сбербанк RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "МИР RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "МИР RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Любой банк RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Любой банк RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Юрлицо RUB" && returnFinalValue.value === "1")){
      conversionКate.innerHTML = OneRubInAed.toFixed(4);
      let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneRubInAed;
      goingOutMoney.innerHTML = endResult.toFixed(2);
    }

    // 2-2 2-5 5-2 6-2 7-2 8-2 9-2 10-2 11-2 RUB in USA
    else if((banksListTransfersMoney.value === "Наличные RUB РФ" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Наличные RUB РФ" && returnFinalValue.value === "5") || (banksListTransfersMoney.value === "Тинькофф RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Альфабанк RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Сбербанк RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "МИР RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Любой банк RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Юрлицо RUB" && returnFinalValue.value === "2")){
      conversionКate.innerHTML = OneRubInAed.toFixed(4);
      let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneRubInUsd;
      goingOutMoney.innerHTML = endResult.toFixed(2);
    }


    // 3-1 3-3 3-4 EUR in AED
    else if((banksListTransfersMoney.value === "Наличные EUR РФ" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Наличные EUR РФ" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Наличные EUR РФ" && returnFinalValue.value === "4")){
      conversionКate.innerHTML = OneEurInAed.toFixed(4);
      let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneEurInAed.toFixed(4);
      goingOutMoney.innerHTML = endResult.toFixed(2);
    }

    // 3-2 3-5 EUR in USA
    else if((banksListTransfersMoney.value === "Наличные EUR РФ" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Наличные EUR РФ" && returnFinalValue.value === "5")){
      conversionКate.innerHTML = OneEurInUsd;
      let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneEurInUsd;
      goingOutMoney.innerHTML = endResult.toFixed(2);
    }

    // 4-1 4-2 4-3 4-4 4-5 4-6 AED in RUB
    else if(banksListTransfersMoney.value === "Наличные AED Дубаи"){
      conversionКate.innerHTML = OneAedInRub.toFixed(4);
      let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneAedInRub.toFixed(4);
      goingOutMoney.innerHTML = endResult.toFixed(2);
    }

    // 5-1 5-2 5-3 5-4 5-5 5-6 AED in RUB
    else if(banksListTransfersMoney.value === "Наличные USD Дубаи"){
      conversionКate.innerHTML = OneUsdInRub;
      let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneUsdInRub;
      goingOutMoney.innerHTML = endResult.toFixed(2);
    }

    // 5-1 5-3 6-1 6-3 7-1 7-3 8-1 8-3 9-1 9-3 10-1 10-3 RUB in AED
    // else if((banksListTransfersMoney.value === "Тинькофф RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Тинькофф RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Альфабанк RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Альфабанк RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Сбербанк RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Сбербанк RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "МИР RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "МИР RUB" && returnFinalValue.value === "3") || (banksListTransfersMoney.value === "Любой банк RUB" && returnFinalValue.value === "1") || (banksListTransfersMoney.value === "Любой банк RUB" && returnFinalValue.value === "3")){
    //   conversionКate.innerHTML = OneRubInAed.toFixed(4);
    //   let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneRubInAed;
    //   goingOutMoney.innerHTML = endResult.toFixed(2);
    // }

    // 5-2 6-2 7-2 8-2 9-2 10-2 RUB in USA
    // else if((banksListTransfersMoney.value === "Тинькофф RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Альфабанк RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Сбербанк RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "МИР RUB" && returnFinalValue.value === "2") || (banksListTransfersMoney.value === "Любой банк RUB" && returnFinalValue.value === "2")){
    //   conversionКate.innerHTML = OneRubInAed.toFixed(4);
    //   let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneRubInUsd;
    //   goingOutMoney.innerHTML = endResult.toFixed(2);
    // }

    // 11-1 RUB in AED
    // else if(banksListTransfersMoney.value === "Юрлицо RUB" && returnFinalValue.value === "1"){
    //   conversionКate.innerHTML = OneRubInAed.toFixed(4);
    //   let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneRubInAed;
    //   goingOutMoney.innerHTML = endResult.toFixed(2);
    // }

    // 11-2 RUB in USA
    // else if(banksListTransfersMoney.value === "Юрлицо RUB" && returnFinalValue.value === "2"){
    //   conversionКate.innerHTML = OneRubInAed.toFixed(4);
    //   let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneRubInUsd;
    //   goingOutMoney.innerHTML = endResult.toFixed(2);
    // }

        // 12-1 USA in AED
  // if(banksListTransfersMoney.value === "Юрлицо USD" && returnFinalValue.value === "1") {
  //   conversionКate.innerHTML = OneUsdInAed.toFixed(4);
  //   let endResult = (includesMoney.value - (includesMoney.value / 100  * commissions)) * OneUsdInAed;
  //   goingOutMoney.innerHTML = endResult.toFixed(2);
  // }

    // 12-2 USA in USA
    // else if(banksListTransfersMoney.value === "Юрлицо USD" && returnFinalValue.value === "2"){
    //   conversionКate.innerHTML = "1";
    //   let endResult = includesMoney.value - (includesMoney.value / 100  * commissions);
    //   goingOutMoney.innerHTML = endResult.toFixed(2);
    // }

}











  }



// находим input где записывается входяшие данные
includesMoney;
// box курс конверсии
conversionКate;
// input где показан расчет конвертации
goingOutMoney;
// комиссия от продажи
// commissions;
//курс EUR/USD
CoursEUR;
//курс USA/AED
CoursAED = 3.667;
//курс RUB/USD
CoursUSD;
// где выбираем откуда переводим
// console.log(banksListTransfersMoney.value)
// где выбираем куда переводим
// console.log(returnFinalValue.value)



// аытоматический запускаем при загрузки саита функцыю рачета
setTimeout(finalSettlement, 600);
