import { Injectable } from '@angular/core';

declare var $:any;

@Injectable({
  providedIn: 'root'
})

export class NotificationmsgService {

  constructor() { }

  // Show Success
  showSuccess(msg, from = null, align = null) {
    if (from == null) {
      from = 'top';
    }
    if (align == null) {
      align = 'right';
    }
    $.notify({
        icon: "pe-7s-check",
        message: msg
    },{
        type: 'success',
        timer: 100,
        placement: {
            from: from,
            align: align
        }
    });
  }

  // Show Error
  showError(msg, from = null, align = null) {
    if (from == null) {
      from = 'top';
    }
    if (align == null) {
      align = 'right';
    }
    $.notify({
        icon: "pe-7s-info",
        message: msg
    },{
        type: 'danger',
        timer: 100,
        placement: {
            from: from,
            align: align
        }
    });
  }
}
