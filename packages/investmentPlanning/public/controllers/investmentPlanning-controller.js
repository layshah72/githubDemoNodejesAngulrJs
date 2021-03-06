/**
 * Copyright (C) 2015, layshah
 * 
 * Description : Shared Util - appUtil: Shared utility functions for the
 * application.
 * 
 * @author lay shah
 */
investmentPlanningModule.controller('investmentPlanningController', ['$rootScope','$scope','indexService', function($rootScope,$scope,indexService){
    var goal={};
    goal=JSON.parse(indexService.getGoal());

    console.log(goal);
    $scope.goal=goal;
    $scope.chart1=true;
    $scope.chart2=false;
    $scope.chart3=false;
    $scope.InvestmentChart1=true;
        $scope.InvestmentChart2=false;
               $scope.goalnameEditing = false;
               $scope.goalName="My Wedding";
               $scope.contribution=1;
    $rootScope.showNavbarDetail=false;
    $rootScope.showStepBar=true;
    $rootScope.signUpLink=window.location.hash;
$rootScope.signUpValue="Sign Up";
$rootScope.signUpModal="#signUpModal"; 
$scope.changeline(2);          
    $scope.changeToInputFromText=function(param){
       
       $scope.goalnameEditing= true;
        
    }    
    $scope.changeToTextFromInput=function(){
       $scope.goalnameEditing = false;
        
    }    
    $scope.showInvestmentChart1=function(){
        $scope.InvestmentChart1=true;
        $scope.InvestmentChart2=false;
    }
    $scope.showInvestmentChart2=function(){
        $scope.InvestmentChart2=true;
        $scope.InvestmentChart1=false;
    }

    $scope.changeChart1=function(){
        
        $scope.chart1=true;
        $scope.chart2=false;
        $scope.chart3=false;
    }
    $scope.changeChart2=function(){
        
         $scope.chart1=false;

        $scope.chart2=true;
        $scope.chart3=false;
        
    }
    $scope.changeChart3=function(){
        
         $scope.chart1=false;
               $scope.chart2=false;

        $scope.chart3=true;
        
    }

    //function to create area chart
   $scope.generateArea=function(){
    d3.select("#visualisation3").selectAll('.axis').remove();
    d3.selectAll('.grid').remove();
         var margin = {
            top: 30,
            right: 100,
            bottom: 30,
            left: 90
        },
            width = $("#visualisation3").width() - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

         //Beautify the date
        var parseDate = d3.time.format("%d-%b-%y").parse;
        var tooltipDate = d3.time.format("%d/%m/%y");

         //Get the Amount of alerts for tooltip
        var bisectDate = d3.bisector(function(d) {
            return d.date;
        }).left;

        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(5);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);

        

        var valueline = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                
                return y(d.Worst);
            });
            var valueline2 = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {

                return y(d.Median);
            });

            var valueline3 = d3.svg.line()
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.Best);
            });

        var svg = d3.select("#visualisation3")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



        function make_x_axis() { // function for the x grid lines
            return d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(5)
        }

        function make_y_axis() { // function for the y grid lines

            return d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(5)
        }

         // Get the data
        d3.csv("/rootFunvestApp/portfolios/1/Projections.csv", function(error, data) {
            d3.csv("/rootFunvestApp/atad1.csv", function(error, data2) {
                 d3.csv("/rootFunvestApp/atad2.csv", function(error, data3) {
            
             var CurrentDate = new Date();   
             var xx=1;   
           
            data.forEach(function(d) {
                console.log(d);


                d.date = CurrentDate.setMonth(CurrentDate.getMonth() + xx);;
                d.Best = +d.Best*$scope.contribution;
                d.Median = +d.Median*$scope.contribution;
                d.Worst = +d.Worst*$scope.contribution;

            });

            
            // Sort the data or bisect() won't work right
            data.sort(function(a, b) {return a.date - b.date;});

             
            // Scale the range of the data
            x.domain(d3.extent(data, function(d) {
                return d.date;
            }));
            y.domain([0,d3.max(data, function(d) {
                
                
                return d.Best;
            })]);
            $scope.$apply(function(){
                $scope.expectedValue= d3.max(data, function(d) {
                    return d.Best;
                });
            });
              

            svg.append("g") // Draw the y Grid lines
            .attr("class", "grid")
                .call(make_y_axis()
                    .tickSize(-width, 0, 0)
                    .tickFormat("")
            )

            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline(data));


            // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline2(data));
                        // Add the valueline path.
            svg.append("path")
                .attr("class", "line")
                .attr("d", valueline3(data));    

            var area1 = d3.svg.area()
                        .x(valueline.x())
                        .y0(valueline.y())
                        .y1(height);

            var area2 = d3.svg.area()
            .x(valueline2.x())
                .y0(valueline2.y())
                .y1(height);

            var area3 = d3.svg.area()
            .x(valueline3.x())
                .y0(valueline3.y())
                .y1(height);               
                        // Add the filled area
             svg.append("path")
                .datum(data)
                .attr("class", "area3")
                .attr("d", area3);        
            svg.append("path")
                .datum(data)
                .attr("class", "area2")
                .attr("d", area2);
            svg.append("path")
                .datum(data)
                .attr("class", "area1")
                .attr("d", area1);

                
            

       
            // Add the X Axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Add the Y Axis
            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            // Tooltip
            var focus = svg.append("g")
                .attr("class", "focus")
                .style("display", "none");

            focus.append("circle")
                .attr("r", 4.5);

            focus.append("text")
                .attr("x", 9)
                .attr("dy", ".35em");
            
            var focus2 = svg.append("g")
                .attr("class", "focus2")
                .style("display", "none");

            focus2.append("circle")
                .attr("r", 4.5);

            focus2.append("text")
                .attr("x", 9)
                .attr("dy", ".35em");
            


            var focus3 = svg.append("g")
                .attr("class", "focus3")
                .style("display", "none");
            focus3.append("circle")
                .attr("r", 4.5);

            focus3.append("text")
                .attr("x", 9)
                .attr("dy", ".35em");

            svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .on("mouseover", function() {
                    focus.style("display", null);
                    focus2.style("display", null);
                    focus3.style("display", null);
                })
                .on("mouseout", function() {
                    focus.style("display", "none");
                     focus2.style("display", "none");
                     focus3.style("display", "none");
                })
                .on("mousemove", mousemove);

            
            // End Tooltip

            // Get the data
           
            
            

            


           

           

           

                function mousemove() {
                    var d2,db3;

           
                var x0 = x.invert(d3.mouse(this)[0]),
                    i = bisectDate(data, x0, 1),

                    d0 = data[i - 1],
                    d1 = data[i],

                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
   
                focus.attr("transform", "translate(" + x(d.date) + "," + y(d.Best) + ")");
                focus.select("text").text(Math.floor(d.Best) + '   ' );
                focus2.attr("transform", "translate(" + x(d.date) + "," + y(d.Median) + ")");
                focus2.select("text").text(Math.floor(d.Median) + '   ' );
                focus3.attr("transform", "translate(" + x(d.date) + "," + y(d.Worst) + ")");
                focus3.select("text").text(Math.floor(d.Worst) + '   ' );                 
            }
            
            // End Tooltip
                });
            });
            
        });


            
   } 
    
    //function to create line chart
    $scope.generateLine =function(number){
        d3.select("#visualisation").selectAll("g")
       .remove();
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 800 -margin.left-margin.right-30,
    height = 400 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse,
    formatDate = d3.time.format("%d-%b"),
    bisectDate = d3.bisector(function(d) { return d.date; }).left;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(10);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.Portfolioreturn); });

var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.DepositReturn); });    
    
// Adds the svg canvas
var svg = d3.select("#visualisation")

    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

var lineSvg = svg.append("g"); 

var focus = svg.append("g") 
    .style("display", "none");
var fileName=["/rootFunvestApp/portfolios/1/Historical.csv","/rootFunvestApp/portfolios/1/Historical.csv"];
// Get the data
var investmentTillNow=0,depoSiteReturnTillNow=0;
var skipNumber=24;
var numberOfrows=60;
var i;
var contribution=1000;
contribution=parseInt($scope.contribution);
d3.csv(fileName[number], function(error, data) {
    for(i=0;i<(data.length-skipNumber);i++){
        data[i]=data[i+skipNumber]
        
    } 
    console.log(data);
   data.splice(numberOfrows, skipNumber);
    data.forEach(function(d) {
        
            d.date = parseDate(d.date);
            investmentTillNow = investmentTillNow + (investmentTillNow*parseInt(d.Portfolioreturn)/100)+contribution;
            d.Portfolioreturn = +investmentTillNow;
            depoSiteReturnTillNow=depoSiteReturnTillNow +(depoSiteReturnTillNow*parseInt(d.DepositReturn/100))+contribution;
            d.DepositReturn= +depoSiteReturnTillNow;
        
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.Portfolioreturn; })]);
    var totalLength = 100;
    // Add the valueline path.
    lineSvg.append("path")
 
        .attr("class", "line")
        .attr("d", valueline(data))
  .transition().duration(5000).ease("1s")  ;

  lineSvg.append("path")
 
        .attr("class", "line2")
        .attr("d", valueline2(data))
  .transition().duration(5000).ease("1s")  ;
    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

   // append the x line
    focus.append("line")
        .attr("class", "x")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    // append the y line
    focus.append("line")
        .attr("class", "y")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", width)
        .attr("x2", width);

    // append the circle at the intersection
    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);

    // place the value at the intersection
    focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    focus.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    focus.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");
    
    // append the rectangle to capture mouse
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        focus.select("circle.y")
            .attr("transform",
                  "translate(" + x(d.date) + "," +
                                 y(d.Portfolioreturn) + ")");

        focus.select("text.y1")
            .attr("transform",
                  "translate(" + x(d.date) + "," +
                                 y(d.Portfolioreturn) + ")")
            .text(d.Portfolioreturn);

        focus.select("text.y2")
            .attr("transform",
                  "translate(" + x(d.date) + "," +
                                 y(d.Portfolioreturn) + ")")
            .text(d.Portfolioreturn);

        focus.select("text.y3")
            .attr("transform",
                  "translate(" + x(d.date) + "," +
                                 y(d.Portfolioreturn) + ")")
            .text(formatDate(d.date));

        focus.select("text.y4")
            .attr("transform",
                  "translate(" + x(d.date) + "," +
                                 y(d.Portfolioreturn) + ")")
            .text(formatDate(d.date));

        focus.select(".x")
            .attr("transform",
                  "translate(" + x(d.date) + "," +
                                 y(d.Portfolioreturn) + ")")
                       .attr("y2", height - y(d.Portfolioreturn));

        focus.select(".y")
            .attr("transform",
                  "translate(" + width * -1 + "," +
                                 y(d.Portfolioreturn) + ")")
                       .attr("x2", width + width);
    }

});

}
       $scope.generateLine(0);
       $scope.generateArea();
       $scope.changeNumber=function(number){
               $scope.generateLine(1);
       }
    
}]);