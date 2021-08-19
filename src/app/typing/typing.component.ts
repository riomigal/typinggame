import { Component, OnInit } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.css'],
})
export class TypingComponent implements OnInit {
  typedSentence: string = ''; // Stores the typed sentence
  currentSentence: string = ''; // Stores the current asked sentence
  rounds: number = 10; // Set to higher number if you want have more sentences
  roundCounter: number = 0;
  errorCounter: number = 0; // Counts error
  allowedErrors: number = 30;
  displayedSentence: any = '';

  constructor() {}

  start() {
    this.typedSentence = ''; // Stores the typed sentence
    this.roundCounter = 0;
    this.errorCounter = 0;
    this.generateSentence();
  }

  generateSentence() {
    this.typedSentence = '';
    this.roundCounter++;
    this.currentSentence = lorem.sentence(4);
    this.displayedSentence = [...this.currentSentence];
  }

  checkTyping(event: Event) {
    // Store event target
    let eventTarget = event.target as HTMLInputElement;
    // Store event value
    let inputValue = eventTarget.value;

    // Check that user is not trying to remove letter
    if (inputValue > this.typedSentence) {
      let index = inputValue.length - 1;

      // Validate letter
      if (inputValue[index] === this.currentSentence[index]) {
        this.displayedSentence[
          index
        ] = `<span class="has-text-white has-background-success">${this.displayedSentence[index]}</span>`;
      } else {
        this.displayedSentence[
          index
        ] = `<span class="has-text-white has-background-danger">${this.displayedSentence[index]}</span>`;
        this.errorCounter++;
      }
      // Update typedSentence
      this.typedSentence = inputValue;
    } else {
      // Prevents that the user removes input value
      eventTarget.value = this.typedSentence;
    }

    // Go to next sentence
    if (inputValue.length == this.currentSentence.length) {
      this.generateSentence();
      console.log(this.roundCounter);
    }
  }

  /**
   * Updates allowed Errors value
   * @param event
   */
  updateAllowedErrors(event: Event): void {
    this.allowedErrors = parseInt((event.target as HTMLInputElement).value);
    if (isNaN(this.allowedErrors)) this.allowedErrors = 0;
  }

  /**
   * Updates rounds value
   * @param event
   */
  updateRounds(event: Event): void {
    this.rounds = parseInt((event.target as HTMLInputElement).value);
    if (isNaN(this.rounds)) this.rounds = 0;
  }

  ngOnInit(): void {}
}
