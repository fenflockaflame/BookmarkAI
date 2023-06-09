Since theres no idea which specific sites BookmarkAI will be scraping data from, and the grouping of sites is based on dynamic data that the user might be browsing, then injecting the content script into all web pages is the best approiach. 
Because this should be approached with caution, exaplining this clearly to users is necessary.
Also, remember to comply with the terms of service of the websites you are scraping, and be mindful of user privacy and legal regulations such as GDPR when handling data.


var headings = document.getElementsByTagName('h1');

for (var i = 0; i < headings.length; i++) {
    console.log(headings[i].textContent);
}
