# Doctype Explanation (HTML Part 3)

## Intro

In my first post, I shared with you the code snippet that you see below.  We're going to learn what the first line, `<!DOCTYPE HTML>`, means.

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

## Explanation

The `!DOCTYPE` part of the line stands for "Document Type Declaration".  This statement signals to the browser, which will render the file's content, what is about to be provided in the file.  This allows the browser to know how to render the content.

Since the statement declares that the Doctype is `HTML`, it means that this line of our code is telling the browser to anticipate HTML content.

## Points of Interest

HTML5 allows you to skip the Doctype declaration statement.  This means that modern browsers will assume that your file contains HTML5 content if no other Doctype definition is specified.

## Outtro

Thanks for joining for this explanation of the Doctype declaration statement!  Follow for more content about writing your first HTML file.