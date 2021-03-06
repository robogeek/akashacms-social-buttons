/**
 *
 * Copyright 2013 David Herron
 * 
 * This file is part of AkashaCMS-booknav (http://akashacms.com/).
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

'use strict';

const path     = require('path');
const util     = require('util');
const async    = require('async');
const akasha   = require('../akasharender');

const log   = require('debug')('akasha:embeddables-plugin');
const error = require('debug')('akasha:error-embeddables-plugin');

/**
 * Add ourselves to the config data.
 **/
module.exports.config = function(_akasha, _config) {
	akasha = _akasha;
	config = _config;
    logger = akasha.getLogger("social-buttons");
    config.root_partials.push(path.join(__dirname, 'partials'));
	return module.exports;
};

module.exports.mahabhuta = [
	function($, metadata, dirty, done) {
		// <twitter-share>
		// https://twitter.com/about/resources/buttons#tweet
		var elements = [];
		$('twitter-share').each(function(i, elem) { elements[i] = elem; });
		async.eachSeries(elements, function(element, next) {
			akasha.partial("tweetPage.html.ejs", {
				dataSize:     $(element).attr('size'),
				dataVia:      $(element).attr('via'),
				dataRelated:  $(element).attr('related'),
				dataHashtags: $(element).attr('hashtags')
			}, function(err, html) {
				if (err) { logger.error(err); next(err); }
				else {
					$(element).replaceWith(html);
					next();
				}
			});
		},
		function(err) {
			if (err) done(err);
			else done();
		});
	},
	
	function($, metadata, dirty, done) {
		// <twitter-follow>
		// https://twitter.com/about/resources/buttons#follow
		var elements = [];
		$('twitter-follow').each(function(i, elem) { elements[i] = elem; });
		async.eachSeries(elements, function(element, next) {
			akasha.partial("twitter-follow.html.ejs", {
				dataSize:      $(element).attr('size'),
				dataShowCount: $(element).attr('show-count'),
				twitterHandle: $(element).attr('handle')
			}, function(err, html) {
				if (err) { logger.error(err); next(err); }
				else {
					$(element).replaceWith(html);
					next();
				}
			});
		},
		function(err) {
			if (err) done(err);
			else done();
		});
	},
	
	function($, metadata, dirty, done) {
		// <reddit-this>
		// http://www.reddit.com/buttons/
		var elements = [];
		$('reddit-this').each(function(i, elem) { elements[i] = elem; });
		async.eachSeries(elements, function(element, next) {
			akasha.partial("reddit-this.html", { },
			function(err, html) {
				if (err) { logger.error(err); next(err); }
				else {
					$(element).replaceWith(html);
					next();
				}
			});
		},
		function(err) {
			if (err) done(err);
			else done();
		});
	},
	
	function($, metadata, dirty, done) {
		// <gplus-simple>
		// https://developers.google.com/+/web/+1button/
		var elements = [];
		$('gplus-simple').each(function(i, elem) { elements[i] = elem; });
		async.eachSeries(elements, function(element, next) {
			akasha.partial("gplus-simple.html.ejs", {
				dataSize:               $(element).attr('size'),
				dataAnnotation:         $(element).attr('annotation'),
				dataWidth:              $(element).attr('width'),
				expandTo:               $(element).attr('expand-to'),
				dataCallback:           $(element).attr('callback'),
				dataOnStartInteraction: $(element).attr('onstartinteraction'),
				dataOnEndInteraction:   $(element).attr('onendinteraction'),
				dataRecommendations:    $(element).attr('recommendations')
			}, function(err, html) {
				if (err) { logger.error(err); next(err); }
				else {
					$(element).replaceWith(html);
					next();
				}
			});
		},
		function(err) {
			if (err) done(err);
			else done();
		});
	},
	
	function($, metadata, dirty, done) {
		// <sharethis>
		var elements = [];
		$('sharethis').each(function(i, elem) { elements[i] = elem; });
		async.eachSeries(elements, function(element, next) {
			akasha.partial("sharethis.html.ejs", {
				urlToShare:           $(element).attr('url-to-share'),
				titleToShare:         $(element).attr('title-to-share'),
				imageToShare:         $(element).attr('image-to-share'),
				summaryToShare:       $(element).attr('summary-to-share'),
				enableGoogleTracking: $(element).attr('google-tracking'),
				disablePopularShares: $(element).attr('disable-popular-shares'),
				disableHoverWidget:   $(element).attr('disable-hover-widget'),
				enableEmbeds:         $(element).attr('enable-embeds'),
				headerTitle:          $(element).attr('header-title'),
				headerFGColor:        $(element).attr('header-color-fg'),
				headerBGColor:        $(element).attr('header-color-bg'),
				publisherID:          $(element).attr('publisher-id'),
				chiclets:             JSON.parse($(element).text()).chiclets
			}, function(err, html) {
				if (err) { logger.error(err); next(err); }
				else {
					$(element).replaceWith(html);
					next();
				}
			});
		},
		function(err) {
			if (err) done(err);
			else done();
		});
	}
];


// TBD: function/partial google plus, facebook, buttons and like boxes
// TBD: google+ page boxes
// TBD: facebook page boxes
// TBD: Reddit button
// TBD: Digg button