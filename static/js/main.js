$('#Details').on('shown.bs.modal', function (e) {
    // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
    centerModals();
});
function centerModals() {
　　$('#myModal').each(function(i) {
　　　　var $clone = $(this).clone().css('display','block').appendTo('body');
　　　　var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
　　　　top = top > 0 ? top : 0;
　　　　$clone.remove();
　　　　$(this).find('.modal-content').css("margin-top", top);
　　});
};
