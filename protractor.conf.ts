import {browser} from "protractor";

let HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    directConnnect: true,
    framework: 'jasmine2',
    multiCapabilities: [
        {
            browserName: 'chrome',
            marionette: true,
            acceptInsecureCerts: true,
            chromeOptions: {
                args: ['--incognito'],
            },
        }
    ],
    maxSessions: 1,
    jasmineNodeOpts: {
        // If true, print colors to the terminal.
        showColors: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 120000,
        // Function called to print jasmine results.
        print: function () {
        },
        // isVerbose: true, -> no longer supported, print does the same job
    },

    specs: [
        './specs/**/*.ts',
    ],

    suites: {
        regression: [
            './specs/**/*.spec.ts',
        ],
        homework: [
            './specs/homework/*.ts',
        ],
    },

    onPrepare: async function () {
        browser.waitForAngularEnabled(false);
        await browser.manage().window().maximize();

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './reports',
            screenshotsSubfolder: 'screenshots',
            gatherBrowserLogs: true,
            preserveDirectory: true,
            takeScreenShotsOnlyForFailedSpecs: false,
            clientDefaults: {
                showTotalDurationIn: "header",
                totalDurationFormat: "hms"
            },
        }).getJasmine2Reporter());
    }
};