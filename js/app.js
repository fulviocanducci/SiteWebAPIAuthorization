var app = angular.module("app",["ngRoute"]);

app.run(["$auth", "$location", function ($authorization) 
{ 
    $authorization.init(); 
}]);

app.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
 }])

app.factory("$auth", ["$location", "$http", function($location,$http)
{
    var _getToken = function()
    {
        return "bearer " +  localStorage.getItem("token");
    }
    var _setToken = function(value)
    {
        localStorage.setItem('token', value);
    }
    var _isLogged = function()
    {
        return !(localStorage.getItem("token") === null);
    }
    var _logout = function()
    {        
        localStorage.removeItem("token");
        localStorage.clear();     
        $location.path("/login");        
        $http.defaults.headers.common["Authorization"] = null;
    }
    var _init = function()
    {
        if (!_isLogged()) {
            $location.path("/login");
        }        
    }
    return {
        getToken : _getToken,
        setToken : _setToken,
        isLogged : _isLogged,
        logout : _logout,
        init: _init
    };
}]);