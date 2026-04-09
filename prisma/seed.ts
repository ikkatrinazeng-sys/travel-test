import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any)

const cities = [
  {
    slug: 'paris', name: '巴黎', country: '法国', region: 'europe', year: 2024,
    coverColor: '#7c6f8e', summary: '光线与咖啡馆的城市', heroQuote: '每一条街都像是电影的布景',
    photos: [
      { src: '', caption: '塞纳河畔的傍晚', order: 0 },
      { src: '', caption: '蒙马特的阶梯', order: 1 },
      { src: '', caption: '卢浮宫广场', order: 2 },
    ],
    videos: [
      { title: '巴黎三天 vlog', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '', order: 0 },
    ],
    guide: { stay: JSON.stringify(['Le Marais 区的精品酒店', 'Airbnb 优先选 Saint-Germain']), eat: JSON.stringify(['Café de Flore', "L'As du Fallafel", 'Pierre Hermé']), transport: '地铁覆盖很好，建议买 Navigo 周卡', tips: JSON.stringify(['避开7-8月人潮', '提前预约卢浮宫门票']) },
    story: { title: '在博纳的酒庄，喝掉了一个下午', date: '2024-10', content: '勃艮第的秋天比想象中更静。从巴黎坐 TGV 不到两小时，就抵达了这座被葡萄园包围的小城。我住在一家老式酒庄改建的民宿，石墙、木梁、地窖里的橡木桶……', coverImage: '' },
  },
  {
    slug: 'beaune', name: '博纳', country: '法国', region: 'europe', year: 2025,
    coverColor: '#8a7060', summary: '勃艮第葡萄酒的心脏', heroQuote: '酒香混着秋叶的气息，这里的时间走得很慢',
    photos: [
      { src: '/beaune/IMG_3240.jpg', caption: '酒庄风光', order: 0 },
      { src: '/beaune/IMG_3318.jpg', caption: '葡萄园秋色', order: 1 },
      { src: '/beaune/IMG_3364.jpg', caption: '酒庄内部', order: 2 },
      { src: '/beaune/IMG_3372.jpg', caption: '博纳街景', order: 3 },
    ],
    videos: [],
    guide: { stay: JSON.stringify(['Hôtel Le Cep', '博纳老城区民宿']), eat: JSON.stringify(['Ma Cuisine', 'Le Bistrot Bourguignon']), transport: '从巴黎里昂站坐 TGV 约1h40min', tips: JSON.stringify(['11月葡萄酒拍卖季最热闹', '可以报名酒庄一日游']) },
    story: {
      title: '在博纳的酒庄，喝掉了一个下午', date: '2025-01',
      content: `生活有时需要一种极端的切换。

在机舱里悬浮了14个小时后，身体还带着万米高空的干涩与疲惫，双脚已踩在了法兰西冬日的土地上。在机场取了车，我们没有给自己任何缓冲的时间，直接扎进了通往勃艮第的公路。

9点的日出与消失的边界
冬天的法国公路是一场关于"消融"的视觉实验。

早晨八点，世界依然笼罩在一种深沉的、近乎幽闭的青灰色中。一路上，大雾毫无预兆地降临，浓稠得像化不开的颜料，将车窗外的田野、树木和远处的村落悉数抹去。在这场漫长的等待里，直到上午九点，第一缕光才慢条斯理地撕开云层。

那不是印象中热烈的日出，而是一种极其克制的、带着凉意的琥珀色。光线穿透雾气，照亮了路边尚未化尽的残雪。在那一刻，感官终于从长途飞行的麻木中苏醒——这种冷冽、孤独且自由的节奏，正是我们此行的序幕。

线条的秩序：特级名庄之路
车子拐进著名的"特级名庄之路"时，世界剥落了盛夏时节的丰腴。

没有了绿叶的遮掩，冬天的葡萄园展现出它最原始的"骨骼"。那些被修剪得整整齐齐的葡萄藤，在迷雾中像是一串串刻在土地上的黑色字符，延伸向视野的尽头。这种由枯藤、石墙与大雾构成的秩序感，比繁花似锦时更有一种肃穆的生命力。

在这40公里的自驾中，风景在半梦半醒间层层堆叠，直到我们抵达了那个被时间锁住的坐标：Château de Pommard。

波玛的重音：6款红酒的感官洗礼
走进酒庄，那种从零下的低温瞬间切换到酒窖恒温的体感，是感官的又一次觉醒。在那间充满历史厚重感的品酒室里，6款红酒的依次呈现，为这段灰冷色调的自驾涂上了最浓郁的底色。

其中两款酒，精准地捕捉到了波玛这片土地的性格：

🍷 Clos Marey-Monge Monopole：大地的骨架
作为酒庄的旗舰，它就像这段自驾路程中的大雾与积雪——强力且充满结构感。
初入口时，单宁高且紧致，甚至带一点"硬"的收敛感，像极了冬日里冷峻的石灰岩墙。随后，成熟的黑樱桃和李子的香气层层铺开，夹杂着泥土与森林地表的深沉气息。这是一款需要时间去驯服的酒，它的醇香浓郁但不张扬，陈年后隐约透出的皮革与松露味，是对大地厚度最真实的还原。

🍷 Clos Marey-Monge Climat：流动的优雅
相比之下，Climat 则展现了这片土地更细腻、更温柔的一面。
它的色调更偏向红果，覆盆子与红樱桃的香气中跳跃着玫瑰与紫罗兰的花香，单宁像丝绸般滑过舌尖，酸度明亮且清爽。如果说 Monopole 是波玛的"骨骼"，那么 Climat 就是在雾气中穿梭的"微光"。它更精致、更具差异性，将不同地块的微小性格展现得淋漓尽致。

抵达的意义
这40公里的旅程，从机场取车时的昏沉，到日出瞬间的惊艳，再到酒杯中闪烁的宝石红色。

自驾的意义或许就在于此：它不只是连接两个地点的位移，而是给你留出足够长的时间，让你在引擎的震动和窗外流动的光影里，一点点找回失落的感官。

当我们在第戎的暮色中停下车时，口中似乎还残存着波玛黑皮诺的余韵。那一刻我意识到，最好的风景往往不在目的地，而是在那场九点才到来的日出里，以及那一杯杯装满了土地灵魂的红酒之中。`,
      coverImage: '',
    },
  },
  {
    slug: 'dijon', name: '第戎', country: '法国', region: 'europe', year: 2024,
    coverColor: '#6b7a5e', summary: '芥末之城，中世纪的遗珠', heroQuote: '公爵宫广场上的鸽子，见证过几百年的历史',
    photos: [{ src: '', caption: '公爵宫广场', order: 0 }, { src: '', caption: '第戎老街', order: 1 }],
    videos: [],
    guide: { stay: JSON.stringify(['第戎市中心酒店']), eat: JSON.stringify(["Chez Léon", '第戎芥末博物馆附近的餐厅']), transport: '从巴黎里昂站 TGV 约1h35min', tips: JSON.stringify(['买瓶正宗 Maille 芥末带回家', '可与博纳合并一日游']) },
    story: { title: '第戎的芥末与中世纪', date: '2024-10', content: '第戎不像巴黎那样被过度曝光，它安静地保存着中世纪的街道……', coverImage: '' },
  },
  {
    slug: 'amsterdam', name: '阿姆斯特丹', country: '荷兰', region: 'europe', year: 2023,
    coverColor: '#5c7a8a', summary: '运河、自行车与郁金香', heroQuote: '整座城市就像一幅17世纪的油画',
    photos: [{ src: '', caption: '运河边的清晨', order: 0 }, { src: '', caption: '梵高博物馆', order: 1 }, { src: '', caption: 'Jordaan 街区', order: 2 }],
    videos: [{ title: '阿姆斯特丹单车漫游', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '', order: 0 }],
    guide: { stay: JSON.stringify(['Jordaan 区民宿', 'De Pijp 区精品酒店']), eat: JSON.stringify(["Café 't Smalle", 'FEBO 炸物（体验荷兰快餐）', 'Albert Cuypmarkt 街头小食']), transport: '机场到市中心坐火车17分钟，市内骑车最方便', tips: JSON.stringify(['提前订梵高/国立博物馆票', '避开郁金香季（4月）人潮']) },
    story: { title: '在运河边骑了一天自行车', date: '2023-09', content: '阿姆斯特丹给自行车留的空间，比给行人的还多……', coverImage: '' },
  },
  {
    slug: 'rome', name: '罗马', country: '意大利', region: 'europe', year: 2023,
    coverColor: '#9e7b5a', summary: '永恒之城，每块石头都是历史', heroQuote: '走在罗马，随时会踩到两千年前的砖',
    photos: [{ src: '', caption: '斗兽场黄昏', order: 0 }, { src: '', caption: '特莱维喷泉', order: 1 }, { src: '', caption: '梵蒂冈圣彼得广场', order: 2 }],
    videos: [],
    guide: { stay: JSON.stringify(['Trastevere 区（最有烟火气）', '西班牙广场附近']), eat: JSON.stringify(['Da Enzo al 29（罗马传统菜）', 'Supplì Roma（炸饭团）', 'Grattachecca（刨冰）']), transport: '市中心步行为主，地铁只有两条线', tips: JSON.stringify(['斗兽场一定要提前网上订票', '梵蒂冈博物馆需要早起排队']) },
    story: { title: '罗马不是一天建成的，但我用三天爱上了它', date: '2023-06', content: '第一次去罗马，被热浪和美食双重击中……', coverImage: '' },
  },
  {
    slug: 'capri', name: '卡普里', country: '意大利', region: 'europe', year: 2023,
    coverColor: '#3d8a9e', summary: '地中海上的蓝洞仙境', heroQuote: '蓝洞的颜色，是任何照片都无法还原的',
    photos: [{ src: '', caption: '蓝洞入口', order: 0 }, { src: '', caption: '卡普里小镇俯瞰', order: 1 }],
    videos: [],
    guide: { stay: JSON.stringify(['卡普里镇精品酒店（贵但值）']), eat: JSON.stringify(['Da Paolino（柠檬树下用餐）']), transport: '从那不勒斯或索伦托坐船，约40-60分钟', tips: JSON.stringify(['蓝洞需要等待，风大时关闭', '岛上物价高，现金备足']) },
    story: { title: '卡普里，贵得心甘情愿', date: '2023-06', content: '从那不勒斯港口出发，船颠簸了四十分钟……', coverImage: '' },
  },
  {
    slug: 'naples', name: '那不勒斯', country: '意大利', region: 'europe', year: 2023,
    coverColor: '#8a6e3d', summary: '世界披萨的发源地，混乱而迷人', heroQuote: '那不勒斯教会我，完美不如真实',
    photos: [{ src: '', caption: '那不勒斯海湾', order: 0 }, { src: '', caption: 'Spaccanapoli 老街', order: 1 }],
    videos: [],
    guide: { stay: JSON.stringify(['Toledo 地铁站附近', '海滨大道酒店']), eat: JSON.stringify(['Pizzeria Starita（最老牌披萨店）', 'Sfogliatella 贝壳酥']), transport: '火车站到市中心很近，城内多走路', tips: JSON.stringify(['注意随身财物', '可以当天往返庞贝遗址']) },
    story: { title: '那不勒斯：混乱是它的本名', date: '2023-06', content: '在那不勒斯的第一个早晨，我在街边站着吃了一个 sfogliatella……', coverImage: '' },
  },
  {
    slug: 'seoul', name: '首尔', country: '韩国', region: 'east-asia', year: 2024,
    coverColor: '#b07060', summary: '潮流与传统并行的城市', heroQuote: '景福宫的屋檐和弘大的霓虹灯，只隔了一条地铁线',
    photos: [{ src: '', caption: '景福宫', order: 0 }, { src: '', caption: '北村韩屋村', order: 1 }, { src: '', caption: '南山塔夜景', order: 2 }],
    videos: [{ title: '首尔五天四夜', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '', order: 0 }],
    guide: { stay: JSON.stringify(['弘大附近（夜生活方便）', '明洞（购物方便）', '三清洞（文艺安静）']), eat: JSON.stringify(['广藏市场（传统小吃）', '新村排骨一条街', '弘大 24h 豆腐汤']), transport: 'T-money 交通卡，地铁覆盖全城', tips: JSON.stringify(['下载 Naver Map', '乐天/现代百货退税别忘了']) },
    story: { title: '首尔，第五次了还是没玩够', date: '2024-03', content: '有些城市是越去越陌生，首尔是越去越熟悉……', coverImage: '' },
  },
  {
    slug: 'busan', name: '釜山', country: '韩国', region: 'east-asia', year: 2024,
    coverColor: '#5a7a9e', summary: '海边城市，电影感十足', heroQuote: '甘川文化村的阶梯，每一步都像走进一张明信片',
    photos: [{ src: '', caption: '甘川文化村', order: 0 }, { src: '', caption: '广安里海水浴场', order: 1 }, { src: '', caption: '海云台日出', order: 2 }],
    videos: [],
    guide: { stay: JSON.stringify(['海云台（海景）', '西面（市中心）']), eat: JSON.stringify(['札嘎其市场海鲜', 'BIFF 广场炒年糕', '南浦洞猪肉汤饭']), transport: '从首尔坐 KTX 约2.5小时', tips: JSON.stringify(['甘川文化村上午人少', '冬天来吃河豚锅']) },
    story: { title: '釜山：一座被大海包裹的城市', date: '2024-03', content: '从首尔坐 KTX 向南，两个半小时后海出现了……', coverImage: '' },
  },
  {
    slug: 'osaka', name: '大阪', country: '日本', region: 'east-asia', year: 2023,
    coverColor: '#c0804a', summary: '美食之都，关西人的骄傲', heroQuote: '大阪人说，要活就要吃到破产',
    photos: [{ src: '', caption: '道顿堀夜景', order: 0 }, { src: '', caption: '大阪城', order: 1 }, { src: '', caption: '黑门市场', order: 2 }],
    videos: [{ title: '大阪美食地图', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '', order: 0 }],
    guide: { stay: JSON.stringify(['难波（美食圈核心）', '梅田（交通枢纽）']), eat: JSON.stringify(['一兰拉面', '551蓬莱猪肉包', '章鱼烧（道顿堀）', '黑门市场海鲜']), transport: 'ICOCA 卡，关西地区通用', tips: JSON.stringify(['大阪周游卡性价比高', '可以一天往返京都']) },
    story: { title: '大阪：用胃袋丈量城市', date: '2023-11', content: '在大阪的每一天，都是在上一顿和下一顿之间度过的……', coverImage: '' },
  },
  {
    slug: 'kyoto', name: '京都', country: '日本', region: 'east-asia', year: 2023,
    coverColor: '#7a8a6a', summary: '千年古都，最接近日本灵魂的地方', heroQuote: '伏见稻荷的鸟居，红得像一场仪式',
    photos: [{ src: '', caption: '伏见稻荷千鸟居', order: 0 }, { src: '', caption: '岚山竹林', order: 1 }, { src: '', caption: '祇园花见小路', order: 2 }],
    videos: [],
    guide: { stay: JSON.stringify(['祇园附近（最有京都感）', '京都站附近（交通方便）']), eat: JSON.stringify(['锦市场（京都厨房）', '先斗町的会席料理', '嵯峨野豆腐料理']), transport: '公交+步行，骑车也很适合', tips: JSON.stringify(['秋叶季（11月）提前预订住宿', '伏见稻荷早起去，避开人群']) },
    story: { title: '京都的秋天，安静得有些不真实', date: '2023-11', content: '红叶落在金阁寺的屋顶上，游人的快门声此起彼伏……', coverImage: '' },
  },
  {
    slug: 'kobe', name: '神户', country: '日本', region: 'east-asia', year: 2023,
    coverColor: '#6a7a9e', summary: '港口城市，牛肉与异国情调', heroQuote: '异人馆的坡道上，能看见整个港湾',
    photos: [{ src: '', caption: '神户港夜景', order: 0 }, { src: '', caption: '北野异人馆街', order: 1 }],
    videos: [],
    guide: { stay: JSON.stringify(['北野附近（异人馆区）', '三宫（中心区）']), eat: JSON.stringify(['神户牛排（Mouriya 或 Steak Land）', '南京町（中华街）']), transport: '从大阪约30分钟，电车方便', tips: JSON.stringify(['神户牛排预算1500-3000元/人', '摩耶山夜景值得一去']) },
    story: { title: '神户，吃了一顿贵到沉默的牛排', date: '2023-11', content: '神户牛的脂肪纹理入口即化，那种感觉只能亲身体验……', coverImage: '' },
  },
  {
    slug: 'penang', name: '槟城', country: '马来西亚', region: 'southeast-asia', year: 2024,
    coverColor: '#4a8a6a', summary: '壁画之城，美食天堂', heroQuote: '乔治市的老街，每走一步都是惊喜',
    photos: [{ src: '', caption: '乔治市壁画街', order: 0 }, { src: '', caption: '极乐寺', order: 1 }, { src: '', caption: '亚美尼亚街', order: 2 }],
    videos: [],
    guide: { stay: JSON.stringify(['乔治市历史城区（世界遗产区内）']), eat: JSON.stringify(['Char Kway Teow 炒粿条', 'Cendol 刨冰', 'Nasi Kandar']), transport: '从吉隆坡飞约1小时，或坐巴士+渡轮', tips: JSON.stringify(['壁画骑行找地图攻略', '榴梿季6-8月']) },
    story: { title: '槟城：用脚走出来的城市地图', date: '2024-02', content: '我在槟城的三天，几乎没坐过任何交通工具……', coverImage: '' },
  },
  {
    slug: 'langkawi', name: '兰卡威', country: '马来西亚', region: 'southeast-asia', year: 2024,
    coverColor: '#2a9a7a', summary: '免税岛，红树林与海滩', heroQuote: '缆车上俯瞰雨林，感觉与世隔绝',
    photos: [{ src: '', caption: '天空之桥', order: 0 }, { src: '', caption: '红树林日落游船', order: 1 }],
    videos: [],
    guide: { stay: JSON.stringify(['Pantai Cenang（最热闹的海滩区）']), eat: JSON.stringify(['Yellow Café（网红早餐）', '海鲜烧烤']), transport: '岛内必须租车或摩托', tips: JSON.stringify(['免税购物（酒、巧克力便宜）', '红树林游船傍晚出发最美']) },
    story: { title: '兰卡威：慢下来，才能看见', date: '2024-02', content: '没有行程表的三天，骑着摩托逛遍了整个岛……', coverImage: '' },
  },
  {
    slug: 'kuala-lumpur', name: '吉隆坡', country: '马来西亚', region: 'southeast-asia', year: 2024,
    coverColor: '#5a6a4a', summary: '双峰塔下的多元文化都市', heroQuote: '马来、华人、印度文化在这里共存了几百年',
    photos: [{ src: '', caption: '双峰塔夜景', order: 0 }, { src: '', caption: '茨厂街', order: 1 }, { src: '', caption: '黑风洞', order: 2 }],
    videos: [],
    guide: { stay: JSON.stringify(['KLCC 区（地标附近）', 'Bukit Bintang（购物区）']), eat: JSON.stringify(['Jalan Alor 夜市', '茨厂街 Char Siu Rice', 'Mamak 24h 餐厅']), transport: 'Grab 打车方便，地铁覆盖主要景点', tips: JSON.stringify(['Petronas Twin Towers 需提前买票', 'Grab 比出租车便宜得多']) },
    story: { title: '吉隆坡：一座永远不睡觉的城市', date: '2024-01', content: '凌晨两点，Jalan Alor 的烧烤摊前还坐满了人……', coverImage: '' },
  },
  {
    slug: 'phuket', name: '普吉岛', country: '泰国', region: 'southeast-asia', year: 2023,
    coverColor: '#1a8a9e', summary: '泰国最美海岛，度假首选', heroQuote: '皮皮岛的水是我见过最透明的蓝',
    photos: [{ src: '', caption: '芭东海滩', order: 0 }, { src: '', caption: '皮皮岛日出', order: 1 }, { src: '', caption: '普吉老城', order: 2 }],
    videos: [],
    guide: { stay: JSON.stringify(['卡塔海滩（安静）', '芭东（热闹）', '苏林海滩（高端度假）']), eat: JSON.stringify(['Lobster 海鲜大排档', '普吉老城咖啡馆', 'Pad Thai 街边摊']), transport: '打车用 Grab，租摩托需要驾照', tips: JSON.stringify(['雨季（5-10月）便宜但浪大', '皮皮岛一日游提前预订']) },
    story: { title: '普吉：除了热，哪里都好', date: '2023-12', content: '12月的普吉岛是旺季，海水清澈得像一块玻璃……', coverImage: '' },
  },
  {
    slug: 'bangkok', name: '曼谷', country: '泰国', region: 'southeast-asia', year: 2023,
    coverColor: '#9a7a3a', summary: '寺庙、夜市与 Tuk-Tuk 的城市', heroQuote: '曼谷能满足你对东南亚的一切想象',
    photos: [{ src: '', caption: '大皇宫', order: 0 }, { src: '', caption: '考山路夜晚', order: 1 }, { src: '', caption: '昭披耶河日落', order: 2 }],
    videos: [{ title: '曼谷48小时', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '', order: 0 }],
    guide: { stay: JSON.stringify(['素坤逸路（现代商业区）', '考山路附近（背包客聚集地）', '湄南河边（景观好）']), eat: JSON.stringify(['Or Tor Kor 市场', 'Thip Samai（最著名的 Pad Thai）', 'ICONSIAM 顶楼夜市']), transport: 'BTS 天铁 + Grab，避开高峰期堵车', tips: JSON.stringify(['参观寺庙穿长裤/长裙', '按摩选正规店']) },
    story: { title: '曼谷，永远比计划中多待一天', date: '2023-12', content: '原本只打算中转一晚，结果在曼谷多留了三天……', coverImage: '' },
  },
  {
    slug: 'chiang-mai', name: '清迈', country: '泰国', region: 'southeast-asia', year: 2023,
    coverColor: '#6a9a5a', summary: '北方玫瑰，慢生活的天堂', heroQuote: '清迈的节奏，让人忘记时间的存在',
    photos: [{ src: '', caption: '素贴山庙宇', order: 0 }, { src: '', caption: '周六步行街', order: 1 }, { src: '', caption: '宁曼路咖啡馆', order: 2 }],
    videos: [],
    guide: { stay: JSON.stringify(['古城区（步行游览方便）', '宁曼路（文艺咖啡区）']), eat: JSON.stringify(['Khao Soi（北方咖喱面）', 'Sunday Walking Street', 'Nimman 区咖啡馆']), transport: '租摩托最自由，Grab 也方便', tips: JSON.stringify(['4月泼水节提前定住宿', '大象营地选无骑乘的伦理游']) },
    story: { title: '清迈的第七天，我决定不回去了', date: '2023-01', content: '在宁曼路的咖啡馆里工作了整个下午，窗外是一棵开满粉花的树……', coverImage: '' },
  },
  {
    slug: 'hua-hin', name: '华欣', country: '泰国', region: 'southeast-asia', year: 2023,
    coverColor: '#8a9a6a', summary: '泰国皇室度假地，宁静的海滨小城', heroQuote: '没有芭提雅的喧嚣，华欣是泰国的另一面',
    photos: [{ src: '', caption: '华欣海滩', order: 0 }, { src: '', caption: '夜市街头', order: 1 }],
    videos: [],
    guide: { stay: JSON.stringify(['Hua Hin Beach 沿岸酒店']), eat: JSON.stringify(['Chatchai Night Market（最大夜市）', '海鲜烧烤']), transport: '从曼谷巴士约3.5小时，或坐火车', tips: JSON.stringify(['适合亲子和情侣慢游', '平日人少价格实惠']) },
    story: { title: '华欣：一个没有攻略的旅行', date: '2023-12', content: '在华欣，我故意没有做任何计划。只是每天早晨去海边看日出……', coverImage: '' },
  },
]

async function main() {
  console.log('🌱 开始导入城市数据...')

  for (const c of cities) {
    const city = await prisma.city.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        name: c.name,
        country: c.country,
        region: c.region,
        year: c.year,
        coverColor: c.coverColor,
        summary: c.summary,
        heroQuote: c.heroQuote ?? null,
        photos: { create: c.photos },
        videos: { create: c.videos },
        guide: { create: c.guide },
        story: { create: c.story },
      },
    })
    console.log(`  ✓ ${city.name} (${city.slug})`)
  }

  console.log(`\n✅ 导入完成，共 ${cities.length} 座城市`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
