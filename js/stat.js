'use strict';

var cloud = {
  x: 100,
  y: 10,

  color: '#ffffff',
  shadowColor: 'rgba(0, 0, 0, 0.7)',
  width: 420,
  maxHeight: 270,
  padding: 20
};

var column = {
  width: 40,
  height: 150, // максимальое значение высоты в диаграмме
  colorYou: 'rgba(255, 0, 0, 1)',
  gap: 50,
  baseLine: 10
};

var FONT_TYPE = 'PT-Mono';
var FONT_SIZE = 16; // px

var COLUMN_BASE_LINE = cloud.y + cloud.maxHeight - cloud.padding - FONT_SIZE;

var PLAYER_BAZE_LINE = cloud.y + cloud.maxHeight - FONT_SIZE;
var PLAYER_WIDTH = column.width + column.gap;

var renderCloud = function (options) {
  options.ctx.fillStyle = options.colorShadow;
  options.ctx.fillRect(options.x + 10, options.y + 10, options.width, options.height);

  options.ctx.fillStyle = options.colorCloud;
  options.ctx.fillRect(options.x, options.y, options.width, options.height);
};

var randomColor = function () { // по формату HSL
  return 'hsl(240, ' + Math.ceil(Math.random() * 100) + '%, 50%)';
};

window.renderStatistics = function (ctx, players, time) {
  renderCloud({
    ctx: ctx,
    colorCloud: cloud.color,
    colorShadow: cloud.shadow,
    x: cloud.x,
    y: cloud.y,
    width: cloud.width,
    height: cloud.maxHeight
  });

  ctx.fillStyle = '#000000';
  ctx.font = FONT_SIZE + 'px ' + FONT_TYPE;
  ctx.fillText('Ура вы победили!', cloud.x + cloud.padding, cloud.y + cloud.padding + FONT_SIZE);
  ctx.fillText('Список результатов:', cloud.x + cloud.padding, cloud.y + cloud.padding + FONT_SIZE + 20);

  var maxTime = Math.max.apply(null, time);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], cloud.x + cloud.padding * 2 + i * PLAYER_WIDTH, PLAYER_BAZE_LINE);

    time[i] = parseInt(time[i], 10);

    if (players[i] === 'Вы') {
      ctx.fillStyle = column.colorYou;
    } else {
      ctx.fillStyle = randomColor();
    }
    var columnX = cloud.x + cloud.padding * 2 + (column.width + column.gap) * i;
    var columnY = COLUMN_BASE_LINE - (column.height * time[i] / maxTime);
    ctx.fillRect(columnX, columnY, column.width, column.height * time[i] / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(time[i], columnX, columnY - cloud.padding / 2);
  }
};
