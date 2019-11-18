var http = require('http');
var fs = require('fs');
var path = require('path');
const url = require('url');
const cheerio = require('cheerio');
const req = require('request');
const puppeteer = require('puppeteer');

// function searchSite() {
//     var titleText;
//     req({
//         method: 'GET',
//         url: 'https://www.target.com/s?searchTerm=jelly'
//         }, (err, res, body) => {

//             if(err) return console.error(err);

//             let $ = cheerio.load(body);

//             let title = $('title');
//             titleText = title.text();
//             console.log(titleText);

//             console.log('req: ' + title.text());
//         });
//     if(titleText == undefined) {

//     }
//     else {
//         return titleText;
//     }
// }

function convertToHTML(productText, number) {
    var htmlCode = '<div id="product' + number + '">' + productText + '</div>';
    // console.log(htmlCode);
    return htmlCode;
}


http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    var extname = String(path.extname(filePath)).toLowerCase();
    console.log(extname);
    var params = url.parse(request.url,true).query;

    if (filePath == './' || extname == '.js' || extname == '.css') {
        if(filePath == './') {
            filePath = './index.html';
        }
        var extname = String(path.extname(filePath)).toLowerCase();
        var mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.svg': 'application/image/svg+xml'
        };

        var contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT') {
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }
    else if(params.search) {
    // else {
        var searchValue = params.search.replace(new RegExp(' ', 'g'), '+');
        console.log(searchValue + '\n');
        // req({
        // method: 'GET',
        // url: ('https://www.target.com/s?searchTerm=' + searchValue)
        // }, (err, res, body) => {

        //     if(err) return console.error(err);

        //     let $ = cheerio.load(body);

        //     let title = $('title');
        //     titleText = title.text();

        //     console.log(params.search);
        //     console.log('req: ' + titleText);
        //     // console.log(body);

        //     response.end(params.search + ' ' + titleText);
        // });

        (async () => {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          // var targetUrl = ('https://www.target.com/s?searchTerm=' + searchValue);
          // console.log(targetUrl);

          // await page.goto(targetUrl);
          await page.goto('https://www.target.com/s?searchTerm=pants', {waitUntil: 'networkidle0'});
          const content = await page.content();

          let $ = cheerio.load(content);
          let title = $('title');
          var titleText = title.text();
          console.log(titleText);

          // var divText = $('.h-sr-only');
          // console.log(divText.html());

          // console.log(titleText);
          // console.log($('body').html());

          // let unorderedList = $('.h-padding-t-tight Row-uds8za-0 imJgAf');
          // let unorderedList = $('ul');

          let list = [];
          $('ul').each(function (i, e) {
            // list[i] = $(this).text();
            list[i] = $(this);
        });

          var productGridList = list[2];
          // console.log(list[2].children().length);
          // console.log(productGridList.children().text());

          let list2 = [];
          productGridList.children('li').each(function (i, e) {
            // list[i] = $(this).text();
            list2[i] = $(this);
        });

          for (var product of list2) {
            console.log(product.html() + '\n');
          }

            // Item description text.
          console.log(list2[1].children().first().children().last().find('a').first().text())
            // Finding sponsored element, html output (text output is blank for some reason) 
            // will be undefined for non-sponsored items on product grid.
          console.log(list2[2].find('p').text());
          var sponsor = list2[1].find('p').html();
          if(sponsor == undefined)
          {
            console.log('undefined');
          }
          // console.log(list2[0].children().last().text())
          // console.log(list2[0].text())

          // console.log(list2[0].text());

          let unorderedList = $('.h-padding-t-tight');
          console.log('hello');
          // console.log(unorderedList.length);
          // console.log(unorderedList.html());


          // const titleText = await page.evaluate(() => {
          //   return document.querySelector('title').textContent
          //   // return document.getElementsByClassName('h-margin-a-default h-margin-t-tiny Row-uds8za-0 hWujvj');
          // });

          // const htmlBody = await page.evaluate(() => {
          //   return document.getElementById('.h-padding-t-tight Row-uds8za-0 imJgAf').textContent
          // });

          // const bodyHandle = await page.$('body');
          // const html = await page.evaluate(body => body.innerHTML, bodyHandle);
          // console.log(html);
          // // console.log(bodyHandle);
          // await bodyHandle.dispose();

          // const classHandle = await page.$('.Col-favj32-0 dGRkKb');
          // const html2 = await page.evaluate(body => body.innerHTML, classHandle);
          // // console.log(bodyHandle);
          // await classHandle.dispose();
          // console.log(html2);

          // const aHandle = await page.evaluateHandle(() => document.body);
          // const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
          // // console.log(await resultHandle.jsonValue());
          // console.log(await resultHandle);
          // await resultHandle.dispose();

          // console.log(content);
          // console.log(titleText); /* No Problem Mate */
          // console.log(htmlBody);
          var htmlResponse;
          for(var i = 0; i < list2.length; i++) {
            htmlResponse = htmlResponse + convertToHTML(list2[i].children().first().children().last().find('a').first().text(), i + 1);
          }
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(htmlResponse);

          browser.close();
        })();

        // var titleText = searchSite();
        // console.log(titleText);
        // response.end(params.search + ' ' + titleText);
    }
    
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');