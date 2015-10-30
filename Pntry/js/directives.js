angular.module('starter.directives', [])

.directive('map', function () {
    return {
        restrict: 'E',
        scope: {
            onCreate: '&'
        },
        link: function ($scope, $element, $attr) {
            function initialize() {
                //The following shows a 45° perspective view of Palazzo Ducale in Venice, Italy:
                var myLatLng = { lat: 45.434046, lng: 12.340284 };
                var mapOptions = {
                    center: myLatLng,
                    zoom: 19,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                };
                var map = new google.maps.Map($element[0], mapOptions);

                $scope.onCreate({ map: map });

                // Stop the side bar from dragging when mousedown/tapdown on the map
                google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                    e.preventDefault();
                    return false;
                });
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    animation: google.maps.Animation.NONE
                });
                marker.setMap(map);
            }

            if (document.readyState === "complete") {
                initialize();
            } else {
                google.maps.event.addDomListener(window, 'load', initialize);
            }
        }
    }
})
.directive('pushSearch', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {
            var amt, st, header;

            $element.bind('scroll', function (e) {
                if (!header) {
                    header = document.getElementById('search-bar');
                }
                if (e.details)
                {
                    st = e.detail.scrollTop;
                    if (st < 0) {
                        header.style.webkitTransform = 'translate3d(0, 0px, 0)';
                    } else {
                        header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
                    }
                }
            });
        }
    }
})

.directive('photo', function ($window) {
    return {
        restrict: 'C',
        link: function ($scope, $element, $attr) {
            var size = ($window.outerWidth / 3) - 2;
            $element.css('width', size + 'px');
            $element.css('height', size + 'px');
        }
    }
})
;