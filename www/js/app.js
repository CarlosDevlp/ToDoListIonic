// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCookies' ,'ion-floating-menu','starter.todotaskscontroller','starter.donetaskscontroller'])
.constant('APP_NAME', "ToDoListIonic")
.constant('TODO_KEY', 'tasks-todo')
.constant('DONE_KEY', 'tasks-done')
.run(function($ionicPlatform,$ionicPopup,$rootScope,APP_NAME,TODO_KEY,DONE_KEY,$cookies) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
    

  
  //-------------------------------------------
 //herramientas de permanencia de data y la data globalizada
    //guardar todo en el storage local   
    $rootScope.tasks=[];
    $rootScope.doneTasks=[];
    $rootScope.Storage={
        "selectedKey":TODO_KEY,
        "saveData":function (key){
          this.removeData(key);

          if(key==TODO_KEY)
                window.localStorage.setItem(key, JSON.stringify($rootScope.tasks));
                //$cookies.putObject(key,$rootScope.tasks);
          else
                window.localStorage.setItem(key, JSON.stringify($rootScope.doneTasks));
                //$cookies.putObject(key,$rootScope.doneTasks);  
          
        },
        "removeData":function(key){
          //$cookies.remove(key); 
          window.localStorage.removeItem(key);
        },
        "getData":function (key){          
          if(key==TODO_KEY)
            //$rootScope.tasks=$cookies.getObject(key) || [];
            $rootScope.tasks=JSON.parse(window.localStorage.getItem(key)) || [];
          else
            //$rootScope.doneTasks=$cookies.getObject(key) || [];  
            $rootScope.doneTasks=JSON.parse(window.localStorage.getItem(key)) || [];
          
        }

    };
    

    $rootScope.showAbout=function (){
      
        $ionicPopup.show({
          title: APP_NAME,
          templateUrl: 'templates/about.html',
          buttons:[{
            text:"OK",
            type:"button-positive"           
          }]
        });
      
    };


})
.config(function($stateProvider, $urlRouterProvider) {
  
  //ruteo
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/main.html',
  
  })

  .state('app.todo', {
    url: '/todo',
    views: {
      'toDoContent': {
        templateUrl: 'templates/todo.html',
        controller:'ToDoTasksController'
      }
    }
  })
  .state('app.done', {
    url: '/done',
    views: {
      'doneContent': {
        templateUrl: 'templates/done.html',
        controller:'DoneTasksController'
      }
    }
  });

// if none of the above states are matched, use this as the fallback
  //pantalla principal
  $urlRouterProvider.otherwise('/app/todo');
});
