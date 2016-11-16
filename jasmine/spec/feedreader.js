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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        var feed, name;
        var definedUrls = 0;
        var nonEmptyUrls = 0;
        for (var i = 0, len = allFeeds.length; i < len; i++) {
            feed = allFeeds[i];
            if (feed.url === undefined) {
                console.log('Undefined url, feed ' + i);
            } else {
                definedUrls++;
                /* If defined check for empty */
                if (feed.url) {
                    nonEmptyUrls++;
                } else {
                    console.log('Url for feed ' + i + ' is empty');
                }
            }
        }

        describe('Each feed', function () {
           it('has a defined URL', function() {
                expect(definedUrls).toBe(len);
            });
            it('has a non-empty url', function() {
                /* Note that an undefined url's not counted empty too */
                expect(nonEmptyUrls).toBe(definedUrls);;
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        var feed;
        var definedNames = 0;
        var nonEmptyNames = 0;
        for (var i = 0, len = allFeeds.length; i < len; i++) {
            feed = allFeeds[i];
            if (feed.name === undefined) {
                console.log('Undefined name, feed ' + i );
            } else {
                definedNames++;
                /* If defined check for empty */
                if (feed.name) {
                    nonEmptyNames++;
                } else {
                    console.log('Name for feed '+ i + ' is empty');
                }
            }
        }

        describe('Each feed', function () {
           it('has a defined name', function() {
                expect(definedNames).toBe(len);
            });
            it('has a non-empty name', function() {
                /* Note that an undefined url's not counted empty too */
                expect(nonEmptyNames).toBe(definedNames);;
            });
        });

    }); /* describe RSS feeds */


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var menu = $('.slide-menu');    /* Menu's DOM container */

        /* The menus's visibility is manipulated by sliding it out of
         * the window viewport (to the left) or back into view, on top of
         * the main section. To check its visibility, we'll need the
         * coordinates of the window's "frame". */
         var wLeft = window.screenLeft;
         var wTop = window.screenTop;
         var wRight = wLeft + window.outerWidth;
         var wBottom = wTop + window.outerHeight;

         function isOnscreen(element) {
            /* This function checks if some part of the element is
             * visible. We don't test if the whole thing's visible,
             * which could be a problem on a small viewport. */
            var rect = element.getBoundingClientRect();
            return (rect.right > wLeft) && (rect.left < wRight) &&
                (rect.bottom > wTop) && (rect.top < wBottom);
        }

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('starts with display and visibility turned on', function() {
            expect(menu.attr('display')).not.toBe('none');
            expect(menu.attr('visibility')).not.toBe('hidden');
        })

        it('starts offscreen', function () {
            expect(isOnscreen(menu[0])).toBe(false);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        describe('when clicked...', function() {

            /* Set the hide toggle at first ... */
            $('body').addClass('menu-hidden');

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
                 * finishes. */
                setTimeout(function() {
                    done();
                }, 500);
            });

            it('once: shows the menu', function() {
                expect(isOnscreen(menu[0])).toBe(true);
            });

            it('twice: hides the menu', function() {
                expect(isOnscreen(menu[0])).toBe(false);
            });
        }); /* describe when clicked */

    }); /* describe the menu */

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
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

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
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
        function mashFeedEntries (selector) {
            var arr = new Array();
            selector.each(function() {
                arr.push(this.innerText);
            });
            return arr.join();
        }

        afterEach(function () {
            holdFeed = mashFeedEntries($('.entry h2'));
        });

        /* First spec repeats the prior test (it's really a throwaway
         * to save values and get to the second load) */
        it('loads a feed with its first index', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

        it('loads a different feed with its second index', function() {
            expect(mashFeedEntries($('.entry h2'))).not.toBe(holdFeed);
        });
    });

}());
