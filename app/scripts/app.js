'use strict';

/**
 * @ngdoc overview
 * @name passerelleAngularApp
 * @description
 * # passerelleAngularApp
 *
 * Main module of the application.
 */

function easeInOutCubic(t) { return t<0.7 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; }

angular
  .module('passerelleApp', [
    'ui.router',
    'ngResource',
    'ngMessages',
    'ngAria',
    'ngAnimate',
    'ui.bootstrap',
    'ngMaterial',
    'angularMoment',
    'datetimepicker',
    'ngMap',
    'duScroll'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        
      // route for the home page
      .state('app', {
          url:'/',
          views: {
              'header': {
                  templateUrl : 'views/header.html',
                  controller : 'MainCtrl'
              },
              'content': {
                  templateUrl : 'views/main.html',
                  controller : 'MainCtrl'
              },
              'footer': {
                  templateUrl : 'views/footer.html',
                  controller : 'MainCtrl'
              }
          }

      })

      .state('app.rooms', {
          url:'rooms',
          views: {
              'content@': {
                  templateUrl : 'views/rooms.html'
              }
          },
      })
      ;
    
    $urlRouterProvider.otherwise('/');
    
  }])

  .value('duScrollEasing', easeInOutCubic)
  .value('duScrollDuration', 2000)

  .controller('MainCtrl', ['$scope', '$document', '$location', '$state', function($scope, $document, $location, $state) { 
    var minDate = new Date();
    var dateOut = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()+1 );
    $scope.booking = {
      dateIn: minDate,
      dateOut: dateOut
    }; 

    $scope.scrollToTop = function() {
      $document.scrollTopAnimated(0);
    };

    $scope.goHome = function() {
      if ($location.path()==='/') {
        $scope.scrollToTop();
      }
      else {
        $state.go('app');
      }
    };

  }])
  .config(function($mdDateLocaleProvider) {
    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    $mdDateLocaleProvider.shortDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('DD/MM/YYYY');
    };
    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN); 
    };
  })
  .config(['datetimepickerProvider', function (datetimepickerProvider) {
          datetimepickerProvider.setOptions({
              format: 'L',
              locale: 'fr'
          });
      }
  ])
  .directive('jcCarousel', function () {
    return {
      restrict: 'E',  
      link: function (scope, element) {  
        var options = {
          items:1,
          loop:true,
          nav:true,
          navSpeed : 2000,
          navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
        };  
        $(element).owlCarousel(options);  
      }
    };  
  })
  .directive('jcCarouselLight', function () {
    return {
      restrict: 'E',  
      link: function (scope, element) {  
        var options = {
          items:1,
          loop:true,
          nav:false,
          autoplay: true,
          autoplaySpeed: 1500,
          autoplayTimeout: 6000
        };  
        $(element).owlCarousel(options);  
      }
    };  
  })
;
