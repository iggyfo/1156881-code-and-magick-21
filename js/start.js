'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 110;
const CLOUD_Y = 20;
const GAP = 10;
const FONT_GAP = 20;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;
const BAR_GAP = 50;
const HISTOGRAM_Y = CLOUD_Y + 3 * FONT_GAP + GAP;
const HISTOGRAM_X = CLOUD_X + GAP;
const TEXT_COLOR = `#000000`;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция рисования столбца гистограммы
const renderColumn = (ctx, names, barHeigth, time, color, shift) => {
  ctx.fillStyle = TEXT_COLOR;
  // Имя
  ctx.fillText(
      names,
      HISTOGRAM_X + (BAR_WIDTH + BAR_GAP) * shift,
      HISTOGRAM_Y + BAR_HEIGHT + 3 * GAP
  );
  // Время
  ctx.fillText(
      time,
      HISTOGRAM_X + (BAR_WIDTH + BAR_GAP) * shift,
      HISTOGRAM_Y
  );
  // Колонка
  ctx.fillStyle = color;
  ctx.fillRect(
      HISTOGRAM_X + (BAR_WIDTH + BAR_GAP) * shift,
      HISTOGRAM_Y + GAP + BAR_HEIGHT,
      BAR_WIDTH,
      -barHeigth
  );
};

// Функция округления значения времени прохождения
const getRoundArray = (array) => {
  let arrayRound = [];
  for (let i = 0; i <= array.length - 1; i++) {
    arrayRound.push(Math.round(array[i]));
  }
  return arrayRound;
};

// Функция получения максимального времени прохождения
const getMaxTime = (array) => {
  let maxElement = array[0];
  for (let i = 1; i <= array.length - 1; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
};

// Функция получения массива цветов колонок игроков
const getColumnColors = (array) => {
  let arrayColors = [];
  for (let i = 0; i <= array.length - 1; i++) {
    if (array[i] === `Вы`) {
      arrayColors.push(`rgba(255, 0, 0, 1)`);
    } else {
      arrayColors.push(`hsl(240, ` + (20 * (i + 1)).toString() + `%, 50%)`);
    }
  }
  return arrayColors;
};

window.renderStatistics = function (ctx, names, times) {

  // Округление значений времени в массиве
  const timesRound = getRoundArray(times);

  // Получем массив цветов столбцов игроков
  const arrayColors = getColumnColors(names);

  // Рисуем облако
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X - GAP, CLOUD_Y - GAP, `#ffffff`);

  // Рисуем заголовок окна
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, HISTOGRAM_X, CLOUD_Y + FONT_GAP);
  ctx.fillText(`Список результатов: `, HISTOGRAM_X, CLOUD_Y + 2 * FONT_GAP);

  // Рисуем гистограммму
  names.forEach(function (element, index) {
    // Вычисляем значение высоты столбца
    let barHeigth = (timesRound[index] * BAR_HEIGHT) / getMaxTime(timesRound);
    // Рисуем столбец
    renderColumn(ctx, element, barHeigth, timesRound[index], arrayColors[index], index);
  });
};
