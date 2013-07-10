require(["Handlebars", "jquery"], function(Handlebars, $j) {
  "use strict";
  $j(function() {
    PearsonCas.Handlebars.setup();
    PearsonCas.Handlebars.processTemplates(
      [
        {
          JSONUrl   : 'json/header.json.html?dothisfor=' + reportconfig.dothisfor + '&sectionid=' + reportconfig.sectionid + '&startdate=' + reportconfig.startdate + '&enddate=' + reportconfig.enddate + '&term=' + reportconfig.term,
          templates : [
            {
              templateUrl : 'template/header.hbs.html?class_attendance=' + reportconfig.classattendance,
              selector    : '#header-'
            },
            {
              templateUrl : 'template/studentheader.hbs.html?class_attendance=' + reportconfig.classattendance,
              selector    : '#studentheader-'
            }
          ]
        },
        {
          JSONUrl   : 'json/assignments.json.html?dothisfor=' + reportconfig.dothisfor + '&sectionid=' + reportconfig.sectionid + '&startdate=' + reportconfig.startdate + '&enddate=' + reportconfig.enddate,
          templates : {
            templateUrl : 'template/assignments.hbs.html?class_average=' + reportconfig.classaverage,
            selector    : '#assignments-'
          }
        },
        {
          JSONUrl   : 'json/gradesummary.json.html?dothisfor=' + reportconfig.dothisfor + '&sectionid=' + reportconfig.sectionid + '&startdate=' + reportconfig.startdate + '&enddate=' + reportconfig.enddate,
          templates : {
            templateUrl : 'template/gradesummary.hbs.html',
            selector    : '#gradesummary-'
          }
        }
      ]
    );
  });
});