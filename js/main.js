$(document).ready(function(){

	var resource = new Resource();

	var data = resource.data;

	start(data);

});

function showTweetInfo(tweet){

	var displayDate = moment(tweet.created_at).format('h:mm A - D MMM YYYY');

	$('.tweetName').text(tweet.user.name);
	$('.tweetTag').text("@" + tweet.user.screen_name);
	$('.tweetContent').text(tweet.text);
	$('.tweetDateTime').text(displayDate);
	$('.userIcon').attr('src', tweet.user.profile_image_url);

	findHashTag(tweet.text);

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
	
	return createColouredText(tagsArray);

}

function createColouredText(tagsArray){
	
	for (i = 0; i < tagsArray.length; i++){
		$('.tweetContent').mark(tagsArray[i], {
		    "element": "span",
		    "className": "red"
		});
	}

}

function start(data){
	
	var i = 0;

	var loopTweets;
		
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
