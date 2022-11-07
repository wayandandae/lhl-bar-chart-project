// Anonymous plugin function using jQuery
(function ($) {
  // create custom helpers object containing createLine and createLabel methods
  const helpers = {
    // object method to create a line from one position to the other
    createLine (firstPos, secondPos, options) {
      // create empty objects to hold start and end coordinates
      let startPos = {};
      let endPos = {};
      // assign argument with smaller x-coordinate as a starting point
      if (secondPos.x < firstPos.x) {
        startPos = secondPos;
        endPos = firstPos;
      } else {
        startPos = firstPos;
        endPos = secondPos;
      }

      // create a DOM element to draw line
      const line = document.createElement("div");

      // calculate the distance between two points using Pythagorean theorem
      const length = Math.sqrt(Math.pow(endPos.x - startPos.x, 2) +
                                Math.pow(endPos.y - startPos.y, 2));
      // element class names can be barline, axis, or tick
      line.className = options.class;
      // line length
      line.style.width = length + "px";
      // line width
      line.style.borderBottom = options.stroke + "px solid";
      // line colour
      line.style.borderColor = options.color;
      // position must be absolute for numerical calculations
      line.style.position = "absolute";
      // line z-index
      line.style.zIndex = options.zIndex;

      // find angle between line and x-axis (as in Quadrant I or IV)
      const angle = Math.atan((endPos.y - startPos.y) / (endPos.x - startPos.x));
      // create top and left margins to displace the line in pixels
      line.style.top = startPos.y + 0.5 * length * Math.sin(angle) + "px";
      line.style.left = startPos.x - 0.5 * length * (1 - Math.cos(angle)) + "px";
      // rotate line by the angle
      line.style.transform =
        // apply angle rotation for different web browsers
        line.style.WebkitTransform =
        line.style.MozTransform =
        line.style.OTransform =
        line.style.msTransform =
          "rotate(" + angle + "rad)";

      return line;
    },

    // object method to create a label
    createLabel (position, content, options) {
      // create a DOM element to compose label
      const label = document.createElement("div");

      // element class names can be ticklabel, datalabel, entrylabel, or title
      label.className = options.class;
      // set content to be displayed as inner text of the element
      label.innerText = content;
      // label font size in pixels
      label.style.fontSize = options.fontSize + "px";
      // label font family
      label.style.fontFamily = options.fontFamily;
      // label font colour
      label.style.color = options.color;
      // label position
      label.style.position = "absolute";
      // top and left margins for label element
      label.style.top = position.y + "px";
      label.style.left = position.x + "px";

      return label;
    }
  };

  // create a custom line method as fn-prototype of jQeury
  $.fn.line = function (firstPos, secondPos, options) {
    // create an object to hold options
    let lineOptions = {};
    // iterate over every jQuery object
    return $(this).each(function () {
      // overwrite user options onto default options
      lineOptions = $.extend({}, $.fn.line.defaults, options);
      // append createLine return element to this object
      $(this).append(helpers.createLine(firstPos, secondPos, lineOptions));
    });
  };
  // default line style options
  $.fn.line.defaults = {
    zIndex: "1",
    stroke: "1",
    style: "solid",
    color: "#000000",
    class: "line"
  };

  // create a custom label jQuery prototype method
  $.fn.label = function (position, content, options) {
    return $(this).each(function () {
      let labelOptions = {};

      return $(this).each(function () {
        labelOptions = $.extend({}, $.fn.label.defaults, options);
        // append createLabel return element to this object
        $(this).append(helpers.createLabel(position, content, labelOptions));
      });
    });
  };
  // default label style options
  $.fn.label.defaults = {
    zIndex: "2",
    fontFamily: "Arial,Verdana,sans-serif",
    fontSize: "10",
    color: "#000000",
    top: "0",
    class: "label"
  };
 // pass jQuery as argument to self-invoke anonymous function
}(jQuery));
