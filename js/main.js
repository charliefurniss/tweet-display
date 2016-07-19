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

	createColouredText(tweet.text);

}

function findHashTag(text){
	
	var textArray = text.split(' ');
	var tagsArray = [];
	
	for (i = 0; i < textArray.length; i ++){
	    if(textArray[i].indexOf('#') == 0){
	      tagsArray.push(textArray[i]);
	      textArray.splice(i, 1); 
	    }
	};
	
	return tagsArray;

}

function createColouredText(text){

	var tagsArray = findHashTag(text);
	
	for (i = 0; i < tagsArray.length; i++){
		$('.tweetContent').mark(tagsArray[i], {
		    "element": "span",
		    "className": "red"
		});
	}

}

function init(data){
	
	var i = 0;

	var loopTweets;

	//iterates through array of tweets every ten seconds
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
