import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-all-add-edit-new',
  standalone: true,
  imports: [],
  template: '',
})
export class AllAddEditNewComponent implements OnInit {

   constructor(
    private navigationService: NavigationService,
  ) {}

  ngOnInit(): void {
    this.navigationService.goback();
  }
}
