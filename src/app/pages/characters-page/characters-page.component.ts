import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '../../componets/character/character.component';
import { CharacterService } from '../../core/service/character.service';
import { CharacterInfo } from '../../core/models/character_model';

@Component({
  selector: 'app-characters-page',
  standalone: true,
  imports: [CommonModule, CharacterComponent],
  providers: [CharacterService],
  templateUrl: './characters-page.component.html',
  styleUrl: './characters-page.component.scss'
})

export class CharactersPageComponent {
  characters: CharacterInfo[];
  character: CharacterInfo;

  constructor(private characterSVC: CharacterService){
  }

  getCharacters(){
    return this.characterSVC.getAllCharacter().subscribe(characters => this.characters = characters);;
  }

}


