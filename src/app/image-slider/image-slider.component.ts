import { AfterViewInit, Component, Directive, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
//import { CarouselItemDirective } from './carousel.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement  {
  
}

@Component({
  selector: 'carousel',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  items = [
    {img:'assets/img/slide1.jpg'},
    {img:'assets/img/slide2.jpg'},
    {img:'assets/img/slide3.jpg'}
  ]
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel', {static: true}) private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = true;
  private player : AnimationPlayer;
  private itemWidth : number;
  private currentSlide = 0;
  carouselWrapperStyle = {}
  prevDisabled:boolean;
  nextDisabled:boolean;
  noSlides:boolean;

  //Method To translate Slides
  playSlide(){
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }
  // Next Slide Method
  next() {
    if( this.currentSlide + 1 === this.items.length ){
      return;
    }
    if( this.currentSlide >= this.items.length - 2 ){
      this.nextDisabled = true;
    };
    if( this.currentSlide >= 0 ){
      this.prevDisabled = false;
    }; 
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    this.playSlide();
    
  }
  
  // Build Animation to Slide image
  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }
    
  // Previous Slide Method
  prev() {
    if( this.currentSlide === 0 ){
      return    
    };

    //Disables Prev btn if no Slides to navigate backward
    if( this.currentSlide <= 1 ){
      this.prevDisabled = true;
    };
    //Enables Next btn if current slide is not last slide
    if( this.currentSlide <= this.items.length - 1 ){
      this.nextDisabled = false;
    };

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    this.playSlide();
    
  }
  addSlide(value) {
    this.items.push({img: value });
    
    //Disables Next btn if only 1 slide is there
    if( this.currentSlide >= 0 ){
      this.nextDisabled = false;      
      this.noSlides = false;
    };

    //Hides the control if only 1 slide is there
    if( this.items.length > 1 ){
      this.showControls = true;
    };
  }
  
  //Remove Slide from list
  remove(i){
    this.currentSlide = 0;
    this.items.splice(i,1)

    if( this.items.length <= 1 ){
      this.nextDisabled = true;
      this.showControls = false;
    };
  
   if(this.currentSlide == 0){
    this.prevDisabled = true;
    this.nextDisabled = false;
   }

    if( this.items.length <= 0 ){
      this.noSlides = true;
    };
    
    this.playSlide();
    
  }


  // Thumbnail slides Method
  changeSlide(i){
    this.currentSlide = i;
    this.playSlide();

    if( this.currentSlide >= this.items.length - 1 ){
      this.nextDisabled = true; 
    }else{
      this.nextDisabled = false; 
    }

    if( this.currentSlide > 0 ){
      this.prevDisabled = false;
    }else{
      this.prevDisabled = true;
    } 
  }
  constructor( private builder : AnimationBuilder ) {
  }
  
  ngAfterViewInit() {

    // Disables prev button on Initialization
    if( this.currentSlide === 0 ){
      this.prevDisabled = true;      
    }
    
    // Set width of the wrapper same as carousel item
    this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
    this.carouselWrapperStyle = {
      width: `${this.itemWidth}px`
    }
    
    
  }

}
