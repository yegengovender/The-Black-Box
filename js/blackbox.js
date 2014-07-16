var BlackBox = function (projectName) {
    this.data = {};
    this.data.features = [];
    this.data.projectName = projectName;

    this.addFeature = function (feature) {
        if (!this.data.features) {
            this.data.features = [];
        }
        this.data.features.push(feature);
    };

    this.removeFeature = function (feature) {
        var index = this.data.features.indexOf(feature);
        if (index >= 0) {
            this.data.features.splice(index, 1);
        }
    };

    this.moveFeature = function (oldIndex, newIndex) {
        var feature = this.data.features[oldIndex];
        this.data.features.splice(oldIndex, 1);
        this.data.features.splice(newIndex, 0, feature);
    };

    this.addFunctionalityToFeature = function (feature, functionality) {
        if (!feature.functionality) {
            feature.functionality = [];
        }
        feature.functionality.push(functionality);
    };

    this.removeFunctionalityFromFeature = function (feature, functionality) {
        var index = feature.functionality.indexOf(functionality);
        if (index >= 0) {
            feature.functionality.splice(index, 1);
        }
    };

    this.addTestCaseToFunctionality = function (functionality, testCase) {
        if (!functionality.testCases) {
            functionality.testCases = [];
        }
        functionality.testCases.push(testCase);
    };

    this.removeTestCaseFromFunctionality = function (functionality, testCase) {
        var index = functionality.testCases.indexOf(testCase);

        if (index >= 0) {
            functionality.testCases.splice(index, 1);
        }
    };

    this.testCaseCount = function (feature) {
        var count = 0;
        if (feature.functionality) {
            feature.functionality.forEach(function (f) {
                if (f.testCases) {
                    count += f.testCases.length;
                }
            });
        }
        return count;
    };
};


var Feature = function (name, description) {
    this.name = name;
    this.description = description;
    this.functionality = [];

};

var Functionality = function (name, description) {
    this.name = name;
    this.description = description;
};

var TestCase = function (name, description, codeArea) {
    this.name = name;
    this.description = description;
    this.codeArea = codeArea;
};