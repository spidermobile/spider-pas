(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('associatesController', ['$rootScope', '$timeout', 'associateService', associatesController]);

    function associatesController($rootScope, $timeout, associateService) {
		var vm = this;

		function init() {
			vm.invitationSubject = "Sign Up for PAS";
			vm.invitationDescription = "Dear  {username},\n\n" +
			"Please click on the link below and enter the information that you " +
			"will capture on the sheet during the Client Growth exercise. We will " +
			"use this information to help you generate follow-up action plans post-summit.\n\n" +
			"Link to access the application is:\n{appurl}\n\n" +
			"If you face any issues accessing or using the application, then please get in touch " +
			"with Girish Ramachandra (gramachandra@spiderlogic.com), Arun Bharadwaj (abharadwaj@spiderlogic.com)" +
			" or Gautam Kasturi (GKasturi@spiderlogic.com), in person or via email.\n\n" +
			"Thank You,\n" +
			"Murali";

			vm.selectedUsers = [];
		};

		vm.loadData = function () {
			associateService.getUsers().then(
					function(data){
						vm.users = data;
					},
					function(){
						$location.path("/error/500").search({});
						return;
					}
				);

			};

		vm.toggleSelection = function toggleSelection(userId) {
			var idx = vm.selectedUsers.indexOf(userId);

			if (idx > -1) {
				vm.selectedUsers.splice(idx, 1);
			}
			else {
				vm.selectedUsers.push(userId);
			}
			if(vm.selectedUsers.length !== vm.users.length){
				vm.isAllUserChecked = "false";
			}else{
				vm.isAllUserChecked = "true";
			}
		};

		vm.checkAllUser = function(){
			$timeout(function(){
				vm.selectedUsers = [];
				if(vm.isAllUserChecked){
					angular.forEach(vm.users,function(user){
						vm.selectedUsers.push(user.id);
					});
				}
			},0);
		};

		vm.validateAndSendInvite = function(){
			vm.showLoading();
			vm.btnDisabled = true;
			if(vm.validate()){
				//salesLeadService.sendInvitation(vm.selectedUsers,vm.invitationSubject,vm.invitationDescription).then(
				//	function(data){
				//		vm.btnDisabled = false;
				//		vm.hideLoading();
				//		vm.showToastrSuccess("invitation sent");
				//	},
				//	function(){
				//		vm.showToastrErrors("could not send invitation");
				//		vm.btnDisabled = false;
				//		vm.hideLoading();
				//	}
				//);
			}else{
				vm.hideLoading();
				vm.btnDisabled = false;
			}
		};

		vm.validate = function(){
			var isValid = true;
			vm.resetErrors();

			if (!vm.invitationSubject || vm.invitationSubject.trim() == "") {
				vm.invitationSubjectError = "Invitation subject is required";
				isValid = false;
			}
			if(!vm.invitationDescription || vm.invitationDescription.trim() == ""){
				vm.invitationDescriptionError = "Invitation body is required";
				isValid = false;
			}
			return isValid;
		};

		vm.resetErrors = function(){
			vm.invitationSubjectError = "";
			vm.invitationDescriptionError = "";
		};

		$timeout(function () {
			$rootScope.setTextAreaHeight(angular.element(".invitation-subject")[0]);
		}, 0);

		init();
		vm.loadData();
	};
})();
