// тут будет логика конвертации валюты и добавлении элементов

// находим value списака предлогаемых банков и вкладываем в переменную
const banksListTransfersMoney = document.getElementById(
  "banks_list_from_where_we_transfer_money"
);

banksListTransfersMoney.addEventListener("change", PlayConversion);

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
  conversionKate.innerHTML = "";
  commission.innerHTML = "";
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

const GroupFour = ["Юрлицо AED", "Юрлицо USD"];

const element01 = `<option value="1" id="returnFinalOne" >${GroupOne[0]}</option>
<option value="2" id="returnFinalTwo">${GroupOne[1]}</option>
<option value="3" id="returnFinalThree">${GroupOne[2]}</option>
<option value="4" id="returnFinalFour">${GroupOne[3]}</option>
<option value="5" id="returnFinalFive">${GroupOne[4]}</option>`;

const element02 = `<option value="1" id="returnFinalOne" >${GroupTwo[0]}</option>
<option value="2" id="returnFinalTwo">${GroupTwo[1]}</option>
<option value="3" id="returnFinalThree">${GroupTwo[2]}</option>
<option value="4" id="returnFinalFour">${GroupTwo[3]}</option>
<option value="5" id="returnFinalFive">${GroupTwo[4]}</option>
<option value="5" id="returnFinalSix">${GroupTwo[5]}</option>`;

const element03 = `<option value="1" id="returnFinalOne" >${GroupThree[0]}</option>
<option value="2" id="returnFinalTwo">${GroupThree[1]}</option>
<option value="3" id="returnFinalThree">${GroupThree[2]}</option>`;

const element04 = `<option value="1" id="returnFinalOne" >${GroupFour[0]}</option>
<option value="2" id="returnFinalTwo">${GroupFour[1]}</option>`;

// переменные выводяшего списка
let returnFinalOne = document.getElementById("returnFinalOne");
let returnFinalTwo = document.getElementById("returnFinalTwo");
let returnFinalThree = document.getElementById("returnFinalThree");
let returnFinalFour = document.getElementById("returnFinalFour");
let returnFinalFive = document.getElementById("returnFinalFive");
let returnFinalSix = document.getElementById("returnFinalSix");
returnFinalValue.innerHTML = element01;
function PlayConversion() {
  finalSettlement();
  // определяем на каком масиве будем работать
  if (
    banksListTransfersMoney.value === "Наличные RUB РФ" ||
    banksListTransfersMoney.value === "Наличные USD РФ" ||
    banksListTransfersMoney.value === "Наличные EUR РФ"
  ) {
    returnFinalValue.innerHTML = element01;
  } else if (
    banksListTransfersMoney.value === "Наличные USD Дубаи" ||
    banksListTransfersMoney.value === "Наличные AED Дубаи"
  ) {
    returnFinalValue.innerHTML = element02;
  } else if (
    banksListTransfersMoney.value === "Тинькофф RUB" ||
    banksListTransfersMoney.value === "Альфабанк RUB" ||
    banksListTransfersMoney.value === "Сбербанк RUB" ||
    banksListTransfersMoney.value === "МИР RUB" ||
    banksListTransfersMoney.value === "Любой банк RUB"
  ) {
    returnFinalValue.innerHTML = element03;
  } else if (
    banksListTransfersMoney.value === "Юрлицо RUB" ||
    banksListTransfersMoney.value === "Юрлицо USD"
  ) {
    returnFinalValue.innerHTML = element04;
  }
}

// box комиссия
let commission = document.getElementById("commission");

// box курс конверсии
let conversionKate = document.getElementById("conversionKate");

// input где показан расчет конвертации
let goingOutMoney = document.getElementById("goingOutMoney");

// по курсам валют RUB/AED
let CoursAED = 3.667;
// по курсам валют RUB/USD
let CoursUSD;

function startCoursUSD() {
  fetch("https://garantex.io/api/v2/depth?market=usdtrub")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      CoursUSD = data.asks[0].price;
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

// определяем какую валюту покупают
let whatCurrencyBuy;

function finalSettlement() {
  // функцыя startplayComissions запускается в фаиле commissions.js и высчитывает комисию каждый раз при вводе сумы для перевода
  startplayComissions();

  // проверка вводимой цыфры больше 500 и менше 10000
  if (commissions === 1) {
    commission.innerHTML = "";
    conversionKate.innerHTML = "";
    // ошибку делаем в красный цвет
    goingOutMoney.style.color = "red";
    goingOutMoney.innerHTML = "Ошибка";
  } else {
    // курс конверсии
    conversionKate.innerHTML = "";

    // box комиссия
    let valueComisions = (includesMoney.value / 100) * commissions;

    // определяем в какой валюте комисионные
    let valueCOurseName;
    if (
      banksListTransfersMoney.value === "Наличные USD РФ" ||
      banksListTransfersMoney.value === "Наличные USD Дубаи" ||
      banksListTransfersMoney.value === "Юрлицо USD"
    ) {
      valueCOurseName = "USD";
    } else if (banksListTransfersMoney.value === "Наличные AED Дубаи") {
      valueCOurseName = "AED";
    } else if (banksListTransfersMoney.value === "Наличные EUR РФ") {
      valueCOurseName = "EUR";
    } else {
      valueCOurseName = "RUB";
    }
    // после определения выводим комисионные
    commission.innerHTML = valueComisions.toFixed(2) + " " + valueCOurseName;

    // результат который выходит в конце обменна
    goingOutMoney.style.color = "#0c266c";
    goingOutMoney.innerHTML = "";

    // курс одного рубля к другим валютам
    const OneRubInUsd = 1 / CoursUSD;
    const OneRubInAed = OneRubInUsd.toFixed(4) * CoursAED;

    // курс одного долара к другим валютам
    const OneUsdInRub = CoursUSD;
    const OneUsdInAed = CoursAED;

    // курс одного евро к другим валютам
    const OneEurInUsd = CoursEUR;
    const OneEurInAed = 1 * OneEurInUsd * CoursAED;

    // курс одного дирхама к рублю
    const OneAedInRub = (1 / CoursAED) * CoursUSD;

    // 1-1  1-3 1-5 12-1 USA in AED
    if (
      (banksListTransfersMoney.value === "Наличные USD РФ" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "Наличные USD РФ" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "Наличные USD РФ" &&
        returnFinalValue.value === "4") ||
      (banksListTransfersMoney.value === "Юрлицо USD" &&
        returnFinalValue.value === "1")
    ) {
      conversionKate.innerHTML = OneUsdInAed.toFixed(4);
      let endResult =
        (includesMoney.value - (includesMoney.value / 100) * commissions) *
        OneUsdInAed;
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "AED";
    }

    // 1-2 1-5 12-2 USA in USD
    else if (
      (banksListTransfersMoney.value === "Наличные USD РФ" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "Наличные USD РФ" &&
        returnFinalValue.value === "5") ||
      (banksListTransfersMoney.value === "Юрлицо USD" &&
        returnFinalValue.value === "2")
    ) {
      conversionKate.innerHTML = "1";
      let endResult =
        includesMoney.value - (includesMoney.value / 100) * commissions;
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "USD";
    }

    // 2-1 2-3 2-4 5-1 5-3 6-1 6-3 7-1 7-3 8-1 8-3 9-1 9-3 10-1 10-3 11-1 RUB in AED
    else if (
      (banksListTransfersMoney.value === "Наличные RUB РФ" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "Наличные RUB РФ" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "Наличные RUB РФ" &&
        returnFinalValue.value === "4") ||
      (banksListTransfersMoney.value === "Тинькофф RUB" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "Тинькофф RUB" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "Альфабанк RUB" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "Альфабанк RUB" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "Сбербанк RUB" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "Сбербанк RUB" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "МИР RUB" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "МИР RUB" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "Любой банк RUB" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "Любой банк RUB" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "Юрлицо RUB" &&
        returnFinalValue.value === "1")
    ) {
      conversionKate.innerHTML = OneRubInAed.toFixed(4);
      let endResult =
        (includesMoney.value - (includesMoney.value / 100) * commissions) *
        OneRubInAed;
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "AED";
    }

    // 2-2 2-5 5-2 6-2 7-2 8-2 9-2 10-2 11-2 RUB in USD
    else if (
      (banksListTransfersMoney.value === "Наличные RUB РФ" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "Наличные RUB РФ" &&
        returnFinalValue.value === "5") ||
      (banksListTransfersMoney.value === "Тинькофф RUB" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "Альфабанк RUB" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "Сбербанк RUB" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "МИР RUB" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "Любой банк RUB" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "Юрлицо RUB" &&
        returnFinalValue.value === "2")
    ) {
      conversionKate.innerHTML = OneRubInAed.toFixed(4);
      let endResult =
        (includesMoney.value - (includesMoney.value / 100) * commissions) *
        OneRubInUsd;
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "USD";
    }

    // 3-1 3-3 3-4 EUR in AED
    else if (
      (banksListTransfersMoney.value === "Наличные EUR РФ" &&
        returnFinalValue.value === "1") ||
      (banksListTransfersMoney.value === "Наличные EUR РФ" &&
        returnFinalValue.value === "3") ||
      (banksListTransfersMoney.value === "Наличные EUR РФ" &&
        returnFinalValue.value === "4")
    ) {
      conversionKate.innerHTML = OneEurInAed.toFixed(4);
      let endResult =
        (includesMoney.value - (includesMoney.value / 100) * commissions) *
        OneEurInAed.toFixed(4);
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "AED";
    }

    // 3-2 3-5 EUR in USD
    else if (
      (banksListTransfersMoney.value === "Наличные EUR РФ" &&
        returnFinalValue.value === "2") ||
      (banksListTransfersMoney.value === "Наличные EUR РФ" &&
        returnFinalValue.value === "5")
    ) {
      conversionKate.innerHTML = OneEurInUsd;
      let endResult =
        (includesMoney.value - (includesMoney.value / 100) * commissions) *
        OneEurInUsd;
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "USD";
    }

    // 4-1 4-2 4-3 4-4 4-5 4-6 AED in RUB
    else if (banksListTransfersMoney.value === "Наличные AED Дубаи") {
      conversionKate.innerHTML = OneAedInRub.toFixed(4);
      let endResult =
        (includesMoney.value - (includesMoney.value / 100) * commissions) *
        OneAedInRub.toFixed(4);
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "RUB";
    }

    // 5-1 5-2 5-3 5-4 5-5 5-6 AED in RUB
    else if (banksListTransfersMoney.value === "Наличные USD Дубаи") {
      conversionKate.innerHTML = OneUsdInRub;
      let endResult =
        (includesMoney.value - (includesMoney.value / 100) * commissions) *
        OneUsdInRub;
      goingOutMoney.innerHTML = endResult.toFixed(2);
      whatCurrencyBuy = "RUB";
    }

    // показывает какую сумму переводят
    giveSum.innerHTML = includesMoney.value;

    // показывает какую валюту переводят
    givecurrency.innerHTML = valueCOurseName;
    // показывает какую сумму принимают
    getSum.innerHTML = goingOutMoney.innerHTML;
    // показывает какую валюту переводят
    getcurrency.innerHTML = whatCurrencyBuy;
  }
}

// form section start
// показывает какую сумму переводят
const giveSum = document.getElementById("giveSum");
// показывает какую валюту переводят
const givecurrency = document.getElementById("givecurrency");
// показывает какую сумму принимают
const getSum = document.getElementById("getSum");
// показывает какую валюту переводят
const getcurrency = document.getElementById("getcurrency");

const body = document.querySelector("body");
const sectionForm = document.getElementById("sectionForm");

// кнопка обмена
const exchangeButton = document
  .getElementById("exchangeButton")
  .addEventListener("click", exchangeRate);
function exchangeRate() {
  finalSettlement();
  // добавить класс body
  body.classList.add("active");
  // добавить  section form чтобы она появилась
  sectionForm.style.display = "flex";
  window.scrollTo(0, 0);
}

// аытоматический запускаем при загрузки саита функцыю рачета
setTimeout(finalSettlement, 600);

// отправка заявки на телеграмм

const token = "5501066756:AAFtBr6ZfYctHyCaqIyCSifbohxpbEBHGUE";
const ChatId = "-1001387813492";
const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;
// кнопка закрытия формы и отправки данных на телеграмм
document.getElementById("btnOrder").addEventListener("click", function (e) {
  // удаление класс body
  body.classList.remove("active");
  // удаление section form чтобы она скрылась
  sectionForm.style.display = "none";

  let message = `<b>какую сумму хотят перевести: ${giveSum.innerHTML} ${givecurrency.innerHTML}</b>\n
                <b>какую сумму получат: ${getSum.innerHTML} ${getcurrency.innerHTML}</b>`;

  axios.post(URI_API, {
    chat_id: ChatId,
    parse_mode: "html",
    text: message,
  });
});
