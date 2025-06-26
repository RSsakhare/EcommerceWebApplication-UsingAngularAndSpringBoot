import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavContentComponent } from './nav-content/nav-content.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthComponent } from '../../../auth/auth.component';
import { UserService } from '../../../../State/User/user.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NavContentComponent,
    MatDialogModule
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentSection:any
  isNavbarContentOpen:any;
  userProfile:any;

  constructor(private router:Router, private dialog : MatDialog,
    private userService:UserService,
    private store: Store<AppState>
  ){}

  openNavbarContent(section:any){
    this.isNavbarContentOpen=true;
    this.currentSection=section;

  }

  closeNavbarContent(){
    this.isNavbarContentOpen=false;
  }
    
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector('.model-container');
    const openButtons = document.querySelectorAll('.open-button');

    let clickedInsideButton = false;

    openButtons.forEach((button:Element)=>{
      if (button.contains(event.target as Node)) {
        clickedInsideButton = true;
      }
    })

    if(modalContainer && !clickedInsideButton && this.isNavbarContentOpen) {
      this.closeNavbarContent();
    }
  }

  navigateTo(path:any){

    this.router.navigate([path])
  }

  ngOnInit(){
    if(localStorage.getItem("jwt")) this.userService.getUserProfile()

    this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
      this.userProfile=user.userProfile;
      if(user.userProfile){
        this.dialog.closeAll()
      }
      console.log("user",user)
    })
  }
  
  handleOpenLoginModal=()=>{
    console.log("handle open login module")
    this.dialog.open(AuthComponent,{
      width:"400px",
      disableClose:false
    })

  }

  handleLogout=()=>{
    this.userService.logout();
  }
}
