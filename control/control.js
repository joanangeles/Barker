var barkerApp = angular.module("barkerApp", []);/*define module with name barkerApp*/

barkerApp.controller('barksController', ['$scope', '$http', function($scope, $http, $window) {
    $scope.bark = ''
    $scope.search = function() {
        $http({method: 'GET', url: '/barker/barks/'})
            .then(function(response) {
                $scope.results = response.data
            })
    }



    $scope.like = function(twitid){

         //$scope.numLikes.likesz();
         $http.post('/barker/barks/like/'+ twitid); 
         $http({method:'GET',url: '/barker/getNumofLikes/' + twitid})
         .then(function(response){
            var x = response.data
            console.log(x[0].count);
            document.getElementById(twitid+'likenum').innerHTML = x[0].count;
         })

    }
    $scope.edit = function(twitid){
            $http({method: 'POST', url: '/barker/editbark/' + twitid})
            .then(function(response) {
                $scope.results = response.data
            })
    }

    $scope.searchOthers = function() {
        $http({method: 'GET', url: '/barker/otherbarks'})
            .then(function(response) {
                $scope.results = response.data
            })
    }

    $scope.searchComment = function(id,tId) {
        $http({method: 'GET', url: '/barker/barks/comments/' + id + '/tweetId/' + tId})
            .then(function(response) {
                $scope.comments = response.data
            })
    }

    $scope.createBark = function() {
        if($scope.bark !== '') {
            $http.post('/barker/bark/create',
                {
                tweetContent: $scope.bark
                })
                    .then(function(results) {
                        $scope.bark = ''
                    })
        }
    }

    $scope.mySelf = function(){
        $http({method: 'GET', url: '/barker/mySelf'})
            .then(function(response) {
                $scope.self = response.data
            })

    }

    $scope.otherProf = function(){
        var splittedUrl = document.URL.split('/');
        var otherUserID = splittedUrl[splittedUrl.length -1];
        $http({method: 'GET', url: '/barker/otherProf/' + otherUserID})
            .then(function(response) {
                $scope.self = response.data
            if ($scope.self[0].followed == 1) {$scope.followunfollow = "Unfollow"}
                else{$scope.followunfollow = "Follow"}
            })

    }

    $scope.otherProf2 = function(){
        var splittedUrl = document.URL.split('/');
        var otherUserID = splittedUrl[splittedUrl.length -2];
        $http({method: 'GET', url: '/barker/otherProf/' + otherUserID})
            .then(function(response) {
                $scope.self = response.data
            if ($scope.self[0].followed == 1) {$scope.followunfollow = "Unfollow"}
                else{$scope.followunfollow = "Follow"}
            })

    }

    $scope.buttonText = function(id, user){
        var name
        $http({method:'GET', url: '/name'})
            .then(function(response) {
                name = response.data
                if(name[0].username === user) { 
                    var st = document.getElementById(id+'follButton')
                    st.style.visibility = 'hidden' 
                }
                else {
                    $http({method: 'GET', url: '/barker/otherProf/' + id})
                        .then(function(response) {
                            var button = response.data
                        if (button[0].followed === 1) {document.getElementById(id+'follButton').innerHTML = "Unfollow"}
                            else{document.getElementById(id+'follButton').innerHTML = "Follow"}
                        })
                }
            })
    }

    $scope.deleteBark = function(tweetId) {
        $http({method: 'POST', url: '/barker/bark/delete/' + tweetId})
            .then(function(response) {
                    alert('Successfully deleted')
            })
        $scope.search()
    }

     $scope.addComment = function(tweetContent,parentTweet) {
        $http.post('/barker/bark/comment/create',
            {
                tweetContent: tweetContent,
                parentTweet: parentTweet
            });
    }

    $scope.otherProfile = function(){
        var splittedUrl = document.URL.split('/');
        var otherUserID = splittedUrl[splittedUrl.length -1];
        $http({method: 'GET', url: '/barker/barks/' + otherUserID})
            .then(function(response) {
                $scope.results = response.data
            })

     }


    $scope.searchUser = function (){
        $http.get('/search-user/' + $scope.search_key).then(
            function(response){
                $scope.response = response.data;
            }
        )
    }

    $scope.editBark = function (editContent, tweetId) {
        $http.post('/barker/bark/edit',
                {
                    tweetContent: editContent,
                    tweetId: tweetId
                })
        $http({method: 'GET', url: '/barker/edit/' + tweetId})
            .then(function(response) {
                var x = response.data
                console.log(x[0].tweetContent);
                document.getElementById(tweetId+'editText').innerHTML = x[0].tweetContent;
            })
    }
}]);


barkerApp.controller('followController', ['$scope', '$http', function($scope, $http, $window) {
    $scope.showFollower = function() {
        $http({method: 'GET', url: '/barker/follower/'})
            .then(function(response) {
                $scope.results = response.data
            })
    }

    $scope.showOtherFollower = function() {
        var splittedUrl = document.URL.split('/');
        var otherUserID = splittedUrl[splittedUrl.length -2];
        $http({method: 'GET', url: '/barker/otherfollower/'+ otherUserID})
            .then(function(response) {
                $scope.results = response.data
            })
    }

    $scope.showFollowing = function() {
        $http({method: 'GET', url: '/barker/following/'})
            .then(function(response) {
                $scope.results = response.data
            })
    }

    $scope.showOtherFollowing = function() {
        var splittedUrl = document.URL.split('/');
        var otherUserID = splittedUrl[splittedUrl.length -2];
        $http({method: 'GET', url: '/barker/otherfollowing/'+ otherUserID})
            .then(function(response) {
                $scope.results = response.data
            })
    }

    $scope.follow = function(id) {

        $http.post('/barker/follow/user/' + id);
        console.log("nuuuuuuuuuu");
        $http({method: 'GET', url: '/berker/follow/followed/' + id})
            .then(function(response) {
                var x = response.data
                // $scope.follownot = response.data
                if (x[0].followed == 0){
                    document.getElementById(id+'follButton').innerHTML = "Follow"
                    
                }else{
                    document.getElementById(id+'follButton').innerHTML = "Unfollow"
                }
            })

    }


    $scope.unfollow = function(id) {
        $http.post('/barker/unfollow/user/followed/' + id);
        $scope.showFollowing()
    }

}]);

barkerApp.controller('loginController', ['$scope', '$http', function($scope, $http) {
    $scope.login = function(){
        $http({
            method:'GET',
            params: $scope.credentials,
            url: '/loginCheck'
        })
        .then(function(res){
            if(res.data.length > 0){
                window.location = '/barker'
            }else{
                alert("Invalid Username or Password");
            }
        })
    }

    $scope.signUp = function() {
        $http.post('barker/newuser',
            {
                name: $scope.fullname,
                username: $scope.newusername,
                password: $scope.newpassword,
                email: $scope.email
            })
                .then(function() {
                    alert('Successfully created a new account');
                    $scope.fullname = ''
                    $scope.newusername = ''
                    $scope.newpassword = ''
                    $scope.email = ''
                })
    }

}]);

