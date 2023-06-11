//Since theres no idea which specific sites BookmarkAI will be scraping data from, and the grouping of sites is based on dynamic data that the user might be browsing, then injecting the content script into all web pages is the best approiach. 
//Because this should be approached with caution, exaplining this clearly to users is necessary.
//Also, remember to comply with the terms of service of the websites you are scraping, and be mindful of user privacy and legal regulations such as GDPR when handling data.

//var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6'); //searches the HTML document for all elements with the tag name 'h1 - h6' and stores them in a variable called headings. Once stored, maybe we can start comparing. 
//var paragraphs = document.getElementsByTagName('p'); //searches the HTML document for all elements with the tag name 'p' and stores them in a variable called headings. Once stored, maybe we can start comparing. 

//for (var i = 0; i < headings.length; i++) {
    //console.log(headings[i].textContent);
//} - Code this is above linte item 10 is old code for logging text found in HTML , which was explained this is more of developmental tool not meant for production environment


// Function to extract headers and paragraph text from the current page

function extractText() {
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    let textContent = [];
    elements.forEach(element => textContent.push(element.textContent));
    return textContent.join(' ').toLowerCase();
}

// Get text from the current page
const currentPageText = extractText();
const currentPageUrl = window.location.href;

// Retrieve the groups from storage
chrome.storage.local.get(['websiteGroups'], function(result) {
    let groups = result.websiteGroups || {};

    let matchedGroupKey = null;

    // Check if current page text matches with any existing group
    for (let groupKey in groups) {
        if (currentPageText.includes(groupKey)) {
            matchedGroupKey = groupKey;
            break;
        }
    }

    // If matched with an existing group, add URL to that group
    if (matchedGroupKey) {
        groups[matchedGroupKey].push(currentPageUrl);
    } else {
        // Else, create a new group with current page text
        let groupKey = currentPageText.substr(0, 10); // Use first 10 characters as key
        groups[groupKey] = [currentPageUrl];
    }

    // Save the updated groups back to storage
    chrome.storage.local.set({'websiteGroups': groups});
});
