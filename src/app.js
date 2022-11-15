// Requirements:
// 1. Receive an array of numbers or of arrays of numbers to be processed.
// 2. Receive an object of option properties to be applied on bar chart.
// 3. Create axes, ticks, title depending on the data range.
// 4. Draw bar chart and add proper labels with the options applied.
// 5. (optional)Let user decide which order or colours of stacked data to be displayed.
// padding for bar graph
const padding = 100;
// axis ticks length
const tickLength = 10;
// function to convert string of data to an array
function strToArray(strData) {
  const numbers = strData.split(",");
  const arrayData = [];

  for (let number of numbers) {
    arrayData.push(number.trim());
  }

  return arrayData;
}
// function to set parameters for drawBarChart
function $setParameter() {
  const rawData = $(".saved_data");
  const data = [];

  for (let i = 0; i < rawData.length; i++) {
    data.push(strToArray(rawData[i].innerText));
  }

  const options = {
    barWidth: $("#barwidth").val(),
    barHeight: $("#barheight").val(),
    barSpace: $("#barspace").val(),
    barColour: $("#barcolour").val(),
    barLineWidth: $("#barlinewidth").val() || "1",
    barLineColour: $("#barlinecolour").val() || "black",
    labelPosition: $("#labelposition").val(),
    labelColour: $("#labelcolour").val() || "black",
    axisWidth: $("#axiswidth").val() || "1",
    axisColour: $("#axiscolour").val() || "black",
    titleText: $("#titletext").val() || "Bar Chart by Jack Kang",
    titleSize: $("#titlesize").val() || "20",
    titleColour: $("#titlecolour").val() || "blue"
  };

  const element = $("#barchart");

  return [data, options, element];
}
// function to check if input is valid
function validInput(input) {
  const numberRegex = /\d|\.|\s|\,|\[|\]/g;

  return numberRegex.test(input);
}
// function to display error messages
function errorMsg(errorType) {
  let errorMessage = "";

  switch (errorType) {
  case "WIDTH_OUT_OF_LIMIT":
    errorMessage =
      "Width is out of boundary. Please set the bar width to a smaller value.";
    break;

  case "HEIGHT_OUT_OF_LIMIT":
    errorMessage =
      "Height is out of boundary. Please set the bar height to a smaller value.";
    break;

  case "INVALID_DATA":
    errorMessage = "Invalid input detected. Please enter numbers only.";
    break;

  case "INVALD_LENGTH":
    errorMessage =
      "The number of values should match the previous entry. Please try again.";
    break;

  default:
    break;
  }

  return alert(errorMessage);
}
// function to check if input data is valid
function isValidData(arrayData) {
  for (let data of arrayData) {
    if (!validInput(data) || !data || isNaN(data)) {
      return false;
    }
  }

  return true;
}
// function to check if input data has the same length as previous entry
function $isSameLength(arrayData) {
  let saveData = "";

  if ((saveData = $(".saved_data")[0])) {
    return strToArray(saveData.innerText).length === arrayData.length;
  }

  return true;
}
// function to add data on the page
function addData(strData) {
  const dataEntry = document.createElement("p");
  const rawArray = strToArray(strData);

  if (isValidData(rawArray) && $isSameLength(rawArray)) {
    dataEntry.setAttribute("type", "text");
    dataEntry.setAttribute("class", "saved_data");
    dataEntry.innerText = rawArray;
    $("#datalist").append(dataEntry);
  } else if (!isValidData(rawArray)) {
    errorMsg("INVALID_DATA");
  } else if (!$isSameLength(rawArray)) {
    errorMsg("INVALID_LENGTH");
  }
}
// get maximum value of x-axis
function xAxisMax(data) {
  return data[0].length;
}
// get maximum value of y-axis
function yAxisMax(data) {
  let yAxisMaxVal = 0;

  for (let i = 0; i < data.length; i++) {
    yAxisMaxVal += Math.max(...data[i]);
  }

  return yAxisMaxVal;
}
// check if created data bars are out of bounds
function isOutOfBounds(data, options, canvasProps) {
  const {barWidth, barHeight, barSpace} = options;
  const {canvasWidth, canvasHeight} = canvasProps;

  let error = false;
  const xAxisLength = canvasWidth - padding * 2;
  const yAxisLength = canvasHeight - padding * 2;

  if (Math.round(yAxisMax(data) * 1.25) * barHeight > yAxisLength) {
    error = true;
    errorMsg("HEIGHT_OUT_OF_LIMIT");
  }
  if (
    xAxisMax(data) * barWidth + (xAxisMax(data) + 1) * barSpace >
    xAxisLength
  ) {
    error = true;
    errorMsg("WIDTH_OUT_OF_LIMIT");
  }
  return error;
}
// function to create a label
function $addLabel(pos, content, options) {
  $("#barchart").label(pos, content, options);
}
// function to create ticks on y-axis
function $yAxisTicks(data, axisColour, canvasHeight) {
  const tickNumber = Math.round(yAxisMax(data) * 1.25);
  const tickWidth = (canvasHeight - padding * 2) / tickNumber;

  for (let i = 0; i < tickNumber; i++) {
    $("#barchart").line(
      {x: padding,
        y: canvasHeight - padding - i * tickWidth},
      {x: padding - tickLength,
        y: canvasHeight - padding - i * tickWidth},
      {
        color: axisColour
      }
    );
    $addLabel({x: padding - 20, y: canvasHeight - padding - i * tickWidth - 5}, i
      , {color: axisColour});
  }
}
// function to draw a rectangle
function $drawRect(points, options) {
  const {tLeft, bLeft, bRight, tRight} = points;
  const {barLineWidth: stroke, barLineColour: color} = options;

  $("#barchart").line({x: tLeft[0], y: tLeft[1]}, {x: tRight[0], y: tRight[1]}, {
    stroke, color
  });
  $("#barchart").line({x: tRight[0], y: tRight[1]}, {x: bRight[0], y: bRight[1]}, {
    stroke, color
  });
  $("#barchart").line({x: bRight[0], y: bRight[1]}, {x: bLeft[0], y: bLeft[1]}, {
    stroke, color
  });
  $("#barchart").line({x: bLeft[0], y: bLeft[1]}, {x: tLeft[0], y: tLeft[1]}, {
    stroke, color
  });
}
// function to draw x and y-axes
function $drawAxes(options, canvasProps) {
  const {axisWidth: stroke, axisColour: color} = options;
  const {canvasWidth, canvasHeight} = canvasProps;

  $("#barchart").line({x: padding, y: padding}, {x: padding, y: canvasHeight - padding}, {
    stroke, color
  });
  $("#barchart").line({x: padding, y: canvasHeight - padding},
    {x: canvasWidth - padding, y: canvasHeight - padding},
    {
      stroke,
      color
    }
  );
}
// function to draw bars
function $drawBars(data, options, canvasProps) {
  let {barWidth, barHeight, barSpace, barLineWidth, barLineColour, labelSize, labelColour} = options;
  const {canvasWidth, canvasHeight} = canvasProps;
  const xAxisLength = canvasWidth - padding * 2;
  const yAxisLength = canvasHeight - padding * 2;
  barSpace = barSpace || canvasWidth / (xAxisMax(data) * 2 + 1);
  barWidth = barWidth || (xAxisLength - (xAxisMax(data) + 1) * barSpace) / xAxisMax(data);
  barHeight = barHeight || yAxisLength / Math.round(yAxisMax(data) * 1.25);

  if (!isOutOfBounds(data, options, canvasWidth)) {
    const yBaseValue = [];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        i === 0 && yBaseValue.push(canvasHeight - padding);
        const newYBase = yBaseValue[j] - data[i][j] * barHeight;
        const leftX = padding + j * barWidth + (j + 1) * barSpace;

        $drawRect({tLeft: [leftX, newYBase], bLeft: [leftX, yBaseValue[j]], bRight: [leftX + barWidth, yBaseValue[j]], tRight: [leftX + barWidth, newYBase]}
          , { barLineWidth, barLineColour }
        );
        $addLabel(
          {x: padding - 5 + (j + 0.5) * barWidth + (j + 1) * barSpace,
            y: newYBase + 5},
          data[i][j],
          { color: labelColour, fontSize: labelSize }
        );
        i === 0 &&
          $addLabel(
            {x: padding - 15 + (j + 0.5) * barWidth + (j + 1) * barSpace,
              y: canvasHeight - padding + 5},
            `Entry ${j + 1}`,
            { color: labelColour, fontSize: labelSize }
          );
        yBaseValue[j] = newYBase;
      }
    }
  }
}
// function to draw bar chart
function drawBarChart(data, options, element) {
  $("#barchart").html("");
  const canvasHeight = element.outerHeight();
  const canvasWidth = element.outerWidth();
  const {axisWidth, axisColour, barWidth, barHeight, barSpace, barLineWidth, barLineColour
          , barColour, labelSize, labelColour, titleText, titleSize, titleColour} = options;

  $addLabel({x: padding + 100, y: padding + 50}, titleText, {
    fontSize: titleSize,
    color: titleColour
  });
  $drawAxes({axisWidth, axisColour}, {canvasWidth, canvasHeight});
  $yAxisTicks(data, axisColour, canvasHeight);
  $drawBars(
    data,
    { barWidth,
      barHeight,
      barSpace,
      barLineWidth,
      barLineColour,
      barColour,
      labelSize,
      labelColour},
    {canvasWidth, canvasHeight}
  );
}