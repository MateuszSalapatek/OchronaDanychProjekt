import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-cezar-code',
  templateUrl: './cezar-code.component.html',
  styleUrls: ['./cezar-code.component.scss']
})
export class CezarCodeComponent implements OnInit {

  private alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "R", "S", "Ś", "T", "U", "W", "Y", "Z", "Ź", "Ż",
  "a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k", "l", "ł", "m", "n", "ń", "o", "ó", "p", "r", "s", "ś", "t", "u", "w", "y", "z", "ź", "ż",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as string[];

  choosedMethod: string = "";
  methods: string[] = ['kodowanie', 'dekodowanie'];
  resultText: string = "";

  form: FormGroup;

  constructor(private snackBar: SnackbarService,
              private navigation: NavigationService){

  }

  ngOnInit() {
  }

  codeCezar(shiftParametr: number, text: string, method: string){
    /* if shiftParametr is greather than 0 then script is coder
       if shiftParametr is smaller than 0 then script is decoder */
    
    if(!method){
      this.snackBar.openSnackBar("wybierz metodę", null, 2);
      return;
    }
    
    if(shiftParametr<0){
      this.snackBar.openSnackBar("wybierz dodatnią wartość", null, 2);
      return;
    }

    if (method == "dekodowanie"){
      shiftParametr = shiftParametr * (-1);
    }

    let resultText = "";
    if(Math.abs(shiftParametr)>this.alphabet.length){
      this.snackBar.openSnackBar("za długa wartość parametru przesunięcia", null, 2);
      return;
    }

    for (let i = 0; i < text.length; i++) {
      let indexOfSign = this.alphabet.indexOf(text.substr(i,1));
      if(indexOfSign>=0){ //to find the sign in alphabet. If sign no exist in aphabet then result is -1
        let indexOfSignAfterMoving = this.alphabet.indexOf(text.substr(i,1))+shiftParametr;
        if(indexOfSignAfterMoving>=this.alphabet.length){ //sign after moving is bigger than aplhapbet lenght, we have to decrease value from beginning of alphabet
          indexOfSignAfterMoving = indexOfSignAfterMoving - this.alphabet.length; 
        }else if(indexOfSignAfterMoving<0){ //sign after moving is smaller than 0, we have to increase value from end of alphabet
          indexOfSignAfterMoving = this.alphabet.length + indexOfSignAfterMoving;
        }
        resultText = resultText + this.alphabet[indexOfSignAfterMoving];
      }else{
        /* if sign is not in alphabet for example ".", then rewrite this sign*/
        resultText = resultText + text.substr(i,1);
      }
    }
    this.resultText = resultText;
  }

}

