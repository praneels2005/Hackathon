The current project entails scraping data from The College of New Jersey's atrium, Eickhoff. The script was developed 
using the browser's developer tool's, such as snippets, console, and DOM elements. Because the website is
developed entirely through angular.js, the script deals with the complexities dynamic rendering. These dynamic changes
occur in the DOM when a different web elements are interacted with, causing changes in elements' class name, 
child nodes, and other DOM features. Static web-scraping becomes inefficient because of the DOM's inconsistencies.
Therefore, the scraping algorithm implements mutation observers which effectively locate specific DOM changes
benefitting the scraping procedure. Additionally, the data is heavily structured, making dicitionaries the
primary data structure for data storage and categorization. Lastly, the code's shortcomings are primarily rooted in
network issues and DOM rendering. Due to the vast number of requests made to the server, it can create dynamic network 
and DOM rendering issues. Overall, the algorithm is inconsistent due to the aforementioned issues that lie majority in the
network. However, positive results show that the returned dictionary contains accurate days, dining times(breakfast, lunch, brunch, dinner), food stations,
and foods offered at those stations paired with their calories. This data will be presented on an accessible mobile user-interface, accessible for TCNJ
students who would like reliable and quick meal plans.
