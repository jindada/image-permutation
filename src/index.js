export default class ImagePermutation {

    constructor(width, height, backgroundColor, source, config) {
        this.canvas = document.createElement("CANVAS")
        this.context = this.canvas.getContext("2d")

        this.canvas.width = width
        this.canvas.height = height

        this.context.fillStyle = "#FF0000"
        this.context.fillRect(0, 0, 1000, 1000)

        this.source = source
        this.config = config

        // 元素的宽高
        this.imgWidth = config.width || 0;
        this.imgHeight = config.width * source[0].width / source[0].height
        // 画板的宽高
        this.ctxWidth = this.context.canvas.width
        this.ctxHeight = this.context.canvas.height
        // 中心点
        this.centerX = (this.ctxWidth - this.imgWidth) / 2
        this.centerY = (this.ctxHeight - this.imgHeight) / 2
    }

    draw() {
        return new Promise((resolve, reject) => {

            try {
                // 保存初始状态
                this.context.save()

                this.drawLeftTop()
                this.drawRightTop()
                this.drawLeftBottom()
                this.drawRightBottom()

                resolve(this.canvas.toDataURL('image/png', 1))
            } catch(e) {
                reject(e)
            }
        })
    }

    // 渲染左上
    drawLeftTop() {
            
        const coordinate = {
            x: this.centerX,
            y: this.centerY
        };

        const mirror = {
            x: true,
            y: true
        };

        let row = 0;
        let index = 0;

        while (this.centerY - coordinate.y < (this.ctxHeight + this.imgHeight) / 2) {

            while(this.centerX - coordinate.x < (this.ctxWidth + this.imgWidth) / 2) {
                if (drawImage(this.source[index], this.context, this.config, coordinate, mirror)) {
                    coordinate.x -= this.imgWidth + this.config.gutter.horizontal;
                    mirror.x = !mirror.x;
                    index = index + 1 > this.source.length - 1 ? 0 : index + 1;
                }
            }

            row += 1

            if (row % 2 === 1 && this.config.cross) {
                coordinate.x = this.centerX - (this.imgWidth + this.config.gutter.horizontal) / 2
            } else {
                coordinate.x = this.centerX
            }

            mirror.x = true
            mirror.y = !mirror.y;

            coordinate.y -= this.imgHeight + this.config.gutter.vertical
        }
    }

    // 渲染右上
    drawRightTop() {
            
        const coordinate = {
            x: this.centerX,
            y: this.centerY
        };

        const mirror = {
            x: true,
            y: true
        };

        let row = 0;
        let index = 0;

        while (this.centerY - coordinate.y < (this.ctxHeight + this.imgHeight) / 2) {

            while(coordinate.x < this.ctxWidth + this.imgWidth) {
                if (drawImage(this.source[index], this.context, this.config, coordinate, mirror)) {
                    coordinate.x += this.imgWidth + this.config.gutter.horizontal;
                    mirror.x = !mirror.x;
                    index = index + 1 > this.source.length - 1 ? 0 : index + 1;
                }
            }

            row += 1

            if (row % 2 === 1 && this.config.cross) {
                coordinate.x = this.centerX - (this.imgWidth + this.config.gutter.horizontal) / 2
            } else {
                coordinate.x = this.centerX
            }

            mirror.x = true
            mirror.y = !mirror.y;

            coordinate.y -= this.imgHeight + this.config.gutter.vertical
        }
    }

    // 渲染左下
    drawLeftBottom () {
            
        const coordinate = {
            x: this.centerX,
            y: this.centerY
        };

        const mirror = {
            x: true,
            y: true
        };

        let row = 0;
        let index = 0;

        while (coordinate.y < this.ctxHeight + this.imgHeight) {

            while(this.centerX - coordinate.x < (this.ctxWidth + this.imgWidth) / 2) {
                if (drawImage(this.source[index], this.context, this.config, coordinate, mirror)) {
                    coordinate.x -= this.imgWidth + this.config.gutter.horizontal;
                    mirror.x = !mirror.x;
                    index = index + 1 > this.source.length - 1 ? 0 : index + 1;
                }
            }

            row += 1

            if (row % 2 === 1 && this.config.cross) {
                coordinate.x = this.centerX - (this.imgWidth + this.config.gutter.horizontal) / 2
            } else {
                coordinate.x = this.centerX
            }

            mirror.x = true
            mirror.y = !mirror.y;

            coordinate.y += this.imgHeight + this.config.gutter.vertical
        }
    }

    // 渲染右下
    drawRightBottom () {
            
        const coordinate = {
            x: this.centerX,
            y: this.centerY
        };

        const mirror = {
            x: true,
            y: true
        };

        let row = 0; // 行标
        let index = 0; // 图片下标

        while (coordinate.y < this.ctxHeight + this.imgHeight) {

            while(coordinate.x < this.ctxWidth + this.imgWidth) {
                if (drawImage(this.source[index], this.context, this.config, coordinate, mirror)) {
                    // 移动x坐标
                    coordinate.x += this.imgWidth + this.config.gutter.horizontal;
                    // 变换镜像
                    mirror.x = !mirror.x;
                    // 切换下一个图像坐标
                    index = index + 1 > this.source.length - 1 ? 0 : index + 1;
                }
            }

            row += 1
            // 交叉起始坐标
            if (row % 2 === 1 && this.config.cross) {
                coordinate.x = this.centerX - (this.imgWidth + this.config.gutter.horizontal) / 2
            } else {
                coordinate.x = this.centerX
            }

            mirror.x = true
            mirror.y = !mirror.y;
            // 移动y坐标
            coordinate.y += this.imgHeight + this.config.gutter.vertical
        }
    }
}

const drawImage = (image, ctx, config, coordinate, mirror) => {
    
    // 元素的宽高
    const width = config.width
    const height = config.width * image.width / image.height

    // 随机宽度
    let rw = config.width
    if (config.random.rotate) {
        rw = random(width - config.random.width, width + config.random.width)
    }

    // 随机角度
    let ro = config.rotate
    if (config.random.rotate) {
        ro = random(config.rotate - config.random.rotate, config.rotate + config.random.rotate)
    }

    ctx.translate(coordinate.x + width / 2, coordinate.y + height / 2)
    ctx.rotate(ro * Math.PI / 180)
    
    // 水平镜像
    if (mirror.x && config.mirror.x) {
        ctx.scale(-1, 1);
    }

    // 垂直镜像
    if (mirror.y && config.mirror.y) {
        ctx.scale(1, -1)
    }

    ctx.drawImage(image, -width / 2, -height / 2, rw, rw * width / height)

    ctx.restore()
    ctx.save()

    return true
}

// 获取随机数
const random = (lower, upper) => Math.floor(Math.random() * (upper - lower + 1)) + lower

