;(function($, window, document, undefined){
'use strict';

  var device = (function(u){
    return {
      Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
        || u.indexOf("ipad") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
        || u.indexOf("kindle") != -1
        || u.indexOf("silk") != -1
        || u.indexOf("playbook") != -1,
      Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
        || u.indexOf("iphone") != -1
        || u.indexOf("ipod") != -1
        || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
        || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
        || u.indexOf("blackberry") != -1,
      Android: u.indexOf("android") != -1
    }
  })(window.navigator.userAgent.toLowerCase()); 
  
$.fn.parallaxTilt = function(opts){
  var self = this;

  return this.each(function(i,el){
    opts = $.extend({
      i: i,
      el: el
    },opts);
    new parallaxTilt(opts);
  })
}

function parallaxTilt(opts){
  var self = this;
  this.opts = $.extend({
    parallaxMultiple: 0.1,
    tiltMultiple: 0.05,
    duration: 500,
    easing:'easeOutExpo'
  }, opts);

  this.$el = $(opts.el);
  this.$hoverTaget = this.$el.parent();
  this.$window = $(window);
  this.$body = $('body');

  this.center = {
    x: Math.floor( this.$window.width() / 2 ),
    y: Math.floor( this.$window.height() / 2 )
  }

  if (device.Mobile || device.Android) {
    window.addEventListener('deviceorientation', $.proxy(this.orientationchange, this));
  }else{
    this.$hoverTaget.on('mousemove.parallaxTilt', $.proxy(this.mousemove, this));
    this.$hoverTaget.on('mouseout.parallaxTilt', $.proxy(this.mouseout, this));
  };
}
parallaxTilt.prototype.mousemove = function(event){
  var pos = {
    x: event.clientX,
    y: event.clientY
  }
  var top  = Math.floor((this.center.y - pos.y) * this.opts.parallaxMultiple);
  var left = Math.floor((this.center.x - pos.x) * this.opts.parallaxMultiple);

  var tiltX = Math.floor((this.center.y - pos.y) * this.opts.tiltMultiple);
  var tiltY = Math.floor((pos.x - this.center.x) * this.opts.tiltMultiple);
  
  this.render({top:top, left:left},{tiltX:tiltX, tiltY:tiltY});
}

parallaxTilt.prototype.mouseout = function(event){
  var top  = 0;
  var left = 0;
  var tiltX = 0;
  var tiltY = 0;
  
  this.render({top:top, left:left},{tiltX:tiltX, tiltY:tiltY});
}

parallaxTilt.prototype.orientationchange = function(event){
  var alpha = 0;
  var beta = event.beta;
  var gamma = event.gamma;
  
  var top  = Math.floor((beta-55) *3* this.opts.parallaxMultiple);
  var left = Math.floor((gamma) *3* this.opts.parallaxMultiple);

  var tiltX = 0;
  var tiltY = 0;
  
  this.render({top:top, left:left},{tiltX:tiltX, tiltY:tiltY});
}

parallaxTilt.prototype.render = function(pos,tiltDeg){
  this.$el.css({
    marginTop: pos.top,
    marginLeft: pos.left,
    transform: "rotateX("+tiltDeg.tiltX+"deg) rotateY("+tiltDeg.tiltY+"deg)",
  });
};

})(jQuery, this, this.document);