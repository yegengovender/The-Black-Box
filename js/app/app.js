angular.module("BlackBox.app", [
    "BlackBox.controllers",
    "BlackBox.services",
    "BlackBox.directives"
]);

angular.module("BlackBox.controllers", [])
    .controller("blackBoxController", function ($scope, fireStore) {
        $scope.pages = ['templates/features.html', 'templates/functionality.html', 'templates/testCases.html'];
        $scope.currentViewIndex = 0;
        $scope.newFeature = {};
        $scope.newFunctionality = {};
        $scope.newTestCase = {};
        var blackBox;

        fireStore.getProject().then(function (ret) {
            blackBox = ret;
            $scope.project = blackBox.data;
        });

        $scope.addFeature = function () {
            var feature = new Feature($scope.newFeature.name, $scope.newFeature.description);
            blackBox.addFeature(feature);
            fireStore.saveProject(blackBox.data);

            $scope.newFeature.name = "";
            $scope.newFeature.description = "";
        };

        $scope.deleteFeature = function (feature) {
            blackBox.removeFeature(feature);
            fireStore.saveProject(blackBox.data);
        };

        $scope.selectFeature = function (feature) {
            $scope.currentFeature = feature;
            $scope.currentViewIndex = 1;
        };

        $scope.backToFeatures = function () {
            $scope.currentViewIndex = 0;
        };

        $scope.addFunctionality = function () {
            var functionality = new Functionality($scope.newFunctionality.name, $scope.newFunctionality.description);
            blackBox.addFunctionalityToFeature($scope.currentFeature, functionality);
            fireStore.saveProject(blackBox.data);

            $scope.newFunctionality.name = "";
            $scope.newFunctionality.description = "";
        };

        $scope.deleteFunctionality = function (functionality) {
            blackBox.removeFunctionalityFromFeature($scope.currentFeature, functionality);
            fireStore.saveProject(blackBox.data);
        };

        $scope.selectFunctionality = function (functionality) {
            $scope.currentFunctionality = functionality;
            $scope.currentViewIndex = 2;
        };

        $scope.backToFunctionality = function () {
            $scope.currentViewIndex = 1;
        };

        $scope.addTestCase = function () {
            var testCase = new TestCase($scope.newTestCase.name, $scope.newTestCase.description, '');
            blackBox.addTestCaseToFunctionality($scope.currentFunctionality, testCase);
            fireStore.saveProject(blackBox.data);

            $scope.newTestCase.name = "";
            $scope.newTestCase.description = "";
        };

        $scope.deleteTestCase = function (testCase) {
            blackBox.removeTestCaseFromFunctionality($scope.currentFunctionality, testCase);
            fireStore.saveProject(blackBox.data);
        };

        $scope.testCaseCount = function (feature) {
            return blackBox.testCaseCount(feature);
        }

    });

angular.module("BlackBox.services", [])
    .factory("fireStore", function ($q) {
        return {
            saveProject: function (projectData) {
                var ref = new Firebase('https://amber-fire-7039.firebaseio.com');
                ref.set({'project': projectData});
            },
            getProject: function () {
                var ref = new Firebase('https://amber-fire-7039.firebaseio.com');
                var blackBox = new BlackBox("All Connect");
                var deferred = $q.defer();
                ref.on('value', function (snapshot) {
                    var data = snapshot.val().project;
                    if (data && data.projectName) {
                        blackBox.data.projectName = data.projectName;
                        blackBox.data.features = data.features;
                    }
                    deferred.resolve(blackBox);
                });
                return deferred.promise;
            }
        };
    });

angular.module('BlackBox.directives', [])
    .directive('textBox', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=model',
                name: '=name',
                label: '=label'
            },
            templateUrl: '/BlackBox/templates/formElements/textBox.html'
        };
    })
    .directive('textArea', function () {
        return {
            restrict: 'E',
            scope: {
                model: '=model',
                name: '=name',
                label: '=label'
            },
            templateUrl: '/BlackBox/templates/formElements/textArea.html'
        };
    });