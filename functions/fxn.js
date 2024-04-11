const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {

    if (event.httpMethod === 'POST') {

        const body = JSON.parse(event.body);
        const url = body.url;
        const browser = await puppeteer.launch({
            args: [...chromium.args],
            executablePath: process.env.CHROME_PATH || await chromium.executablePath(),
            headless: true,
        })
        const pkgdata = await fetch(url).then(res => res.json());
        // const page = await browser.newPage();
        // await page.goto(url);
        // const pagedata = await page.evaluate(() => {
        //     const preTag = document.querySelector('pre');
        //     if (preTag) {
        //         return JSON.parse(preTag.textContent || '');
        //     }
        //     return null;
        // });
        console.log(Object.keys(pkgdata.dependencies));
        const npage = await browser.newPage();
        await npage.goto("https://s-maciejewski.github.io/pretty-package/");
        const title = await npage.title();
        console.log(title);
        // await npage.waitForSelector('textarea');
        // await npage.evaluate((data) => {
        //     const textarea = document.querySelector('textarea');
        //     if (textarea) {
        //     textarea.value = "";
        //     }
        // }, pagedata);
        // await npage.type('textarea', JSON.stringify(pkgdata, null, 2));

        // await npage.waitForSelector('input[type="checkbox"]');
        // await npage.evaluate(() => {
        //     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        //     checkboxes.forEach((checkbox) => {
        //         const inputCheckbox = checkbox;
        //         if (inputCheckbox.checked) {
        //             inputCheckbox.click();
        //         }
        //     });
        // });

        // await npage.waitForSelector('button');
        // await npage.evaluate(() => {
        //     const buttons = Array.from(document.querySelectorAll('button'));
        //     const formatButton = buttons.find(button => button.textContent === "Format");
        //     if (formatButton) {
        //         formatButton.click();
        //     }
        // });

        // await npage.waitForSelector('span');
        // const spanContent = await npage.evaluate(() => {
        //     const spans = Array.from(document.querySelectorAll('span'));
        //     const nameSpan = spans.find(span => span.textContent && span.textContent.includes('name'));
        //     return nameSpan ? nameSpan.textContent : '';
        // });

        // const spanId = 'Main_outputBox__6XzB3 MuiBox-root css-0';
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // const spanContent = await npage.$eval(`#${spanId}`, span => span.textContent || '');

        await browser.close();
        
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Received a POST request',
                data: spanContent,
            }),
        };
    } else if (event.httpMethod === 'GET') {
        // Handle GET request
        console.log('Received a GET request');
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Received a GET request',
            }),
        };
    }

    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: process.env.CHROME_PATH || await chromium.executablePath,
        headless: true,
    });

    await browser.close();

    return response;
}