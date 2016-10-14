'use strict';

/* Controllers */

angular.module('app', ['ui.select'])
    // Chart controller
    .controller('DashboardCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

        $scope.refreshTest = function(portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);

        }

        $scope.trustAsHtml = function(value) {
            return $sce.trustAsHtml(value);
        };

        $http.get('assets/js/api/charts.json').success(function(data) {
            $scope.widget_12_data = data.nvd3.line;
        });

        // Widget-12
        $scope.widget_12_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
                    return d[1]
                },
                margin: {
                    left: 30,
                    bottom: 35
                },
                color: [
                    $.Pages.getColor('success'),
                    $.Pages.getColor('danger'),
                    $.Pages.getColor('primary'),
                    $.Pages.getColor('complete'),

                ],
                xAxis: {
                    tickFormat: function(d) {
                        return d3.time.format('%a')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: d3.format('d')
                },
                showLegend: false,
                useInteractiveGuideline: true,
            }
        }

        $scope.series1 = [{
            name: 'Series 1',
            data: [{
                x: 0,
                y: 10
            }, {
                x: 1,
                y: 8
            }, {
                x: 2,
                y: 5
            }, {
                x: 3,
                y: 9
            }, {
                x: 4,
                y: 5
            }, {
                x: 5,
                y: 8
            }, {
                x: 6,
                y: 10
            }],
            color: $.Pages.getColor('danger')
        }, {
            name: 'Series 2',
            data: [{
                x: 0,
                y: 0
            }, {
                x: 1,
                y: 2
            }, {
                x: 2,
                y: 5
            }, {
                x: 3,
                y: 1
            }, {
                x: 4,
                y: 5
            }, {
                x: 5,
                y: 2
            }, {
                x: 6,
                y: 0
            }],
            color: $.Pages.getColor('master-light')
        }];



        // Manually Destroy LiveTile objects
        $scope.$on('$destroy', function() {
            $('.live-tile').liveTile("destroy");
        });

        $scope.people = [
            { name: 'Adam', email: 'adam@email.com', age: 12, country: 'United States' },
            { name: 'Amalie', email: 'amalie@email.com', age: 12, country: 'Argentina' },
            { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
            { name: 'Adrian', email: 'adrian@email.com', age: 21, country: 'Ecuador' },
            { name: 'Wladimir', email: 'wladimir@email.com', age: 30, country: 'Ecuador' },
            { name: 'Samantha', email: 'samantha@email.com', age: 30, country: 'United States' },
            { name: 'Nicole', email: 'nicole@email.com', age: 43, country: 'Colombia' },
            { name: 'Natasha', email: 'natasha@email.com', age: 54, country: 'Ecuador' },
            { name: 'Michael', email: 'michael@email.com', age: 15, country: 'Colombia' },
            { name: 'Nicolás', email: 'nicolas@email.com', age: 43, country: 'Colombia' }
        ];


    }]);



angular.module('app')
    .directive('widget5Chart', function() {
        return {
            restrict: 'C',
            link: function(scope, el, attrs) {

                var container = '.widget-5-chart';

                var seriesData = [
                    [],
                    []
                ];
                var random = new Rickshaw.Fixtures.RandomData(7);
                for (var i = 0; i < 7; i++) {
                    random.addData(seriesData);
                }

                var graph = new Rickshaw.Graph({
                    element: document.querySelector(container),
                    renderer: 'bar',
                    series: [{
                        data: [{
                            x: 0,
                            y: 10
                        }, {
                            x: 1,
                            y: 8
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 9
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 8
                        }, {
                            x: 6,
                            y: 10
                        }],
                        color: $.Pages.getColor('danger')
                    }, {
                        data: [{
                            x: 0,
                            y: 0
                        }, {
                            x: 1,
                            y: 2
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 1
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 2
                        }, {
                            x: 6,
                            y: 0
                        }],
                        color: $.Pages.getColor('master-light')
                    }]

                });


                var MonthBarsRenderer = Rickshaw.Class.create(Rickshaw.Graph.Renderer.Bar, {
                    barWidth: function(series) {

                        return 7;
                    }
                });


                graph.setRenderer(MonthBarsRenderer);


                graph.render();


                $(window).resize(function() {
                    graph.configure({
                        width: $(container).width(),
                        height: $(container).height()
                    });

                    graph.render()
                });

                $(container).data('chart', graph);
            }
        };
    });

$('body').on('click', '.mapplic-pin', function(e) {
    e.preventDefault();
    var location = $(e.target).data('location');
    $('#mapplic').data().mapplic.goToLocation(location, 800);
});
