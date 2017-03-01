
app.controller("HomeCtrl", ["$scope", "$auth", "$location", function($scope, $auth, $location)
{

    $auth.init();

    $scope.send = function(url)
    {
        $location.path(url);
    }

    $scope.logout = function()
    {
        $auth.logout();        
    }
}]);

app.controller("CreditCtrl", ["$scope", "$auth", "$url","$http", function($scope, $auth, $url,$http)
{

    $auth.init();
    
    $scope.items = [];

    $http.defaults.headers.common["Authorization"] = $auth.getToken();
   

    $scope.add = function(_description)
    {
        $http({
                method: "POST",
                url: $url.path + "api/v1/credits",
                data: { Id: 0, Description: _description },
                withCredentials: true
            })
            .then(
                function successCallback(response) 
                {   
                    $scope.items.push(response.data);
                }, 
                function erroCallBack(response)
                {                
                    if (response.status == 401){
                        $auth.logout();
                        window.location.reload();                  
                    }
                }
            );
    }
    $scope.update = function(item)
    {
        $http({
                method: "PUT",
                url: $url.path + "api/v1/credits/" + item.id,
                data: { Id: item.id, Description: item.description },
                withCredentials: true
            })
            .then(
                function successCallback(response) 
                {                                
                
                }, 
                function erroCallBack(response) {                
                    if (response.status == 401){
                        $auth.logout();
                        window.location.reload();                        
                    }
                }
            );
    }

    $scope.init = function()
    {
        $http({
                method: "GET",
                url: $url.path + "api/v1/credits",
                withCredentials: true
            })
            .then(
                function successCallback(response) 
                {                         
                    $scope.items = response.data;
                }, 
                function erroCallBack(response){                                    
                    if (response.status == 401){
                        $auth.logout();
                        window.location.reload();
                    }
                }
            );
    }
    $scope.init();

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
            withCredentials: true,
            transformRequest: function (obj) {
                return $scope.tranform(obj);
            }
        })
        .then(
            function successCallback(response) {
                $auth.setToken(response.data.access_token);            
                $location.path('/');
            },
            function erroCallBack(response)
            {
                console.log(response.status);
                if (response.status == 400){ // bad request
                        
                }
                //$auth.logout();
                //window.location.reload();                
            }
        );
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