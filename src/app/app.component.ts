import { ChangeDetectorRef, Component, OnInit,ViewEncapsulation,ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { AdminService } from './shared/admin.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'adminpanel';
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private adminService:AdminService,
    private activatedRoute:ActivatedRoute,
    private router:Router){
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    

  }

  sideNavTabs = [
    {name:'Administrators',navigate:'admin-list'},
    {name:'Company',navigate:'company'},
    {name:'Image Slider',navigate:'image-slider'},
    {name:'Members',navigate:0}
  ]
  panelOpenState = false;
  companies = []
  href:any;
 
   /**
    * Initialize  of app component
    */
  
  ngOnInit(){
    /**
      * Method for Submenu Open based on active route
      * @prameter event contains the active route
      * var href act as panel expanded or collapsed
      * var panelOpenState for arrow icon up or down
      */

    this.router.events.subscribe((event) => {      
      if (event instanceof NavigationEnd ) {
        console.log(event.url)
        if(event.url == '/report-one'){
          this.href = true
          this.panelOpenState = true;
        }else if(event.url == '/report-two'){
          this.href = true
          this.panelOpenState = true;
        }else{
          this.href = false
          this.panelOpenState = false;
        }
      }
      
    });
    this.companies = this.adminService.companies

  }

  /**
   * Destroys the component
   */
  ngOnDestroy(): void {    
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}


