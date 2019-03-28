/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* Placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test spec that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('each has URL', function() {
           for(let i=0;i<allFeeds.length;i++){
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
           }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('each has name', function() {
            for(let i=0;i<allFeeds.length;i++){
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });


    /* Test suite named "The menu" which contains tests realated to toggle menu */

    describe('The Menu', function() {
        
        /* Test to ensure the menu element is
         * hidden by default. 
         */
        it('menu hidden by default', function(){
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: the menu displays when
          * clicked and hides when clicked again.
          */
         it('menu changes visibility when clicked', function(){
            let menuIcon = document.querySelector('a.menu-icon-link');
            menuIcon.click();
            expect(document.body.classList.contains("menu-hidden")).toBe(false);
            menuIcon.click();
            expect(document.body.classList.contains("menu-hidden")).toBe(true);
         });
    });


    /* Test suite named "Initial Entries" to test for feed loading */
    
    describe('Initial Entries', function(){
        
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Since loadFeed() is asynchronous 
         * Jasmine's beforeEach and asynchronous done() function are used.
         */
        beforeEach(function(done){
            loadFeed(1, done);
        });

        it('has entries in feed container', function(){
            let feedContainer = document.querySelector('div.feed');
            let entries = feedContainer.querySelectorAll('article.entry');
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    /* Test suite named "New Feed Selection" */

    describe('New Feed Selection', function(){
   
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstFeed, secondFeed;
        beforeEach(function(done){
            loadFeed(3, function(){
                firstFeed = document.querySelector('div.feed').innerHTML;
                loadFeed(2, function(){
                    secondFeed = document.querySelector('div.feed').innerHTML;
                    done();
                });
            });
        });

        it('loads new feed', function(){
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
