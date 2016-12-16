/**
*  DoneTasksController
*
* permite visualizar las tareas terminadas
*/
angular.module('starter.donetaskscontroller', [])
.controller('DoneTasksController', function($scope,$rootScope,DONE_KEY){
	

	//obtener todas las tareas hechas
	$rootScope.Storage.getData(DONE_KEY);

});