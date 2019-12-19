import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import { UIChart } from 'primeng/primeng';

import { PollsterService, PollResponse } from '../services/pollster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: UIChart;
  title = 'app';
  data: any;
  private subscription;
  private polling = false;

  constructor(private pollster: PollsterService) {
    this.polling = false;
    this.data = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        {
          label: 'Poll',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [0, 0, 0, 0]
        }
      ]
    };
  }

  ngOnInit() {
  }

  startPolling() {
    console.log('start');
    this.polling = true;

    if (this.subscription == null) {
      this.subscription = interval(3000)
        .pipe(
          startWith(0),
          switchMap(() => this.pollster.getVotes())
        )
        .subscribe(res => {
          // console.log(res);
          let a = 0;
          let b = 0;
          let c = 0;
          let d = 0;
          res.votes.forEach(element => {
            switch (element.vote) {
              case 'A':
                a = element.tally;
                break;
              case 'B':
                b = element.tally;
                break;
              case 'C':
                c = element.tally;
                break;
              case 'D':
                d = element.tally;
                break;
            }
          });

          this.data.datasets[0].data[0] = a;
          this.data.datasets[0].data[1] = b;
          this.data.datasets[0].data[2] = c;
          this.data.datasets[0].data[3] = d;
          this.chart.refresh();
        });
    }
  }

  resetPolling() {
    console.log('reset');
    this.pollster.resetVotes().subscribe((res) => {
      console.log('Reset Success');
    }, err => {
      console.log('Reset Error', err);
    });
  }

  closePolling() {
    console.log('close');
    this.polling = false;
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.pollster.closeVotes().subscribe((res) => {
      console.log('Close Success');
    }, err => {
      console.log('Close Error', err);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
