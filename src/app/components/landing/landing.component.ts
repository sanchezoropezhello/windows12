import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { gsap } from 'gsap';
import { RouterModule } from '@angular/router';
import { Draggable } from "gsap/Draggable";


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit{

  menuIsOpen = false
  Menutl: any;
  FolderTl: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void{
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(Draggable);

    this.Menutl = gsap.timeline({
      defaults:{
        duration:0.7,
        ease:'power4.inOut'
      }
    })

    this.FolderTl = gsap.timeline({
      defaults:{
        duration:0.7,
        ease:'power4.inOut'
      }
    })
    const chargeTl = gsap.timeline({
      defaults:{
        duration:1,
        ease:'power4.inOut'
      }
    })

    chargeTl.to('#chargement1',{
      width:'10vw',
      opacity:0
    }).to('#chargement2',{
      width:'10vw',
      opacity:0
    }).fromTo('#welcome',{
      y:50,
      opacity:0
    },{
      y:0,
      x:-80,
      opacity:1
    }).fromTo('#likeur',{
      y:50,
      opacity:0
    },{
      y:0,
      x:80,
      opacity:1
    }).to('#chargement3',{
      width:'10vw',
      opacity:0
    }).to('#chargement4',{
      width:'10vw',
      opacity:0
    }).to('#chargementBox',{
      opacity:0,
      display:'none'
    }).from('#heureBox,#menuBoxLeft,#batterieBoxRight',{
      y:-10,
      opacity:0,
      stagger:0.1
    },"<")
    gsap.set('#menuContextuelle',{
      height:0
    })
    gsap.set('#FolderBox',{
      y:50,
      opacity:0,
      display:'none',
    })

    

    this.Menutl.to('#menuContextuelle',{
      height:'70vh',
    })
    this.Menutl.pause()
  }
  OpenMenu(){
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.menuIsOpen = !this.menuIsOpen
    if(this.menuIsOpen){
      this.Menutl.play()
    }else{
      this.Menutl.reverse()
      // gsap.to('#menuContextuelle',{
      //   height:'0vh',
      //   duration:1,
      //   ease:'power4.inOut'
      // })
    }
  }

  openFolder(){
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.FolderTl.to('#FolderBox',{
      y:0,
      opacity:1,
      display:'block'
    }).to('#preFolder',{
      y:50,
      opacity:0,
      display:'none'
    }, "-=0.2").from('#headFolder, #secondFolder,#asideFolder, #contentFolder',{
      y:-10,
      opacity:0,
      stagger:0.1
    }, "<")

    Draggable.create('#FolderBox', {
      bounds: '.draggarea',
      inertia: true
    })
  }
  openFolderPin(){
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.FolderTl.to('#FolderBox',{
      y:0,
      opacity:1,
      display:'block'
    }).to('#preFolder',{
      y:50,
      opacity:0,
      display:'none'
    }, "-=0.2").from('#headFolder, #secondFolder,#asideFolder, #contentFolder',{
      y:-10,
      opacity:0,
      stagger:0.1
    }, "<")
    this.Menutl.reverse()

    Draggable.create('#FolderBox', {
      bounds: '.draggarea',
      inertia: true
    })
  }
  closeFolder(){
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const closetl = gsap.timeline({
      defaults:{
        duration:0.7,
        ease:'power4.inOut'
      }
    })
    closetl.to('#FolderBox',{
      y:50,
      opacity:0,
      display:'none',
    }).to('#FolderBox',{
      height:'70vh',
      width:'50vw',
    })
    
  }

  isFullScreen = false
  toFullScreen(){
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.isFullScreen = !this.isFullScreen
    if(this.isFullScreen){
      gsap.to('#FolderBox',{
        height:'100vh',
        width:'100vw',
        top: 0,
        y:0
      })
    }else{
      gsap.to('#FolderBox',{
        height:'70vh',
        width:'60vw',
      })
    }
  }
}
