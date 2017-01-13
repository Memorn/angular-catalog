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
          ...
       } 
    }]);
####Options
1.data（必须）
data为一个由对象组成的数组，通过参数传入指令。其中每个对象的数据格式如下：
* title
2.click(非必须)
