$(document).ready(function(){
	
	//accesses Twitter data stored in the Resource object
	var resource = new Resource();
	var data = resource.data;
	
	init(data);

});

function showTweetInfo(tweet){

	// formates the date/time info using moment.js
	var displayDate = moment(tweet.created_at).format('h:mm A - D MMM YYYY');

	// adds each part of the tweet to the relevant HTML tag 
	$('.tweetName').text(tweet.user.name);
	$('.tweetTag').text("@" + tweet.user.screen_name);
	$('.tweetContent').text(tweet.text);
	$('.tweetDateTime').text(displayDate);
	$('.userIcon').attr('src', tweet.user.profile_image_url);

	highlightHashTags(tweet.text);

}

function findHashTags(text){
	
	// creates an array in which each word in the tweet is a separate string element
	var textArray = text.split(' ');
	var tagsArray = [];
	
	// iterates through the textArray, finds the hashtags and pushes them into an array
	for (i = 0; i < textArray.length; i ++){
	    if (textArray[i].indexOf('#') == 0){
	      tagsArray.push(textArray[i]);
	    }
	};
	
	return tagsArray;

}

function highlightHashTags(text){

	// stores hashtags in a new array
	var tagsArray = findHashTags(text);
	
	// replaces hashtags in the tweet text with a highlighted version
	for (i = 0; i < tagsArray.length; i++){
		var hashtag = tagsArray[i];
		// uses mark.js to identify parts of the tweet text that match the hashtag 
		// and then change their HTML tags
		$('.tweetContent').mark(hashtag, {
		    "element": "span",
		    "className": "red"
		});
	}

}

function init(data){
	
	var i = 0;

	var loopTweets;

	//iterates through array of tweets and displays one every ten seconds
	loopTweets = function loopTweets(data){
		
		if (i < data.statuses.length) {
		  showTweetInfo(data.statuses[i]);
		}
		
		setTimeout(function(){
		  i++;
		  loopTweets(data);
		}, 1000);
	
	}

	loopTweets(data);
}
