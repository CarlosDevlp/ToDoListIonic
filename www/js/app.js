// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ion-floating-menu','starter.todotaskscontroller','starter.donetaskscontroller'])
.constant('APP_NAME', "ToDoListIonic")
.constant('TODO_KEY', 'tasks-todo')
.constant('DONE_KEY', 'tasks-done')
.run(function($ionicPlatform,$ionicPopup,$rootScope,APP_NAME,TODO_KEY,DONE_KEY,$cordovaNativeStorage) {
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
    
    //herramientas de permanencia de data y la data globalizada
    //guardar todo en el storage local   
    $rootScope.tasks=[];
    $rootScope.doneTasks=[];
    $rootScope.Storage={
        "selectedKey":TODO_KEY,
        "saveData":function (key){
          this.removeData(key);

          if(key==TODO_KEY)
                $cordovaNativeStorage.setItem(key,$rootScope.tasks);
          else
                $cordovaNativeStorage.setItem(key,$rootScope.doneTasks);  
          
        },
        "removeData":function(key){
          $cordovaNativeStorage.remove(key); 
        },
        "getData":function (key){
          this.selectedKey=key;
          $cordovaNativeStorage.getItem(key).then(function(data){
              if($rootScope.Storage.selectedKey==TODO_KEY)
                $rootScope.tasks=data;
              else
                $rootScope.doneTasks=data;  
          });
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

  });

  
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
