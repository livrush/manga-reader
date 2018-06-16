const fs = require('fs');
const os = require('os');
const path = require('path');
const lodash = require('lodash');
const JSZip = require('jszip');
const pdfjsLib = require('pdfjs-dist');

const mangaReader = angular.module('manga-reader', ['ui.router']);

mangaReader.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      component: 'library',
    })
    .state('library', {
      url: '/library',
      component: 'library',
    })
    .state('info', {
      url: '/info',
      component: 'info',
    })
    .state('add', {
      url: '/add',
      component: 'add',
    })
    .state('search', {
      url: '/search',
      component: 'search',
    })
    .state('viewer', {
      url: '/viewer',
      component: 'viewer',
    })
    .state('settings', {
      url: '/settings',
      component: 'settings',
    })

});