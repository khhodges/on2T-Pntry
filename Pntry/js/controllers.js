angular.module('starter.controllers', ['ngResource', 'jsonService', 'ngCordova'])

    .controller('AppCtrl', function($state, $scope, $ionicModal, $ionicPopup, User) {
        
        
        // Form data for the login modal
        $scope.loginData = {
            username: null,
            password: null
        };

        $scope.registerData = {
            username: null,
            password: null,
            email: null,
            displayname: null,
            organizationname: null
        };

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
                                        scope: $scope
                                    }).then(function(loginmodal) {
                                        $scope.loginmodal = loginmodal;
                                    });

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/register.html', {
                                        scope: $scope
                                    }).then(function(registermodal) {
                                        $scope.registermodal = registermodal;
                                    });

  $scope.testLoginStatus = function() {     
        var token = localStorage.getItem("token");
        User.me(token).then(function (data) {
      console.log(data)
      if(!data.result){
        $ionicPopup.alert({
            title: 'Your session has expired',
            template: 'Please login!'
          });
        //go home
        $state.go("app.home");          
        }
    });    
  };

        //open/close routines
        $scope.openLogin = function() {
            $scope.loginmodal.show();
        };
        $scope.closeLogin = function() {
            $scope.loginmodal.hide();
        };
        $scope.openRegister = function() {
            $scope.registermodal.show();
        };
        $scope.closeRegister = function() {
            $scope.registermodal.hide();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            User.login($scope.loginData).then(function(data) {
                if (data.result) {
                    localStorage.setItem("token", data.result.access_token);
                    $state.go("app.inventory");
                    $scope.loginmodal.hide();
                } else {
                    $ionicPopup.alert({
                                          title: data.message,
                                          template: 'Please try again!'
                                      });
                }
            });
        };

        // Perform the register action when the user submits the registration form
        $scope.doRegister = function() {
            User.register($scope.registerData).then(function(data) {
                if (data.result) {
                    //log me in
                    $scope.loginData.username = $scope.registerData.username;
                    $scope.loginData.password = $scope.registerData.password;
                    $scope.doLogin();
                    $scope.closeRegister();
                    $state.go("app.inventory");
                } else {
                    $ionicPopup.alert({
                                          title: status.data.message,
                                          template: 'Please try again!'
                                      });
                }
            });
        }
    })
    .controller('BestsellerCtrl', function ($scope, $rootScope, JsonService) {
        JsonService.get(function (data) {
            $scope.images = data.images;
            $rootScope.images = data.images;
        })
    })
    .controller('ContactsCtrl', function ($rootScope, $scope, $cordovaContacts) {
        //alert("Contacts" + $cordovaContacts);
        document.addEventListener("deviceready", init, false);

        $scope.pickAddress = function (name, phone, email, street, city, state, zip, country) {
            $rootScope.design[3].details.Name = name;
            $rootScope.design[3].details.Phone = phone;
            $rootScope.design[3].details.Email = email;
            $rootScope.design[3].details.Street = street;
            $rootScope.design[3].details.City = city;
            $rootScope.design[3].details.State = state;
            $rootScope.design[3].details.Zip = zip;
            $rootScope.design[3].details.Country = country;
            $rootScope.design[3].value = name;
        };

        function init() {
            document.querySelector("#pickContact").addEventListener("touchend", doContactPicker, false);
            alert("Do Contact Picker");
            //pictureSource = navigator.camera.PictureSourceType;
            //destinationType = navigator.camera.DestinationType;
        }

        function doContactPicker() {
            navigator.contacts.pickContact(function (contact) {
                console.log('The following contact has been selected:' + JSON.stringify(contact));
                contact.name.formatted = getName(contact);
                $rootScope.contact = contact;
            },

                                           function (err) {
                                               console.log('Error: ' + err);
                                           });
        }

        /*
        Handles iOS not returning displayName or returning null/""
        */
        function getName(c) {
            var name = c.displayName;
            if (!name || name === "") {
                if (c.name.formatted)
                    return c.name.formatted;
                if (c.name.givenName && c.name.familyName)
                    return c.name.givenName + " " + c.name.familyName;
                return "Nameless";
            }
            return name;
        }
    })

    .controller('DesignCtrl', function ($rootScope, DesignService) {
       
        $rootScope.dataString = function () {
            return JSON.stringify($rootScope.design);
        }
        DesignService.get(function (data) {
            $rootScope.design = data.design;
        })
    })

    .controller('ContactCtrl', function ($rootScope, $scope) {
    })

    .controller('shirtCardCtrl', function ($rootScope, $http, $scope, $stateParams, $ionicPopup) {
        // .fromTemplate() method
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Hello</h1> </ion-header-bar> <ion-content></ion-content></ion-popover-view>';
        $scope.showConfirm = function (item) {
            $scope.data = {};
            $scope.mylength = item.sizes.length;

            $ionicPopup.show({
                                 template: '<div class="list"><label class="item item-input item-select"><div class="input-label" >Size</div><select name="size" id = "size" ng-model="data.size"><option value="" width="20" >Please select</option><option  ng-if="mylength > 0"  value="sml">Small</option><option  ng-if="mylength > 1"  value="med" >Medium</option><option  ng-if="mylength > 2" value="lrg">Large</option><option  ng-if="mylength > 3" value="xlg">X Large</option><option  ng-if="mylength > 4" value="xxl">2X Large</option><option  ng-if="mylength > 5" value="xxxl">3X Large</option><option ng-if="mylength > 6" value="xxxxl">4X Large</option></select></label></div>',
                                 title: item.name,
                                 subTitle: item.sizes.toString(),
                                 scope: $scope,
                                 buttons: [
                    { text: 'Cancel' },{
                                             text: '<b>Save</b>',
                                             type: 'button-positive',
                                             onTap: function (e) {
                                                 if (!$scope.data.size) {
                                                     //don't allow the user to close unless he enters wifi password
                                                     e.preventDefault();
                                                 } else {
                                                     $rootScope.design[2].details.Color = item.name;
                                                     $rootScope.design[2].details.Size = $scope.data.size;
                                                     $rootScope.design[2].details.Item = item;
                                                     return $scope.data.size;
                                                 }
                                             }
                                         }
                ]
                             });
        }
        $scope.styleId = $stateParams.styleId;
        if (!$rootScope.products) {
            $state.go('app.design');
        }

        for (i = 0; i < $rootScope.products.length; i++) {
            if ($rootScope.products[i].style == $scope.styleId) {
                $rootScope.shirt = $rootScope.products[i];
                $rootScope.design.shirt = $rootScope.products[i];
            }
        }
        var aShirt = $rootScope.shirt;
        var garmentUrl = aShirt.url;
        $http.get(garmentUrl, {
                      params: {
                "key1": "value1",
                "key2": "value2"
            }
                  })
            .success(function (data) {
                $scope.shirt = data;
                $rootScope.shirt.garment = data;
            })
            .error(function (data) {
                alert("ERROR");
            });
    })

    .controller('detailsCtrl', function ($scope, $rootScope, $stateParams) {
        var myId = 0;
        myId = $stateParams.id - 1;
        var myImages = [];
        myImages = $rootScope.images;
        $scope.item = myImages[myId];
        //alert($scope.item.image.url);
    })

    .controller('MapCtrl', function ($scope, $ionicLoading) {
        $scope.mapCreated = function (map) {
            $scope.map = map;
        };

        $scope.centerOnMe = function () {
            console.log("Centering");
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                                                    content: 'Getting current location...',
                                                    showBackdrop: false
                                                });

            navigator.geolocation.getCurrentPosition(function (pos) {
                console.log('Got pos', pos);
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        };
    })

    .controller('GarmentsCtrl', function ($rootScope, $scope, $http, ProductService, $stateParams) {
        ProductService.get(function (data) {
            $rootScope.products = data.products;
        })
        //$http.get("https://api.scalablepress.com/v2/categories", {
        //    params: {
        //        "key1": "value1",
        //        "key2": "value2"
        //    }
        //})
        //.success(function (data) {
        //    $scope.catList = data;
        //})
        //.error(function (data) {
        //    alert("ERROR");
        //});
        //$http.get("https://api.scalablepress.com/v2/products/hanes-50-50-hoodie", {
        //    params: {
        //        "key1": "value1",
        //        "key2": "value2"
        //    }
        //})
        //.success(function (data) {
        //    $scope.garmentsList = data;
        //})
        //.error(function (data) {
        //    alert("ERROR2");
        //});
    })
    .controller('QuoteCtrl', function ($scope, QuoteService, $rootScope) {
        QuoteService.get(function (data) {
            $scope.quotations = data.quotes;
        });

        $scope.pickMessage = function (text) {
            $rootScope.design[0].value = text;
            $rootScope.design[3].details.Name = text;
        };
    })
    .controller('ErrorCtrl', function ($rootScope) {
    })
    .controller('PhotoCtrl', function ($scope) {
        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value

        // Wait for device API libraries to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // device APIs are available
        //
        function onDeviceReady() {
            alert("Ready1" + navigator.camera + pictureSource);
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
            alert("Ready2" + destinationType);
        }

        // Called when a photo is successfully retrieved
        //
        $scope.onPhotoDataSuccess = function(imageData) {
            // Uncomment to view the base64-encoded image data
            // console.log(imageData);
            // Get image handle
            //
            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        // Called when a photo is successfully retrieved
        //
        $scope.onPhotoURISuccess = function(imageURI) {
            // Uncomment to view the image file URI
            // console.log(imageURI);
            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');

            // Unhide image elements
            //
            largeImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        }

        // A button will call this function
        //
        $scope.capturePhoto = function () {
            // Take picture using device camera and retrieve image as base64-encoded string
            alert("capture" + navigator.camera);
            navigator.camera.cleanup();
            alert("hi");
            navigator.camera.getPicture(function (imageData) {
                alert("camera start");
            }, onFail, {
                                            quality: 100, allowEdit: true,
                                            targetWidth: 2350,
                                            targetHeight: 1800,
                                            destinationType: Camera.DestinationType.FILE_URI,
                                            saveToPhotoAlbum: true
                                        });//navigator.camera.getPicture(function (imageURI) {
            //    // imageURI is the URL of the image that we can use for
            //    // an <img> element or backgroundImage.
            //}, function (err) {
            //    // Ruh-roh, something bad happened
            //}, cameraOptions);
            //navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
            //    quality: 50,
            //    destinationType: destinationType.DATA_URL
            //});
        }

        // A button will call this function
        //
        $scope.capturePhotoEdit = function () {
            // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                                            quality: 20, allowEdit: true,
                                            destinationType: destinationType.DATA_URL
                                        });
        }

        // A button will call this function
        //
        $scope.getPhoto = function(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                                            quality: 50,
                                            destinationType: destinationType.FILE_URI,
                                            sourceType: source
                                        });
        }

        // Called if something bad happens.
        //
        $scope.onFail = function(message) {
            alert('Failed because: ' + message);
        }
    })
    .controller('FlickrCtrl', function ($scope, Flickr, $ionicPopup, $rootScope) {
        var doSearch = ionic.debounce(function (query) {
            Flickr.search(query).then(function (resp) {
                $scope.photos = resp;
            });
        }, 500);

        $scope.search = function () {
            doSearch($scope.query);
        }
        var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Hello</h1> </ion-header-bar> <ion-content></ion-content></ion-popover-view>';
        $scope.showConfirm = function (item) {
            $scope.data = {};
            $ionicPopup.show({
                                 template: '<div class="list"><label class="item item-input item-select"><span class="input-label">Size</span><select name="pick" id="pick" ng-model="data.pick"><option value="" width="20">Please select</option><option value="image">Image</option><option value="avitar">Avitar</option></select></label></div>',
                                 title: item.title,
                                 subTitle: item.date_taken + ', ' + item.author,
                                 scope: $scope,
                                 buttons: [
                    { text: 'Cancel' },{
                                             text: '<b>Save</b>',
                                             type: 'button-positive',
                                             onTap: function (e) {
                                                 if (!$scope.data.pick) {
                                                     //don't allow the user to close unless he enters wifi password
                                                     e.preventDefault();
                                                 } else {
                                                     $rootScope.design[1].details[0].url = item.media.m;
                                                     return $scope.data.pick;
                                                 }
                                             }
                                         }
                ]
                             });
        }
    })