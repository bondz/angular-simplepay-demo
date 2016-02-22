/* global angular */
/* global SimplePay */
(function () {
    angular.module("SimplePayDemo", ['ngMaterial', 'ui.router'])
        .config(configureRoutes)
        .controller("demoController", demoController);

    function demoController() {
        var demoVM = this;
        var handler;
        demoVM.makePayment = makePayment;
        activate();

        function activate() {
            handler = SimplePay.configure({
                token: verifyPayment,
                key: 'test_pu_demo',
                image: ''
            });
        }

        function makePayment() {
            handler.open(SimplePay.CHECKOUT, {
                email: 'customer@store.com',
                phone: '+23412345678',
                description: 'My Test Store Checkout 123-456',
                address: '31 Kade St, Abuja, Nigeria',
                postal_code: '110001',
                city: 'Abuja',
                country: 'NG',
                amount: "160000", //This asks the user to pay 1,600 not 160,000 
                currency: 'NGN'
            });
        }

        function verifyPayment(token) {
            //Verify the token in your backend using a service with promise that gets resolved or rejected here.                        
        }
    }

    configureRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];
    function configureRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("demo", {
                url: "/",
                templateUrl: "/partials/demo.html",
                controller: "demoController",
                controllerAs: "demoVM",
            });

        $urlRouterProvider.otherwise("/");
    }
})();