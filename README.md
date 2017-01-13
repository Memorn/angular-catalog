# angular-catalog
A ng-directive which could build a catalog in the Web page.
##依赖库
* angular.js
* jquery.js
* bootstrap.js

##使用方法
####html 

     <div ng-app="catalogApp">
       <div ng-controller="catalogCtrl">
         <catalog data="catalogDatas" click="clickFun()"></catalog>
       </div>
     </div>    
     
####JS

    var catalogApp = angular.module('catalogApp',[]);
    
    catalogApp.controller('catalogCtrl',['$scope',function($scope){
        //左边栏数据
        $scope.catalogDatas = [
          {
             title:'Title1',
             href:'',
             sec_list:[
             {
               title:'Title_sec1',
               href:''
             }]
          },
          ...
        ];
        
       $scope.clickFun = function(){
          //点击目录条目时的回调函数
       } 
    }]);

