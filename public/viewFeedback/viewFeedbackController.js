(function () {
    'use strict';

    angular.module('spiderPortal')
        .controller('viewFeedbackController', [viewFeedbackController]);

    function viewFeedbackController() {
			var vm = this;

			function init() {
				vm.tagline = 'View feedback';
				vm.ratings = [
					{id: 1, term: "ST", description:"Strong", details: "Behavior and results show advanced depth and proficiency; excellence is recognized by clients, peers and others"},
					{id: 2, term: "PR", description:"Proficient", details: "Consistently demonstrates behaviors in an effective manner"},
					{id: 3, term: "INC", description:"Inconsistent", details: "Demonstrates some behaviors but may not be consistent or effective in the application of these behaviors; development needed"},
					{id: 4, term: "NA", description:"Not Applicable", details: "You do not have enough visibility about this aspect of the peer’s performance"}
				];
				vm.feedback = {
					requestor: "Asheesh",
					provider: "Asheesh",
					dueDate: "18/12/2015",
					projectLists: "",
					ratingQuestions: [
						{
							editorId: "technical-abilities-editor",
							config: {},
							competency: "Technical Ability",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "communication-editor",
							config: {},
							competency: "Communication: Written and Verbal",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "teamwork-editor",
							config: {},
							competency: "Teamwork and Interpersonal Skills",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "responsiveness-editor",
							config: {},
							competency: "Responsiveness",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "receptivity-editor",
							config: {},
							competency: "Receptivity to Feedback",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "planning-coordination-editor",
							config: {},
							competency: "Planning and Coordination",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "technical-community-editor",
							config: {},
							competency: "Technical Community Involvement",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "initiative-editor",
							config: {},
							competency: "Initiative",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "attention-to-details-editor",
							config: {},
							competency: "Attention to Details",
							rating: null,
							supportingComments: ""
						},
						{
							editorId: "change-orientation-editor",
							config: {},
							competency: "Change Orientation",
							rating: null,
							supportingComments: ""
						}
					]
				};

				vm.projectListEditorHandler = {
					id: "project-lists",
					config: {}
				};
			};

			vm.loadData = function () {
			};

			init();
	};
})();
