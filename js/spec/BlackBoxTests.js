describe("BlackBox", function() {
    var blackBox;
    beforeEach(function(){
        blackBox = new BlackBox("ProjectName");
    });

    it("accepts the name of the project in the constructor", function () {
        expect(blackBox.data.projectName).toEqual("ProjectName");
    });

    it("has a list of features", function () {
        expect(blackBox.data.features).toBeDefined();
    });

    var feature1, feature2;
    beforeEach(function () {
        feature1 = new Feature("feature1", "First feature");
        feature2 = new Feature("feature2", "Second feature");

    });
    it("allows features to be added", function () {
        blackBox.addFeature(feature1);
        blackBox.addFeature(feature2);
        expect(blackBox.data.features.length).toEqual(2);
        expect(blackBox.data.features[0]).toEqual(feature1);
        expect(blackBox.data.features[1]).toEqual(feature2);
    });

    it("allows features to be removed", function () {
        blackBox.addFeature(feature1);
        blackBox.addFeature(feature2);
        blackBox.removeFeature(feature1);
        expect(blackBox.data.features.length).toEqual(1);
        expect(blackBox.data.features[0]).toEqual(feature2);
    });

    var functionality1, functionality2;
    beforeEach(function () {
        functionality1 = new Functionality("functionality1", "First functionality");
        functionality2 = new Functionality("functionality2", "Second functionality");

    });
    it("adds functionality to features", function () {
        blackBox.addFeature(feature1);
        blackBox.addFunctionalityToFeature(feature1, functionality1);
        blackBox.addFunctionalityToFeature(feature1, functionality2);
        expect(blackBox.data.features[0].functionality.length).toEqual(2);
        expect(blackBox.data.features[0].functionality[0]).toEqual(functionality1);
        expect(blackBox.data.features[0].functionality[1]).toEqual(functionality2);
    });
    it("removes functionality from features", function () {
        blackBox.addFeature(feature1);
        blackBox.addFunctionalityToFeature(feature1, functionality1);
        blackBox.addFunctionalityToFeature(feature1, functionality2);
        blackBox.removeFunctionalityFromFeature(feature1, functionality1);
        expect(blackBox.data.features[0].functionality.length).toEqual(1);
        expect(blackBox.data.features[0].functionality[0]).toEqual(functionality2);
    });

    it("changes index of features", function () {
        blackBox.addFeature(new Feature("feature 1", "First Feature"));
        blackBox.addFeature(new Feature("feature 2", "Second Feature"));
        blackBox.addFeature(new Feature("feature 3", "Third Feature"));
        blackBox.addFeature(new Feature("feature 4", "Fourth Feature"));
        blackBox.moveFeature(3,1);
        expect(blackBox.data.features.length).toEqual(4);
        expect(blackBox.data.features[0].name).toEqual("feature 1");
        expect(blackBox.data.features[1].name).toEqual("feature 4");
        expect(blackBox.data.features[2].name).toEqual("feature 2");
        expect(blackBox.data.features[3].name).toEqual("feature 3");
    });

    it("allows test cases to be added to functionality", function () {
        blackBox.addFeature(feature1);
        blackBox.addFunctionalityToFeature(feature1, functionality1);
        var testCase1 = new TestCase("test case1", "first test case", "javascript");
        var testCase2 = new TestCase("test case2", "second test case", "databases");
        blackBox.addTestCaseToFunctionality(functionality1, testCase1);
        blackBox.addTestCaseToFunctionality(functionality1, testCase2);
        expect(functionality1.testCases.length).toEqual(2);
        expect(functionality1.testCases[0]).toEqual(testCase1);
        expect(functionality1.testCases[1]).toEqual(testCase2);
    });

    it("allows test cases to be removed from functionality", function () {
        var testCase1 = new TestCase("test case1", "first test case", "javascript");
        var testCase2 = new TestCase("test case2", "second test case", "databases");
        blackBox.addTestCaseToFunctionality(functionality1, testCase1);
        blackBox.addTestCaseToFunctionality(functionality1, testCase2);
        blackBox.removeTestCaseFromFunctionality(functionality1, testCase1);
        expect(functionality1.testCases.length).toEqual(1);
        expect(functionality1.testCases[0]).toEqual(testCase2);
    });

    it("counts the number of test cases per feature", function () {
        var testCase1 = new TestCase("test case1", "first test case", "javascript");
        var testCase2 = new TestCase("test case2", "second test case", "databases");
        blackBox.addFeature(feature1);
        blackBox.addFunctionalityToFeature(feature1, functionality1);
        blackBox.addFunctionalityToFeature(feature1, functionality2);
        blackBox.addTestCaseToFunctionality(functionality1, testCase1);
        blackBox.addTestCaseToFunctionality(functionality1, testCase2);
        expect(blackBox.testCaseCount(feature1)).toEqual(2);
    });
});

describe("BlackBox Features", function () {
    it("has a name and description", function () {
        var feature = new Feature("name", "description");
        expect(feature.name).toEqual("name");
        expect(feature.description).toEqual("description");
    });

    it("allows changing name and description", function () {
        var feature = new Feature("name", "description");
        feature.name = "new name";
        feature.description = "new description";
        expect(feature.name).toEqual("new name");
        expect(feature.description).toEqual("new description");
    });
});

describe("BlackBox Functions", function () {
    it("has a name and description", function () {
        var functionality = new Functionality("name", "description");
        expect(functionality.name).toEqual("name");
        expect(functionality.description).toEqual("description");
    });

    it("allows changing name and description", function () {
        var functionality = new Functionality("name", "description");
        functionality.name = "new name";
        functionality.description = "new description";
        expect(functionality.name).toEqual("new name");
        expect(functionality.description).toEqual("new description");
    });
});

describe("BlackBox TestCases", function () {
   it("hsa a name, description, and code area", function () {
       var testCase = new TestCase("testCase1", "first test case", "javascript");
       expect(testCase.name).toEqual("testCase1");
       expect(testCase.description).toEqual("first test case");
       expect(testCase.codeArea).toEqual("javascript");
   });
});
