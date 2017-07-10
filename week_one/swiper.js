/**
 * swiper组件
 *
 * 要求container的直接子元素必须有class：swiper-wrwap
 *
 * 调用方式
 * new Swiper()
 *
 * @params type: Object
 *
 * container  Swiper容器的class或者dom
 *
 * swiper-slide  Swiper项目必须的class
 *
 * autoPlay  [boolean|number]
 *
 * direction  [horizental | vertical]
 * */

var Swiper = function (options) {
    //获取swiper容器
    this.container = document.querySelector(options.container);
    //获取存放slide的父元素
    this.swiperWrap = this.container.querySelector('.swiper-wrap');
    //获取所有的slide
    this.swiperSlide = this.container.querySelectorAll('.swiper-slide');
    //获取swiper容器的宽度
    this.layoutWidth = this.container.offsetWidth;
    //获取slide的数量
    this.length = this.swiperSlide.length;
    // 获取是否自动播放
    this.autoPlay=options.autoPlay;
    //初始化样式
    this.init();
    //绑定事件
    this.addEvent();
    this.time=null;
    console.log(this.autoPlay)
    var that=this;
    // if(this.autoPlay){
    //     if(this.autoPlay==true)
    //     time=setInterval(function(){
    //         that.auto()
    //     },1000)
        
    // }
    // this.auto()
};

Swiper.prototype = {
    init: function () {
        //根据slide数量给wrap设置宽度
        this.swiperWrap.style.width = this.layoutWidth * this.length + 'px';
        //将每一个slide的宽度设置为swiper容器的宽度
        for (var i = 0; i < this.length; i++) {
            this.swiperSlide[i].style.width = this.layoutWidth + 'px';
        }
    },
    stopX:0,
    index:0,
    addEvent: function () {

        var startX, moveX, wrap = this.swiperWrap,
            distance =this.layoutWidth;

        function startFn(e) {
            // clearInterval(this.time)
            startX = e.touches[0].clientX;

            wrap.classList.remove('tst');
        }

        function moveFn(e) {
            moveX = e.touches[0].clientX - startX;
            if(this.index==0&&moveX>0||this.index==this.length-1&&moveX<0) return;
            wrap.style.transform = 'translate3d(' + (moveX + this.stopX) + 'px,0,0)'

        }

        function endFn() {
            this.stopX = moveX + this.stopX;
            wrap.classList.add('tst');
            console.log(Math.abs(moveX / distance));
            if (Math.abs(moveX / distance) > 0.2) {
                //去往下一张图片
                //根据move的方向修改index的值
                if (moveX < 0) {
                    this.index >= (this.length-1) ? (this.index = (this.length-1)) : this.index++
                } else {
                    this.index <= 0 ? this.index = 0 : this.index--
                }
                //执行切换轮播图函数，每次切换一帧
                this.go(this.index);

            } else {
                //留在当前的图片
                this.go(this.index);
            }
            this.auto()
        }

        /*function go(index) {
            wrap.style.transform = 'translate3d(' + (-distance * index) + 'px,0,0)';
            this.stopX = (-distance * index);
        }*/

        this.container.addEventListener('touchstart', startFn);
        this.container.addEventListener('touchmove', moveFn.bind(this));
        this.container.addEventListener('touchend', endFn.bind(this));
    },
    go:function (index) {
        var distance = this.layoutWidth;
        this.swiperWrap.style.transform = 'translate3d(' + (-distance * index) + 'px,0,0)';
        this.stopX = (-distance * index);
    },
    auto:function(){
        var that=this;
        this.time=setInterval(function(){
            that.index=that.index+1;
            if(that.index>that.length-1)return;
            that.go(that.index);
            
            console.log(that.index)
        },1000)
    }
};
