import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Response {
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      description: string;
      rate_float: number;
    };
    BRL: {
      description: string;
      rate_float: number;
    };
  };
}

@Injectable()
export class MoedaService {
  private apiUrl: string =
    'https://api.coindesk.com/v1/bpi/currentprice/BRL.json';
  current: Response;
  list: Array<Response> = [];
  counter: number = 0;

  constructor(private http: HttpClient) {}

  Data() {
    this.http.get<Response>(this.apiUrl).subscribe((data) => {
      this.updateBitRates(data);
    });
  }

  updateBitRates(current: Response) {
    let lastDataSaved =
      this.list.length > 0 ? this.list[this.list.length - 1] : null;

    if (lastDataSaved) {
      if (
        current.bpi.USD.rate_float === lastDataSaved.bpi.USD.rate_float ||
        current.bpi.USD.rate_float === lastDataSaved.bpi.USD.rate_float
      ) {
        this.list.push(current);
      }
    } else {
      this.list.push(current);
    }
  }

  startC() {
    let timer = setInterval(() => {
      this.counter++;

      if (this.counter == 60) {
        this.stopC(timer);

        this.Data();

        this.counter = 0;
        this.startC();
      }
    }, 1000);
  }

  stopC(interval) {
    clearInterval(interval);
  }

  timeUpdate() {
    return 60 - this.counter;
  }
}
