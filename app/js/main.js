var APP = (function ($) {

    var changeView = function () {
        $('.view-type__list').on('click', '.view-type__link', function (e) {
            e.preventDefault();

            var
                $catalog = $('.catalog'),
                $that = $(this),
                classMod = '';

            if ($that.hasClass('view-type__link_photo-list')) {
                classMod = 'catalog_default';
            }

            if ($that.hasClass('view-type__link_tiel')) {
                classMod = 'catalog_teil';
            }

            if ($that.hasClass('view-type__link_list')) {
                classMod = 'catalog_clear';
            }

            if (!$catalog.hasClass(classMod)) {
                $catalog.attr('class', 'catalog ' + classMod);
            }
        });
    };

    var resetFilter = function () {
        $('.filters__reset').on('click', function (e) {
            e.preventDefault();

            var $that = $(this);

            $that
                .closest('.filters__inner')
                .find('.sidebar__checkbox')
                .prop('checked', false);
        });
    };

    var filters = function () {
        $('.filters_title').on('click', function () {
            var $that = $(this),
                $item = $that.closest('.filters__item');

            $item.toggleClass('filters__item_active');
        });
    };

    var thumbnail = function () {
        $('.position-img__link').on('click', function (e) {
            e.preventDefault();

            var $that = $(this);

            $that
                .closest('.position-img__item')
                .addClass('position-img__item_active')
                .siblings()
                .removeClass('position-img__item_active');

            $that
                .closest('.position__imgs')
                .find('.position-img .img')
                .attr('src', $that.attr('href'));
        });
    };


    return {
        init: function () {
            changeView();
            resetFilter();
            filters();
            thumbnail();
        }
    };
})(jQuery);

APP.init();