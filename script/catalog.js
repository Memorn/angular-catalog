(function(window,angular) {
// angular.module('commonUtil').config(['$compileProvider',function($compileProvider){
//   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript|chrome-extension):/);
// }]);
angular.module('commonUtil')
.directive('catalog',['$interval','$timeout',function($interval,$timeout){
  return {
    restrict:'E',
    template:'<div id="catalog">'+
              '<div class="firstCatalog" ng-repeat="first_item in data">'+
                  '<a class="nav-a" ng-class="{active:(first_item.active && !first_item.second_list) || (first_item.active && first_item.second_list.length == 0)}" ng-href="{{first_item.href}}" ng-click="clickFun4Fir(first_item.id4Collapsible)" data-toggle="collapse" data-target="'+'#{{first_item.id4Collapsible}}">'+
                    '<span class="nav-text" ng-bind="first_item.title"></span>'+
                    '<span class="nav-icon" ng-if="first_item.second_list && first_item.second_list.length>0">'+
                      '<i class="fa fa-caret-right" ng-class="{down:first_item.isDown}" aria-hidden="true"></i>'+
                    '</span>'+
                  '</a>'+
                  '<div class="secondCatalog collapse" id="{{first_item.id4Collapsible}}"  ng-init="init()">'+
                    '<a class="second" ng-class="{active:second_item.active}" ng-href="{{second_item.href}}" ng-repeat="second_item in first_item.second_list" ng-click="clickFun4Sec(second_item.id4Collapsible)">'+
                      '<span ng-bind="second_item.title">合作须知</span>'+
                    '</a>'+
                  '</div>'+
               '</div>'+
             '</div>',
    controller: function ($scope) {
        /**
        *1.给每一级每一条目录添加唯一的id,比较复杂故单独处理
        *2.重构目录data
        *  ——给每一级目录添加href（如果已有就用已有的，没有默认为javascript:;）
        *  ——给每一级目录添加active属性
        *  ——给一级目录添加控制下拉按钮的属性isDown
        *3.声明一二级目录的点击回调函数
        *4.根据url确定当前左边栏的形式
        */

        //给每一级每一条目录添加唯一的id
        function addId4Collapsible(){
          var arr4Id = [];

          //工具函数：迭代检查id以免重复
          function checkId(curId){
            if(arr4Id.length === 0){
              return curId;
            }
            for(var j=0;j<arr4Id.length;j++){
              if(arr4Id[j] === curId){
                curId = 'id'+(Math.random()*1000000).toString().split('.')[0];
                checkId(curId);
              }
              return curId;
            }
          }

          for(var i=0;i<$scope.data.length;i++){
            var curId4Fir = 'id'+checkId((Math.random()*1000000).toString().split('.')[0]);
            // var curId4Fir = (Math.random()*1000000).toString().split('.')[0];
            arr4Id.push(curId4Fir);
            // arr4Id.push(checkId(curId4Fir));
            $scope.data[i].id4Collapsible = checkId(curId4Fir);
            if($scope.data[i].second_list&&$scope.data[i].second_list.length>0){
              for(var j=0;j<$scope.data[i].second_list.length;j++){
                var curId4Sec = 'id'+(Math.random()*1000000).toString().split('.')[0];
                arr4Id.push(checkId(curId4Sec));
                $scope.data[i].second_list[j].id4Collapsible = checkId(curId4Sec)
                $scope.data[i].second_list[j].pid4Collapsible = curId4Fir;
              }
            }
          }
          // console.log(arr4Id);
        };

        //重构目录data
        function setHref(){
          for(var i=0;i<$scope.data.length;i++){
            //重写href
            $scope.data[i].href = $scope.data[i].href ? $scope.data[i].href : 'javascript:void(0);';
            //添加active属性
            $scope.data[i].active = $scope.data[i].active ? $scope.data[i].active : false;
            //添加isDown
            $scope.data[i].isDown = $scope.data[i].isDown ? $scope.data[i].isDown : false;
            if($scope.data[i].second_list&&$scope.data[i].second_list.length>0){
              for(var j=0;j<$scope.data[i].second_list.length;j++){
                $scope.data[i].second_list[j].active = $scope.data[i].second_list[j].active ? $scope.data[i].second_list[j].active : false;
                $scope.data[i].second_list[j].active = $scope.data[i].second_list[j].active ? $scope.data[i].second_list[j].active : false;
              }
            }
          }
        };

        //声明一二级目录的点击回调函数
        function clickFun(){

          //一级目录点击事件
          function clickFun4Fir(id4Collapsible){
            //点击后添加active样式
            for(var i=0;i<$scope.data.length;i++){
              if(id4Collapsible === $scope.data[i].id4Collapsible){
                if($scope.data[i].second_list && $scope.data[i].second_list.length > 0){
                  $scope.data[i].isDown = $scope.data[i].isDown ? false : true;
                }
                else{
                  for(var j=0;j<$scope.data.length;j++){
                    $scope.data[j].active = false;
                    for(var k=0;k<$scope.data[j].second_list.length;k++){
                      $scope.data[j].second_list[k].active = false;
                    }
                  }
                  $scope.data[i].active = true;
                }
              }
            }

            $scope.click && $scope.click(id4Collapsible);
          }
          //二级目录点击事件
          function clickFun4Sec(id4Collapsible){
            //点击后添加active样式，并删除其他目录上的active样式
            for(var i=0;i<$scope.data.length;i++){
              $scope.data[i].active = false;
              if($scope.data[i].second_list && $scope.data[i].second_list.length>0){
                for(var j=0;j<$scope.data[i].second_list.length;j++){
                  $scope.data[i].second_list[j].active = false;
                  if($scope.data[i].second_list[j].id4Collapsible == id4Collapsible){
                    $scope.data[i].second_list[j].active = true;
                  }
                }
              }
            }
            $scope.click && $scope.click(id4Collapsible);
          }

          $scope.clickFun4Fir = clickFun4Fir;
          $scope.clickFun4Sec = clickFun4Sec;
        }

        //根据url确定当前左边栏的形式
        function setByUrl(){
          var curHash = window.location.hash;
          // console.log(window.location.pathname+window.location.hash);
          //若url中不含hash则用pathname的值
          if(!curHash){
            curHash = window.location.pathname;
          }
          var data = $scope.data;
          for(var i=0;i<data.length;i++){
            if(data[i].href.indexOf(curHash) !== -1){
              $scope.data[i].active = true;
            }else if(data[i].second_list && data[i].second_list.length>0){
              for(var j=0;j<data[i].second_list.length;j++){
                if(data[i].second_list[j].href.indexOf(curHash) !== -1){
                  $scope.data[i].second_list[j].active = true;
                  //用js触发当前二级目录对应的一级目录的点击事件实现展开
                  var $nav_a = $('.nav-a');
                  var curIndexOfFir = i;
                  //$timeout为解决$disgest already in progress
                  $timeout(function(){
                    $('.nav-a').eq(curIndexOfFir).trigger('click');
                  });
                }
              }
            }
          }
        }

        //确保data中有数据再执行以下函数
        var checkData = $interval(function(){
          if($scope.data){
            addId4Collapsible();
            setHref();
            clickFun();
            setByUrl();

            $interval.cancel(checkData);
          }
        },100);
    },
    scope: {
        data: '=',
        click:'='
    },
    // link:function(scope,element,attrs){
    //   // scope.click = function(){
    //   //   console.log(2);
    //   // }
    //   // var data = JSON.stringify(scope.data);
    //   console.log(1);
    // },
  }
}]);

})(window,window.angular);
