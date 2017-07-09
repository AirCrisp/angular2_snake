import { Snake } from './snake';
import { Apple } from './apple';

import { Injectable } from '@angular/core';
import  { KEYS } from './app.config';

import {Subject} from 'rxjs/Subject';

@Injectable()
export class GameService {

	pause: boolean;
	init: boolean;
	play: boolean;
	matrix: Matrix;
	apple: Apple;
    IntID: number;
	snake: Snake;
	score: number;
    snakeMove = new Subject<Snake>();
	snakeDead = new Subject<Snake>();

    doNextMove(value) {
        this.snakeMove.next(value);
    }

    doNextDead(value) {
        this.snakeDead.next(value);
    }

	gameInit(mRows: number, mCols: number){
		this.score = 0;
		this.matrix = {
			rows: mRows,
			cols: mCols,
			body: ['empty']
		};
		for (let i = 1; i< mCols*mRows; ++i) this.matrix.body.push('empty');
		this.snake = new Snake(this.matrix.rows, this.matrix.cols);
		this.matrix.body[this.snake.body[0][0]*this.snake.body[0][1]] = 'snake';
		this.apple = new Apple(mRows, mCols);
		this.matrix.body[this.apple.body[0]*this.apple.body[1]] = 'apple';
		this.init = true;
	};

    gameStart(){
		this.play = true;
		this.pause = false;
        this.IntID = setInterval(() => {
			this.move();
		}, 200);
    };

	gameAccelerate(){
		clearInterval(this.IntID);
		this.IntID = setInterval(() => {
			this.move()
		}, 200 - this.score*3);
	};

	gamePause(){
		this.pause = true;
		clearInterval(this.IntID);
	};

	gameStop(){
		this.play = false;
		clearInterval(this.IntID);
		this.doNextDead(this.snake);
	};

    move(){
        this.snake.move();
		if(this.snake.body[0][0] == this.apple.body[0] &&
			this.snake.body[0][1] == this.apple.body[1]){
				this.snake.eat();
				this.score++;
				if(!(this.score % 5) && (this.score > 0)) this.gameAccelerate();
				do {
				this.apple = new Apple(this.matrix.rows, this.matrix.cols);
				this.matrix.body[this.apple.body[0]*this.apple.body[1]] = 'apple';
				}
				while (this.snake.body.some(function(currentEl){
					return (this.apple.body[0] == currentEl[0] && this.apple.body[1] == currentEl[1])}, this));
				
			};
		if(!this.snake.alive) this.gameStop();

		this.matrix.body[(this.matrix.rows)*this.snake.body[0][0] + this.snake.body[0][1]] = 'snake';
		this.matrix.body[(this.matrix.rows)*this.snake.last_body[this.snake.last_body.length - 1][0] + this.snake.last_body[this.snake.last_body.length - 1][1]] = 'empty';
		this.doNextMove(this.snake);
    };

    changecourse(keycode: number) {
		if(this.snake.courseflag){
			switch(keycode) {
				case KEYS.LEFT :
					if(this.snake.direction != 'right') this.snake.direction = 'left';
					break;
				case KEYS.UP : 
					if(this.snake.direction != 'down') this.snake.direction = 'up';
					break;
				case KEYS.RIGHT : 
					if(this.snake.direction != 'left') this.snake.direction = 'right';
					break;
				case KEYS.DOWN : 
					if(this.snake.direction != 'up') this.snake.direction = 'down';
					break;			
				};
			this.snake.courseflag = false;
		};
	};

};

export class Matrix {
    rows: number;
	cols: number;
	body: string[];
}