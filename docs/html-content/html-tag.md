# HTML Tag Tutorial (HTML Part 4)

## Intro

Now that we understand what an HTML tag is and we have discussed the Doctype statement, we can discuss the top-level contents of what's inside the `<html>` tag.  We will reference the code snippet that you see below.

```
<!DOCTYPE HTML>
<html>
    <head>
        <title>Hello</title>
    </head>
    <body>
        <h1>Hello</h1>
    </body>
</html>
```

## Top-level Content

If we remove everything else from our code snippet except the top-level contents within the `<html>` tag, our code snippet looks like this:

```
...
<html>
    <head>...</head>
    <body>...</body>
</html>
```

This makes it easier to recognize two major parts of an HTML file: the head and the body.  In the `<head>` tag, we put important information about the HTML page, including the title of the page, the author, references to code imports that are used in the file, and more.  In the `<body>` tag, we put the actual content that will be rendered by the browser (the stuff the user will see).

By providing valuable information about the page in the head and defining the structure of the page in the body, we can make a quality webpage.  These two top-level tags are a key part of any HTML page, so remember what they're used for!

## Outtro

Thanks for joining for this explanation of the head and body tags!  Follow to learn about how to populate those tags to make your webpage.