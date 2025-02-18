function initialiseSlider(id, options, helper) {

    var slider = document.getElementById(id);

    var sliderOptions = {
        start: options.start,
        range: { min: options.min, max: options.max },
        step: options.step,
        tooltips: options.tooltips ? (options.format ? wNumb(options.format) : true) : false,
        format: options.format ? wNumb(options.format) : null,
        pips: options.pips ? {
            format: options.pips.format ? wNumb(options.pips.format) : options.format ? wNumb(options.format) : null,
            mode: options.pips.mode,
            values: options.pips.values,
            density: options.pips.density,
            stepped: options.pips.stepped,
        } : undefined
    };

    if (options.pips) {
        sliderOptions.pips.filter = function (value) {
            var type = -1;
            if (options.pips.filterMultiples) {
                options.pips.filterMultiples.forEach(function (filterMultiple) {
                    if (value % filterMultiple.multiple == 0) {
                        type = filterMultiple.pipType;
                    }
                });
            }
            if (options.pips.alwaysShowMinMax) {
                if (value === sliderOptions.range.min || value === sliderOptions.range.max) {
                    type = 1;
                }
            }
            return type;
        }
    }

    noUiSlider.create(slider, sliderOptions);

    slider.noUiSlider.on('set', onSet);

    function onSet(values, handle, unencoded, tap, positions, noUiSlider) {
        if (unencoded.length > 1) {
            helper.invokeMethodAsync('UpdateValues', unencoded);
        }
        else {
            helper.invokeMethodAsync('UpdateValue', unencoded[0]);
        }
    }
}

function toggleEnableSlider(id, disable) {
    var slider = document.getElementById(id);
    if (disable) {
        slider.setAttribute('disabled', true);
    } else {
        slider.removeAttribute('disabled');
    }
}

function filterPips(value) {
    return value % 100 ? 0 : 1;
}

