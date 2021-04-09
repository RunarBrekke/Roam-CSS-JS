/*
 * Viktor's Roam Plugin Loader
 * version: 0.1
 * author: @ViktorTabori
 *
 * How to install it:
 *  - go to page [[roam/js]]
 *  - create a node with: {{[[roam/js]]}}
 *  - create a clode block under it
 *  - allow the running of the javascript on the {{[[roam/js]]}} node
 * 
 * DISABLE a script: 
 *  1) change `true` to `false` in the load variable
 *     eg. 'gallery': false
 *  2) reload Roam 
 *      OR disable and enable the {{[[roam/js]]}} block
 */

// settings
window.ViktorOpts = {
	dateformat: 'YYYY-MM-DD',	// see for details: https://github.com/thesved/ViktoRoam/blob/master/js/dateformat.js
	nameMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	nameMonthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	nameDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	nameDaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	exportFormat: 'JSON',		// EDN | JSON | Markdown
	fuckitlineTag: 'fuckitline',	// tag a block with this, eg #fuckitline
	fuckitlineName: 'fuck it line'	// name above the fuckitline
};

// plugins handling
(()=>{
	var load = {
		'gallery': false,	// zoom in on images 
		'longtap': false,	// long tap for right clicking on touch devices
		'dateformatter': true,	// display dates differently than `January 1st, 2020` format
		'relativelinks': false,	// have relative links, like [next block](block:next)
		'export': false,		// `ctrl + S` for quickly exporting the whole database
		'blockcss': false,	// create css for blocks with tags, eg #block:hide
		'autoenclose': true,	// automatically enclose " and ' characters
		'fuckitline': false,	// use #fuckitline on a block and it highlights the first 3 children
	};

	var defaultrepo = 'https://js.limitlessroam.com/js/';

	// add alpha channel
	if (typeof alphaChannel == 'object') Object.keys(alphaChannel).forEach(a=>{ load[a]=true });

	// handling script loading and stopping
	Object.keys(load).forEach(k=>{
		var moduleName = 'Viktor'+k.replace(/^\w/, c => c.toUpperCase()); // eg. ViktorGallery

		// remove script if exists
		var script = document.getElementById(moduleName);
		if (script) 
			script.remove();

		// if script is set to false
		if (!load[k]) {
			// stop from running
			try {
				if (window[moduleName] && typeof window[moduleName].stop === 'function') window[moduleName].stop();
			} catch(_) {}

			return;
		}

		// add it
		var extension = document.createElement("script");
		extension.src = typeof alphaChannel == 'object' && typeof alphaChannel[k] != 'undefined' ? alphaChannel[k] : defaultrepo+k+'.js';	// add url
		extension.src = extension.src + (extension.src.indexOf('?') > -1 ? '&' : '?') + 'cb='+Date.now();	// add cache buster
		extension.id = moduleName;
		extension.async = false;
		extension.type = "text/javascript";
		document.head.appendChild(extension);
	});
	
})();