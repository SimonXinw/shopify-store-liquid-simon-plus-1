// themeKit 开发模式

```bash
# 线上模板
theme get --password=shptka_a8bc1f303349ec792567bf0fd9d8d69c --store="simon2-xinwang.myshopify.com" --themeid=152928911589

# shopify 线上直接更改，自动同步
theme watch --allow-live 

# 监听保存，本地修改，自动同步
theme watch

# git 提交清除无需提交文件
git add --renormalize .
xinwang1997
```;


// 店铺账号
```bash
theme token：shptka_5490b89fd919fb2e13f1c8e1159174e7
域名：simon-plus-xinwang.myshopify.com



```
// 店铺账号 2
```bash
域名：新店铺账号: simon-plus-xinwang.myshopify.com
```

// 2. shopify cli 开发模式
```bash
# 安装
npm install -g @shopify/cli@latest

# 开发已经存在的指定主题 id
shopify theme dev -t 147604308155 --store=simon-plus-xinwang.myshopify.com

# 如果需要输入密码
shopify 没有付费的时候，是密码限制访问，密码在-在线商店-偏好设置-密码-默认-yeetse
这个项目密码是： mahmug

# 通过push命令将本地开发主题上传到商店，第一次上传不希望将模板作为publish（live）模板可以添加标识--unpublished实现
shopify theme push --unpublished

# 退出登录
shopify auth logout

```;

// 清空哦购物车
fetch("/cart/clear.js", {
  method: "POST",
  headers: {
    Accept: "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log("购物车已清空", data);
    // location.reload(); // 如果需要刷新
  });

// 批量请求购物车
(async function () {
  const url = "https://awolvision.com/cart/add.js";

  const requestWithDelay = (id, delay) =>
    new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch(url, {
            headers: {
              accept: "*/*",
              "accept-language": "zh-CN,zh;q=0.9",
              "content-type": "application/json",
              priority: "u=1, i",
              "sec-ch-ua":
                '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
            },
            referrer: "https://awolvision.com/pages/super-bonus",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({ items: [{ id, quantity: 1 }] }),
            method: "POST",
            mode: "cors",
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }

          const data = await response.json();
          resolve(data);
        } catch (error) {
          console.error(`Error making request for id ${id}:`, error);
          resolve(null);
        }
      }, delay);
    });

  const batchRequests = async (ids) => {
    const results = [];
    for (let i = 0; i < ids.length; i++) {
      const result = await requestWithDelay(ids[i], i * 100); // 每个请求间隔 100ms
      results.push(result);
    }
    return results;
  };

  const ids = [
    41714364743728, 41594732150832, 40452023517232, 40452023484464,
    41652445937712, 41061038096432, 41594732150832, 41594732445744,
    41716137099312, 41716137132080, 41716137164848, 41716137197616,
    41716137230384, 41716137263152, 41716137295920, 41716137328688,
    41716137361456, 41716137394224,
  ];
  try {
    const results = await batchRequests(ids);
    console.log("All requests completed:", results);
  } catch (error) {
    console.error("Error in batch requests:", error);
  }
})();
