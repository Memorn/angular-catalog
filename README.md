# angular-catalog/angular左边栏组件
A ng-directive which could create a catalog in the Web page.
## 依赖库
* angular.js
* jquery.js
* bootstrap.js

## 使用方法
#### html 
     <div ng-app="catalogApp">
       <div ng-controller="catalogCtrl">
         <catalog data="catalogDatas" click="clickFun()"></catalog>
       </div>
     </div>    
     
#### JS
    var catalogApp = angular.module('catalogApp',[]);
    
    catalogApp.controller('catalogCtrl',['$scope',function($scope){
        $scope.catalogDatas = [
          {
             title:'Title1',
             href:'',
             second_list:[
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
#### Options
1.data（必须）  
data为一个由对象组成的数组，通过参数传入指令。其中每个对象的数据格式如下：
* title:string类型，一级目录的名称，必要项；
* href:string类型，一级目录对应的url，非必要项，可不写；
* second_list:array类型，如有二级目录，需要以对象的形式写在该数组下，格式与一级类似，同样是title，href（非必须）组成；

2.click(非必须) 

click是点击目录条目后的回调方法，如不需要可不写。
