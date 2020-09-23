import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Subject} from 'rxjs/Subject';
import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke Skywalker', side: 'light' },
    { name: 'Darth Vader', side: 'dark' }
  ];
  private logService: LogService;
  charactersChanged= new Subject<void>();
  http:Http;
  constructor(logService: LogService,http:Http) {
    this.logService = logService;
    this.http=http;
  }
  fetchCharacters(){
     this.http.get('https://swapi.dev/api/people/').subscribe(
       (response:Response) => {
         console.log(response);
       }
     );
  }
  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    })
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })
    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    })
    if (pos !== -1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
