//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){
  switch(arguments.length){
      case 1:
          return parseInt(Math.random()*minNum+1,10);
      break;
      case 2:
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
          default:
              return 0;
          break;
  }
}
// 代码格式化
(function(){
  var pre = document.getElementsByTagName('pre'),
    i = 0,
    codeFun = function(curPre){
      var codeDom = curPre.getElementsByTagName('code')[0],
      getLang = codeDom.getAttribute('class'),
      getCode = codeDom.innerText,
      spanLang = document.createElement('span'),
      textarea = document.createElement('textarea');
      spanLang.setAttribute('class','code-lang');
      spanLang.innerText = '</>'+ getLang;
      textarea.value = getCode;
      // textarea.style.display = 'none';
      codeDom.style.display = 'none';
      curPre.appendChild(spanLang);
      curPre.appendChild(textarea);
      var tags = '';
      switch(getLang){
        // case 'vue':
        case 'html':
        case 'xml':
        case 'react':
        case 'angular':
          getLang = 'text/html';
          tags = {
            style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
                    [null, null, "css"]],
            custom: [[null, null, "customMode"]]
          };
          break;
        case 'json':
          getLang = 'application/json';
          break;
        case 'js':
          getLang = 'javascript';
          break;
        case 'TypeScript':
          getLang = 'text/typescript';
          break;
        case 'scss':
          getLang = 'text/x-scss';
          break;
        case 'less':
          getLang = 'text/x-less';
          break;
        case 'css':
          getLang = 'text/css';
          break;
      }
      setTimeout(() => {
        CodeMirror.fromTextArea(textarea, {
          lineNumbers: true,
          mode: getLang,
          height: 'auto',
          readOnly: 'nocursor',
          theme: "dracula",
          tags: tags
        });
      });

    };
  while(i<pre.length){
    codeFun(pre[i]);
    i++;
  }
}());

$(function(){
  let HTMLDom = $(document),
    winDom = $(window),
    HTMLDomH =  HTMLDom.height(),
    winDomH = winDom.height();
  // 首页文章列表鼠标经过动画效果
  let indexMain = $('#indexMain'),
    animArray = ['anim-surround', 'anim-halo-effect-out', 'anim-halo-effect-in', 'anim-swipe-left', 'anim-swipe-right', 'anim-swipe-down', 'anim-swipe-up'],
    getAnimName = null;
  indexMain.on({
    'mouseenter': function(){
      let $this = $(this);
      getAnimName = animArray[randomNum(0, animArray.length - 1)];
      $this.addClass(getAnimName);
    },
    'mouseleave': function(){
      let $this = $(this);
      $this.removeClass(getAnimName);
    }
  }, '.post-item');
  // 文章目录显示隐藏
  $('#docSwitch').on('click', function(){
    let $this = $(this),
      docBox = $('#docBox');
    if(!$this.hasClass('open')){
      $this.addClass('open');
      docBox.addClass('open');
    }else{
      $this.removeClass('open');
      docBox.removeClass('open');
    }

  });

  // 页面滚动百分百计算效果
  (function(){
    let backTopBtn = $('#backTopBtn'),
      i = backTopBtn.find('i'),
      b = backTopBtn.find('b'),
      fun = function(sTop){
        if((HTMLDomH - winDomH) > 0 && sTop > 0){
          backTopBtn.addClass('show');
          let he = (sTop/(HTMLDomH - winDomH)*100).toFixed(0)
          b.text(he + '%');
          i.height(he + '%');
        }else{
          backTopBtn.removeClass('show');
        }
      };
    HTMLDom.on('scroll', function(event){
      fun(HTMLDom.scrollTop())
    });
    backTopBtn.on('click', function(){
      HTMLDom.scrollTop(0);
    });
    fun(HTMLDom.scrollTop());
    winDom.on('resize', function(){
      HTMLDomH =  HTMLDom.height();
      winDomH = winDom.height();
      fun(HTMLDom.scrollTop());
    })
  }());
});
