import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-playfair-code',
  templateUrl: './playfair-code.component.html',
  styleUrls: ['./playfair-code.component.scss']
})
export class PlayfairCodeComponent implements OnInit {

  private matrixPlayfair = [];
  private alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] as string[];
  resultText: string = "";
  methods: string[] = ['kodowanie', 'dekodowanie'];

  constructor(private snackBar: SnackbarService,
              private navigation: NavigationService) { }

  ngOnInit() {
  
  }      
  
  codePlayfair(key: string, text: string, method: string){
    // key = "klucz";
    // text = "CALCOOLATOR jessst najlepsza";

    if(!method){
      this.snackBar.openSnackBar("wybierz metodę", null, 2);
      return;
    }

    /* only upper letter*/
    text = text.toUpperCase();
    key = key.toUpperCase();
    /***/

    /*remove duplicate letter from key*/
    key = this.removeDuplicateCharacters(key);
    /***/

    /* create tables for Playfair matrix*/
    for (var i = 0; i < 5; i++) {
      this.matrixPlayfair[i] = [];
     }
    /****/

    /*filling the Playfair Matrix with key letter*/
    let keyIndex: number = 0;
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if(key.substr(keyIndex,1)){
          this.matrixPlayfair[i][j]  = key.substr(keyIndex,1);
          keyIndex++;
        }
      }
    }

    for (var q = 0; q < this.alphabet.length; q++){
      if(key.indexOf(this.alphabet[q]) < 0){ /* fill the rest of matrix other alphabet letters*/
        labelAfterFindLetter:
        for (var i = 0; i < 5; i++) {
          for (var j = 0; j < 5; j++) {
            if(!this.matrixPlayfair[i][j]){
              this.matrixPlayfair[i][j] = this.alphabet[q];
              break labelAfterFindLetter;
            }
          }
        }
      }
    }
    /***/

    console.log("Playfair Matrix:");
    for (var i = 0; i < 5; i++) {
      let jLetters: string = "";
      for (var j = 0; j < 5; j++) {
        jLetters = jLetters + this.matrixPlayfair[i][j] +" ";
      }
      console.log(jLetters);
    }


    /*pure text - delete other signs like bars*/
    let pureText: string = "";
    for (let i = 0; i < text.length; i++){
      if(this.alphabet.indexOf(text.substr(i,1)) >= 0 ){
        pureText = pureText + text.substr(i,1);
      };
    } 
    console.log("pureText: "+pureText);
    /***/

    /*digram*/
    let pureTextFinal: string = "";
    for (let i = 0; i < pureText.length; i++){
      if(this.removeDuplicateCharacters(pureText.substr(i,2)).length == 1){ /*duplicate value in digram*/
        pureTextFinal = pureTextFinal + pureText.substr(i,1) + "X";
        pureText = pureText.substr(0,i) + "X" + pureText.substring(i);
      }else{
        pureTextFinal = pureTextFinal + pureText.substr(i,2);
      }
      i++;
    }
    console.log("pureTextFinal: "+pureTextFinal);

    let diPureTextTable = [];
    let indexPureDiTextTable: number = 0;
    for (let i = 0; i < pureText.length; i++){
        diPureTextTable[indexPureDiTextTable] = pureTextFinal.substr(i,2);
        indexPureDiTextTable++;
        i++;
    }
    for (let i = 0; i < diPureTextTable.length; i++){
      console.log("diPureTextTable: "+diPureTextTable[i]);      
    }
    /***/

    /***szyfrowanie*/
    let resultText: string = "";
    for (let i = 0; i < diPureTextTable.length; i++){
      let xIndex1: number = 0;
      let yIndex1: number = 0;
      let xIndex2: number = 0;
      let yIndex2: number = 0;
      for (let m = 0; m <= 1; m++ ){
        for (var p = 0; p < 5; p++) {
          for (var q = 0; q < 5; q++) {
            if(this.matrixPlayfair[p][q] == diPureTextTable[i].substr(m,1)){
              if(m==0){
                xIndex1 = p;
                yIndex1 = q;
              }else{
                xIndex2 = p;
                yIndex2 = q;
              }
            }
          }
        }
      }
      
      if(method=="kodowanie"){
        if (xIndex1 == xIndex2){
          if(yIndex1+1 > 4){
            resultText = resultText + this.matrixPlayfair[xIndex1][0];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex1][yIndex1+1];
          }
          if(yIndex2+1 > 4){
            resultText = resultText + this.matrixPlayfair[xIndex2][0];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex2][yIndex2+1];
          }
        }else if(yIndex1 == yIndex2){
          if(xIndex1+1 > 4){
            resultText = resultText + this.matrixPlayfair[0][yIndex1];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex1+1][yIndex1];
          }
          if(xIndex2+1 > 4){
            resultText = resultText + this.matrixPlayfair[0][yIndex2];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex2+1][yIndex2];
          }
        }else{
          resultText = resultText + this.matrixPlayfair[xIndex1][yIndex2] + this.matrixPlayfair[xIndex2][yIndex1];
        }
      }else{
        if (xIndex1 == xIndex2){
          if(yIndex1-1 < 0 ){
            resultText = resultText + this.matrixPlayfair[xIndex1][4];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex1][yIndex1-1];
          }
          if(yIndex2+1 < 0){
            resultText = resultText + this.matrixPlayfair[xIndex2][4];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex2][yIndex2-1];
          }
        }else if(yIndex1 == yIndex2){
          if(xIndex1+1 < 0){
            resultText = resultText + this.matrixPlayfair[4][yIndex1];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex1-1][yIndex1];
          }
          if(xIndex2+1 < 0){
            resultText = resultText + this.matrixPlayfair[4][yIndex2];
          }else{
            resultText = resultText + this.matrixPlayfair[xIndex2-1][yIndex2];
          }
        }else{
          resultText = resultText + this.matrixPlayfair[xIndex1][yIndex2] + this.matrixPlayfair[xIndex2][yIndex1];
        }
      }
      console.log(diPureTextTable[i] +" => "+ resultText.substr(-2,2));
    }

    if(method == "dekodowanie"){
      let resultTextWithoutX: string = "";
      for (let i = 0; i < resultText.length; i++){
        if(resultText.substr(i,1) != "X"){
          resultTextWithoutX = resultTextWithoutX + resultText.substr(i,1);
        }
      }
      resultText = resultTextWithoutX;
    }    
    this.resultText = resultText;
    /****/
  }

  removeDuplicateCharacters(string) {
    return string.split('').filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      }).join('');
  }

}
