import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {
  }

  clickOpenVigenerePage() {
    this.router.navigate(['/vigenere-code']
    );
  }

  clickOpenPlayfairPage() {
    this.router.navigate(['/playfair-code']
    );
  }
}
