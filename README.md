# image-permutation
一个图片排列工具

## 安装
```shell
npm i --save image-permutation
```

## 基本使用
``` javascript
<script src="https://unpkg.com/image-permutation/dist/image-permutation.umd.js"></script>
<script>
    var source = new Image()
    source.crossOrigin = 'anonymous';

    source.onload = function() {
        
        const config = {
            width: 100,
            rotate: 0,
            cross: true,
            mirror: {
                x: false,
                y: false
            },
            random: {
                width: 0,
                rotate: 0
            },
            gutter: {
                horizontal: 20,
                vertical: 20,
            }
        }

        new ImagePermutation(1000, 1000, '#ff0000', [source], config).draw().then(data => {
            var result = document.getElementById("result")
            result.src = data
        })
    }

    source.src = "./item.png"
</script>
```
## 参数
new ImagePermutation(width, height, backgroundColor, source, config)
|属性|说明|数据类型|默认值|
|---|---|---|---|
|width|canvas内部的宽度|`number`|-|
|height|canvas内部的高度|`number`|-|
|backgroundColor|canvas背景颜色|`string`|`#fff`|
|source|插入的image对象数组|`Array`|`[]`|
|config|配置文件|`Json`|`{}`|

### config数据结构
```son
{
    width: 100, // 插入image宽度
    rotate: 0, // image旋转角度
    cross: true, // 是否穿插渲染
    mirror: { // 镜像渲染
        x: false, // x轴镜像
        y: false  // y轴镜像
    },
    random: { // 随机渲染
        width: 0, // 宽度随机增量
        rotate: 0 // 角度随机增量
    },
    gutter: { // 间隔
        horizontal: 20, // 水平间隔
        vertical: 20, // 垂直间隔
    }
}
```