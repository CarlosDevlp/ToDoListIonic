/**
* To Do controller
*
* listar y cambiar el estado de las tareas por realizar
*/

angular.module('starter.todotaskscontroller',[]).
controller('ToDoTasksController', function($scope,$ionicActionSheet,$ionicPopup,$rootScope,APP_NAME,TODO_KEY,DONE_KEY){
			
	//$cordovaNativeStorage.remove("tasks-todo"); eliminar todas las tareas por hacer guardadas
	
	//plantilla de nueva tarea
	$scope.newTask={name:'',descp:'',state:false};

	
	//obtener todas las tareas guardadas
	$rootScope.Storage.getData(TODO_KEY);
	



	//abrir ventana para agregar más tareas
	$rootScope.showTaskMakerDialog=function(){
			  
	    $ionicPopup.show({
	      title: 'Crear Tarea',
	      templateUrl: 'templates/taskMakerPopUp.html',
	      scope:$scope,
	      buttons:[{text:'Cancelar',
	      			type:'button-positive',
	      			onTap:function(e){
	      				//limpiar formulario
	      				$scope.newTask={name:'',descp:'',state:false};	
	      			}
	      		   },
	      		   {text:'Agregar',
	      		    type:'button-positive',
	      		   	onTap:function(e){
	      		   		//agregar nueva tarea a la lista
	      		   		$rootScope.tasks.push($scope.newTask);
	      		   		$rootScope.Storage.saveData(TODO_KEY);	      		   			
	      		   		console.log($scope.newTask);
	      		   		//limpiar formulario
	      		   		$scope.newTask={name:'',descp:'',state:false};
	      		    }
	      		   }]
	    });
			  	
	};

	
	$rootScope.selectAll=function(){
		for(var i in $rootScope.tasks)
			$rootScope.tasks[i].state=true;
	};


	$rootScope.unselectAll=function(){
		for(var i in $rootScope.tasks)
			$rootScope.tasks[i].state=false;
	};


	$rootScope.removeSelected=function(){
				
		for(var i in $rootScope.tasks)
			//si la tarea está hecha
			if($rootScope.tasks[i].state){
				$rootScope.doneTasks.push($rootScope.tasks[i]);
				$rootScope.tasks.splice(i,1);				
			}
			


		$rootScope.Storage.saveData(TODO_KEY);
		$rootScope.Storage.saveData(DONE_KEY);
		
	};


	$rootScope.resetApp=function(){		
		$rootScope.tasks=[];
		$rootScope.doneTasks=[];
		$rootScope.Storage.saveData(TODO_KEY);
		$rootScope.Storage.saveData(DONE_KEY);
	};


});
