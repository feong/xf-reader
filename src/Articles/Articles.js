import InoreaderRequest from '../util/InoreaderRequest';
const TEST = false;

class Articles {
    get subscriptions() {
        return this._subscriptions;
    }

    get subscriptionsID() {
        return this._subscriptionsID;
    }

    get unreadArticles() {
        return this._unreadArticles;
    }

    set currentArticleID(id) {
        this._currentArticleID = id;
    }

    get currentArticleID() {
        return this._currentArticleID;
    }    

    get currentArticle() {
        // if(TEST) return JSON.parse(testContents).items[0];
        if(!this.unreadArticles) return null;
        let articles = this.unreadArticles.filter(a=>a.id === this.currentArticleID);
        return articles.length == 0 ? null : articles[0];
    }

    removeFeedburner(content) {
        const feedburnerIndex = content.indexOf('feeds.feedburner.com');
        if(feedburnerIndex > 0) {
            const subString = content.substring(0, feedburnerIndex);
            const firstIndex = subString.lastIndexOf('<div>',);

            const lastIndex = content.indexOf('</div>', feedburnerIndex);

            const feedburner = content.substring(firstIndex, lastIndex);
            return content.replace(feedburner, '');
        }
        return content;
    }

    removeAds(content) {
        const adsIndex = content.indexOf('Ads from Inoreader');
        if(adsIndex > 0) {
            const subString = content.substring(0, adsIndex);
            const firstIndex = subString.lastIndexOf('<center>',);

            const lastIndex = content.indexOf('</center>', adsIndex);

            const adsContent = content.substring(firstIndex, lastIndex);
            return content.replace(adsContent, '');
        }
        return content;
    }

    getShortId(longId) {
        const lastIndex = longId.lastIndexOf('/');
        const id16 = longId.substring(lastIndex + 1);
        return id16.toString(10);
    }

    findStar(categories) {
        let result = false;
        categories.forEach((c)=>{
            if(c.indexOf('/state/com.google/starred') > 0) {
                result = true;
            }
        });
        return result;
    }

    freshStarState(article) {
        article.star = this.findStar(article.categories);
        console.log(article);
    }

    getSubscriptions(success, fail) {
        const findUnreadCounts = function(subscriptions, subscriptionsUnreadCounts) {
            subscriptions.forEach(sub => {
                subscriptionsUnreadCounts.forEach(unread => {
                    if(sub.id === unread.id) {
                        sub.count = unread.count;
                    }
                });
            });
        }

        if(TEST) {
            const subscriptions = JSON.parse(testSubScriptions).subscriptions;
            const unreadcounts = JSON.parse(testSubScriptionsUnreadCounts).unreadcounts;
            findUnreadCounts(subscriptions, unreadcounts);
            this._subscriptions = subscriptions;
            if(success) {
                setTimeout(function() {
                    success(subscriptions);
                }.bind(this), 1000);
            }
            return;
        }
        let failed = false;
        let subscriptions = null;
        let unreadcounts = null;
        InoreaderRequest.getSubscriptions((json)=>{
            if(failed) return;
            subscriptions = json.subscriptions;
            if(subscriptions && unreadcounts) {
                findUnreadCounts(subscriptions, unreadcounts);
                this._subscriptions = subscriptions;
                if(success) success(subscriptions);
            }
        }, ()=>{
            if(!fail) fail();
            failed = true;
        });
        InoreaderRequest.getUnreadCounters((json)=>{
            if(failed) return;
            unreadcounts = json.unreadcounts;
            if(subscriptions && unreadcounts) {
                findUnreadCounts(subscriptions, unreadcounts);
                this._subscriptions = subscriptions;
                if(success) success(subscriptions);
            }
        }, ()=>{
            if(!fail) fail();
            failed = true;
        });
    }

    getUnreadArticles(success, fail, id) {
        this._unreadArticles = null;
        this._subscriptionsID = id;
        if(TEST) {
            const articles = JSON.parse(testContents).items;
            if(success) {
                setTimeout(function() {
                    this._unreadArticles = articles;
                    success(articles);
                }.bind(this), 1000);
            }
            return;
        }
        InoreaderRequest.getUnreadArticles((json)=>{
            const articles = json.items;
            // if(TEST) {
                articles.forEach((article)=>{
                    this.freshStarState(article);
                    article.summary.content = this.removeAds(article.summary.content);
                    article.summary.content = this.removeFeedburner(article.summary.content);
                });
            // }
            this._unreadArticles = articles;
            if(success) {
                this._unreadArticles = articles;
                success(articles);
            }
        },()=>{
            if(fail) fail();
        }, id);
    }

    starArticle(success, fail, article, stared) {
        article.star = stared;
        const id = this.getShortId(article.id);
        if(stared) {
            InoreaderRequest.addStar(null, null, id);
        } else {
            InoreaderRequest.removeStar(null, null, id);
        }
    }

    laterArticle(success, fail, article) {
        article.later = true;
        // TODO start it on server
    }

    unlaterArticle(success, fail, article) {
        article.star = false;
        // TODO start it on server
    }
}

const articles = new Articles();
export default articles;


const testSubScriptions = `{"subscriptions":[
  {"id":"feed\/http:\/\/feeds.feedburner.com\/solidot","title":"Solidot","categories":[],"sortid":"028C41ED","firstitemmsec":1491026517226207,"url":"http:\/\/feeds.feedburner.com\/solidot","htmlUrl":"http:\/\/www.solidot.org\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/s\/o\/l\/www_solidot_org_16x16.png"},
  {"id":"feed\/http:\/\/songshuhui.net\/feed","title":"科学松鼠会","categories":[],"sortid":"027B9E6C","firstitemmsec":1491026517226207,"url":"http:\/\/songshuhui.net\/feed","htmlUrl":"http:\/\/songshuhui.net\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/s\/o\/n\/songshuhui_net_32x32.png"},
  {"id":"feed\/http:\/\/feed.williamlong.info\/","title":"月光博客","categories":[],"sortid":"027B9E5C","firstitemmsec":1491026517226207,"url":"http:\/\/feed.williamlong.info\/","htmlUrl":"http:\/\/www.williamlong.info\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/w\/i\/l\/www_williamlong_info_16x16.png"},
  {"id":"feed\/http:\/\/www.zhihu.com\/rss","title":"知乎每日精选","categories":[],"sortid":"027B9DF3","firstitemmsec":1491026517226207,"url":"http:\/\/www.zhihu.com\/rss","htmlUrl":"http:\/\/www.zhihu.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/z\/h\/i\/www_zhihu_com_16x16.png"},
  {"id":"feed\/http:\/\/feeds.feedburner.com\/ruanyifeng","title":"阮一峰的网络日志","categories":[],"sortid":"027F2F18","firstitemmsec":1491026517226207,"url":"http:\/\/feeds.feedburner.com\/ruanyifeng","htmlUrl":"http:\/\/www.ruanyifeng.com\/blog\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/r\/u\/a\/www_ruanyifeng_com_16x16.png"},
  {"id":"feed\/http:\/\/www.36kr.com\/feed\/","title":"36氪 | 关注互联网创业","categories":[],"sortid":"0293A649","firstitemmsec":1491026517226207,"url":"http:\/\/www.36kr.com\/feed\/","htmlUrl":"http:\/\/www.36kr.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/3\/6\/k\/www_36kr_com_16x16.png"},
  {"id":"feed\/http:\/\/feeds.kenengba.com\/kenengbarss","title":"可能吧","categories":[],"sortid":"027B9E77","firstitemmsec":1491026517226207,"url":"http:\/\/feeds.kenengba.com\/kenengbarss","htmlUrl":"https:\/\/kenengba.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/k\/e\/n\/kenengba_com_16x16.png"},
  {"id":"feed\/http:\/\/feeds2.feedburner.com\/cnbeta-full","title":"cnBeta全文版","categories":[],"sortid":"027B9DEB","firstitemmsec":1491026517226207,"url":"http:\/\/feeds2.feedburner.com\/cnbeta-full","htmlUrl":"http:\/\/pipes.yahoo.com\/pipes\/pipe.info?_id=5OVll5Fs3hGCc1KftJCjyQ","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/p\/i\/p\/pipes_yahoo_com_16x16.png"},
  {"id":"feed\/http:\/\/www.people.com.cn\/rss\/world.xml","title":"国际新闻","categories":[],"sortid":"0293A61F","firstitemmsec":1491026517226207,"url":"http:\/\/www.people.com.cn\/rss\/world.xml","htmlUrl":"http:\/\/world.people.com.cn\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/w\/o\/r\/world_people_com_cn_16x16.png"},
  {"id":"feed\/http:\/\/dajoy.blogbus.com\/index.rdf","title":"一桌一椅一世界","categories":[],"sortid":"027CFDF4","firstitemmsec":1491026517226207,"url":"http:\/\/dajoy.blogbus.com\/index.rdf","htmlUrl":"http:\/\/dajoy.blogbus.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/d\/a\/j\/dajoy_blogbus_com_16x16.png"},
  {"id":"feed\/http:\/\/zhihudaily.dev.malash.net\/","title":"知乎日报","categories":[],"sortid":"027B9DF7","firstitemmsec":1491026517226207,"url":"http:\/\/zhihudaily.dev.malash.net\/","htmlUrl":"http:\/\/daily.zhihu.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/d\/a\/i\/daily_zhihu_com_16x16.png"}
  ]}`;

const testSubScriptionsUnreadCounts = `{"max":"1000",
"unreadcounts":[
  {"id":"user\/1006499979\/state\/com.google\/reading-list","count":27,"newestItemTimestampUsec":"1491028508353458"},
  {"id":"user\/1006499979\/state\/com.google\/starred","count":"19","newestItemTimestampUsec":"0"},
  {"id":"user\/1006499979\/label\/Gaming","count":0,"newestItemTimestampUsec":"1491029909683458"},
  {"id":"user\/1006499979\/label\/Movies","count":0,"newestItemTimestampUsec":"1491029909683458"},
  {"id":"user\/1006499979\/label\/Programming","count":0,"newestItemTimestampUsec":"1491029909683458"},
  {"id":"feed\/http:\/\/www.36kr.com\/feed\/","count":6,"newestItemTimestampUsec":"1491029827439611"},
  {"id":"feed\/http:\/\/feeds2.feedburner.com\/cnbeta-full","count":6,"newestItemTimestampUsec":"1491028894408434"},
  {"id":"feed\/http:\/\/feeds.feedburner.com\/solidot","count":0,"newestItemTimestampUsec":"1491024815767411"},
  {"id":"feed\/http:\/\/dajoy.blogbus.com\/index.rdf","count":0,"newestItemTimestampUsec":"1485922377388618"},
  {"id":"feed\/http:\/\/feeds.kenengba.com\/kenengbarss","count":0,"newestItemTimestampUsec":"1490632131464662"},
  {"id":"feed\/http:\/\/www.people.com.cn\/rss\/world.xml","count":13,"newestItemTimestampUsec":"1491029909683458"},
  {"id":"feed\/http:\/\/feed.williamlong.info\/","count":0,"newestItemTimestampUsec":"1490926385174955"},
  {"id":"feed\/http:\/\/zhihudaily.dev.malash.net\/","count":0,"newestItemTimestampUsec":"1490974018570175"},
  {"id":"feed\/http:\/\/www.zhihu.com\/rss","count":2,"newestItemTimestampUsec":"1491028508353458"},
  {"id":"feed\/http:\/\/songshuhui.net\/feed","count":0,"newestItemTimestampUsec":"1490920911044553"},
  {"id":"feed\/http:\/\/feeds.feedburner.com\/ruanyifeng","count":0,"newestItemTimestampUsec":"1490660487666207"}
  ]}`;

const testContents = `{"direction":"ltr","id":"feed\/http:\/\/feeds.feedburner.com\/solidot","title":"Solidot","description":"","self":{"href":"https:\/\/www.inoreader.com\/reader\/api\/0\/stream\/contents\/feed%2fhttp%3a%2f%2ffeeds.feedburner.com%2fsolidot"},"updated":1491035307,"updatedUsec":"1491035307310446","items":[
{"crawlTimeMsec":"1491033576303","timestampUsec":"1491033576303359","id":"tag:google.com,2005:reader\/item\/00000002a882576c","categories":["user\/1006499979\/state\/com.google\/reading-list","user\/1006499979\/state\/com.google\/fresh"],"title":"DDR5 内存速度两倍于 DDR4","published":1491034126,"updated":1491034126,"canonical":[{"href":"http:\/\/www.solidot.org\/story?sid=51911"}],"alternate":[{"href":"http:\/\/www.solidot.org\/story?sid=51911","type":"text\/html"}],
"summary":{"direction":"ltr",
"content":"行业标准组织 JEDEC 宣布开始着手制定 DDR5 内存的规格，预计将在明年完成。DDR5 将是 DDR4 的继承者，速度和储存密度两倍于 DDR4，比 DDR4 更节能。业内分析人士没有预期到 DDR5 的研发，他们认为 DDR DRAM 应该终止于 DDR4。然而 PC 和服务器的设计过去几年没有发生多少改变，对 DDR5 的需求依然存在。科技公司已经开发出了多种 DDR DRAM 的替代，其中包括 HBM2、GDDR5X、HMC，甚至英特尔的 Optane 存储器也作为内存使用。"},"author":"pigsrollaroundinthem","likingUsers":[],"comments":[],"commentsNum":-1,"annotations":[],"origin":{"streamId":"feed\/http:\/\/feeds.feedburner.com\/solidot","title":"Solidot","htmlUrl":"http:\/\/www.solidot.org\/"}},
{"crawlTimeMsec":"1490934201976","timestampUsec":"1490934201975637","id":"tag:google.com,2005:reader\/item\/00000002a7d44efa","categories":["user\/1006499979\/state\/com.google\/reading-list","user\/1006499979\/state\/com.google\/read"],"title":"法院报告称技术中立不是抗辩理由","published":1490934803,"updated":1490934803,"canonical":[{"href":"http:\/\/www.solidot.org\/story?sid=51891"}],"alternate":[{"href":"http:\/\/www.solidot.org\/story?sid=51891","type":"text\/html"}],
"summary":{"direction":"ltr",
"content":"北京海淀法院公布了《2007 年至 2016 年海淀区人民法院审结网络犯罪案件情况调研报告》（官方微博提供的图文，未找到全文），例举了各种网络犯罪的案件，包括利用漏洞入侵电脑组建僵尸网络，然后出租僵尸网络中的机器让买家可以发动 DDoS 攻击，买家通过 DDoS 攻击勒索中小型网站或攻击大型网站的商业服务牟利。报告提到了一个值得注意的一个观点：基于技术中立的抗辩。如果一家提供合法网络服务的企业被人利用，比如说被人租赁服务器发动 DDoS 攻击，这家企业是否需要承担连带责任？海淀法院认为，刑法理论中将违法性认识作为认识错误的一种，但并不能以此作为抗辩的理由，违法性认识不足不妨碍主观构成要件认定。海淀法院表示，网络企业、服务提供者等运营、维护主体都具有自我监管的义务。“如果技术被用于侵权，而服务提供者显然知晓却惰于监管，放任危害结果，以致触及《刑法》底线，毫无意外是间接故意。”如果行为人提供的是 “中性业务行为”，如单纯的互联网接入、服务器托管、网络存储、通讯技术、广告推广、支付结算等互联网基础服务，没有产生诈骗、盗窃之类的共同犯罪意思，海淀法院认为，则应适用《刑法修正案（九）》新增的 “帮助信息网络犯罪活动罪”。这些观点似乎意味着企业要为政府承担部分执法责任。"},
"author":"pigsrollaroundinthem","likingUsers":[],"comments":[],"commentsNum":-1,"annotations":[],"origin":{"streamId":"feed\/http:\/\/feeds.feedburner.com\/solidot","title":"Solidot","htmlUrl":"http:\/\/www.solidot.org\/"}}],"continuation":"ddl2HhX7eATx"}`;
