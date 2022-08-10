// комиссия от продажи
let commissions;
// минимальная граница трех процентов
let minLimitOfThreePercent = 500;
// максимальная граница трех процентов
let maxLimitOfThreePercent = 1000;
// минимальная граница двух с половиной процентов
let minLimitOfTwoAndHalfPercent = 1001;
// максимальная граница двух с половиной процентов
let maxLimitOfTwoAndHalfPercent = 5000;
// минимальная граница с двух процентов
let minLimitOfTwoPercent = 5001;

function startplayComissions() {
	if (
		includesMoney.value >= minLimitOfThreePercent &&
		includesMoney.value <= maxLimitOfThreePercent
	) {
		commissions = 3;
	} else if (
		includesMoney.value >= minLimitOfTwoAndHalfPercent &&
		includesMoney.value <= maxLimitOfTwoAndHalfPercent
	) {
		commissions = 2.5;
	} else if (includesMoney.value >= minLimitOfTwoPercent) {
		commissions = 2;
	} else if (includesMoney.value < minLimitOfThreePercent) {
		// если ввел менше 500 единиц выводится ошибка
		commissions = 1;
	}
}
startplayComissions();
