class Slider {
  constructor(sliderElement) {
    this.slider = sliderElement;
    this.slides = null;
    this.sliderCanvas = null;
    this.offset = 0;

    if (this.slider) {
      this.currentSlideIndex = 0;
      this.sliderCanvas = this.slider.querySelector('.tmslides');
      this.slides = this.slider.querySelectorAll('.tmslide');
      this.controls = this.slider.querySelectorAll('.controls');
      this.offset = this.slides[0].offsetWidth
    }

    // window.addEventListener('resize', () => {
      // resize slider and slides
      // console.log(this.slides[0].offsetWidth)
    // });

    this.slider.addEventListener('mousedown', (event) => this.startSwipe(event));
    window.addEventListener('mouseup', (event) => this.endSwipe(event));
    window.addEventListener('mousemove', (event) => this.trackSwipe(event));

    this.controls?.[0].addEventListener('click', () => {
      this.changeSlide(-1);
    });

    this.controls?.[1].addEventListener('click', () => {
      this.changeSlide(1);
    });
  }

  changeSlide(direction) {
    // console.log(direction);
    const { slides: { length } } = this;

    if (this.currentSlideIndex === 0 && direction < 0) {
      this.currentSlideIndex = length - 1;
    } else if (this.currentSlideIndex === length - 1 && direction > 0) {
      this.currentSlideIndex = 0;
    } else {
      this.currentSlideIndex += direction;
    }

    this.sliderCanvas.style.transform = 
    `translateX(${this.offset * this.currentSlideIndex * -1}px)`;
  }

  startSwipe(event) {
    event.preventDefault();

    const { clientX, clientY } = event;

    this.swiping = true;
    this.coordiantes = {
      x: clientX,
      y: clientY,
    };
  }

  endSwipe(event) {
    event.preventDefault();

    const { clientX, clientY } = event;

    console.log(clientX - this.coordiantes.x)
    if (this.swiping) {
      this.swiping = false;
      this.coordiantes = {
        x: clientX,
        y: clientY,
      };
    }
  }

  trackSwipe = ({ clientX, clientY }) => {
    if (this.swiping) {
      const offset = Math.round(this.coordiantes.x - clientX)

      this.timer = setTimeout(() => console.log(offset), 0);
      // this.slides[0].offsetWidth = this.slides[0].offsetWidth + offset;
      
    }
  }
}

const initSlider = () => {
  const sliders = document.querySelectorAll('.tmslider-wrapper');

  sliders.forEach(slider => {
    new Slider(slider)
  });
};

document.addEventListener("DOMContentLoaded", initSlider);