import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterInfo } from '../../core/models/character_model';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  constructor(){
    console.log(
      this.character
    )
  }
  @Input() character:CharacterInfo

}
