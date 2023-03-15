import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('srvElement') element: {
    type: string,
    name: string,
    content: string
  }

  @ViewChild('heading', {static: true}) header: ElementRef
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef

  constructor() {
    console.log('constructor called!')
  }

  ngOnInit(): void {
    console.log('ngOnInit called!')
    console.log(`Text Content: ${this.header.nativeElement.textContent}`)
    console.log(`Text Content of Paragraph: ${this.paragraph.nativeElement.textContent}`)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called!')
    console.log(changes)
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!')
    console.log(`Text Content of Paragraph: ${this.paragraph.nativeElement.textContent}`)
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!')
  }
  
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!')
    console.log(`Text Content: ${this.header.nativeElement.textContent}`)
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!')
  }
}
