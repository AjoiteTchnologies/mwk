/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  
  '/': {
    controller: 'Index',
    action: 'index'
  },

  '/catalog/:name': {
    controller: 'Catalog',
    action: 'index'
  },

  '/product/:id': {
    controller: 'Product',
    action: 'index'
  },

  '/cms/': {
    controller: 'Cms',
    action: 'index'
  },

  '/cms/list': {
    controller: 'Cms',
    action: 'list'
  },

  '/cms/add': {
    controller: 'Cms',
    action: 'add'
  },


 '/user': {
    controller: 'User',
    action: 'index'
  },

  '/user/list': {
    controller: 'User',
    action: 'list'
  },

  '/user/signup': {
    controller: 'User',
    view: 'user/signup'
  },


  '/user/login': {
    controller: 'User',
    view: 'user/login'
  },

 '/user/create': {
    controller: 'User',
    action: 'createuser'
  },

  
  '/cms/page/:pageId': {
    controller: 'Cms',
    action: 'view'
  },

  '/cart' : {
    controller: 'cart',
    action: 'index'
  }


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};

  
  