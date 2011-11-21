/*
Copyright (c) 2011 Zach Wick

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

jQuery.fn.pie_graph = function(options) {
    var options = jQuery.extend({
	data:[],
	colors:['#00FF00','#0066FF','#E33B26','#38B0B3','#EC41FF','#2A8E00','#2549A3','#BB7F2C','#B3FF00'],
    },options);

    var prevEnd = 0;
    var dataTotal = 0;
    for (var i=0;i<options.data.length;i++) {
	dataTotal += parseInt(options.data[i]);
    }
    
    var parentHeight = jQuery(this).height();
    var parentWidth  = jQuery(this).width();
    var canvasDim = parentWidth < parentHeight ? parentWidth : parentHeight;
    var tb_margin = (parentHeight - canvasDim) / 2;
    var lr_margin = (parentWidth - canvasDim) / 2;
    var html_string = "<canvas class='pie_graph' id='pie_graph' height='"+canvasDim+"px' width='"+canvasDim+"px'>";
    jQuery(this).append(html_string);
    jQuery(this).children("#pie_graph").css("margin-top",tb_margin).css("margin-bottom",tb_margin).css("margin-left",lr_margin).css("margin-right",lr_margin);

    var canvas = jQuery(this).children("#pie_graph");
    var ctx = canvas[0].getContext("2d");
    if (ctx == undefined) {
	ctx = G_vmlCanvasManager.initElement(canvas[0].getContext("2d"));
    }

    var middle = canvas.width() / 2;

    for (var i=0;i<options.data.length;i++) {
	ctx.fillStyle = options.colors[i % options.colors.length];
	ctx.beginPath();
	ctx.moveTo(middle,middle);
	ctx.arc(middle,middle,middle,prevEnd,prevEnd+(Math.PI*2*(options.data[i]/dataTotal)),false);
	ctx.lineTo(middle,middle);
	ctx.fill();
	prevEnd += Math.PI*2*(options.data[i]/dataTotal);
    }
};