





// тут будет логика конвертации валюты и добавлении элементов

  // находим value списака предлогаемых банков и вкладываем в переменную
  const banksListTransfersMoney = document.getElementById("banks_list_from_where_we_transfer_money");

  banksListTransfersMoney.addEventListener("change", PlayСonversion);
  
  // находим списак предлогаемых банков и вкладываем в переменную
  const banksTransfersMoney = document.getElementsByClassName("banks_from_where_we_transfer_money");
  
  // находим секцыю где отоброжаются те банки с которых можно перевести денги
  let returnFinalValue = document.getElementById("returnFinalValue");
  
  // находим input где записывается входяшие данные 
  let includesMoney = document.getElementById("includesMoney");
  
    // очистить список предложенных банков
    // returnFinalValue.innerHTML = "";
  
  // при клике на входяший инпут его value исчезает
  includesMoney.onclick=()=>{includesMoney.value = ""};
  
  // при клике на входяший инпут запускается функцыя которая подставляет значения исходяших банков а также комисионные и валюту
  let arrayVariable = "01";
  // includesMoney.addEventListener("input", PlayСonversion);


    
  // массывы которые показаны при выборе
  const GroupOne = ['Наличные AED Дубаи','Наличные USD Дубаи','Любой банк AED','Юрлицо AED','Юрлицо USD'];
  
  const GroupTwo = ['Тинькофф RUB','Альфабанк RUB','Сбербанк RUB','МИР RUB','Любой банк RUB','Юрлицо RUB'];
  
  const GroupThree = ['Наличные AED Дубаи','Наличные USD Дубаи','Любой банк AED'];
  
  const GroupFour = ['Юрлицо AED','Юрлицо USD'];

  // переменные выводяшего списка
  let returnFinalOne = document.getElementById("returnFinalOne");
  let returnFinalTwo = document.getElementById("returnFinalTwo");
  let returnFinalThree = document.getElementById("returnFinalThree");
  let returnFinalFour = document.getElementById("returnFinalFour");
  let returnFinalFive = document.getElementById("returnFinalFive");
  let returnFinalSix = document.getElementById("returnFinalSix");
  
  

  function PlayСonversion() {

    // определяем на каком масиве будем работать
    if(banksListTransfersMoney.value == 1){
      returnFinalOne.innerHTML = GroupOne[0];
      returnFinalTwo.innerHTML = GroupOne[1];
      returnFinalThree.style.display = "flex";
      returnFinalThree.innerHTML = GroupOne[2];
      returnFinalFour.style.display = "flex";
      returnFinalFour.innerHTML = GroupOne[3];
      returnFinalFive.style.display = "flex";
      returnFinalFive.innerHTML = GroupOne[4];
      returnFinalSix.style.display = "none";
      console.log("01")
    }
    else if(banksListTransfersMoney.value == 2){
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
      console.log("02")
    }
    else if(banksListTransfersMoney.value == 3){
      returnFinalOne.innerHTML = GroupThree[0];
      returnFinalTwo.innerHTML = GroupThree[1];
      returnFinalThree.style.display = "flex";
      returnFinalThree.innerHTML = GroupThree[2];
      returnFinalFour.style.display = "none";
      returnFinalFive.style.display = "none";
      returnFinalSix.style.display = "none";
      console.log("03")

    }
    else if(banksListTransfersMoney.value == 4){
      returnFinalOne.innerHTML = GroupFour[0];
      returnFinalTwo.innerHTML = GroupFour[1];
      returnFinalThree.style.display = "none";
      returnFinalFour.style.display = "none";
      returnFinalFive.style.display = "none";
      returnFinalSix.style.display = "none";
      console.log("04")
    }
  }
  

  
  
  
  

  // box комиссия
  let commission = document.getElementById("commission");
  
  // box курс конверсии
  let conversionКate = document.getElementById("conversionКate");
  
  // input где показан расчет конвертации
  let goingOutMoney = document.getElementById("goingOutMoney");