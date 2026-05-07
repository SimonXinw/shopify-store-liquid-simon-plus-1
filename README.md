simon xinw 的shopify 店铺 demo

# 自动生成产品卡片组件
帮我新增一个组件，我说的所有像素都要乘以 90% 去处理。
1.这个组件顶部区域是 flex 左右布局，space-between 布局，左边是标题，文案需要配置 css font-family: Inter;
font-weight: 700;
font-style: Bold;
font-size: 64px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
color:#000;， 右边是2个按钮，css width: 340;
height: 70;
border-radius: 10px;
border-width: 1px;
background-color: orange;
里面是文本,文本需要动态配置
font-family: Inter;
font-weight: 600;
font-style: Semi Bold;
font-size: 30px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
text-align: center;
color：#fff;
;
2.中间是是横向左右排列的滑动区块，区块里面是最多三个产品（可以动态配置，以及数量）卡片，可以左右滑动，也可以点击右下角的上下按钮切换。
3.每个产品卡片 item 内部有两个模块上下排列，上面是是动态配置的产品的主图（图片需要配置） CSS width: 585;
height: 761;
border-radius: 20px;
，下面是详情容器，详情容器是上下排列的行，
每一行里面是从左到右对齐，详情容器的
第一行是产品标题，title， 需要动态配置，css font-family: Inter;
font-weight: 700;
font-style: Bold;
font-size: 36px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
color：#000;

第二行左边是评分插件，星星icon 和 text 400 review 这个文字，右边是配置的多个颜色选择的变体选项，
第三行是一个 icon text 容器，左边 icon（需要配置图） 46*46 右边text容器，text-title（动态配置） cssfont-family: Inter;
font-weight: 700;
font-style: Bold;
font-size: 20px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
color：#000;
，text-desc（动态配置） css font-family: Inter;
font-weight: 400;
font-style: Regular;
font-size: 16px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
color：#000;
,icon text 容器里面是一行两个最多配置 4个最多两行。text 需要动态配置
第四行是左边依次是final price  css font-family: Inter;
font-weight: 700;
font-style: Bold;
font-size: 36px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
background: #FF0808;

，划线原价 背景 css font-family: Inter;
font-weight: 700;
font-style: Bold;
font-size: 20px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
text-decoration: line-through;
价格取的是产品的价格数据，原价取的是产品的compare_at_price 数据
, shopnow 按钮 功能是调到产品详情页 css width: 120;
height: 40;
border-radius: 10px;
background-color: orange;
按钮文本 需要动态配置 css 
font-family: Inter;
font-weight: 700;
font-style: Bold;
font-size: 20px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;

4.如果配置了多个产品，最多展示三个，区块宽度是 最大90% 宽度，区块右下角单独起一个div，有paginition 功能上一页和下一页， 样式是圆形区域 css width: 60;
height: 60;
background: #EC642C;
里面是白色的左箭头和右箭头 40*40px
5.写的时候注意命名兼容性，最外层容器用 div 标签、 product-list 当作 class，写 css 的时候注意带上 product-list 前缀，避免和别的模块冲突
6.模仿@featured-collection.liquid 这个组件，写入@product-list.liquid 这个文件，按照我发给你的 readme.md 4-96 规范，你看看是否要@swiper-bundle.min.js @swiper-bundle.min.css 使用 swiper 要的话就引入进来，语法规范是 shopify  liquid 语法