---
title: How to block Google's FLoC tracking with Express
description: If you want to block Google's FLoC tracking in an Express app, here's how.
path: /block-googles-floc-tracking-with-express
---

_This post assumes you know what Google's FLoC tracking is._

_This post is meant for people who want to copy-paste something and be done. See the "Notes" section below for more details._

Google is rolling out an experimental [and controversial](https://www.eff.org/deeplinks/2021/03/google-testing-its-controversial-new-ad-targeting-tech-millions-browsers-heres) ad targeting technology called FLoC, short for "Federated Learning of Cohorts". If you want to block Google from doing this to the users of your Express application, read on.

## Option 1: write a short middleware

You can block FLoC with a four-line middleware function. Here's what it might look like in an Express app:

```javascript
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=()");
  next();
});
```

As you can see, all you need to do is set the `Permissions-Policy` HTTP response header to a specific value and you're done. (If you're already setting the `Permissions-Policy` header, see the "Notes" section below.)

To make sure this header is set for all of your responses, put this right after creating the app with `express()`. (You can be more judicious about where you set this if you want. See the "Notes" section below.)

If you're using TypeScript, here's what that might look like:

```typescript
import * as http from "http";

// ...

app.use(
  (_req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {
    res.setHeader("Permissions-Policy", "interest-cohort=()");
    next();
  }
);
```

## Option 2: use a package

Many JavaScript developers love to install packages even for the smallest tasks. If you're one of these people, you can use the [floc-block package][floc-block] (which I maintain).

First, install the package with `npm install floc-block`. Then, in your app:

```javascript
const flocBlock = require("floc-block");

// ...

app.use(flocBlock());
```

Like the option above, I generally recommend putting this right after creating the app with `express()`. That ensures the value is set for all responses.

Also like above, this middleware sets the `Permissions-Policy` HTTP response header. In fact, [the code is nearly identical to the option above][code].

This project works with TypeScript and JavaScript, and is basically identical to Option 1 except someone else (me) wrote those four lines.

## Notes

- The _real_ solution to FLoC is not for all webmasters to set some HTTP header. In practice, developers should push to squash ad tracking holistically. This is more a social and legal challenge than a technical one.

- FLoC is an experimental technology which may change. It's possible that there will be different ways to block FLoC in the future, or that FLoC might be dropped entirely.

- If you're already using the `Permissions-Policy` HTTP response header for something else, the options above will overwrite your work! Adding `interest-cohort=()` to your policy should do this.

  If you want to use an npm package to manage the `Permissions-Policy` header, check out [permissions-policy](https://github.com/pedro-gbf/permissions-policy).

- If you want the header to be set for all responses, I recommend putting the middleware right after you set up the app with `express()`. That ensures that the middleware will be called for every request.

  However, your application may have different needs. Because these solutions are just normal Express middlewares, you can use existing knowledge of Express middleware to figure out how to set the header more judiciously.

- You may not wish to set headers like this at the Express level. For example, if your app is behind nginx, you should probably use nginx to set these headers.

[floc-block]: https://gitlab.com/EvanHahn/floc-block
[code]: https://gitlab.com/EvanHahn/floc-block/-/blob/48ca6fe08a1aa45991ecb6abe3723b7a4fa48c09/floc-block.js
