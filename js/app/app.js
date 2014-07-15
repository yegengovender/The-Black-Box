angular.module("BlackBox.app", [
    "BlackBox.controllers",
    "BlackBox.services",
    "BlackBox.directives"
]);

angular.module("BlackBox.controllers", [])
    .controller("blackBoxController", function ($scope, fireStore) {
        $scope.pages = ['templates/features.html', 'templates/functionality.html'];
        $scope.currentViewIndex = 0;
        $scope.newFeature = {};
        $scope.newFunctionality = {};
        var blackBox;

        fireStore.getProject().then(function (ret) {
            blackBox = ret;
            $scope.project = blackBox.data;
        });

        $scope.addFeature = function () {
            var feature = new Feature($scope.newFeature.name, $scope.newFeature.description);
            blackBox.addFeature(feature);
            var projectData = blackBox.data;
            fireStore.saveProject(projectData);

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
            var projectData = blackBox.data;
            fireStore.saveProject(projectData);

            $scope.newFunctionality.name = "";
            $scope.newFunctionality.description = "";
        };

        $scope.deleteFunctionality = function (functionality) {
            blackBox.removeFunctionalityFromFeature($scope.currentFeature, functionality);
            fireStore.saveProject(blackBox.data);
        }

    })
    .controller("codeAreaController", function ($scope, fireStore) {
        $scope.codeAreas = [];
        $scope.newCodeArea = {};

        fireStore.getCodeAreas().then(function (data) {
            $scope.codeAreas = data;
        })

        $scope.addCodeArea = function () {
            $scope.codeAreas.push({name: $scope.newCodeArea.name});
            fireStore.saveCodeAreas($scope.codeAreas);
            $scope.newCodeArea = {};
        };

    });

angular.module("BlackBox.services", [])
    .factory("fireStore", function ($q) {
        return {
            saveProject: function (projectData) {
                var ref = new Firebase('https://amber-fire-7039.firebaseio.com');
                ref.set({'project': projectData});
            },
            saveCodeAreas: function (codeAreas) {
                var ref = new Firebase('https://amber-fire-7039.firebaseio.com');
                ref.set({'codeAreas': codeAreas});
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
            },
            getCodeAreas: function () {
                var ref = new Firebase('https://amber-fire-7039.firebaseio.com');
                var blackBox = new BlackBox("All Connect");
                var deferred = $q.defer();
                ref.on('value', function (snapshot) {
                    var data = snapshot.val();
                    if (data.codeAreas) {
                        deferred.resolve(data.codeAreas);
                    }
                    else {
                        deferred.reject(snapshot);
                    }
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