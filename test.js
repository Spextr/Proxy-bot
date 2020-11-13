const proxyscrape = require('proxyscrape');
const ProxyscrapeAPI = new proxyscrape();
 
ProxyscrapeAPI.getProxies({
    proxytype: 'http'
}).then(proxylist => {
    console.log(proxylist);
}).catch(err => {
    console.log(err);
})