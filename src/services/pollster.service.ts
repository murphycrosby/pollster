import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PollsterService {
    constructor(private http: HttpClient) { }

    private buildUrl(): string {
        return 'https://t7k9gfzbnd.execute-api.us-east-1.amazonaws.com/Live/';
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            // 'Origin': 'localhost:4200',
        });
    }

    public getVotes(): Observable<PollResponse> {
        return Observable.create(o => {
            // console.log('getVotes:: 1');
            const headers = this.getHeaders();
            this.http.get(this.buildUrl() + 'polls', {headers: headers})
            .subscribe(res => {
                // console.log(res);
                o.next(res);
                o.complete();
            }, (err: any) => {
                o.error(err);
            });
        });
    }

    public resetVotes(): Observable<String> {
        return Observable.create(o => {
            // console.log('resetVotes:: 1');
            const headers = this.getHeaders();
            this.http.post(this.buildUrl() + 'polls/reset', '', {headers: headers})
            .subscribe(res => {
                // console.log(res);
                o.next(res);
                o.complete();
            }, (err: any) => {
                o.error(err);
            });
        });
    }

    public closeVotes(): Observable<String> {
        return Observable.create(o => {
            // console.log('closeVotes:: 1');
            const headers = this.getHeaders();
            this.http.post(this.buildUrl() + 'polls/close', '', {headers: headers})
            .subscribe(res => {
                // console.log(res);
                o.next(res);
                o.complete();
            }, (err: any) => {
                o.error(err);
            });
        });
    }
}

export class PollResponse {
    votes: Vote[];
    status: String;
    message: String;
    executionTime: String;
}

export class Vote {
    vote: String;
    tally: number;
}
