"use strict";
var courseinfo,
  colnumber;
require(["Handlebars", "jquery"], function(Handlebars, jQuery) {
  jQuery(function() {
    PearsonCas.Handlebars.getJSONData({
      JSONUrl   : 'json/header.json.html?dothisfor=' + reportconfig.dothisfor,
      templates : {
        templateUrl : 'template/header.hbs.html',
        selector    : '#header-'
      }
    });
  });
});
var StudentModel,
  StudentCollection,
  GradeModel,
  GradeCollection,
  GradesView;
StudentModel = Backbone.Model.extend({
  idAttribute : 'curstudid',

  initialize : function() {
    var curstudid = this.id;
    this.gradeView = new GradesView({
      el         : '#grades-' + curstudid,
      collection : gradesCollection,
      id         : curstudid
    });
  }
});

StudentCollection = Backbone.Collection.extend({
  model : StudentModel,
  url   : function() {
    return "json/students.json.html";
  },

  parse : function(obj) {
    return obj.students;
  }
});

GradeModel = Backbone.Model.extend({
  initialize : function() {

  }
});

GradeCollection = Backbone.Collection.extend({
  model : GradeModel,
  url   : function() {
    return ("json/grades.json.html?dothisfor=selected&col1Date=" + reportconfig.col1date + "&col2Date=" + reportconfig.col2Date + "&col3Date=" + reportconfig.col3Date + "&col4Date=" + reportconfig.col4Date + "&col5Date=" + reportconfig.col5Date + "&col6Date=" + reportconfig.col6Date + "&col7Date=" + reportconfig.col7Date + "&col8Date=" + reportconfig.col8Date + "&teacherCommentTerm=" + reportconfig.teacherCommentTerm);
  },

  parse : function(obj) {
    return obj.grades;
  }
});

GradesView = Backbone.View.extend({
  initialize : function() {
    this.template = $("#grades-template").html();
    this.collection.bind("all", this.render, this);
    this.render();
  },

  render     : function() {
    var compiledContent = Handlebars.compile(this.template);
    var renderedContent = compiledContent(this.createJSON());
    $(this.el).html(renderedContent);
    return this;
  },
  createJSON : function() {
    var courses = [];
    var transcript = {};
    var collection = this.collection;

    courses = collection.where({
      studentid : this.id
    });

    for (var i = courses.length; i--;) {
      var search = _.find(transcript, function(course) {
        return course.courseNumber === courses[i].get('courseNumber')
      });
      if (!search) {
        transcript[courses[i].get('courseNumber')] = {
          courseNumber  : courses[i].get('courseNumber'),
          courseName    : courses[i].get('courseName'),
          teacherName   : courses[i].get('teacherName'),
          sectionNumber : courses[i].get('sectionNumber'),
          column1       : [],
          column2       : [],
          column3       : [],
          column4       : [],
          column5       : [],
          column6       : [],
          column7       : [],
          column8       : [],
          comment       : courses[i].get('comment')
        };
        switch(courses[i].get('colnum')) {
          case "1":
            transcript[courses[i].get('courseNumber')].column1.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "2":
            transcript[courses[i].get('courseNumber')].column2.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "3":
            transcript[courses[i].get('courseNumber')].column3.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "4":
            transcript[courses[i].get('courseNumber')].column4.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "5":
            transcript[courses[i].get('courseNumber')].column5.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "6":
            transcript[courses[i].get('courseNumber')].column6.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "7":
            transcript[courses[i].get('courseNumber')].column7.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "8":
            transcript[courses[i].get('courseNumber')].column8.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;

        }
      } else {
        switch(courses[i].get('colnum')) {
          case "1":
            transcript[courses[i].get('courseNumber')].column1.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "2":
            transcript[courses[i].get('courseNumber')].column2.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "3":
            transcript[courses[i].get('courseNumber')].column3.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "4":
            transcript[courses[i].get('courseNumber')].column4.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "5":
            transcript[courses[i].get('courseNumber')].column5.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "6":
            transcript[courses[i].get('courseNumber')].column6.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "7":
            transcript[courses[i].get('courseNumber')].column7.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;
          case "8":
            transcript[courses[i].get('courseNumber')].column8.push({
              grade     : courses[i].get('grade'),
              storeCode : courses[i].get('storeCode')
            });
            break;

        }
      }

    }

    return transcript;
  }
});

var studentsCollection = new StudentCollection();
studentsCollection.fetch();

var gradesCollection = new GradeCollection();
gradesCollection.fetch();
