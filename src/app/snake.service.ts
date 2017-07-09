import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SnakeService {
	snake: Snake = {
        body: [[1, 0]],
        direction: 'right'
    };

    snakeChange = new Subject<Snake>();

    doNext(value) {
        this.snakeChange.next(value);
    }

    start(){
        setInterval(() => {this.move()}, 1000);
    };

    move(){
        switch(this.snake.direction) {
            case 'right':
                this.snake.body[0][1]++;
                break;
        };
        console.log(this.snake.body);
        this.doNext(this.snake);
    };

};

export class Snake {
    body: number[][];
    direction: string;
}