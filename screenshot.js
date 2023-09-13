const puppeteer = require('puppeteer');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};






(async() => {
    while(1==1){
        let tracks = [
            
            {
                "type": "tiktok",
                "url": "https://www.tiktok.com/@gabe4937/video/6917089639392185606",
                "playTime": 16
            },
            {
                "type": "youtube",
                "url": "https://www.youtube.com/watch?v=ZD09qii5tNI",
                "playTime": 205
            },
            {
                "type": "youtube",
                "url": "https://www.youtube.com/watch?v=VBKGc1L9UwM",
                "playTime": 205
            }, 
            {
                "type": "soundcloud",
                "url": "https://soundcloud.com/djpge/automation",
                "playTime": 205
            },
            {
                "type": "youtube",
                "url": "https://www.youtube.com/watch?v=srDoD7OV6s0",
                "playTime": 180
            },
            {
                "type": "soundcloud",
                "url": "https://soundcloud.com/djpge/dont-worry-baby-feat-candice-eng",
                "playTime": 180
            }
        ]
        let shuffled = tracks
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        for(let track of shuffled){
            console.log(track);
            try{
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setViewport({width: 1000, height: 750})
                await page.goto(track.url, {waitUntil: 'networkidle2'});

                if(track.type=="youtube"){
                    await page.waitForSelector('.ytp-play-button.ytp-button');
                    await page.evaluate(() => {
                        document.querySelector('.ytp-play-button.ytp-button').click();
                    });
                }
                if(track.type=="soundcloud"){
                    await page.waitForSelector('.sc-button-play.playButton.sc-button.m-stretch');
                    await page.evaluate(() => {
                        document.querySelector('.sc-button-play.playButton.sc-button.m-stretch').click();
                    });
                }
                if(track.type=="tiktok"){
                    /*
                    await page.waitForSelector('.css-q1bwae-DivPlayIconContainer.e1ya9dnw8');
                    await page.evaluate(() => {
                        document.querySelector('.css-q1bwae-DivPlayIconContainer.e1ya9dnw8').click();
                    });
                    */
                }
                
                let playTime = (track.playTime - (Math.floor(Math.random() * .10*track.playTime)));
                await timeout(playTime*1000)
                await page.screenshot({path: `screenshots/${Date.now()}.jpg`});
                browser.close();
            }catch(err){
                console.log(err);
            }
            
        }   
    }
})();