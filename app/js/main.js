var APP = (function ($) {
    var
        $priceSlider = $('.price__slider'),
        $priceFrom = $('.price__range-input[name=price\\[from\\]]'),
        $priceTo = $('.price__range-input[name=price\\[to\\]]');

    var changeView = function () {
        $('.view-type__list').on('click', '.view-type__link', function (e) {
            e.preventDefault();

            var
                $catalog = $('.catalog'),
                $that = $(this),
                $item = $that.closest('.view-type__item'),
                classMod = '';

            if ($that.hasClass('view-type__link_photo-list')) {
                classMod = 'catalog_default';
            }

            if ($that.hasClass('view-type__link_teil')) {
                classMod = 'catalog_teil';
            }

            if ($that.hasClass('view-type__link_list')) {
                classMod = 'catalog_clear';
            }

            if (!$catalog.hasClass(classMod)) {
                $catalog.attr('class', 'catalog ' + classMod);
            }

            if (!$item.hasClass('view-type__item_active')) {
                $item
                    .addClass('view-type__item_active')
                    .siblings()
                    .removeClass('view-type__item_active');
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
        $('.filters__title').on('click', function () {
            var $that = $(this),
                $item = $that.closest('.filters__item');

            $that
                .siblings('.filters__inner')
                .stop(true, true)
                .slideToggle();

            $item.toggleClass('filters__item_active');
        });
    };

    var thumbnail = function () {
        $('.slideshow__link').on('click', function (e) {
            e.preventDefault();

            var $that = $(this);

            $that
                .closest('.slideshow__item')
                .addClass('slideshow__item_active')
                .siblings()
                .removeClass('slideshow__item_active');

            $that
                .closest('.slideshow')
                .find('.slideshow__preview .slideshow__img')
                .attr('src', $that.attr('href'));
        });
    };

    var selector = function () {
        //$('.view-sort__btn').on('click', function () {
        //    var $that = $(this);
        //
        //    $that
        //        .closest('.view-sort__selector')
        //        .toggleClass('view-sort__selector_active');
        //});

        $('.view-sort__select').select2({
            minimumResultsForSearch: Infinity
        });
    };

    var columnizer = function () {
        $('.info__text').columnize({
            columns: 2
        });
    };

    var slider = function () {
        $priceSlider.slider({
            range: true,
            step: 1,
            min: parseInt($priceSlider.data('min')) || 0,
            max: parseInt($priceSlider.data('max')) || 100000,
            values: [$priceFrom.val() || 100, $priceTo.val() || 13000],
            slide: function (e, ui) {
                $priceFrom.val(ui.values[0]);
                $priceTo.val(ui.values[1]);
            }
        });

        //$priceSlider.slider('values', 0, $priceFrom.val() || 0);
        //$priceSlider.slider('values', 1, $priceTo.val() || 1000);
    };

    var stars = function () {
        $('.stars').each(function () {
            var $that = $(this),
                rating = parseInt($that.data('value'));

            $that
                .find('.stars__item')
                .removeClass('stars__item_active')
                .each(function (i) {
                    if (i < rating) {
                        $(this).addClass('stars__item_active');
                    }
                });
        });
    };


    return {
        init: function () {
            changeView();
            resetFilter();
            filters();
            thumbnail();
            selector();
            columnizer();
            slider();
            stars();
        },
        setSliderRangeMin: function (value) {
            if (!isNaN(value)) {
                $priceSlider.slider('option', 'min', parseInt(value));
            }

            return value;
        },
        setSliderRangeMax: function (value) {
            if (!isNaN(value)) {
                $priceSlider.slider('option', 'max', parseInt(value));
            }

            return value;
        },
        setSliderValueFrom: function (value) {
            if (!isNaN(value)) {
                $priceSlider.slider('values', 0, parseInt(value));
                $priceFrom.val(parseInt(value));
            }

            return value;
        },
        setSliderValueTo: function (value) {
            if (!isNaN(value)) {
                $priceSlider.slider('values', 1, parseInt(value));
                $priceTo.val(parseInt(value));
            }

            return value;
        },
        refreshRating: function () {
            stars();
        }
    };
})(jQuery);

APP.init();