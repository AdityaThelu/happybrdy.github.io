/*
 * Magazine sample
 */

function addPage(page, book) {

    var id, pages = book.turn('pages');

    // Create a new element for this page
    var element = $('<div />', {});

    // Add the page to the flipbook
    if (book.turn('addPage', element, page)) {

        // Add the initial HTML
        // It will contain a loader indicator and a gradient
     if (flipbookcfg && flipbookcfg.direction === 'rtl') {
     element.html('<div class="gradient-rtl"></div><div class="loader"></div>');
     }         
     else       
     {  
     element.html('<div class="gradient"></div><div class="loader"></div>');
     } 

        // Load the page
        loadPage(page, element);
    }

}


// Zoom in / Zoom out

function zoomTo(event) {

    setTimeout(function () {
        if ($('.magazine-viewport').data().regionClicked) {
            $('.magazine-viewport').data().regionClicked = false;
        } else {
            if ($('.magazine-viewport').zoom('value') == 1) {
                $('.magazine-viewport').zoom('zoomIn', event);
            } else {
                $('.magazine-viewport').zoom('zoomOut');
            }
        }
    }, 1);

}



// Load regions

function loadRegions(page, element) {

var siteURL=flipbookcfg.name;
   
 //   $.getJSON('/conversion/web/files/flipbooks/'+siteURL+'/'+page+'-regions.json').

$.getJSON('https://www.flipbookpdf.net/web/site/region.php?flip='+siteURL+'&page=' + page).

     done(function(data) {
     if (data != null){
     $.each(data, function(key, region) {
     addRegion(region, element);
     
     });
     }
     });
}

// Add region

function addRegion(region, pageElement) {
var format=flipbookcfg.showformat;
    var reg = $('<div />', {'class': 'region  ' + region['class']}),
            options = $('.magazine').turn('options'),
            pageWidth = options.width /2, 
            pageHeight = options.height;
            
 if ((format==1)||(format==5)) {   
 reg.css({
        top: Math.round(region.y / 870 * 100) + '%',
        left: Math.round(region.x / 615 * 100) + '%',
        width: Math.round(region.width / 615 * 100) + '%',
        height: Math.round(region.height / 870 * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));
 }     
 
if ((format==2)||(format==9)) {   
 reg.css({
        top: Math.round(region.y / 800 * 100) + '%',
        left: Math.round(region.x / 800 * 100) + '%',
        width: Math.round(region.width / 800 * 100) + '%',
        height: Math.round(region.height / 800 * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));
 }    
 
 if ((format==3)||(format==6)) {   
 reg.css({
        top: Math.round(region.y / 800 * 100) + '%',
        left: Math.round(region.x / 618 * 100) + '%',
        width: Math.round(region.width / 618 * 100) + '%',
        height: Math.round(region.height / 800 * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));
 } 
 
  if (format==0) {   
 reg.css({
        top: Math.round(region.y / 600 * 100) + '%',
        left: Math.round(region.x / 815 * 100) + '%',
        width: Math.round(region.width / 815 * 100) + '%',
        height: Math.round(region.height / 600 * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));
 }
 
   if (format==7) {   
 reg.css({
        top: Math.round(region.y / 700 * 100) + '%',
        left: Math.round(region.x / 993 * 100) + '%',
        width: Math.round(region.width / 993 * 100) + '%',
        height: Math.round(region.height / 700 * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));
 }
 
  
   if ((format==4)||(format==8)) {   
 reg.css({
        top: Math.round(region.y / 587 * 100) + '%',
        left: Math.round(region.x / 1038 * 100) + '%',
        width: Math.round(region.width / 1038 * 100) + '%',
        height: Math.round(region.height / 587 * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));
 }     

 /*   reg.css({
        top: Math.round(region.y / pageHeight * 100) + '%',
        left: Math.round(region.x / pageWidth * 100) + '%',
        width: Math.round(region.width / pageWidth * 100) + '%',
        height: Math.round(region.height / pageHeight * 100) + '%'
    }).attr('region-data', $.param(region.data || ''));
    */


    reg.appendTo(pageElement);
}

// Process click on a region

function regionClick(event) {

    var region = $(event.target);

    if (region.hasClass('region')) {

        $('.magazine-viewport').data().regionClicked = true;

        setTimeout(function () {
            $('.magazine-viewport').data().regionClicked = false;
        }, 100);

        var regionType = $.trim(region.attr('class').replace('region', ''));

        return processRegion(region, regionType);

    }

}

// Process the data of every region

function processRegion(region, regionType) {

    data = decodeParams(region.attr('region-data'));

    switch (regionType) {
        case 'link' :

     //    window.open(data.url);
   var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);     
   if(isSafari) {
        window.location.assign(data.url);
    } else
    {
    window.open(data.url);
    }

            break;
        case 'zoom' :

            var regionOffset = region.offset(),
                    viewportOffset = $('.magazine-viewport').offset(),
                    pos = {
                        x: regionOffset.left - viewportOffset.left,
                        y: regionOffset.top - viewportOffset.top
                    };

            $('.magazine-viewport').zoom('zoomIn', pos);

            break;
        case 'to-page' :

            $('.magazine').turn('page', data.page);

            break;
    }

}



// http://code.google.com/p/chromium/issues/detail?id=128488

function isChrome() {

    return navigator.userAgent.indexOf('Chrome') != -1;

}

function disableControls(page) {

if (flipbookcfg.direction == 'rtl') {

    if (page == 1)
        $('.next-button').hide();
    else
        $('.next-button').show();

    if (page == $('.magazine').turn('pages'))
        $('.previous-button').hide();
    else
        $('.previous-button').show();
        } 
        
        else
        
     {  
     
      if (page == 1)
        $('.previous-button').hide();
    else
        $('.previous-button').show();

    if (page == $('.magazine').turn('pages'))
        $('.next-button').hide();
    else
        $('.next-button').show();
     } 
        
}

// Set the width and height for the viewport

function resizeViewport() {

    var width = $(window).width(),
            height = $(window).height(),
            options = $('.magazine').turn('options');

    $('.magazine').removeClass('animated');

    $('.magazine-viewport').css({
        width: width,
        height: height
    }).
            zoom('resize');


    if ($('.magazine').turn('zoom') == 1) {
        var bound = calculateBound({
            width: options.width,
            height: options.height,
            boundWidth: Math.min(options.width, width),
            boundHeight: Math.min(options.height, height)
        });

        if (bound.width % 2 !== 0)
            bound.width -= 1;


        if (bound.width != $('.magazine').width() || bound.height != $('.magazine').height()) {

            $('.magazine').turn('size', bound.width, bound.height);

            if ($('.magazine').turn('page') == 1)
                $('.magazine').turn('peel', 'br');

            $('.next-button').css({height: bound.height, backgroundPosition: '-38px ' + (bound.height / 2 - 32 / 2) + 'px'});
            $('.previous-button').css({height: bound.height, backgroundPosition: '-4px ' + (bound.height / 2 - 32 / 2) + 'px'});
        }

        $('.magazine').css({top: -bound.height / 2, left: -bound.width / 2});
    }

    var magazineOffset = $('.magazine').offset(),
            boundH = height - magazineOffset.top - $('.magazine').height(),
            marginTop = (boundH - $('.thumbnails > div').height()) / 2;

    if (marginTop < 0) {
        $('.thumbnails').css({height: 1});
    } else {
        $('.thumbnails').css({height: boundH});
        $('.thumbnails > div').css({marginTop: marginTop});
    }

    if (magazineOffset.top < $('.made').height())
        $('.made').hide();
    else
        $('.made').show();

    $('.magazine').addClass('animated');

}


// Number of views in a flipbook

function numberOfViews(book) {
    return book.turn('pages') / 2 + 1;
}

// Current view in a flipbook

function getViewNumber(book, page) {
    return parseInt((page || book.turn('page')) / 2 + 1, 10);
}

function moveBar(yes) {
    if (Modernizr && Modernizr.csstransforms) {
        $('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
    }
}

function setPreview(view) {

    var previewWidth = 112,
            previewHeight = 73,
            previewSrc = 'pages/preview.jpg',
            preview = $(_thumbPreview.children(':first')),
            numPages = (view == 1 || view == $('#slider').slider('option', 'max')) ? 1 : 2,
            width = (numPages == 1) ? previewWidth / 2 : previewWidth;

    _thumbPreview.
            addClass('no-transition').
            css({width: width + 15,
                height: previewHeight + 15,
                top: -previewHeight - 30,
                left: ($($('#slider').children(':first')).width() - width - 15) / 2
            });

    preview.css({
        width: width,
        height: previewHeight
    });

    if (preview.css('background-image') === '' ||
            preview.css('background-image') == 'none') {

        preview.css({backgroundImage: 'url(' + previewSrc + ')'});

        setTimeout(function () {
            _thumbPreview.removeClass('no-transition');
        }, 0);

    }

    preview.css({backgroundPosition:
                '0px -' + ((view - 1) * previewHeight) + 'px'
    });
}

// Width of the flipbook when zoomed in

function largeMagazineWidth() {
var format=flipbookcfg.showformat;
   // return 2214;
if (format=="5" || format=="6" || format=="7" || format=="8" || format=="9") 
return 1644;
else
return 2330;
}

// decode URL Parameters

function decodeParams(data) {

    var parts = data.split('&'), d, obj = {};

    for (var i = 0; i < parts.length; i++) {
        d = parts[i].split('=');
        obj[decodeURIComponent(d[0])] = decodeURIComponent(d[1]);
    }

    return obj;
}

// Calculate the width and height of a square within another square

function calculateBound(d) {

    var bound = {width: d.width, height: d.height};

    if (bound.width > d.boundWidth || bound.height > d.boundHeight) {

        var rel = bound.width / bound.height;

        if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {

            bound.width = Math.round(d.boundHeight * rel);
            bound.height = d.boundHeight;

        } else {

            bound.width = d.boundWidth;
            bound.height = Math.round(d.boundWidth / rel);

        }
    }

    return bound;
}


