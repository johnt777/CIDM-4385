angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('speakerBios', {
    url: '/page3',
    templateUrl: 'templates/speakerBios.html',
    controller: 'speakerBiosCtrl'
  })

  .state('events', {
    url: '/page1',
    templateUrl: 'templates/events.html',
    controller: 'eventsCtrl'
  })

  .state('eventDetails', {
    url: '/page2',
    templateUrl: 'templates/eventDetails.html',
    controller: 'eventDetailsCtrl'
  })

  .state('uploadPhoto', {
    url: '/page4',
    templateUrl: 'templates/uploadPhoto.html',
    controller: 'uploadPhotoCtrl'
  })

  .state('lostAndFound', {
    url: '/page5',
    templateUrl: 'templates/lostAndFound.html',
    controller: 'lostAndFoundCtrl'
  })

  .state('socialMedia', {
    url: '/page6',
    templateUrl: 'templates/socialMedia.html',
    controller: 'socialMediaCtrl'
  })

  .state('fAQs', {
    url: '/page7',
    templateUrl: 'templates/fAQs.html',
    controller: 'fAQsCtrl'
  })

$urlRouterProvider.otherwise('/page3')

  

});