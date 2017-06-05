/*import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Component, NgModule, Input, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


@Component({
	selector: 'joke-form',
	template: `
<div class="card card-block">
  <h4 class="card-title">Create Joke</h4>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the setup"
           #setup>
  </div>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the punchline"
           #punchline>
  </div>
  <button type="button"
          class="btn btn-primary"
          (click)="createJoke(setup.value, punchline.value)">Create
  </button>
</div>
  `
})
export class JokeFormComponent {
  
	@Output() jokeCreated = new EventEmitter<object>();

	createJoke(setup: string, punchline: string) {
	
		this.jokeCreated.emit({setup: setup, punchline: punchline, hide: true});
		
	}
}

@Component({
  selector: 'joke',
  template: `
<div class="card card-block">
  <h4 class="card-title">{{joke.setup}}</h4>
  <p class="card-text"
     [hidden]="joke.hide">{{joke.punchline}}</p>
  <!--<a (click)="joke.hide = !joke.hide"-->
  <a (click)="toggle(joke)"
     class="btn btn-warning">Tell Me
  </a>
  <a (click)="deleteJoke()"
     class="btn btn-warning">Delete
  </a>
</div>
  `
})
export class JokeComponent {
  @Input() joke;
  @Output() jokeDelete = new EventEmitter<object>();
  
  deleteJoke() {
    this.jokeDelete.emit(this.joke);
  };
  
  toggle(joke) {
    joke.hide = !joke.hide;
  }
  
}

@Component({
  selector: 'joke-list',
  template: `
  <joke-form (jokeCreated)="addJoke($event)"></joke-form>
<joke *ngFor="let j of jokes" [joke]="j" (jokeDelete)="deleteJoke($event)"></joke>
  `
})
export class JokeListComponent {
  jokes: Object[];

  constructor() {
   this.jokes = [
      {
        setup: "What did the cheese say when it looked in the mirror?",
        punchline: "Hello-Me (Halloumi)",
        hide: true
      },
      {
        setup: "What kind of cheese do you use to disguise a small horse?",
        punchline: "Mask-a-pony (Mascarpone)",
        hide: true
      },
      {
        setup: "A kid threw a lump of cheddar at me",
        punchline: "I thought ‘That’s not very mature’",
        hide: true
      },
    ];
  }
  
  addJoke(joke) {

		this.jokes.unshift(joke);
	}
	
	deleteJoke(joke) {
	  let indexToDelete = this.jokes.indexOf(joke);
    if (indexToDelete !== -1) {
      this.jokes.splice(indexToDelete,1);
    }
	}
	
}

@Component({
  selector: 'app',
  template: `
<joke-list></joke-list>
  `
})
export class AppComponent {
}

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    JokeComponent,
    JokeListComponent,
    JokeFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
