(function(app) {
	app.AppComponent =
		ng.core.Component({
		  selector: 'login-app',
		  templateUrl: 'app.component.html'
		})
		.Class({
		  constructor: [function() {

		  }]
		});
})(window.app || (window.app = {}));