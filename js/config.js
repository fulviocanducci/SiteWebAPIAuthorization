app.config(function ($routeProvider /*, $locationProvider*/) {

    //$locationProvider.html5Mode(true);

    $routeProvider
        .when("/",
        {
            templateUrl: "_home.html",
            controller: "HomeCtrl"
        })
        .when("/login",
        {
            templateUrl: "_login.html",
            controller: "LoginCtrl"
        })
       .otherwise({ redirectTo: '/login' });
});