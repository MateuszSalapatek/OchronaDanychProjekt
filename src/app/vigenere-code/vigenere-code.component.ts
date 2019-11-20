import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-vigenere-code',
  templateUrl: './vigenere-code.component.html',
  styleUrls: ['./vigenere-code.component.scss']
})
export class VigenereCodeComponent implements OnInit {

  private alphabetTables = [];
  private alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "R", "S", "Ś", "T", "U", "W", "Y", "Z", "Ź", "Ż",
  "a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "r", "s", "ś", "t", "u", "w", "y", "z", "ź", "ż",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as string[];
  resultText: string = "";
  methods: string[] = ['kodowanie', 'dekodowanie'];

  constructor(private snackBar: SnackbarService,
              private navigation: NavigationService) { }

  ngOnInit() {
    /* create tables with alphabets*/
    for (var i = 0; i < this.alphabet.length; i++) {
     this.alphabetTables[i] = [];
    }

    for (var i = 0; i < this.alphabet.length; i++) {
      for (var j = 0; j < this.alphabet.length; j++) {
        this.alphabetTables[i][j] = this.alphabet[(j + i) % this.alphabet.length]
      }
    }
    /****/
  }

  codeVigenere(key: string, text: string, method: string){
    let keyWithExtraCharacters: string = "";
    let indexKey: number = 0;
    let resultText: string = "";

    if(!method){
      this.snackBar.openSnackBar("wybierz metodę", null, 2);
      return;
    }
    
    /*adding special charackters like bar into key*/
    for(let i = 0; i < text.length; i++) {
      if(this.alphabet.indexOf(text.substr(i,1)) >= 0) {
        keyWithExtraCharacters = keyWithExtraCharacters + key.substr(indexKey % key.length,1);
        indexKey++;
      }else{
        keyWithExtraCharacters = keyWithExtraCharacters + text.substr(i,1);
      }
    }

    if(method =="dekodowanie"){
      let reverseKey: string = "";
      /*reverse the key for decoding*/
      for(let i = 0; i < keyWithExtraCharacters.length; i++){
        if(this.alphabet.indexOf(keyWithExtraCharacters.substr(i,1)) >= 0) {
          reverseKey = reverseKey + this.alphabet[((this.alphabet.length - this.alphabet.indexOf(keyWithExtraCharacters.substr(i,1))) % this.alphabet.length)];
        }else{
          reverseKey = reverseKey + keyWithExtraCharacters.substr(i,1);
        }
      }
      keyWithExtraCharacters = reverseKey
    }

    for(let i = 0; i< text.length; i++) {     
      let indexOfSign = this.alphabet.indexOf(text.substr(i,1));
      if(indexOfSign>=0){ 
        resultText = resultText + this.alphabetTables[this.alphabet.indexOf(text.substr(i,1))][this.alphabet.indexOf(keyWithExtraCharacters.substr(i,1))];
      }
      else{
        resultText = resultText + text.substr(i,1);
      }
    }
    this.resultText = resultText;
  }

}
