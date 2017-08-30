import { umengAnalytics, task } from '../'

let analytics = new umengAnalytics();
async function test() {
    const opts = { appkey: '5757879de0f55a7977000f4e', appname: 'koolearn', version: '0.0.2', channel: 'koolearn', resolution: '1920*1080' };
    await analytics.initialize(opts);
    await analytics.launching();
    //await task.delay(30000);
    await analytics.pause();
}

test();