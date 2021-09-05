# EcoSys 1.0


**EcoSys** is an invoice-app for the webb written fully in Javascript. It takes user in-data and transforms it to a customized PDF that you can print. EcoSys does all the calculations of units, amount, VAT and totals (with and without VAT). It also puts your company contacts in the most logic places and generates a OCR that is unique to the invoice. The only thing you need to do is to push a + button to add a new row to the PDF.

EcoSys is currently directed to a Swedish market with Swedish VAT-structures. If you have the expertise in another tax-structure in another country, please contact me so that we can make this app more international.

At the moment, this is just an MVP, but will be updated to accompany more flexible VAT-structures, more languages, database support and reusability in larger contexts.

This project started as a challenge to myself to only use vanilla Javascript and Node, to train and further my skills in JS. There are some parts of jQuery in the mix, just to solve problems that would be unfathomably complex and time consuming in Vanilla JS. Sure, all of this would've been easier to implement in VUE or React, but this is not our goal here..

## Techniques used:

* Javascript
* HTML
* CSS
* Node
* Express JS
* pdfMake
* Fetch
* Asynchronous methods
* JSON
* http-queries
* REST
* MongoDB (in development)
* Electron (in development)

## User guide:

To use this app, you will need to have Node installed.
1. Download this code from Git
2. Place the folder in a good spot.
3. Locate that folder in a Terminal of your choice.
4. Run: npm install
5. Run: "node backend.js" in said terminal.
6. In a browser, type: "localhost:3000"
7. You should now see the EcoSys running in your browser. Congratulations!

Of course, this process will be smoother in the future as it will be hosted online. The desktop version of this app will run out of the box in Windows and OSx. Very soon, this system will be hosted on a webbserver, usage free of charge. Until then, you may NOT redistribute, copy, change or sell this product without my consent.

*Disclaimer: Remember that you, solely and alone, is responsible for your economic choices. It is your responsibility to check that your invoice is correct and the calculations are true. By using this app, you acknowledge this fact.*
