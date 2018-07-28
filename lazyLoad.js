/*
* 图片懒加载
* author zhujie
* */

class lazyLoadImg{
    constructor(userConfig){
        const defaultConfig = {
            lazyDemo:"data-original",
            top:100
        }
        this.config = Object.assign(defaultConfig,userConfig)
        this.imgList = Array.prototype.slice.call(document.querySelectorAll("[" + this.config.lazyDemo + "]"))   //伪数组转换为真正的数组
    }
    // 判断是否该图片是否可以加载
    canILoad() {
        let imgList = this.imgList.concat([]);    //这里复制一个
        for(let i = 0 ; i < imgList.length ;i++){
            if(this.getDomeToTop(imgList[i])){
                this.loadImage(imgList[i], i);
            }
        }
    }
    getDomeToTop(el){               //计算dome离顶部的高度
        let bound = el.getBoundingClientRect();
        let clientHeight = window.innerHeight;
        // 图片距离顶部的距离 <= 浏览器可视化的高度，从而推算出是否需要加载
        return bound.top <= clientHeight + this.config.top; // -100是为了看到效果，您也可以去掉
    }
    // 加载图片
    loadImage(el, index) {
        let src = el.getAttribute(this.config.lazyDemo);
        el.src = src;
        this.imgList.splice(index, 1);
    }
    // 当浏览器滚动的时候，继续判断
    bindEvent() {
        window.addEventListener('scroll', () => {
            //如果图片加载完了，责不再执行
            if(this.imgList.length > 0){
                this.canILoad();
            }
        });
    }
    // 初始化
    init() {
        this.canILoad();
        this.bindEvent();
    }
    //追加一个懒加载的图片，主要用于异步获取到的图片链接,这里将异步加载的dome传过来就ok了
    addAsyncImg(asyncImgArr){
        var addImgArr = Array.prototype.slice.call(asyncImgArr)
        this.imgList = this.imgList.concat(addImgArr);
    }
}


