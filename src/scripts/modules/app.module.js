angular.module('app', []).run(function ($rootScope, $timeout) {
    $rootScope.textInput = "test2";

    $rootScope.checkboxModel = {
        cb1: false,
        cb2: true
    };


    var timeout;

    $rootScope.$watch(function(){
       return $rootScope.textInput;
    }, function(newVal){
        console.info('VALUE CHANGED');
        $timeout.cancel(timeout);
        timeout = $timeout(function(){
            console.warn('SAVE VALUE', newVal);
        },150);
    });


    $rootScope.items = [{
        id: 'item1',
        value: 'testasas'
    },
        {
            id: 'item2',
            value: 'testasas2'
        }, ];

    $timeout(function () {
        $rootScope.textInput = "timeout";

        $rootScope.items.push({id: 'timeout', value: 'myTest'});
    }, 1000)
});
