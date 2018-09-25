const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://towardsdatascience.com/clustering-electricity-profiles-with-k-means-42d6d0644d00')
.then(function (markdown) {
  console.log(markdown); //=> Markdown content of medium post
});
