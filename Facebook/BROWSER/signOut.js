Facebook.signOut = METHOD({

	run : function(m, callback) {'use strict';
		//OPTIONAL: callback

		if (global.FB !== undefined && FB.getAuthResponse() !== undefined && FB.getAuthResponse() !== null) {
			FB.logout(function(response) {
				// user is now logged out

				Facebook.signIn.isSigned = false;

				if (callback !== undefined) {
					callback();
				}
			});
		}
	}
});

