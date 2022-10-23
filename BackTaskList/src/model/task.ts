import {v4 as uuidV4} from 'uuid'

class Task {
  id: string = '';
  title: string = '';
  description: string = '';
  taskDateTime: string | Date = '';
  duration: number | string = '';
  isComplete: boolean = false;
  created_at: Date = new Date();

  constructor() {
    if(!this.id) {
      this.id == uuidV4();      
    }
  }
}

export {Task}