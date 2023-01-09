(function(app) {
  app.AppModule =
    ng.core.NgModule({
      imports: [
        ng.platformBrowser.BrowserModule,
        ng.forms.FormsModule,
        ng.router.RouterModule,
        ng.http.HttpModule,
        app.routing
      ],
      declarations: [
		
		app.MsgComponent,
		app.AppsComponent,
		app.ActiveComponent,
		app.RecoveryComponent,
		app.LoadingServiceComponent,
		app.LoginComponent,
		app.CreateBarMenuComponent,
		app.RegisterComponent,
		app.RegisterWithEmailComponent,
		app.ResendActivationComponent,
		app.RequestRecoveryPasswordComponent,
		app.AuthorizedComponent,
		app.CreateBarMenuComponent,
		app.ExpiredPasswordComponent,
		app.RapidPayComponent,
		app.VoucherComponent,
        app.AppComponent
      ],
      providers: [ 
		app.MsgComponent,
		app.LoadingServiceComponent,
		app.AppCallService
	 ],
      bootstrap: [app.AppComponent]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));