(function(app) {
  app.routing = ng.router.RouterModule.forRoot([
  	{path: '', redirectTo: 'init', pathMatch: 'full'},
  	{path: 'init',component:app.LoginComponent},
	{path: 'authorize',component:app.AuthorizedComponent},
	{path: 'rapid-pay',component:app.RapidPayComponent},
	{path: 'voucher',component:app.VoucherComponent},
	{path: 'register',component:app.RegisterComponent},
	{path: 'register_password_and_questions',component:app.RegisterWithEmailComponent},
	{path: 'resend-activation',component:app.ResendActivationComponent},
	{path: 'expired-password',component:app.ExpiredPasswordComponent},
    {path: 'init/',component:app.LoginComponent},
  	{path: 'apps/', component:app.AppsComponent},
  	{path: 'apps', component:app.AppsComponent},
	{path: 'active',component:app.ActiveComponent},
	{path: 'recovery',component:app.RecoveryComponent},
	{path: 'request',component:app.RequestRecoveryPasswordComponent},
	{path: '**' , component:app.LoginComponent}
  ],{useHash: true});
})(window.app || (window.app = {}));