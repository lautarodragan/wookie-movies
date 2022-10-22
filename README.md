# Wookie Movies

Challenge solution by Lautaro Dragan

## Chosen Libraries and Frameworks

### NextJS

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
