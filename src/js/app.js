// DOM VARIABLES
let overlay = document.getElementById('shadow-overlay');
let caption = document.getElementById('caption');
let indicator = document.getElementById('indicator');
let time = document.getElementById('time');
let captionReadMore = document.getElementById('caption-read-more');
let captionWrapper = document.getElementById('time-caption-wrapper');
let oldTopWrapper = captionWrapper.style.getPropertyValue('top');
//FOR COUNTUPJS
var options = {
  useEasing: true,
  useGrouping: true,
  separator: ',',
  decimal: ':',
};
var demo = new CountUp('time', 0, 1.23, 2, 2.5, options);
if (!demo.error) {
  demo.start();
} else {
  console.error(demo.error);
}

// Event listeners
// check for read more function
captionReadMore.addEventListener('click', readMore);
// hide caption
overlay.addEventListener('click', readLess);
time.addEventListener('click', readMore);
function readMore() {
  overlay.style.opacity = 0.65;
  overlay.style.zIndex = 3;
  caption.style.opacity = 1;
  captionReadMore.style.height = 0;
  captionReadMore.style.opacity = 0;
  captionWrapper.style.top = '50%';
}

function readLess() {
  overlay.style.opacity = 0;
  overlay.style.zIndex = -1;
  caption.style.opacity = 0;
  captionReadMore.style.height = '1rem';
  captionReadMore.style.opacity = 1;
  captionWrapper.style.top = oldTopWrapper;
}

$('#fullpage').fullpage({
  sectionSelector: '.photo-container',
  menu: '#sidebar-links',
  lazyload: true,
  autoScrolling: true,
  // callback function that updates the clock and caption
  afterLoad: function(anchorLink, index) {
    if (index == 1) {
      captionWrapper.style.display = 'none';
    } else {
      captionWrapper.style.display = 'block';
    }
    // update clock
    let updateSlide = document.getElementById(index + 'id');
    console.log(updateSlide);
    let newTime = updateSlide.getAttribute('data-time');
    demo.update(newTime);
    //update caption
    let newCaption = updateSlide.getAttribute('data-caption');
    caption.innerHTML =
      newCaption + '<br>' + updateSlide.getAttribute('data-credit');
    //indicator.innerHTML = updateSlide.getAttribute('data-indicator');
    demo.options.suffix = updateSlide.getAttribute('data-indicator');
  },
});
