$(document).ready(function() {
    // Xử lý sự kiện click vào chương
    $('.coursedt__chuong').click(function() {
        $(this).next('.coursedt__panel').slideToggle();
    });

    // Xử lý sự kiện click vào bài học
    $('.coursedt-bai__title').click(function(e) {
        e.preventDefault();
        $('.coursedt-bai__title').removeClass('actived');
        $(this).addClass('actived');
    });

    // Xử lý sự kiện hover vào các liên kết
    $('.course-bai__list a').hover(
        function() {
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
}); 