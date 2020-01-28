'use strict';

var COLOR_CLOUD = '#ffffff';
var COLOR_SHADOW_CLOUD = 'rgba(0, 0, 0, 0.7)';
var WIDTH_CLOUD = 420; // px
var HEIGHT_CLOUD = 270; // px
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_PADDING = 20; // px

var FONT_TYPE = 'PT-Mono';
var FONT_SIZE = 16; // px

var COLUMN_WIDTH = 40; // px
var CULUMN_HEIGHT = 150; // максимальое значение высоты в диаграмме
var COLUMN_COLOR_PLAYER = 'rgba(255, 0, 0, 1)';
var COLUMN_COLOR_OTHER = 240; // deg оснвного оттенка по hsl
var COLUMN_GAP = 50; // px
var COLUMN_BASE_LINE = CLOUD_Y + HEIGHT_CLOUD - CLOUD_PADDING - FONT_SIZE;

var PLAYER_BAZE_LINE = CLOUD_Y + HEIGHT_CLOUD - FONT_SIZE;
var PLAYER_WIDTH = COLUMN_WIDTH + COLUMN_GAP;

var renderCloud = function (ctx, x, y) {
  ctx.fillStyle = COLOR_SHADOW_CLOUD;
  ctx.fillRect(x + 10, y + 10, WIDTH_CLOUD, HEIGHT_CLOUD);

  ctx.fillStyle = COLOR_CLOUD;
  ctx.fillRect(x, y, WIDTH_CLOUD, HEIGHT_CLOUD);
};

var randomColor = function (h) { // по формату HSL
  var s = Math.ceil(Math.random() * 100);
  var l = 50;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

window.renderStatistics = function (ctx, players, time) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y);

  ctx.fillStyle = '#000000';
  ctx.font = FONT_SIZE + 'px ' + FONT_TYPE;
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_PADDING, CLOUD_Y + FONT_SIZE + CLOUD_PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_PADDING, CLOUD_Y + FONT_SIZE + CLOUD_PADDING + 20);

  var maxTime = Math.max.apply(null, time);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + CLOUD_PADDING * 2 + i * PLAYER_WIDTH, PLAYER_BAZE_LINE);
    time[i] = parseInt(time[i], 10);
    if (players[i] === 'Вы') {
      ctx.fillStyle = COLUMN_COLOR_PLAYER;
    } else {
      ctx.fillStyle = randomColor(COLUMN_COLOR_OTHER);
    }
    ctx.fillRect(CLOUD_X + CLOUD_PADDING * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, COLUMN_BASE_LINE - (CULUMN_HEIGHT * time[i] / maxTime), COLUMN_WIDTH, CULUMN_HEIGHT * time[i] / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(time[i], CLOUD_X + CLOUD_PADDING * 2 + (COLUMN_WIDTH + COLUMN_GAP) * i, COLUMN_BASE_LINE - CLOUD_PADDING / 2 - (CULUMN_HEIGHT * time[i] / maxTime));
  }
};
