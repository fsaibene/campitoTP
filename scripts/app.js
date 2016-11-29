angular
  .module('miApp', [
    'satellizer',
    'ui.router',
    'ui.grid',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.edit',
    'ngMap'
    ]
    )
  .config(function ($stateProvider, $urlRouterProvider,$authProvider) {

$authProvider.loginUrl = 'Lab4TP/servidor/jwt/php/auth.php';
$authProvider.signupUrl = '/auth/signup';
$authProvider.unlinkUrl = '/auth/unlink/';
$authProvider.tokenName = 'CampitoToken';
$authProvider.tokenPrefix = 'AngularABM';
$authProvider.authHeader = 'data';
$authProvider.tokenHeader = 'Authorization';
$authProvider.httpInterceptor = function() { return true; },
$authProvider.withCredentials = false;
$authProvider.tokenRoot = null;
    $urlRouterProvider.otherwise('inicio');
    $stateProvider

    .state('inicio', {
      url: '/inicio',
      templateUrl: 'views/inicio.html',
      controller:'inicioCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller:'loginCtrl'
    })
    .state('altas', {
      url: '/altas',
      templateUrl: 'views/altas.html',
      controller:'altasCtrl'
    })
    .state('grilla', {
      url: '/grilla',
      templateUrl: 'views/grilla.html',
      controller:'grillaCtrl'
    })
    .state('grillaUsuarios', {
      url: '/grillaUsuarios',
      templateUrl: 'views/grillaUsuarios.html',
      controller:'grillaUsuarios'
    })
    .state('grillaDirectiva', {
      url: '/grillaDirectiva',
      templateUrl: 'views/grillaDirectiva.html',
      controller:'grillaDirectivaCtrl'
    })
    .state('exportar', {
      url: '/exportar',
      templateUrl: 'views/exportar.html',
      controller:'ExportarCtrl'
    })
    .state('modificar', {
      url: '/modificar',
      templateUrl: 'views/modificar.html',
      controller:'ModificarCtrl'
    }).state('ConfiguradoTP', {
      url: '/ConfiguradoTP',
      templateUrl: 'views/ConfiguradoTP.html',
      controller:'ConfiguradoTP'
    })
    .state('ServicioTp', {
      url: '/ServicioTp',
      templateUrl: 'views/Servicio.html',
      controller:'ConfiguradoServicios',
      cache: true
    })
    .state('DirectivaTp', {
      url: '/DirectivaTp',
      templateUrl: 'views/directiva.html',
      controller:'DirectivaCtrl',
      cache: true
    })
  });
