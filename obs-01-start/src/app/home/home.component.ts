import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscribtion: Subscription

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscribtion = interval(1000).subscribe(count => {
    //   console.log(count)
    // })

    //My own
    const customIntervalObservable = new Observable(observer => {
      let count = 0
      setInterval(() => {
        observer.next(count)

        if (count === 2) {
          observer.complete()
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3! :)'))
        }
        
        count++
      }, 1000)
    })

    this.firstObsSubscribtion = customIntervalObservable
      .pipe(filter((data: number) => {
      return data % 2 == 0
    }), map((data: number) => {
      return `Round: ${data + 1}`
    })).subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
      alert(error.message)
    }, () => {
      console.log('Completed!')
      alert('Done')
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscribtion.unsubscribe()
  }
}
