'use strict';

angular.module('books').run(['Menus', function (Menus) {
  Menus.addMenuItem('topbar', {
    title: 'Books',
    state: 'books',
    type: 'dropdown',
    roles: ['*']
  });

    // Add the dropdown list item
  Menus.addSubMenuItem('topbar', 'books', {
    title: 'List Books',
    state: 'books.list'
  });

    // Add the dropdown create item
  Menus.addSubMenuItem('topbar', 'books', {
    title: 'Upload Books',
    state: 'books.create'
  });
}]);