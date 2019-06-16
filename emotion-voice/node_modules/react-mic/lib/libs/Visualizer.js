'use strict';

exports.__esModule = true;

var _AudioContext = require('./AudioContext');

var _AudioContext2 = _interopRequireDefault(_AudioContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawVisual = void 0;

var Visualizer = {
  visualizeSineWave: function visualizeSineWave(canvasCtx, canvas, width, height, backgroundColor, strokeColor) {
    var analyser = _AudioContext2.default.getAnalyser();

    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, width, height);

    function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser = _AudioContext2.default.getAnalyser();

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = backgroundColor;
      canvasCtx.fillRect(0, 0, width, height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = strokeColor;

      canvasCtx.beginPath();

      var sliceWidth = width * 1.0 / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * height / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  },
  visualizeFrequencyBars: function visualizeFrequencyBars(canvasCtx, canvas, width, height, backgroundColor, strokeColor) {
    var self = this;
    var analyser = _AudioContext2.default.getAnalyser();
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, width, height);

    function draw() {
      drawVisual = requestAnimationFrame(draw);

      analyser = _AudioContext2.default.getAnalyser();
      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = backgroundColor;
      canvasCtx.fillRect(0, 0, width, height);

      var barWidth = width / bufferLength * 2.5;
      var barHeight = void 0;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var rgb = self.hexToRgb(strokeColor);

        // canvasCtx.fillStyle = `rgb(${barHeight+100},${rgb.g},${rgb.b})`;
        canvasCtx.fillStyle = strokeColor;
        canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    draw();
  },
  visualizeFrequencyCircles: function visualizeFrequencyCircles(canvasCtx, canvas, width, height, backgroundColor, strokeColor) {
    var self = this;
    var analyser = _AudioContext2.default.getAnalyser();
    analyser.fftSize = 32;
    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, width, height);

    function draw() {

      drawVisual = requestAnimationFrame(draw);
      analyser = _AudioContext2.default.getAnalyser();
      analyser.getByteFrequencyData(dataArray);
      var reductionAmount = 3;
      var reducedDataArray = new Uint8Array(bufferLength / reductionAmount);

      for (var i = 0; i < bufferLength; i += reductionAmount) {
        var sum = 0;
        for (var j = 0; j < reductionAmount; j++) {
          sum += dataArray[i + j];
        }
        reducedDataArray[i / reductionAmount] = sum / reductionAmount;
      }

      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.beginPath();
      canvasCtx.arc(width / 2, height / 2, Math.min(height, width) / 2, 0, 2 * Math.PI);
      canvasCtx.fillStyle = backgroundColor;
      canvasCtx.fill();
      var stepSize = Math.min(height, width) / 2.0 / reducedDataArray.length;
      canvasCtx.strokeStyle = strokeColor;

      for (var _i = 0; _i < reducedDataArray.length; _i++) {
        canvasCtx.beginPath();
        var normalized = reducedDataArray[_i] / 128;
        var r = stepSize * _i + stepSize * normalized;
        canvasCtx.arc(width / 2, height / 2, r, 0, 2 * Math.PI);
        canvasCtx.stroke();
      }
    };
    draw();
  },
  hexToRgb: function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
};

exports.default = Visualizer;
module.exports = exports['default'];