PDF Reader Web Component
==========

PDF Reader Web Component is a custom element built with <a href="http://www.polymer-project.org/">Polymer</a> and <a href="https://github.com/mozilla/pdf.js">PDF.js</a>.

Component can be used as a widget on the web page to display attached PDF docs.

<a href="http://demo.romanliutikov.com/web-components/">DEMO</a>

##Usage

Install deps and build component:

`npm install && bower install && grunt`

Include Polymer script in your HTML:

`<script src="polymer.min.js"></script>`

HTML import in `head`:

`<link rel="import" href="elements/pdf-reader/pdf-reader.html">`

And the element itself:

`<pdf-reader width="720" height="480" data-url="path_to_pdf"></pdf-reader>`

Where `path_to_pdf` is the url to PDF file.
