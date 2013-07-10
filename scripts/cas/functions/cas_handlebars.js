require(["Handlebars", "jquery", "/scripts/cas/spin.js"], function(Handlebars, $j, Spinner) {
  "use strict";
  /* Add spinner Div */
  if ($j('#spinner').length === 0) {
    $j('body').prepend('<div id="spinner"></div>' +
      '<div id="loading_overlay"></div>');
  }

  /* Begin Handlebars template process */
  PearsonCas.Handlebars = {
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
        PearsonCas.Handlebars.jsonToTemplate(config);
      });
    },
    processTemplateOrArray : function(config) {
      if (Object.prototype.toString.call(config.templates) === '[object Array]') {
        $j.each(config.templates, function(index, value) {
          PearsonCas.Handlebars.getTemplatesAndRender(config, value);
        });
      } else if (Object.prototype.toString.call(config.templates) === '[object Object]') {
        PearsonCas.Handlebars.getTemplatesAndRender(config, config.templates);
      }
    },
    getJSONData            : function(config) {
      $j.getJSON(config.JSONUrl, function(response) {
        config.JSONData = response;
        PearsonCas.Handlebars.processTemplateOrArray(config);
      });
    },
    processTemplates       : function(section) {
      $j.each(section, function(index, value) {
        PearsonCas.Handlebars.getJSONData(value);
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

  PearsonCas.Spinner = {};
  PearsonCas.Spinner = {
    opts   : {
      lines     : 13, // The number of lines to draw
      length    : 7, // The length of each line
      width     : 4, // The line thickness
      radius    : 10, // The radius of the inner circle
      corners   : 1, // Corner roundness (0..1)
      rotate    : 0, // The rotation offset
      color     : '#000', // #rgb or #rrggbb
      speed     : 1, // Rounds per second
      trail     : 60, // Afterglow percentage
      shadow    : false, // Whether to render a shadow
      hwaccel   : false, // Whether to use hardware acceleration
      className : 'spinner', // The CSS class to assign to the spinner
      zIndex    : 2e9, // The z-index (defaults to 2000000000)
      top       : 'auto', // Top position relative to parent in px
      left      : 'auto' // Left position relative to parent in px
    },
    target : document.getElementById('spinner')
  };
  $j('article').css('display', 'none');
  var spinner = new Spinner(PearsonCas.Spinner.opts).spin(PearsonCas.Spinner.target);
  $j(document).ajaxStart(function() {
    if (!spinner) {
      spinner.start();
      $j('article').css('display', 'none');
    }
  });
  $j(document).ajaxStop(function() {
    spinner.stop();
    $j('article').css('display', 'block');
  });
})
;