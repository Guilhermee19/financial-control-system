import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[initialLetters]',
})
export class InitialLettersDirective implements OnInit {
  @Input() initialLetters = 'Foo Bar';
  @Input() length = 2;

  constructor(private elementRef: ElementRef) {}

  linkingPrepositions = ['de', 'da', 'do', 'das', 'dos', 'e'];

  ngOnInit() {
    if (this.initialLetters) {
      this.removeLinkingPrepositions();
      const initials = this.initialLetters.split(' ').map((word) => word[0]);
      const letters = initials.slice(0, this.length).join('');
      this.initialLetters = letters.toUpperCase();
      const span = this.elementRef.nativeElement;
      span.innerHTML = this.initialLetters;
    } else {
      // Caso inicialLetters seja indefinido ou nulo, defina um valor padrão ou limpe o conteúdo
      const span = this.elementRef.nativeElement;
      span.innerHTML = '';
    }
  }

  removeLinkingPrepositions() {
    // Garantir que initialLetters não seja indefinido ou nulo antes de processar
    if (this.initialLetters) {
      this.initialLetters = this.initialLetters
        .split(' ')
        .filter(
          (word) => !this.linkingPrepositions.includes(word.toLowerCase())
        )
        .join(' ');
    }
  }
}
