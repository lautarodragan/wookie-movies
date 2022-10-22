# Wookie Movies

Challenge solution by Lautaro Dragan

## Chosen Libraries and Frameworks

### Server Side Rendering and NextJS

I usually argue against Server Side Rendering. Websites can usually be broken down into a public-facing landing page that rarely changes more than once a day, and a private page that is very dynamic but is seen only after sign in.

My argument goes as follows: 
- Landing pages that rarely change can be perfectly managed with static site generators such as Eleventy. This is very easy to do both with services such as Netlify, or using AWS to build on each commit to `main` and push the built site to an S3 bucket.
- Signed-in pages are very dynamic, but they don't need to be indexed by search engines, neither do they need to be blazing fast on the first render, as users have already waited for the sign-in and will definitely have to wait on GET and POST/PUT/PATCH requests several times per session. 
- Server Side Rendering involves added complexity to both code and infrastructure. Not all libraries are isometric. Where only static files that are downloaded by the browser are needed by SPAs and statically-generated sites, SSR'd sites need a long-running server. Even some tricks, such as having absolute-path-imports, work differently with WebPack vs NodeJS.

There's a third case, which is not seen so often, which I believe does justify SSR: pages such as online stores (such as Ring.com), where data is a bit too dynamic for static site generators, but navigation may start either on the home page or a details page in their first, and both search-indexing and immediate rendering are important.

Looking at services similar to Wookie Movies, we find that streaming services like Netflix and Disney Plus don't usually allow non-signed-in users to list movies, so they don't really need SSR. Plus, most of the users' time will be spent watching a movie, not navigating the site.

Wookie Movies is different in that it does list movies publicly. This is a missing feature from Netflix and Disney+ IMO, but they can afford it because of their reputation and marketing budget.

Also, when SSR'd sites and the APIs they consume run in the same datacenter, the backend requests made by the site to the APIs should be in the range of 1-10ms. 

All of these reasons make SSR a big improvement in UX. 

So far this has all been an argument in favour of SSR, with no mention of NextJS.

NextJS is, as far as I know, the most battle-tested SSR framework.

### CSS-in-JS and Styled Components

Mark Dalgleish covered several pros in an old-ish, 2017 article: [A Unified Styling Language
](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660). A more recent article, by Sam Magura, [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) does a great job of listing the pros and as well as a few cons of css-in-js.

I pretty much agree with everything said in Mark's article, and pretty much everything said in Sam's, except I still feel the pros out-weight the cons.

I have used both SCSS and Styled Components successfully in production environments, so I don't think there's a giant argument in favour of or against either, yet I currently choose Styled Components because:
- Setting up Styled Components with NextJS [does require an extra step](https://nextjs.org/docs/advanced-features/compiler#styled-components), for example, where SASS is practically [supported out of the box](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support). But it's well documented and minimal.
- When I still used SCSS, I switched to [CSS Modules](https://github.com/css-modules/css-modules) (with the [CSS Loader](https://www.npmjs.com/package/css-loader#modules)) to avoid the worst problems with specificity, but I still faced some from time to time. SCSS without CSS modules is just not an option for me. I never faced this problem at all with Styled Components.
- SCSS will not change at runtime. This means better performance and easier debugging. But, in real life, I have never found performance and debugging to be a problem with Styled Components either, so this is, to a degree, a moot point.
- I guess performance could be an issue with older/cheaper phones (yet I'd measure it before jumping to conclusions), but I don't think anyone would use a very dynamic page in a phone. If the website is complex enough, there's always a native app with better UX and UI. IMO only statically generated sites make sense in mobile browsers. Anything else justifies a PC, laptop or native app. 
- **Developer experience with Styled Components is vastly superior**. A strong reason for this is colocation, but the benefits are many. Improved developer experience leads to fewer bugs, which in turn translates to happier customers and less money spent on engineering. 

## Challenge

Your assignment is to implement a movie streaming dashboard using JavaScript and React.

### Brief

You are the owner of a movie theater in **Thikkiiana City,** on the Wookiee homeworld of Kashyyyk. Your customers are bored with the never changing selection and are asking for something completely different - they want to see what's playing on Earth. Wookies are the main exporter of Computer Technology for the New Republic so naturally you roll up your sleeves and get to work. You quickly scribble down some notes and after a few hours of relentless work you have a design in mind.

### Tasks

-   Implement assignment using:
    -   Language: **JavaScript**
    -   Framework: **React**
-   Build out the project to the designs inside the `/Designs` folder
-   Connect your application to the **CodeSubmit Movie Database** at `https://wookie.codesubmit.io/movies`
-   For authentication pass the `"Authorization: Bearer Wookie2021"` header
-   Parse the API response and display the results as outlined in the design. **Make sure to group movies by categories**.
-   Implement a detail view for the movies in the list
-   Make sure that linking to detail pages as well as bookmarking works as expected
-   Implement search by connecting to `https://wookie.codesubmit.io/movies?q=<search_term>`

### Deliverables

Make sure to include all source code in the repository. 

### Evaluation Criteria

-   **JavaScript** best practices
-   We're looking for you to produce working code, with enough room to demonstrate how to structure components in a small program.
-   Show us your work through your commit history
-   Completeness: did you complete the features?
-   Correctness: does the functionality act in sensible, thought-out ways?
-   Maintainability: is it written in a clean, maintainable way?
-   Testing: is the system adequately tested?

### CodeSubmit

Please organize, design, test and document your code as if it were
going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

All the best and happy coding,

The SalesRabbit Team
