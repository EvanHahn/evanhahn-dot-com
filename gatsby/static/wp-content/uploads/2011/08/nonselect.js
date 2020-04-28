/*
 * Make elements nonselectable.
 * by Evan Hahn
 * licensed under the Unlicense
 *
 * Usage:
 * <div class="nonselectable">
 *    This is nonselectable, <span class="selectable">but this part is</span>.
 * </div>
 *
 */

;$.fn.ready(function() {

  // Do the jQuery selections.
  var $nonselectable = $('.nonselectable'),
      $selectable = $('.selectable');

  // Bind to dragstart and selectstart.
  $nonselectable.on('dragstart, selectstart', function(evt) {
    evt.preventDefault();
  });
  $selectable.on('dragstart, selectstart', function(evt) {
    evt.stopPropagation();
  });

  // Add unselectable="on" to nonselectables and all its children.
  $nonselectable.find('*').andSelf().attr('unselectable', 'on');
  $selectable.find('*').andSelf().removeAttr('unselectable');

});
