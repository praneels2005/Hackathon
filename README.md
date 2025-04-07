This Hackathon project focuses on web scraping dynamic content from The College of New Jersey’s Eickhoff Dining Hall website, which is rendered using Angular.js. The primary goal is to extract structured, up-to-date meal information—including available dining timings(Breakfast, Lunch, Brunch, Dinner), food stations, individual menu items, and calorie data, and make it accessible via a mobile-friendly UI for the TCNJ student community.

**Key Challenges**

**1. Dynamic DOM Rendering**
The site uses Angular.js, meaning the DOM updates dynamically in response to user interaction, therefore elements such as class names, child nodes, and hierarchical structures change frequently with clicks between DOM elements.

**2. Limitations of Static Scraping**
Traditional static scraping fails due to:
- Frequent DOM mutations
- Asynchronous content loading
- Inconsistent element paths and structures

To effectievly counterract these issues, the backend algorithm implements the following techniques:

**Mutation Observers**
- Detect changes in the DOM tree in real time.
- Efficiently tracks when new menu content is injected into the DOM.
- Allows the script to wait for and scrape the correct data regardless of when it appears.

**Structured Data Collection**
The returned data is parsed into nested JavaScript dictionaries for organization:

Date
  Meal times available (e.g., only breakfast and dinner)
    Food stations
      Item names and their associated calories

This is the formatted structure for all scraped data.

**Current Limitations**
- Network Reliability: Frequent requests can overload or delay content rendering from the server.
- DOM Inconsistency: Angular rendering may introduce subtle timing issues where data appears after the scraper has run.
- No Direct API: The lack of a public API necessitates scraping and handling client-side rendering behavior manually.

**Future Plans/Use Case**
- Develop a mobile user interface to display the scraped data for students in a clean, accessible format.
- TCNJ students can use this tool to:
  - Check meal options for the day in real-time
  - Plan meals based on calorie needs or dietary preferences
  - Avoid long wait times by reviewing station offerings in advance
