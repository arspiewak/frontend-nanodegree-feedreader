# Project Notes for Reviewers

This version of the _Feed Reader Testing_ project uses project materials provided by Udacity in the [required project assets](http://github.com/udacity/frontend-nanodegree-feedreader). My contributions appear in two places, the spec file (jasmine/spec/feedreader.js) and this README file. The project's original README file has been retained as file [OLDREADME.md](./OLDREADME.md).

## Hosting and executing the project

My version of the Feed Reader Testing project can be examined [in GitHub](https://github.com/arspiewak/frontend-nanodegree-feedreader) (branch `master`). To execute the single page of the project, you will need to copy the project to your own computer. Ordinarily, you could run the page by
loading file `index.html` from [the GitHub Pages](https://arspiewak.github.io/frontend-nanodegree-feedreader/index.html) view of the same repository.

But in this case, the base application uses a number of feeds as sources, and they are accessed using the `http` protocol, which has limited protections against sniffer and man-in-the-middle attacks. GitHub Pages use the `https` protocol for the main page, and modern browsers block pages that mix `https` with `http`. I'm not supposed to change the files of the main app, so you will need to copy the project to your computer using one of the following three methods:

1. Make a directory on your file system, run a Git command line in that directory, and use the command `git clone http://github.com/udacity/frontend-nanodegree-feedreader.git` to have Git copy the files down.
2. Go to my [GitHub repository for the project](https://github.com/arspiewak/frontend-nanodegree-feedreader). Click on the green `Clone or download` button, click on `Download ZIP`, and choose a place in your file system to store a zipfile of the project. When that file is downloaded, you can use an unzip app to expand the files into their own location. From that location, open the file `index.html` in your browser.
3. As above, click on the `Clone or download` button on my [GitHub repository page](https://github.com/arspiewak/frontend-nanodegree-feedreader) and then the link `Open in Desktop`. Use the desktop version of Git to set up the project's directories and, as above, launch `index.html` from the project's root directory in your browser.

## The test suite

I have built out the test suite pretty much as required. There are three areas where my choices might be a bit unusual:

1. For the first suite, _Each feed_, I did not build the suite to run specs against each feed. Instead, I loop through all the feeds collecting the required information and then I run the specs to report on the results. In the final suite I do build a suite (`describe()`) for each feed, but not here.

2. For the testing in _The menu_ suite, I chose to detect whether or not the menu appears within the window's viewport, rather than testing for whether the `menu-hidden` class is set. My argument is this: In development projects, people often get ideas about how to "improve" an activity. I had visions of all kinds of ways the trigger mechanism (mouse click sets a class on the document body) could work fine but the display mechanism could break. It was hard to make that test work, as the spec had to wait to begin long enough for the animation to finish changing the menu's location. (Of course, once I figured that out, the async tests that follow were easy.)

3. To test if a feed's contents have changed, I chose to compare the actual articles displayed, rather than checking any information from the `allFeeds` list. In fact, if a feed doesn't load successfully the application continues to show the existing display, so this comparison turned out to be useful.

**Added tests**. I added tests beyond those specified in the assignments for two reasons:

1. The assignment called for error handling, to avoid "undefined variables and out-of-bound arrays." To meet this requirement, I test that:

	* There is exactly one `.slide-menu` element.
	* The menu, in addition to being located onscreen, does not have `display: none` or `visibility: hidden` set.
	* The menu has exactly one icon link to toggle its display and removal.

2. A new suite of tests was added at the end, called _All feeds display at least one entry_. This suite ended up recycling many of the tests used in previous suites. It loops through the list of feeds, loads them, checks that at least one entry is displayed, and makes sure that what's displayed has changed since the last feed. This ensures that all specified feeds at least show up on the screen as expected.
