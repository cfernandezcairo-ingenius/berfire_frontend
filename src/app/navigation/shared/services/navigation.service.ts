import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
  })
export class NavigationService {

    constructor(
        private readonly _router: Router,
        private readonly location: Location
    ) {}

    public NavigateTo(url: string) {
        this._router.navigateByUrl(url);
    }

    public goback() {
      this.location.back();
    }
}
