import puppeteer from 'puppeteer';

export async function GET(){
    try{
        const browser = await puppeteer.launch({
            headless: false,
          defaultViewport: null,
        //   executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        })
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation({waitUntil: "domcontentloaded"});
        await page.setViewport({width: 1080, height: 1024});
        await page.goto('https://www.amazon.in/');

        // Set screen size.
        await page.locator('#twotabsearchtextbox').fill('earphones');

        await page.locator('.nav-search-submit .nav-input').click();

        // // Locate the full title with a unique string.
        // await page.locator('text/boult').waitHandle();
        const textSelector = await page.locator('span [class="a-size-medium a-color-base a-text-normal"]').waitHandle();
        textSelector?.evaluate(el=>console.log(el.textContent))
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        console.log(fullTitle);
        await textSelector.click()
        await navigationPromise;
        await page.content()
        await page.waitForSelector("#productTitle");
        // const price = await page.locator('span [class="a-price aok-align-center reinventPricePriceToPayMargin priceToPay"] span [class="a-price-whole"]').waitHandle()
        // const priceVal = await price?.evaluate(el => el.textContent);
        // await browser.close();
    // return Response.json({fullTitle,priceVal})


    }catch(e){
        console.log(e);
    }
    return Response.json({msg:"done"})
}