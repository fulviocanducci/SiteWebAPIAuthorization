var app = angular.module("app",["ngRoute"]);

app.constant("$url", { "path": "http://localhost:52246/" });

app.run(["$auth", "$location", function ($authorization) 
{ 
    $authorization.init(); 
}]);

app.factory("$auth", ["$location", function($location)
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
        return true;
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