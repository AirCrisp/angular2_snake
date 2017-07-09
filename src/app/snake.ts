export class Snake {
    body: number[][];
    last_body: number[][];
    direction: string;
    courseflag: boolean;
	alive: boolean;
	grow: boolean;

	constructor(private maxRows: number, private maxCols: number){
		this.body = [[0, 0]];
        this.last_body = [[0, 0]];
		this.direction = 'right';
        this.courseflag = true;
		this.alive = true;
		this.grow = false;
	}

	checkAlive() {
		if(this.body.length > 3){
			this.alive = !this.body.some(function(currentItem, index: number){
				if(index > 0)
					return (this.body[0][0] == currentItem[0] && this.body[0][1] == currentItem[1])
			}, this);
		}
		if(this.body[0][0] < 0 || this.body[0][1] < 0 || 
			this.body[0][0] > this.maxCols || this.body[0][1] > this.maxRows)
			this.alive = false;
	};

    move(){
	  this.grow = false;
	  this.courseflag = true;
      this.last_body = this.body.slice();
      switch(this.direction)
	    {
			case 'right':
				this.body.unshift([this.body[0][0], this.body[0][1] + 1]);
				break;
			case 'left':
				this.body.unshift([this.body[0][0], this.body[0][1] - 1]);
				break;
			case 'up':
				this.body.unshift([this.body[0][0] - 1 , this.body[0][1]]);
				break;
			case 'down':
				this.body.unshift([this.body[0][0] + 1 , this.body[0][1]]);
				break;								
		}
      this.body.pop();
	  this.checkAlive();
    };

    eat(){
		this.body.push(this.last_body[this.last_body.length - 1]);
		this.grow = true;
		console.log(this.body);
		console.log(this.last_body);
	};
}
