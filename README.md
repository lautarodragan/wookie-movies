# Wookie Movies

Challenge solution by Lautaro Dragan

## How to Play

Just `npm ci` and `npm run dev`. 

## Folder Structure

### pages, public

Standard Next.JS directories.

### components

All ReactJS components that are not NextJS pages go here. 

It's currently flat, with no folders inside it. 

In real applications I've always seen this folder organized in different ways, always with problems. I have never seen a "perfect" organization.

Some considerations:
- **_One component per file_ is a terrible rule, never to be used.** It adds friction to creating new components and incentivizes writing larger components. It's okay to place one component per file in some cases, several in the same file in others. This is a case-by-case decision — no rule can be enforced. 
- **The structure of this folder won't have a lot of impact.** People never explore this folder, and there's no reason to. An IDE's `Navigate to Source` is a much more sensible tool. Code navigation starts at `pages` and then it's just `Navigate to Source` all the way down.
- Having said this, people do sometimes use the IDE's `Find File` and `Find Symbol` features. These features are more easily used when a single file/symbol name can be easily matched. For example, when I search for `footer components` in WebStorm, `components/footer.tsx` won't show in the results. I need to enter them in order: `components footer`. This becomes painful if we have tons of files sharing the same name, such as `index.tsx`.
- **I prefer having styled and non-styled components in the same file.** I believe separating them goes against colocation and harms code readability. Some people prefer separating them into their own files. Some will even argue against importing them individually (`import { styledComponentA, styledComponentB } from './whatever.tsx`) and will always use a namespace-import (`import * as styles from 'whatever.tsx'`, or (god forbid!) even `import styles from 'whatever.tsx'` with synthetic imports enabled). I can live (and have lived) with this, but would rather avoid it.
- **Specific vs General: deciding that a component we are introducing may be consumed by more than one other component in the future is an early optimization.** It adds friction to future modifications to the component, since the change could impact features outside the scope of the task/PR being worked on, and won't help people find it if people ever do need to use it in more than one place. Team communication ("I need a component that does X. Do we have such a component?" ) and/or knowledge of the product ("I think I've seen a similar component in this other page...") trump architecture in this case. 
- **Layout is special:** `Layout.tsx` is used by Pages to wrap their contents with UI/UX that is shared across pages, such as navigation menus and the footer. If we had more than one layout, I'd probably place them in their own `layouts` folder. I've got no strong opinion either way, and it won't affect code readability/navigation significantly. 

### styles

Global styles and constants go here. The challenge did not require much detail be put into styles, nor did it provide a proper Figma link and design system, but ideally we should have stuff like `colors.tsx`, `fonts.tsx`, etc., so we avoid magic numbers/strings in declarations and guarantee consistency across the site. 

Whether these should be globally available CSS variables or JS/TS exported constants that get interpolated into the styled components is up for debate. I haven't formed a strong opinion on this, yet. 

### clients

Object factories or collection of functions that allow interacting with HTTP APIs (what we usually call "REST" APIs, even though they hardly ever adhere to the REST standard).

These should be business-agnostic, providing a one-to-one mapping of the endpoints offered by the API, with no client-side improvements or code specific to this application. As a rule of thumb, think of them as independent packages that could be published to NPM and consumed by anyone and anything.

They should also provide interfaces for the requests and responses bodies, and take query/path arguments as function arguments.

In an ideal world, all API owners should also own, develop, maintain and publish these.

API clients should not be programmatically tested on their own, as they should contain no logic or business rules. Mocking the HTTP responses themselves with [msw](https://mswjs.io/) and testing the application should cover the testing of these clients. 

#### Side Note

Even though object factories are just functions, I choose to distinguish them from functions that return primitives or objects that only contain primitives (apply this rule recursively) (see [Tuples and Records](https://github.com/tc39/proposal-record-tuple) proposal) from ones that return objects that contain and expose functions, by naming them in PascalCase rather than camelCase, as one would do with classes. 

I choose object factories over classes because classes add no value when using immutability but add a ton of boilerplate and verbosity, and invite the use of `this`, `bind`, `new`, inheritance and other monstrosities.

For more in-depth information about this, Eric Elliott has written excellent articles on this topic, such as [JavaScript Factory Functions with ES6+
](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1).

### pure

Pure functions go here.

They, generally, should be framework and library agnostic. In other words: no ReactJS at all here.

These will generally be transformations on data (take an object or primitive(s) and return a different one) or algorithms (take a private key and return its matching public key, for example).

This type of folder can be found in the wild with names such as `utils` or `helpers`. This was very popular back when Java was The Language™ and functional programming was not well known and even tabu. These names fail to carry significant meaning, and even degrade the code that lives inside these folders, hinting they are second-class-citizens in the codebase. 

I don't love the name `pure` though, and would prefer asking the team involved with this application for name proposals. Maybe `pure-functions`, though more verbose, would be a better name.

#### Side Note

If you need a function that returns a component, there's a name for that kind of function: a component. It belongs under `components`, not here. Remember: functional components are just functions that return a ReactNode.

### Designs

Provided by the challenge. Would not normally exist in a real-life repo.

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

See [Challenge.md](./CHALLENGE.md).
