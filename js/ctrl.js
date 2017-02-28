
app.controller("HomeCtrl", ["$scope", "$auth", function($scope, $auth)
{

    $auth.init();

    $scope.token = $auth.getToken();

}]);

app.controller("LoginCtrl", ["$scope", "$auth", "$http", "$url", "$location", function($scope, $auth, $http, $url,$location)
{
    $scope.status = $auth.isLogged();

    $scope.username = "";
    $scope.password = "";    

    $scope.tryLogin = function()
    {
        var data = { 
            username: $scope.username, 
            password: $scope.password, 
            grant_type: "password" 
        };
       
        $http({
            method: "POST",
            url: $url.path + "token",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            transformRequest: function (obj) {
                return $scope.tranform(obj);
            }
        })
        .then(function successCallback(response) {
            $auth.setToken(response.data.access_token);            
            $location.path('/');
        });/*
        .error(function errorCallback(response) {
            if (response.error === "invalid_grant") {
                alert("Usuário e senhas inválidos");
            }
        });*/
    }
    $scope.tranform = function (obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }
}]);