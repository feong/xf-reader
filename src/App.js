import React, { Component } from 'react';
import './App.css';
import Login from './login/Login';


// {"subscriptions":[
//   {"id":"feed\/http:\/\/feeds.feedburner.com\/solidot","title":"Solidot","categories":[],"sortid":"028C41ED","firstitemmsec":1491026517226207,"url":"http:\/\/feeds.feedburner.com\/solidot","htmlUrl":"http:\/\/www.solidot.org\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/s\/o\/l\/www_solidot_org_16x16.png"},
//   {"id":"feed\/http:\/\/songshuhui.net\/feed","title":"科学松鼠会","categories":[],"sortid":"027B9E6C","firstitemmsec":1491026517226207,"url":"http:\/\/songshuhui.net\/feed","htmlUrl":"http:\/\/songshuhui.net\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/s\/o\/n\/songshuhui_net_32x32.png"},
//   {"id":"feed\/http:\/\/feed.williamlong.info\/","title":"月光博客","categories":[],"sortid":"027B9E5C","firstitemmsec":1491026517226207,"url":"http:\/\/feed.williamlong.info\/","htmlUrl":"http:\/\/www.williamlong.info\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/w\/i\/l\/www_williamlong_info_16x16.png"},
//   {"id":"feed\/http:\/\/www.zhihu.com\/rss","title":"知乎每日精选","categories":[],"sortid":"027B9DF3","firstitemmsec":1491026517226207,"url":"http:\/\/www.zhihu.com\/rss","htmlUrl":"http:\/\/www.zhihu.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/z\/h\/i\/www_zhihu_com_16x16.png"},
//   {"id":"feed\/http:\/\/feeds.feedburner.com\/ruanyifeng","title":"阮一峰的网络日志","categories":[],"sortid":"027F2F18","firstitemmsec":1491026517226207,"url":"http:\/\/feeds.feedburner.com\/ruanyifeng","htmlUrl":"http:\/\/www.ruanyifeng.com\/blog\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/r\/u\/a\/www_ruanyifeng_com_16x16.png"},
//   {"id":"feed\/http:\/\/www.36kr.com\/feed\/","title":"36氪 | 关注互联网创业","categories":[],"sortid":"0293A649","firstitemmsec":1491026517226207,"url":"http:\/\/www.36kr.com\/feed\/","htmlUrl":"http:\/\/www.36kr.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/3\/6\/k\/www_36kr_com_16x16.png"},
//   {"id":"feed\/http:\/\/feeds.kenengba.com\/kenengbarss","title":"可能吧","categories":[],"sortid":"027B9E77","firstitemmsec":1491026517226207,"url":"http:\/\/feeds.kenengba.com\/kenengbarss","htmlUrl":"https:\/\/kenengba.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/k\/e\/n\/kenengba_com_16x16.png"},
//   {"id":"feed\/http:\/\/feeds2.feedburner.com\/cnbeta-full","title":"cnBeta全文版","categories":[],"sortid":"027B9DEB","firstitemmsec":1491026517226207,"url":"http:\/\/feeds2.feedburner.com\/cnbeta-full","htmlUrl":"http:\/\/pipes.yahoo.com\/pipes\/pipe.info?_id=5OVll5Fs3hGCc1KftJCjyQ","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/p\/i\/p\/pipes_yahoo_com_16x16.png"},
//   {"id":"feed\/http:\/\/www.people.com.cn\/rss\/world.xml","title":"国际新闻","categories":[],"sortid":"0293A61F","firstitemmsec":1491026517226207,"url":"http:\/\/www.people.com.cn\/rss\/world.xml","htmlUrl":"http:\/\/world.people.com.cn\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/w\/o\/r\/world_people_com_cn_16x16.png"},
//   {"id":"feed\/http:\/\/dajoy.blogbus.com\/index.rdf","title":"一桌一椅一世界","categories":[],"sortid":"027CFDF4","firstitemmsec":1491026517226207,"url":"http:\/\/dajoy.blogbus.com\/index.rdf","htmlUrl":"http:\/\/dajoy.blogbus.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/d\/a\/j\/dajoy_blogbus_com_16x16.png"},
//   {"id":"feed\/http:\/\/zhihudaily.dev.malash.net\/","title":"知乎日报","categories":[],"sortid":"027B9DF7","firstitemmsec":1491026517226207,"url":"http:\/\/zhihudaily.dev.malash.net\/","htmlUrl":"http:\/\/daily.zhihu.com\/","iconUrl":"https:\/\/www.inoreader.com\/cache\/favicons\/d\/a\/i\/daily_zhihu_com_16x16.png"}
//   ]}

// {"max":"1000",
// "unreadcounts":[
//   {"id":"user\/1006499979\/state\/com.google\/reading-list","count":27,"newestItemTimestampUsec":"1491028508353458"},
//   {"id":"user\/1006499979\/state\/com.google\/starred","count":"19","newestItemTimestampUsec":"0"},
//   {"id":"user\/1006499979\/label\/Gaming","count":0,"newestItemTimestampUsec":"1491029909683458"},
//   {"id":"user\/1006499979\/label\/Movies","count":0,"newestItemTimestampUsec":"1491029909683458"},
//   {"id":"user\/1006499979\/label\/Programming","count":0,"newestItemTimestampUsec":"1491029909683458"},
//   {"id":"feed\/http:\/\/www.36kr.com\/feed\/","count":6,"newestItemTimestampUsec":"1491029827439611"},
//   {"id":"feed\/http:\/\/feeds2.feedburner.com\/cnbeta-full","count":6,"newestItemTimestampUsec":"1491028894408434"},
//   {"id":"feed\/http:\/\/feeds.feedburner.com\/solidot","count":0,"newestItemTimestampUsec":"1491024815767411"},
//   {"id":"feed\/http:\/\/dajoy.blogbus.com\/index.rdf","count":0,"newestItemTimestampUsec":"1485922377388618"},
//   {"id":"feed\/http:\/\/feeds.kenengba.com\/kenengbarss","count":0,"newestItemTimestampUsec":"1490632131464662"},
//   {"id":"feed\/http:\/\/www.people.com.cn\/rss\/world.xml","count":13,"newestItemTimestampUsec":"1491029909683458"},
//   {"id":"feed\/http:\/\/feed.williamlong.info\/","count":0,"newestItemTimestampUsec":"1490926385174955"},
//   {"id":"feed\/http:\/\/zhihudaily.dev.malash.net\/","count":0,"newestItemTimestampUsec":"1490974018570175"},
//   {"id":"feed\/http:\/\/www.zhihu.com\/rss","count":2,"newestItemTimestampUsec":"1491028508353458"},
//   {"id":"feed\/http:\/\/songshuhui.net\/feed","count":0,"newestItemTimestampUsec":"1490920911044553"},
//   {"id":"feed\/http:\/\/feeds.feedburner.com\/ruanyifeng","count":0,"newestItemTimestampUsec":"1490660487666207"}
//   ]}


class App extends Component {
  render() {
    const defaultAvatarSRC = require("./img/avatar.jpg");
    const avatarSRC = this.props.avatarSRC ? this.props.avatarSRC : defaultAvatarSRC;
    return (
      <div className="App">
        <Login avatarSRC={avatarSRC}/>
      </div>
    );
  }
}

export default App;
