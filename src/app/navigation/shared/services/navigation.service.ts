import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
export class NavigationService {

    constructor(
        private _router: Router,
        private location: Location
    ) {}

    public NavigateTo(url: string) {
        this._router.navigateByUrl(url);
    }

    public goback() {
      this.location.back();
    }
}
