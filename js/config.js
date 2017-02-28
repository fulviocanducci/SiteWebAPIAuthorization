app.config(function ($routeProvider) {
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
        .when("/credit",
        {
            templateUrl: "_credit.html",
            controller: "CreditCtrl"
        })
       .otherwise({ redirectTo: '/login' });
});