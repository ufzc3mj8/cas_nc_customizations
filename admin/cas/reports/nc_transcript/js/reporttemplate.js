"use strict";


require(["Handlebars", "jquery", "Templates", "Spinner"], function (Handlebars, $j, Templates, Spinner) {

    var display = {
        grade: '',
        student: '',
        year: '',
        testdate: '',
        test: '',
        dosename: '',
        nullStudentData: '<div style="padding:3pt 10pt;font-weight:700;">No Data For Student</div>'
    };

    PearsonCas.Handlebars = Templates;
    PearsonCas.Spinner = Spinner;

    function checkGradPlan(studentid) {
        if ($j('#remreq-' + studentid).html() === '') {
            $j('#remreq-' + studentid).append(nullStudentData);
        }
    }

    function parseGradPlan(data, studentid) {
        $j('.bgLightLevel5:contains("UNC")', data).nextUntil('.bgLightLevel5', '.bgLightLevel3').each(function (index, value) {
            if ($j(value).find('td.creditSummary div a').html() !== null) {
                $j('#remreq-' + studentid).append('<div class="creditsremaining">' + $j(value).find('td.creditSummary').find('div').find('a').html() + ': ' + $j(value).find('td.creditSummary').find('div.progressBar').find('span').html() + '</div>');
            }
        });
    }

    function parseGradPlanold(data, studentid) {
        $j.each($j('table tr.bgLightLevel4', data), function (index, value) {
            if ($j(value).find('td.creditSummary div a').html() != null) {
                $j('#remreq-' + studentid).append('<div class="creditsremaining">' + $j(value).find('td.creditSummary').find('div').find('a').html() + ': ' + $j(value).find('td.creditSummary').find('div.progressBar').find('span').html() + '</div>');
            }
        });
        checkGradPlan(studentid);
    }

    function loadGradPlan(studentid) {
        $j.ajax({
            url: "/admin/cas/reports/nc_transcript/resource/gradplan.html?frn=001" + studentid,
            dataType: "html",
            success: function (data) {
                parseGradPlan(data, studentid);
            }
        });
    }

    $j(function () {
        PearsonCas.Handlebars.setup();

        /* For the remaining requirements template, scans the graduation plan for remaining requirments */
        Handlebars.registerHelper('loadreqs', function (options) {
            loadGradPlan(this.studentid);
        });

        /* For the grades template, creates the header line if the grade level has changed */
        Handlebars.registerHelper('newgrade', function (options) {
            var returnedData = null;
            if ((this.gradelevel !== display.grade || this.studentid !== display.student || this.termid !== display.year) && this.gradelevel) {
                display.grade = this.gradelevel;
                display.student = this.studentid;
                display.year = this.termid;
                returnedData = options.fn(this);
            }
            return returnedData;
        });

        /* For the tests templates, check to see if this is a new test */
        Handlebars.registerHelper('newtest', function (options) {
            var returnedData = null;
            if ((this.testdate !== display.testdate || this.studentid !== display.student || this.testname !== display.test) && this.testname) {
                display.testdate = this.testdate;
                display.student = this.studentid;
                display.test = this.testname;
                returnedData = options.fn(this);
            }
            return returnedData;
        });

        Handlebars.registerHelper('newdose', function (options) {
            var returnedData = null;
            if (this.name !== display.dosename || this.studentid !== display.student) {
                display.student = this.studentid;
                display.dosename = this.name;
                returnedData = options.fn(this);
            }
            return returnedData;
        });

        PearsonCas.Handlebars.processTemplates([
            {
                JSONUrl: 'json/school.json.html?dothisfor=' + reportconfig.dothisfor + '&report_name=' + reportconfig.reportname,
                templates: [
                    {
                        templateUrl: 'template/school.hbs.html',
                        selector: '#schooldata-'
                    },
                    {
                        templateUrl: 'template/school2.hbs.html',
                        selector: '#schooldata2-'
                    },
                    {
                        templateUrl: 'template/courseindex.hbs.html',
                        selector: '#courseindexdata-'
                    }
                ]
            },
            {
                JSONUrl: 'json/student.json.html?dothisfor=' + reportconfig.dothisfor,
                templates: {
                    templateUrl: 'template/student.hbs.html',
                    selector: '#studentdata-'
                }

            },
            {
                JSONUrl: 'json/grades.json.html?dothisfor=' + reportconfig.dothisfor,
                templates: {
                    templateUrl: 'template/grades.hbs.html?report_name=' + reportconfig.reportname,
                    selector: '#gradesdata-'
                }
            },
            {
                JSONUrl: 'json/performance.json.html?dothisfor=' + reportconfig.dothisfor,
                templates: {
                    templateUrl: 'template/performance.hbs.html',
                    selector: '#performancedata-'
                }
            },
            {
                JSONUrl: 'json/remainingreq.json.html?dothisfor=' + reportconfig.dothisfor,
                templates: {
                    templateUrl: 'template/remainingreq.hbs.html',
                    selector: '#remainingcreditsdata-'
                }

            },
            {
                JSONUrl: 'json/tests.json.html?dothisfor=' + reportconfig.dothisfor,
                templates: {
                    templateUrl: 'template/tests.hbs.html',
                    selector: '#testsdata-'
                }
            },
            {
                JSONUrl: 'json/awards.json.html?dothisfor=' + reportconfig.dothisfor,
                templates: {
                    templateUrl: 'template/awards.hbs.html',
                    selector: '#awardsdata-'
                }

            }
        ]
        );

        if (reportconfig.reportname === 'transcript_existing') {
            PearsonCas.Handlebars.processTemplates([
                {
                    JSONUrl: 'json/immunizations.json.html?dothisfor=' + reportconfig.dothisfor,
                    templates: {
                        templateUrl: 'template/immunizations.hbs.html',
                        selector: '#immunizationsdata-'
                    }

                },
                {
                    JSONUrl: 'json/attendance.json.html?dothisfor=' + reportconfig.dothisfor,
                    templates: [
                        {
                            templateUrl: 'template/attendance.hbs.html',
                            selector: '#attendancedata-'
                        },
                        {
                            templateUrl: 'template/previousschools.hbs.html',
                            selector: '#previousschoolsdata-'
                        }
                    ]
                }
            ]
            );
        }
    });

});

