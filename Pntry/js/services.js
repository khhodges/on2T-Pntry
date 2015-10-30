angular.module('jsonService', ['ngResource'])

    .factory('JsonService', function ($resource) {
        //alert("GetShirts1");
        return $resource('data/bestsellers.json');
    })
    .service('DesignService', function ($resource) {
        var myDesign = [];
        myDesign = $resource('data/default.json');
        return myDesign;
    })

    .factory('ProductService', function ($resource) {
        //alert("GetShirtsA");
        var myProducts = [];
        myProducts = $resource('data/productlist.json');
        return myProducts;
    })
    .factory('QuoteService', function ($resource) {
        var myQuotations = [];
        myQuotations = $resource('data/quotes.json');
        return myQuotations;
    })
    .factory('DesignServicey', function ($resource) {
        var myDesign = [];
        return {
            getDesign: function ($resource) {
                myDesign = $resource('data/default.json');
                return myDesign.get();
            },
            getAll: function (data) {
                return JSON.stringify(data);
            },
            saveAll: function(data) {
                console.log(data)
            }
        }
    })

    .factory('Flickr', function ($resource, $q) {
        var photosPublic = $resource('http://api.flickr.com/services/feeds/photos_public.gne',
                                     { format: 'json', jsoncallback: 'JSON_CALLBACK' },
                                     { 'load': { 'method': 'JSONP' } });

        return {
            search: function (query) {
                var q = $q.defer();
                photosPublic.load({
                                      tags: query
                                  }, function (resp) {
                                      q.resolve(resp);
                                  }, function (err) {
                                      q.reject(err);
                                  })

                return q.promise;
            }
        }
    })
    .factory('API', function () {
        var api_key = 'McVoa0RNJcPsFzL9';

        return api_key;
    })

    .factory('User', function (API) {
        var el = new Everlive({
                                  apiKey: API,
                                  scheme: 'https',
                                  token: localStorage.getItem('token')
                              });
        return {
            register: function(registerData) {          
                return el.Users.register(
                    registerData.username, 
                    registerData.password, { 
                        Email: registerData.email, 
                        DisplayName: registerData.displayname,
                        OrganizationName: registerData.organizationname
                    })
                    .then(function (data) {
                        return data;
                    },
                          function(error) {
                              return error;
                          });               
            },
            login: function(loginData) {                
                return el.Users.login(
                    loginData.username,
                    loginData.password)
                    .then(function (data) {
                        return data;
                    },
                          function(error) {
                              return error;
                          });
            },
            me: function() {
                return el.Users.currentUser()
                    .then(function (data) {
                        return data;
                    },
                          function(error) {
                              return error;
                          });
            }
        }
    })
