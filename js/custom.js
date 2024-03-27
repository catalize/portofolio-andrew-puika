/*!
 * Item: Kitzu
 * Description: Personal Portfolio Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v2.0.0
 * License: Themeforest Standard Licenses: https://themeforest.net/licenses
 */

/*----------- CUSTOM JS SCRIPTS -----------*/

(function($) {
  'use strict';



  $(function() {
    // Code here executes When the DOM is loaded...
    // Load partials pages
    console.log("Hai");
    $("div[data-includeHTML]").each(function () {                
        $(this).load($(this).attr("data-includeHTML"));
        console.log("loaded");
    });
  });
  $(window).on('load', function() {
    // Code here executes When the page is loaded
  });
}(jQuery));