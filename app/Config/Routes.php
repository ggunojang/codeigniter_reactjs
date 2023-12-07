<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');


/** 
 * 관리자 관련 라우트
 */
$routes->group('admin', function ($routes) {
    $routes->get('', 'Admin\Home::index'); // /admin
});