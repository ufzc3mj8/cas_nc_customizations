define(["handlebars", "jquery", "/scripts/cas/spin.js"], function(Handlebars, $j, Spinner) {
    "use strict";

    var nullStudentData = ('<div style="padding:3pt 10pt;font-weight:700;">No Data For Student</div>');
    /* Begin Handlebars template process */

    var handlebarFunctions =  {
        jsonToTemplate         : function(config) {
            $j.each(config.JSONData, function(key, val) {
                var html = config.template(val);
                $j(config.selector + key.slice(8, key.length)).html(html);
            });
        },
        getTemplatesAndRender  : function(config, value) {
            $j.get(value.templateUrl, function(data) {
                config.selector = value.selector;
                config.template = Handlebars.compile(data);
                handlebarFunctions.jsonToTemplate(config);
            });
        },
        processTemplateOrArray : function(config) {
            if (Object.prototype.toString.call(config.templates) === '[object Array]') {
                $j.each(config.templates, function(index, value) {
                    PearsonCas.Handlebars.getTemplatesAndRender(config, value);
                });
            } else if (Object.prototype.toString.call(config.templates) === '[object Object]') {
                handlebarFunctions.getTemplatesAndRender(config, config.templates);
            }
        },
        getJSONData            : function(config) {
            $j.getJSON(config.JSONUrl, function(response) {
                config.JSONData = response;
                handlebarFunctions.processTemplateOrArray(config);
            });
        },
        processTemplates       : function(section) {
            $j.each(section, function(index, value) {
                handlebarFunctions.getJSONData(value);
            });
        },

        setup : function() {
            /* For all templates. Forces the numeric value to a fixed decimal place (ie. {{toFixed weighted 4}}) */
            Handlebars.registerHelper('toFixed', function(object, points) {
                if (this) {
                    return parseFloat(object).toFixed(points);
                }
            });

            /* For all templates using an array, check to see if the array is empty when in array includes a blank record */
            Handlebars.registerHelper('emptyArrayCheck', function(count, array) {
                if ((count) <= 1) {
                    return (nullStudentData);
                } else {
                    return array.fn(this);
                }
            });
        }
    };

    return handlebarFunctions;
});
