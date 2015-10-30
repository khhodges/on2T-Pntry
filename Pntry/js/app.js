// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'ionic.service.analytics', 'starter.controllers', 'starter.directives', 'jsonService'])

.run(['$ionicAnalytics', function ($ionicAnalytics) {
    $ionicAnalytics.register();
}])

.run(function ($ionicPlatform, $ionicAnalytics) {
    $ionicPlatform.ready(function () {
        $ionicAnalytics.register();
        // 204072158929 Google Project number. 
        //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

  // setup an abstract state for the app directive
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        .state('app.design', {
            url: '/design',
            views: {
                'menuContent': {
                    controller: 'DesignCtrl',
                    templateUrl: 'templates/design.html',
                    //resolve: {
                    //    design: function (DesignService) {
                    //        return DesignService.get()
                    //    }
                    //}
                }
            }
        })
        .state('app.mapsearch', {
            url: '/mapsearch',
            views: {
                'menuContent': {
                    controller: 'MapCtrl',
                    templateUrl: 'templates/detailedSearch.html'
                }
            }
        })
        .state('app.garments', {
            url: "/garments",
            views: {
                'menuContent': {
                    templateUrl: "templates/garments.html",
                    controller: 'GarmentsCtrl',
                    //resolve: {
                    //    garments: function (ShirtService) {
                    //        return ShirtService.getShirts()
                    //    }
                    //}
                }
            }
        })
        .state('app.location', {
            url: "/location",
            views: {
                'menuContent': {
                    templateUrl: "templates/location.html",
                    controller: 'MapCtrl'
                }
            }
        })
        .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html',
                    controller: 'FlickrCtrl'
                }
            }
        })
        .state('app.contact', {
                    url: '/contact',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/SelectedContact.html',
                            controller: 'ContactsCtrl'
                        }
                    }
                })
        .state('app.image', {
            url: '/image/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/ImageCard.html',
                    controller: 'BestsellerCtrl'
                }
            }
        })
        .state('app.quotelist', {
            url: '/quotelist',
            views: {
                'menuContent': {
                    templateUrl: 'templates/quotelist.html',
                    controller: 'QuoteCtrl'
                }
            }
        })
        .state('app.photos', {
                    url: '/photos',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/photoPage.html',
                            controller: 'PhotoCtrl'
                        }
                    }
                })
        .state('app.shirtCard', {
            url: "/shirtCard/:styleId",
            views: {
                'menuContent': {
                    templateUrl: 'templates/shirtCard.html',
                    controller: 'shirtCardCtrl'
                }
            }
        })
        //.state('app.contacts', {
        //    url: "/contacts",
        //    views: {
        //        'menuContent': {
        //            templateUrl: 'templates/contacts.html',
        //            controller: 'ContactsCtrl'
        //        }
        //    }
        //})
        .state('app.layout', {
            url: "/layout",
            views: {
                'menuContent': {
                    templateUrl: 'templates/layout.html',
                    controller: 'LayoutCtrl'
                }
            }
        })
        .state('app.error', {
            url: "/error",
            views: {
                'menuContent': {
                    templateUrl: 'templates/error.html',
                    controller: 'ErrorCtrl'
                }
            }
        })
     //home
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'AppCtrl'
        }
      }
    })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
