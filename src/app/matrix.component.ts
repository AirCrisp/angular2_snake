import { Component, Input, ViewChild, HostListener, OnInit } from '@angular/core';

import { GameService } from './game.service';
import { KEYS } from './app.config';

@Component({
  selector: 'matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit{
  @Input() rows: number;
  @Input() cols: number;
  @ViewChild("matrix") matrixContainer;
  @ViewChild("buttonLayer") buttonLayer;
  @ViewChild("pause") pause;
  score: number = 0;
  matrixBody: string[];

  constructor(private gameService: GameService){};

  ngOnInit(){
	this.gameService.gameInit(this.rows, this.cols);
	this.matrixBody = this.gameService.matrix.body;
  };

  @HostListener('window:keydown', ['$event']) keyboardInput(event: KeyboardEvent) {
		if(this.gameService.play) {
			this.gameService.changecourse(event.keyCode);
			if(event.keyCode == KEYS.SPACE_BAR) {
				this.gamePause();
				this.buttonLayer.nativeElement.children[0].blur();
				this.buttonLayer.nativeElement.children[1].blur();
				this.pause.nativeElement.blur();
			}
		}
  }

  swipe(direction: string){
	  console.log(direction);
	  if(this.gameService.play) {
		  switch(direction) {
			  case 'swipeleft' : 
			  this.gameService.changecourse(KEYS.LEFT);
			  break;
			  case 'swiperight' : 
			  this.gameService.changecourse(KEYS.RIGHT);
			  break;
			  case 'swipeup' : 
			  this.gameService.changecourse(KEYS.UP);
			  break;
			  case 'swipedown' : 
			  this.gameService.changecourse(KEYS.DOWN);
			  break;
		  };
		}
  };

  cellIsOn(index: number){
	if (this.gameService.matrix.body[index] == 'snake') {
		return true;}
	else return false;
  };

  cellIsApple(index: number){
	if (this.gameService.matrix.body[index] == 'apple') return true
	else return false;
	
  };

  gameStart(){
	  this.buttonLayer.nativeElement.className = 'button_layer hide';
	  this.matrixContainer._element.nativeElement.focus();
	  this.buttonLayer.nativeElement.children[0].className = "new hide mat-fab";
	  this.buttonLayer.nativeElement.children[1].className = "resume mat-fab";
	  this.pause._elementRef.nativeElement.className = 'mat-raised-button';
	//   if (this.gameService.init) {
	// 	this.setCell(this.gameService.apple.body[0], this.gameService.apple.body[1], false, 'apple');	  
	// 	this.gameService.snake.last_body.forEach(function(currentItem){
	// 					this.setCell(currentItem[0], currentItem[1], false, 'snake');
	// 					}, this);
	//   };
	  this.gameService.gameInit(this.rows, this.cols);
	  this.score = this.gameService.score;
	//   this.gameService.snakeMove.subscribe(() => {
	//   	let length: number = this.gameService.snake.last_body.length - 1;
	// 	this.score = this.gameService.score;
	// 	if(this.gameService.play) this.setCell(this.gameService.snake.body[0][0], this.gameService.snake.body[0][1], true, 'snake');
	// 	if(this.gameService.snake.grow)	this.setCell(this.gameService.apple.body[0], this.gameService.apple.body[1], true, 'apple')
	// 	else if(this.gameService.play) this.setCell(this.gameService.snake.last_body[length][0], this.gameService.snake.last_body[length][1], false, 'snake');
	//   });
	  this.gameService.snakeDead.subscribe(() => {
		this.buttonLayer.nativeElement.children[0].className = "new hide mat-fab";
	  	this.buttonLayer.nativeElement.children[1].className = "resume hide mat-fab";
		this.buttonLayer.nativeElement.children[2].className = "dead";
		this.buttonLayer.nativeElement.className = 'button_layer';
		this.pause._elementRef.nativeElement.className = 'hide mat-raised-button';
		this.buttonLayer.nativeElement.children[2].addEventListener('animationend', () => {
			this.buttonLayer.nativeElement.children[2].className = "dead hide";
			this.buttonLayer.nativeElement.children[0].className = "new mat-fab";
		});
	  });
	//   this.setCell(this.gameService.snake.body[0][0], this.gameService.snake.body[0][1], true, 'snake');
	//   this.setCell(this.gameService.apple.body[0], this.gameService.apple.body[1], true, 'apple');	
	  this.gameService.gameStart();		
  };

  gamePause(){
  	if(this.gameService.play && !this.gameService.pause) {
		this.gameService.gamePause();
		this.buttonLayer.nativeElement.className = 'button_layer';
		this.pause._elementRef.nativeElement.className = 'hide mat-raised-button';
	}
	else if (this.gameService.play && this.gameService.pause) {
		this.gameService.gameStart();
		this.buttonLayer.nativeElement.className = 'button_layer hide';
		this.pause._elementRef.nativeElement.className = 'mat-raised-button';
	}
  };

  getCell(row: number, col: number) {
	  	var cell = this.matrixContainer._element.nativeElement.getElementsByClassName('cell')[(row - 1) * this.cols + col - 1];
		if(cell.className == 'cell on mat-grid-tile' || cell.className == 'cell apple mat-grid-tile') 
			return true;
		return false;
	}

  setCell(row: number, col: number, val: boolean, type: string) {
		var ind:number = (row - 1) * this.cols + col - 1;
		var cell = this.matrixContainer._element.nativeElement.getElementsByClassName('cell')[ind];
		var classOn: string;
		var classOff: string;
		var celltype: number;
		switch(type){
			case 'snake':
				classOn = 'cell on mat-grid-tile';
				classOff = 'cell mat-grid-tile';
				celltype = 1;
				break;
			case 'apple':
				classOn = 'cell apple mat-grid-tile';
				classOff = 'cell mat-grid-tile';
				celltype = 2;
				break;
		};
		cell.className = (val ? classOn : classOff);
	}

}