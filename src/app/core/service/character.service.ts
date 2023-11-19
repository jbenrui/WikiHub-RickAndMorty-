import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character, CharacterInfo } from '../models/character_model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  /*
    Character
    There is a total of 826 characters sorted by id.
    Character schema
    Key	                  Type	Description
    id	                  int	The id of the character.
    name	                string	The name of the character.
    status	              string	The status of the character ('Alive', 'Dead' or 'unknown').
    species	              string	The species of the character.
    type	                string	The type or subspecies of the character.
    gender	              string	The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
    origin	              object	Name and link to the character's origin location.
    location	            object	Name and link to the character's last known location endpoint.
    image	                string (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
    episode	              array (urls)	List of episodes in which this character appeared.
    url	                  string (url)	Link to the character's own URL endpoint.
    created	              string	Time at which the character was created in the database.
  */

  private apiURL = 'https://rickandmortyapi.com/api'
  private _characterSubject:BehaviorSubject<CharacterInfo[]> = new BehaviorSubject([]);
  public character = this._characterSubject.asObservable();
  
  unsubscr;
  constructor(private http: HttpClient) {
    this.unsubscr = this.http.get<CharacterInfo[]>(this.apiURL + '/character').subscribe( data => {
      const characters: CharacterInfo[] = data;
      this._characterSubject.next(characters);
    },
    (error) => {
      console.error('Error fetching characters:', error);
    })
   }

  ngOnDestroy():void {
    this.unsubscr();
  }

  async getCharacterbyId(id:number): Promise<Character> {
    return new Promise<Character>(async(resolve, reject) => {
      try {
        var character = (await firstValueFrom (this.http.get<Character>(`${this.apiURL}/character/${id}`)))
        resolve({
          id:character.id,
          name:character.name,
          status:character.status,
          species:character.species,
          type:character.type,
          gender:character.gender,
          origin:character.origin,
          location:character.location,
          image:character.image,
          episode:character.episode,
          url:character.url,
          created:character.created,
        })
      } catch (error) {
        reject(error);
      }
    });
  }

  getMultipleCharacter(ids:number[]):Observable<Character[]>{
    const requests = ids.map(id => this.http.get<Character>(`${this.apiURL}/character/${id}`));
    return forkJoin(requests);
  }

  
}
