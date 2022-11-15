## Lighthouse Labs Bar Chart Project by Jack Kang

### About
Bar Chart Project is a JavaScript program using jQuery which takes user input of numbers and display them as a chart. User can tweak several options to change the visuals.

### Example Screenshots (embedded within the readme as image tags)
<img src="/src/demo1.png" alt="drawing" width="800"/>
<img src="/src/demo2.png" alt="drawing" width="800"/>
<img src="/src/demo3.png" alt="drawing" width="800"/>

### API Function for User
drawBarChart(data, options, element)

### Description of the Function
#### drawBarChart is a function that takes 3 parameters:
1. Data - Array of numbers to be displayed on the chart. Number or quantity of data values must match that of the first input data.
2. Options - Object of options to determine different visuals of the bar chart. Options include width, height of bars, colour, width of bar outlines, label and title font size, colour, etc.
3. Element - Element to have the chart drawn. In this project it is $("#barchart") or Document.getElementById("#barchart")
#### drawBarChart calls breakdown functions to perform as one function
1. $addLabel - Function to add labels, in this case this function adds title.
2. $drawAxes - Function to draw x and y-axes.
3. $yAxisTicks - Function to add ticks for y-axis.
4. $drawBars - Function to draw bars using data and options.

### Supported Options
- Width and height of bars
- Space between bars
- Bar outline colour and width
- Label colour
- Width and colour of axes
- Customizable title text

### Known Issues / Bugs
- Bars of different data sets not coloured accordingly.
- No $document.ready() implementation.

### Features on the Roadmap but Not Implemented Yet
- Data label placement options: User can choose which part of the bars (top, centre, bottom) to display data labels. By default, data labels are rendered at the top of the bars.
- Coloured bars: User can choose different colours for different sets of data. By default, there are no colours applied to the bars.
- Changing orders of data: User can drag and drop entered data to change the order of data sets drawn on the chart. By default, new input data is drawn on top of previous bars.

### External Resources (tutorials, docs, example code, etc)
- [Drawing Customizable Lines With jQuery And CSS - line.js](https://www.jqueryscript.net/other/Drawing-Customizable-Lines-jQuery-CSS-line-js.html)
- [w3schools - jQuery Tutorial](https://www.w3schools.com/jquery/default.asp)
- [regex101 - Regular Expressions Debugger](https://regex101.com/)
- [MDN Web Docs - Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [jQuery Learning Center](https://learn.jquery.com/)
- [GIT documentation - Gitignore Pattern Format](https://git-scm.com/docs/gitignore#_pattern_format)
- [jQuery Plugin Pattern & Self-invoking JavaScript Function](https://www.bigbinary.com/blog/understanding-jquery-plugin-pattern-and-self-invoking-javascript-function)
