(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('associatesController', ['$rootScope', '$timeout', 'associateService', associatesController]);

    function associatesController($rootScope, $timeout, associateService) {
		var vm = this;

		function init() {
			vm.invitationSubject = "Sign Up for PAS";
			vm.invitationDescription = "Dear  {firstName},\n\n" +
			"Please click on the link below and set password to login into PAS system \n " +

			"Link to access the application is:\n{link}\n\n" +

			"If you face any issues accessing or using the application, then please get in touch " +
			"with Himanshu Trivedi (htrivedi@spiderlogic.com) or Ameya Naik (anaik@spiderlogic.com)" +
			" in person or via email.\n\n" +
			"Thank You,\n" +
			"PAS Admin";

			vm.selectedUsers = [];
		};

		vm.loadData = function () {
			associateService.getUsers().then(
					function(data){
						vm.users = data;
						angular.forEach(vm.users, function(user){
							user.emailTried = false;
							user.emailSent = false;
						});
					},
					function(){
						alert("error occured");
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

		//not working here . working in console window
		var bindTemplate = function(template, context){
			var string  = template.valueOf();
			for(var prop in context){
				var expression = "{" + prop + "}";
				var rx = new RegExp(expression, 'gim');
				var value = context[prop];
				string.replace(rx, value);
			}
			return string;
		};

		vm.validateAndSendInvite = function(){
			vm.btnDisabled = true;
			if(vm.validate()){
				angular.forEach(vm.selectedUsers, function(userId , index){
					var user = null;
					angular.forEach(vm.users, function(userData){
						if(userData.id == userId){
							user = userData;
							return;
						}
					});
					if(user){
						user.emailTried = true;
						$.get("http://localhost:8080/send",
							{to: user.email,subject: vm.invitationSubject,
								text: bindTemplate(vm.invitationDescription,{firstName: user.firstName, link: "localhost:8080"})}
							,function(data){
								if(data=="sent")
								{
									user.emailSent = true;
									console.log("Email sent");
								}else{
									user.emailSent = false;
									vm.btnDisabled = false;
								}
							});
					}

				});
			}else{
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
