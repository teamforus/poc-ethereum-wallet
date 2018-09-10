export class WatchList<TObject, TFilter> {
  private watches = new Array<Watch<TObject, TFilter>>();

  addWatch(filter?: Array<TFilter>): Array<TObject> {
    const watch = new Watch<TObject, TFilter>(filter);
    this.watches.push(watch);
    return watch.watchedObjects;
  }

  add(newObject: TObject) {
    this.watches.forEach((watch) => {
      watch.add(newObject);
    });
  }

  remove(ObjectToRemove: TObject) {
    this.watches.forEach((watch) => {
      watch.remove(ObjectToRemove);
    });
  }

  clear() {
    this.watches.forEach((watch) => {
      watch.clear();
    });
  }
}

class Watch<TObject, TFilter> {
  public watchedObjects = new Array<TObject>();

  constructor(private filter?: Array<TFilter>) {}

  add(newObject: TObject) {
    // No filter or object passes filtering
    if (!this.filter || this.filter.some((filterItem) => filterItem === newObject.valueOf())) {
      // Object not already in array
      if (!this.watchedObjects.some((existingAccount) => existingAccount.valueOf() === newObject.valueOf())) {
        this.watchedObjects.push(newObject);
      }
    }
  }

  remove(objectToRemove: TObject) {
    let indexToRemove = -1;
    while (-1 !== (indexToRemove = this.watchedObjects.findIndex((watchedObject) => watchedObject.valueOf() === objectToRemove.valueOf()))) {
       this.watchedObjects.splice(indexToRemove, 1);
    }
  }

  clear() {
    this.watchedObjects.length = 0;
  }
}
