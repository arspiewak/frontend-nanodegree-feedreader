/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
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


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         describe('have non-empty URLs', function () {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                feed = allFeeds[i];
                it('Feed ' + i + ' has a non-empty URL', function() {
                    expect(feed.url).toBeDefined();
                    expect(feed.url).toBeTruthy(); /* empty test */
                });
            }
        });

        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         describe('and have non-empty names', function () {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                feed = allFeeds[i];
                it('Feed ' + i + ' has a non-empty name', function() {
                    expect(feed.name).toBeDefined();
                    expect(feed.name).toBeTruthy(); /* empty test */
                });
            }
        });

    }); /* describe RSS feeds */


    /* DONE: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        /* The menus's visibility toggles by sliding in and out of the
         * viewport (from/to the left). To see if it's onscreen, we check
         * its horizontal position with getBoundingClientRect(), which gives
         * an element's location relative to the viewport (offscreen is <0). */

        /* Array of elements with the menu container's class */
        var menu = $('.slide-menu');

        it('starts with display and visibility turned on', function() {
            expect(menu.length).toBe(1);    // exactly one slide-menu div
            expect(menu.attr('display')).not.toBe('none');
            expect(menu.attr('visibility')).not.toBe('hidden');
            /* Width of the element > 0 */
            expect(menu[0].getBoundingClientRect().width).toBeGreaterThan(0);
        })

        it('starts offscreen', function () {
            expect(menu[0].getBoundingClientRect().right).not.toBeGreaterThan(0);
        });

        it('has one menu-icon-link to control it', function () {
            expect($('.menu-icon-link').length).toBe(1);
        });

        /* DONE: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        describe('when clicked...', function() {

            /* Set the menu to hidden at first ... */
            beforeAll(function () {
                $('body').addClass('menu-hidden');
            })

            /* ... and after each test. */
            afterEach(function() {
                $('body').addClass('menu-hidden');
            });

            /* First test clicks once */
            var clickCount = 1;
            beforeEach(function (done) {
                /* Simulate the needed number of clicks */
                for (var i = 0; i < clickCount; i++) {
                    $('.menu-icon-link').trigger('click');
                }
                /* Second execution clicks twice. I tried to do this
                 * with code between the two spec ('it') calls, but
                 * the second assignment was executed before the first
                 * spec even though it was after it in the script. */
                clickCount++;
                /* Wait to start the spec till animation from the click
                 * finishes (.2 sec each click, plus .1 sec margin). */
                setTimeout(function() {
                    done();
                }, 500);
            });

            it('once: shows the menu', function() {
                /* Check both the trigger mechanism and the actual display */
                expect($('body').hasClass('menu-hidden')).toBe(false);
                expect(menu[0].getBoundingClientRect().left).not.toBeLessThan(0);
            });

            it('twice: hides the menu', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
                expect(menu[0].getBoundingClientRect().right).not.toBeGreaterThan(0);
            });
        }); /* describe when clicked */

    }); /* describe the menu */

    /* DONE: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('display at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* DONE: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedNo = 0;
        beforeEach(function (done) {
            loadFeed(feedNo, done);
            /* Advance the feedNo index to get another feed for the
             * second spec */
            feedNo++;
        });

        /* How to test that we've loaded a different feed? Let's mush
         * together all the headings into a single string. If that's
         * the same from feed to feed (comment out feedNo++ above) we
         * didn't load a new one (just in case two feeds have the
         * same title ;-). */
        var holdFeed;
        function mashTextValues(selector) {
            var arr = new Array();
            selector.each(function() {
                arr.push(this.innerText);
            });
            return arr.join();
        }

        afterEach(function () {
            holdFeed = mashTextValues($('.entry h2'));
        });

        /* Return to the initial load */
        afterAll(function () {
            loadFeed(0);
        })

        /* First spec repeats the prior test (it's really a throwaway
         * to save values and get to the second load) */
        it('loads a feed with its first index', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

        it('loads a different feed with its second index', function() {
            expect(mashTextValues($('.entry h2'))).not.toBe(holdFeed);
        });
    });

    /* This last suite combines many of the prior tests to verify that
     * all feeds are performing as expected. To ensure that each test
     * suite is independent, I have defined components that are shared
     * with other tests (e.g., mashTextValues) separately inside each
     * suite's context.
     */
    describe('All Feeds display at least one entry', function() {
        afterAll(function () {
            loadFeed(0);
        });
        var feed, name, i, len;
        /* feedNo must be managed inside beforeEach's function; inside
         * that function, i always equals len + 1. */
        var feedNo = 0;

        /* When a feed fails, the app silently fails to change (the
         * prior feed remains displayed). To detect this behavior, we
         * have to check that the feed has changed. */
        var holdFeed = '';
        function mashTextValues(selector) {
            var arr = new Array();
            selector.each(function() {
                arr.push(this.innerText);
            });
            return arr.join();
        }

        /* Loop through the feeds */
        for (i = 0, len = allFeeds.length; i < len; i++) {
            feed = allFeeds[i];
            name = feed.name;

            /* Document each feed with its own describe() */
            describe(name + ' feed', function() {
                /* Load the feed asynchronously */
                beforeEach(function (done) {
                    loadFeed(feedNo++, done);
                });

                /* Retain the displayed feed contents for comparison
                 * with the next feed */
                afterEach(function() {
                    holdFeed = mashTextValues($('.entry h2'));
                });

                /* And here are the tests for this spec */
                it('displays new entries', function () {
                    expect($('.feed .entry').length).toBeGreaterThan(0);
                    expect(mashTextValues($('.entry h2'))).not.toBe(holdFeed);
                });

            }); /* describe name feed */
        } /* for feeds */
    }); /* describe All Feeds */

}());
